import { auth } from "@/lib/auth";
import { setRateLimitHeaders } from "@arcjet/decorate";
import arcjet, { fixedWindow, shield } from "@/lib/arcjet";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";

// Opt out of caching
export const dynamic = "force-dynamic";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet.withRule(
  // Shield detects suspicious behavior, such as SQL injection and cross-site
  // scripting attacks. We want to ru nit on every request
  shield({
    mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
  })
);

// Returns ad-hoc rules depending on whether the session is present. You could
// inspect more details about the session to dynamically adjust the rate limit.
function getClient(session: Session | null) {
  // If the user is logged in then give them a higher rate limit
  if (session?.user) {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 5,
        window: "60s",
      }),
    );
  } else {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 2,
        window: "60s",
      }),
    );
  }
}

export async function POST(req: Request) {
  // Get the session
  const session = await auth();

  console.log("Session: ", session);

  // The protect method returns a decision object that contains information
  // about the request.
  const decision = await getClient(session).protect(req);

  console.log("Arcjet decision: ", decision);

  // Add rate limit info the headers (optional)
  const headers = new Headers();
  setRateLimitHeaders(headers, decision);

  let message = "";
  let remaining = 0;

  if (decision.reason.isRateLimit()) {
    const reset = decision.reason.resetTime;
    remaining = decision.reason.remaining;

    if (reset === undefined) {
      message = "";
    } else {
      // Calculate number of seconds between reset Date and now
      const seconds = Math.floor((reset.getTime() - Date.now()) / 1000);
      const minutes = Math.ceil(seconds / 60);

      if (minutes > 1) {
        message = `Reset in ${minutes} minutes.`;
      } else {
        message = `Reset in ${seconds} seconds.`;
      }
    }
  }

  // If the decision is denied, return an error. You can inspect
  // the decision results to customize the response.
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: `HTTP 429: Too many requests. ${message}`, ip: decision.ip },
        { status: 429, headers },
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", ip: decision.ip },
        { status: 403, headers },
      );
    }
  }

  return NextResponse.json(
    { message: `HTTP 200: OK. ${remaining} requests remaining. ${message}` },
    { status: 200, headers },
  );
}

import arcjet, { shield } from "@/lib/arcjet";
import { NextResponse } from "next/server";

// Opt out of caching
export const dynamic = "force-dynamic";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet.withRule(
  // Shield detects suspicious behavior, such as SQL injection and cross-site
  // scripting attacks.
  shield({
    mode: "LIVE"
  })
);

export async function GET(req: Request) {
  // The protect method returns a decision object that contains information
  // about the request.
  const decision = await aj.protect(req);

  console.log("Arcjet decision: ", decision);

  // If the decision is denied, return a 403 Forbidden response. You can inspect
  // the decision results to customize the response.
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Forbidden", ip: decision.ip },
      { status: 403 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}

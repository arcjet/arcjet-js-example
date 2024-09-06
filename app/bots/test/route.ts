import arcjet, { detectBot } from "@/lib/arcjet";
import { NextResponse, NextRequest } from "next/server";

// Opt out of caching
export const dynamic = "force-dynamic";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
    // configured with a list of bots to allow from
    // https://arcjet.com/bot-list
    allow: [], // blocks all automated clients
  }),
);

export async function GET(req: NextRequest) {
  // The protect method returns a decision object that contains information
  // about the request.
  const fingerprint = req.ip!;
  const decision = await aj.protect(req, { fingerprint });

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

import arcjet, { detectBot } from "@arcjet/next";
import { NextResponse } from "next/server";

// Opt out of caching
export const dynamic = "force-dynamic";

// Create an Arcjet instance outside of the handler function
const aj = arcjet({
  // Get your site key from https://app.arcjet.com
  // and set it as an environment variable rather than hard coding.
  // See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
  key: process.env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      block: ["AUTOMATED"], // blocks all automated clients
    }),
    // .. you can chain multiple rules
  ],
});

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
      { status: 403 }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}

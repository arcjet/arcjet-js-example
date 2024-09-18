import arcjet, { sensitiveInfo } from "@/lib/arcjet";
import { NextRequest, NextResponse } from "next/server";
import { ArcjetSensitiveInfoReason } from "@arcjet/next";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet.withRule(
  // Arcjet's sensitiveInfo rule protects against clients sending you
  // sensitive information such as PII that you do not wish to handle.
  sensitiveInfo({
    mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
    deny: ["EMAIL"], //"EMAIL", "CREDIT_CARD_NUMBER", "IP_ADDRESS", "PHONE_NUMBER"],
  })
);

export async function POST(req: NextRequest) {
  const fingerprint = req.ip!;
  const decision = await aj.protect(req, { fingerprint });

  // Get a list of the sensitive information types that were found in the payload
  if (decision.isDenied()) {
    const foundTypes = [
      "EMAIL",
      "CREDIT_CARD_NUMBER",
      "IP_ADDRESS",
      "PHONE_NUMBER",
    ].filter((type) => {
      (decision.reason as ArcjetSensitiveInfoReason).denied.some(
        (denial) => denial.identifiedType === type
      );
    });

    // Generate a message to inform the user of the sensitive information types found
    const message =
      "Payload found these sensitive information types: " +
      foundTypes.join(", ");

    return NextResponse.json({ message: message }, { status: 403 });
  }

  return NextResponse.json({ ok: true });
}

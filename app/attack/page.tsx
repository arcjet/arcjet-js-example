import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arcjet attack protection",
  description:
    "Arcjet Shield detects suspicious behavior, such as SQL injection and cross-site scripting attacks.",
};

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet attack protection example
        </h1>
        <p className="max-w-[700px]">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/shield/concepts"
            className="hover:underline font-bold decoration-1 underline-offset-2"
          >
            Arcjet Shield
          </Link>
          . Once a certain suspicion threshold is reached, subsequent requests
          from that client are blocked for a period of time. Shield detects{" "}
          <Link
            href={
              "https://docs.arcjet.com/shield/concepts#which-attacks-will-arcjet-shield-block"
            }
            className="hover:underline font-bold decoration-1 underline-offset-2"
          >
            suspicious behavior
          </Link>
          , such as SQL injection and cross-site scripting attacks.
        </p>
      </div>
      <h2 className="text-xl font-bold">Try it</h2>
      <p>Simulate an attack using curl:</p>
      <pre className="p-4">
        curl -v -H &quot;x-arcjet-suspicious: true&quot;
        https://example.arcjet.com/attack/test
      </pre>
      <p className="max-w-[700px]">
        After the 5th request, your IP will be blocked for 15 minutes.
        Suspicious requests must meet a threshold before they are blocked to
        avoid false positives.
      </p>
      <p className="max-w-[700px]">
        Shield can also be installed in middleware to protect your entire site.
      </p>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arcjet bot protection example",
  description:
    "An example of Arcjet's bot protection configured to block automated clients.",
};

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet bot protection example
        </h1>
        <p className="max-w-[700px]">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="hover:underline font-bold decoration-1 underline-offset-2"
          >
            Arcjet&apos;s bot protection
          </Link>{" "}
          configured to block automated clients.
        </p>
      </div>
      <h2 className="text-xl font-bold">Try it</h2>
      <p>
        Make a request using <code>curl</code> (which is considered an automated
        client):
      </p>
      <pre className="p-4">curl -v https://example.arcjet.com/bots/test</pre>
      <p>Your IP will be blocked for 60 seconds.</p>
      <p className="max-w-[700px]">
        Bot protection can also be installed in middleware to protect your
        entire site.
      </p>
    </section>
  );
}

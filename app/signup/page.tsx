import { EmailForm } from "@/components/EmailForm";
import Link from "next/link";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet signup form protection
        </h1>
        <p className="max-w-[700px]">
          This form uses{" "}
          <Link
            href="https://docs.arcjet.com/signup-protection/concepts"
            className="hover:underline font-bold decoration-1 underline-offset-2"
          >
            Arcjet&apos;s signup form protection
          </Link>{" "}
          which includes:
        </p>
        <ul className="ms-8 max-w-[700px] list-outside list-disc">
          <li>
            Arcjet server-side email verification configured to block disposable
            providers and ensure that the domain has a valid MX record.
          </li>
          <li>
            Rate limiting set to 5 requests over a 2 minute sliding window - a
            reasonable limit for a signup form, but easily configurable.
          </li>
          <li>
            Bot protection to stop automated clients from submitting the form.
          </li>
        </ul>
      </div>

      <h2 className="text-xl font-bold">Test emails</h2>
      <p>Try these emails to see how it works:</p>
      <ul className="ms-8 list-outside list-disc">
        <li>
          <code>invalid.@arcjet</code> is an invalid email address.
        </li>
        <li>
          <code>test@0zc7eznv3rsiswlohu.tk</code> is from a disposable email
          provider.
        </li>
        <li>
          <code>nonexistent@arcjet.ai</code> is a valid email address & domain,
          but has no MX records.
        </li>
      </ul>

      <h2 className="text-xl font-bold">Try it</h2>

      <div className="flex gap-4">
        <EmailForm />
      </div>
    </section>
  );
}

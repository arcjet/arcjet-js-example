import { auth } from "@/lib/auth";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import type { Metadata } from "next";
import Link from "next/link";
import { RLForm } from "@/components/RLForm";

export const metadata: Metadata = {
  title: "Arcjet rate limit example",
  description:
    "An example of Arcjet's rate limiting with different limits depending on authentication.",
};

export default async function IndexPage() {
  const session = await auth();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet rate limiting example
        </h1>
        <p className="max-w-[700px]">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="underline"
          >
            Arcjet&apos;s rate limiting
          </Link>
          .
        </p>
      </div>
      <h2 className="text-xl font-bold">Try it</h2>
      <RLForm />

      {session?.user ? (
        <>
          <p className="text-green-500">
            You are authenticated as {session.user?.email}. The limit is set to
            5 requests every 60 seconds.
          </p>
        </>
      ) : (
        <>
          <p className="text-red-400">
            You are not authenticated. The limit is set to 2 requests every 60
            seconds.
          </p>
        </>
      )}

      <h2 className="text-xl font-bold">Authenticate</h2>
      <p className="max-w-[700px]">
        Rate limits can be{" "}
        <Link
          href="https://docs.arcjet.com/reference/nextjs#ad-hoc-rules"
          className="underline"
        >
          dynamically adjusted
        </Link>{" "}
        e.g. to set a limit based on the authenticated user.
      </p>
      {session?.user ? <SignOut /> : <SignIn />}
    </section>
  );
}

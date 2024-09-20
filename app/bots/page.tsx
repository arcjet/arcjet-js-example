import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import useSiteKey from "@/components/effects/useSiteKey";
import Divider from "@/components/elements/Divider";
import type { Metadata } from "next";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";

export const metadata: Metadata = {
  title: "Arcjet bot protection example",
  description:
    "An example of Arcjet's bot protection configured to block automated clients.",
};

export default function IndexPage() {
  const { siteKey } = useSiteKey();

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet bot protection example
        </h1>
        <p className="max-w-[700px] text-lg">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/bot-protection/concepts"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            Arcjet&apos;s bot protection
          </Link>{" "}
          configured to block automated clients.
        </p>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">Try it</h2>
        <p className="text-secondary-foreground">
          Make a request using <code>curl</code>, which is considered an
          automated client:
        </p>
        <pre className="p-4">curl -v https://example.arcjet.com/bots/test</pre>
        <p className="text-secondary-foreground">
          Your IP will be blocked for 60 seconds.
        </p>
        <p className="max-w-[700px] text-secondary-foreground">
          Bot protection can also be installed in middleware to protect your
          entire site.
        </p>

        {siteKey && <VisitDashboard />}
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">See the code</h2>
        <p className="text-secondary-foreground">
          The{" "}
          <Link
            href="https://github.com/arcjet/arcjet-js-example/blob/main/app/bots/test/route.ts"
            target="_blank"
            rel="noreferrer"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            API route
          </Link>{" "}
          imports a{" "}
          <Link
            href="https://github.com/arcjet/arcjet-js-example/blob/main/lib/arcjet.ts"
            target="_blank"
            rel="noreferrer"
            className="font-bold decoration-1 underline-offset-2 hover:underline"
          >
            centralized Arcjet client
          </Link>{" "}
          which sets base rules.
        </p>
      </div>

      <Divider />

      <WhatNext deployed={siteKey != null} />
    </section>
  );
}

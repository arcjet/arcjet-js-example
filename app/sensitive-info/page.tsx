import { SensitiveInfoForm } from "@/components/SensitiveInfoForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import useSiteKey from "@/components/effects/useSiteKey";
import Divider from "@/components/elements/Divider";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";
import CopyButton from "@/components/CopyButton";

export default function IndexPage() {
  const { siteKey } = useSiteKey();

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Arcjet Sensitive Information
        </h1>
        <p className="max-w-[700px] text-lg">
          This page is protected by{" "}
          <Link
            href="https://docs.arcjet.com/sensitive-info/concepts"
            className="hover:underline font-bold decoration-1 underline-offset-2"
          >
            Arcjet&apos;s sensitive information detection
          </Link>{" "}
          configured to detect:
        </p>
        <ul className="ms-8 max-w-[700px] list-outside list-disc text-secondary-foreground">
          <li className="text-lg">Email addresses</li>
          <li className="text-lg pt-4">Credi/debit card numbers</li>
          <li className="text-lg pt-4">IP addresses</li>
          <li className="text-lg pt-4">Phone numbers</li>
        </ul>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">Try it</h2>

        <div className="flex gap-4">
          <SensitiveInfoForm />
        </div>

        {siteKey && <VisitDashboard />}

        <h2 className="text-xl font-bold">Test payloads</h2>
        <p className="text-secondary-foreground">
          Try these payloads to see how it works:
        </p>
        <ul className="ms-8 list-outside list-disc">
          <li className="text-muted-foreground">
            <pre className="text-secondary-foreground">
              Please contact me at morgan@example.com
              <CopyButton />
            </pre>
          </li>
          <li className="text-muted-foreground pt-2">
            <pre className="text-secondary-foreground">
              Can you charge the customer's card number 4242 4242 4242 4242 for
              $50?
              <CopyButton />
            </pre>
          </li>
          <li className="text-muted-foreground pt-2">
            <pre className="text-secondary-foreground">
              I saw the issue when using Firefox on Windows 10, connected to
              Acme Fiber (IP address: 198.51.100.69).
              <CopyButton />
            </pre>
          </li>
          <li className="text-muted-foreground pt-2">
            <pre className="text-secondary-foreground">
              Call me at (212) 664-7665
              <CopyButton />
            </pre>
          </li>
        </ul>
      </div>

      <Divider />

      <div className={styles.Section}>
        <h2 className="text-xl font-bold">See the code</h2>
        <p className="text-secondary-foreground">
          The{" "}
          <Link
            href="https://github.com/arcjet/arcjet-js-example/blob/main/app/sensitive-info/test/route.ts"
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

import { SupportForm } from "@/components/SuppportForm";
import VisitDashboard from "@/components/compositions/VisitDashboard";
import WhatNext from "@/components/compositions/WhatNext";
import useSiteKey from "@/components/effects/useSiteKey";
import Divider from "@/components/elements/Divider";
import Link from "next/link";

import styles from "@/components/elements/PageShared.module.scss";

export default function IndexPage() {
  const { siteKey } = useSiteKey();

  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Form submitted
        </h1>
        <p className="max-w-[700px] text-lg">
          If this were a real form, your message would have been submitted.
        </p>
      </div>

      <Divider />

      <WhatNext deployed={siteKey != null} />
    </section>
  );
}

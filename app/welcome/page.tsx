import styles from "@/components/elements/PageShared.module.scss";

export default function WelcomePage() {
  return (
    <section className={styles.Content}>
      <div className={styles.Section}>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Thanks!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          If this were a real form you would be signed up.
        </p>
      </div>
    </section>
  );
}

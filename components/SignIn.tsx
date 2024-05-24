import { signIn } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit" className={buttonVariants({ variant: "outline" })}>
        Sign in with GitHub to see a different rate limit
      </button>
    </form>
  );
}

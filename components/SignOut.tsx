import { signOut } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className={buttonVariants({ variant: "outline" })}>
        Sign out
      </button>
    </form>
  );
}

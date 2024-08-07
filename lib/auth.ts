import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // Call when the user is logged in to set the user ID in the session
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user?.id || token?.sub || "";
      }
      return session;
    },
  },
});

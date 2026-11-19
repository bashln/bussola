import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { ensureUser } from "./db/repositories";
import { sessionUserId } from "./session-user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
        await ensureUser(user.id, user.id, user.name ?? user.email ?? "usuario", user.image ?? null);
      }
      return token;
    },
    session({ session, token }) {
      if (token.userId) session.user.id = token.userId as string;
      return session;
    },
  },
});

export async function getSessionUserId(): Promise<string | null> {
  return sessionUserId(await auth());
}

import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await loginUser(credentials.email, credentials.password);
        if (user) {
          return {
            ...user,
            id: user.id.toString()
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = Number(user.id);
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
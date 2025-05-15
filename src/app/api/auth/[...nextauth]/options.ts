import type { NextAuthOptions, SessionStrategy } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/Client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          image: user.image ? String(user.image) : null,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name as string,
              image: user.image ? String(user.image) : null,
              role: "user", // Default role for new users
            },
          });
          user.id = String(newUser.id);
          user.role = newUser.role;
          user.image = newUser.image ? String(newUser.image) : null;
        } else {
          user.id = String(existingUser.id);
          user.role = existingUser.role;
          user.image = existingUser.image ? String(existingUser.image) : null;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id),
          email: token.email,
          name: token.name,
          image: token.image ? String(token.image) : null,
          role: token.role,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.email = user.email;
        token.name = user.name;
        token.image = user.image ? String(user.image) : null;
        token.role = user.role;
      }
      return token;
    },
    async redirect({ baseUrl, url }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl + (url.includes("/admin") ? "/admin" : "/");
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/auth/login",
  },
};

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string; // Add role here
  }

  interface Session {
    user: {
      id: string;
      role?: string; // Add role here
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string; // Add role to JWT token
  }
}

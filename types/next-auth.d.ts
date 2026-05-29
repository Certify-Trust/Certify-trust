import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      firstName?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    firstName?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    firstName?: string;
    userId?: string;
  }
}

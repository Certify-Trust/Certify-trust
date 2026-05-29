import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import Auth_API from "@/services/api/auth";

interface LoginResponseUser {
  _id: string;
  email: string;
  firstName: string;
}

interface AuthorizeResponse {
  id: string;
  email: string;
  firstName: string;
  accessToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials): Promise<AuthorizeResponse | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const userData = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const response = await Auth_API.loginUser(userData);

          const user: LoginResponseUser = response.data.data.returnData;

          if (!user) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            accessToken: response.data.data.authToken,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.userId = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.firstName = token.firstName;
      }

      session.accessToken = token.accessToken;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

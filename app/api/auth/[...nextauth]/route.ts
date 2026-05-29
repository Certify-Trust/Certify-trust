import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth_API from "@/services/api/auth";
import axios from "axios";

interface LoginResponseIssuer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_email_confirmed: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  has_password: boolean;
}

interface LoginResponse {
  issuer: LoginResponseIssuer;
  token: string;
  expiry: number;
}

interface AuthorizeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  accessToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<AuthorizeResponse | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await Auth_API.loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          const data: LoginResponse = response.data;

          if (!data?.issuer) throw new Error("Invalid response from server");

          return {
            id: data.issuer.id,
            email: data.issuer.email,
            firstName: data.issuer.first_name,
            lastName: data.issuer.last_name,
            phone: data.issuer.phone,
            accessToken: data.token,
          };
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed");
          }

          throw new Error("Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as AuthorizeResponse).accessToken;
        token.firstName = (user as AuthorizeResponse).firstName;
        token.lastName = (user as AuthorizeResponse).lastName;
        token.phone = (user as AuthorizeResponse).phone;
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

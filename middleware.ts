import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ["/dashboard"];
  const authRoute = "/";

  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL(authRoute, req.url));
  }

  if (token && req.nextUrl.pathname.startsWith(authRoute)) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect logged-in users away from sign-in
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};

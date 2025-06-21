import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/request-access")) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Token found, proceeding:", token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/add-product", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
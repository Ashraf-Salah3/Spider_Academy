import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CustomJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  [key: string]: unknown;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("academyToken")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/forget-password",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/",
  ];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);

    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    console.log(role);
    if (pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Token decode error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

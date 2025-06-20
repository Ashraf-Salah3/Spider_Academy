import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const  middleware = (request: NextRequest)=> {
   const token = request.cookies.get("token")?.value;
   if (!token) {

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next()
}
export const config = {
  matcher: ["/admin/:path*", "/module/:path*", "/modules", "/path/:path*", "/paths"],
};
export default middleware
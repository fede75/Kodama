import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  if (!request.auth?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = request.auth.user.role;

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/bonsais", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/bonsais/:path*", "/admin/:path*"]
};

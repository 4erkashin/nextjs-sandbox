import { type NextRequest, NextResponse } from "next/server";

function isPublic(pathname: string) {
  return pathname === "/login" || pathname === "/sign-up";
}

function isAsset(pathname: string) {
  return (
    pathname === "/mockServiceWorker.js" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/.test(pathname)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAsset(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const session = req.cookies.get("session")?.value;
  const isAuthed = !!session && session.startsWith("mock-session-");

  if (isAuthed && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthed && !isPublic(pathname)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|mockServiceWorker.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)|api).*)",
  ],
};

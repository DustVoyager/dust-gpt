import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "../constants/routes";
import { cookies } from "next/headers";
import { verify } from "../actions/sessions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname, "---------");
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = cookies().get("session")?.value;
  const session = await verify(cookie);

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 모든 페이지 경로를 처리하는 미들웨어 설정
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

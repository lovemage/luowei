import { NextResponse } from "next/server";
import { createToken, validateCredentials, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { user, password } = await request.json();

  if (!await validateCredentials(user, password)) {
    return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 });
  }

  const token = await createToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_EMAIL, ADMIN_PASSWORD, COOKIE_NAME } from "@/lib/admin-auth-config";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  if (body?.email !== ADMIN_EMAIL || body?.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  const store = await cookies();

  store.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ success: true });
}

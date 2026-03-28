import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_EMAIL, ADMIN_PASSWORD, COOKIE_NAME } from "@/lib/admin-auth-config";

export async function POST(request: Request) {
  console.log("[admin-login] called");

  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  console.log("[admin-login] email received:", body?.email ?? "(missing)");
  console.log("[admin-login] password length:", body?.password?.length ?? 0);

  if (body?.email !== ADMIN_EMAIL || body?.password !== ADMIN_PASSWORD) {
    console.log("[admin-login] failed");
    return NextResponse.json(
      { ok: false, error: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  }

  const store = await cookies();

  store.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  console.log("[admin-login] success");
  return NextResponse.json({ ok: true });
}

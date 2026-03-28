import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { ADMIN_EMAIL, ADMIN_PASSWORD, COOKIE_NAME } from "@/lib/admin-auth-config";

export type SessionPayload = {
  email: string;
  name: string;
};

const ADMIN_SESSION: SessionPayload = {
  email: ADMIN_EMAIL,
  name: "Admin"
};

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (token !== "ok") {
    return null;
  }

  return ADMIN_SESSION;
}

export async function setSessionCookie() {
  const store = await cookies();

  store.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function authenticateUser(email: string, password: string) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return ADMIN_SESSION;
  }

  return null;
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (token !== "ok") {
    return null;
  }

  return ADMIN_SESSION;
}

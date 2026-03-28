import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "ruby_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
};

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecretKey());

  return {
    sub: String(payload.sub),
    email: String(payload.email),
    name: String(payload.name)
  } satisfies SessionPayload;
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload) {
  const store = await cookies();
  const token = await createSessionToken(payload);

  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE
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
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return user;
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

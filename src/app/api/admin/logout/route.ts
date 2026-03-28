import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { COOKIE_NAME } from "@/lib/admin-auth-config";

export async function POST(request: Request) {
  const store = await cookies();
  store.delete(COOKIE_NAME);

  const redirectUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(redirectUrl);
}

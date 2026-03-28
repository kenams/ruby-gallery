"use server";

import { redirect } from "next/navigation";

import { authenticateUser, clearSessionCookie, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export type AuthActionState = {
  success: boolean;
  message?: string;
};

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Identifiants invalides"
    };
  }

  const user = await authenticateUser(parsed.data.email, parsed.data.password);

  if (!user) {
    return {
      success: false,
      message: "Email ou mot de passe incorrect"
    };
  }

  await setSessionCookie({
    sub: user.id,
    email: user.email,
    name: user.name
  });

  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

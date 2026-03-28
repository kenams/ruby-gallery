import { redirect } from "next/navigation";

import { LoginForm } from "@/components/forms/login-form";
import { getSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe8] px-5">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface rounded-[2.5rem] p-8 md:p-10">
          <p className="text-fine text-ruby/80">Administration</p>
          <h1 className="mt-5 font-display text-5xl leading-none tracking-hero text-ink">
            Un espace simple pour gerer les oeuvres de Ruby.
          </h1>
          <p className="mt-6 text-base leading-8 text-ink/70">
            Connexion securisee, gestion des prix, des statuts, des images, de l'ordre d'affichage
            et des metadonnees SEO depuis une interface volontairement claire.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

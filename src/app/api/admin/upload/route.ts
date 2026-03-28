import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { getSessionFromRequest } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 6 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "Aucun fichier recu." }, { status: 400 });
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "Le televersement local n'est pas persistant sur Vercel. Pour cette version en ligne, ajoute les images dans /public/media puis colle les chemins publics dans l'admin."
      },
      { status: 503 }
    );
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Seules les images sont autorisees." }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Chaque image doit faire moins de 6 MB." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const extension = path.extname(file.name) || ".jpg";
      const safeName = `${slugify(path.basename(file.name, extension)) || "ruby-artwork"}-${randomUUID()}${extension}`;
      const fullPath = path.join(uploadDir, safeName);

      await writeFile(fullPath, buffer);
      urls.push(`/uploads/${safeName}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Le televersement a echoue." },
      { status: 500 }
    );
  }
}

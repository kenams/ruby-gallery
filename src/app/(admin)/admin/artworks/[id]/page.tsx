import { redirect } from "next/navigation";

export default async function EditArtworkPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/admin/artworks/${id}/edit`);
}

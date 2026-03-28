"use client";

import { useActionState, useMemo, useState } from "react";
import { LoaderCircle, Trash2, Upload } from "lucide-react";
import { ArtworkStatus } from "@prisma/client";

import { saveArtworkAction, type ArtworkActionState } from "@/actions/artworks";
import { SubmitButton } from "@/components/forms/submit-button";
import { Notice } from "@/components/ui/notice";
import { formatPrice } from "@/lib/format";
import { parseImageList, slugify } from "@/lib/utils";

type ArtworkFormProps = {
  artwork?: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    altText: string;
    description: string;
    priceInCents: number;
    dimensions: string;
    year: number;
    collection: string;
    status: ArtworkStatus;
    featured: boolean;
    sortOrder: number;
    seoTitle: string | null;
    seoDescription: string | null;
    images: { url: string }[];
  };
};

const initialState: ArtworkActionState = {
  success: false
};

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const [state, formAction] = useActionState(saveArtworkAction, initialState);
  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState(artwork?.coverImage ?? "");
  const [galleryImages, setGalleryImages] = useState(() =>
    artwork
      ? artwork.images
          .map((image) => image.url)
          .filter((url) => url !== artwork.coverImage)
          .join("\n")
      : ""
  );
  const [title, setTitle] = useState(artwork?.title ?? "");
  const [priceInCents, setPriceInCents] = useState(String(artwork?.priceInCents ?? 0));
  const [status, setStatus] = useState<ArtworkStatus>(artwork?.status ?? ArtworkStatus.AVAILABLE);

  const suggestedSlug = useMemo(() => slugify(title), [title]);
  const galleryPreview = useMemo(() => parseImageList(galleryImages), [galleryImages]);

  async function uploadFiles(files: FileList | null, field: "cover" | "gallery") {
    if (!files?.length) {
      return;
    }

    setUploading(field);
    setUploadMessage(null);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setUploading(null);

    if (!response.ok || !Array.isArray(data.urls)) {
      setUploadMessage(data.error ?? "Le televersement a echoue.");
      return;
    }

    if (field === "cover") {
      setCoverImage(data.urls[0]);
      setUploadMessage("Image principale televersee avec succes.");
      return;
    }

    setGalleryImages((current) => [current, ...data.urls].filter(Boolean).join("\n"));
    setUploadMessage(`${data.urls.length} image(s) secondaire(s) ajoutee(s).`);
  }

  function removeGalleryImage(url: string) {
    setGalleryImages((current) => parseImageList(current).filter((item) => item !== url).join("\n"));
  }

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="id" value={artwork?.id ?? ""} />

      <Notice tone="info">
        Pour une mise en ligne propre, place les visuels reels dans <strong>/public/media/artworks</strong> puis colle ici les chemins publics.
      </Notice>

      <section className="admin-panel">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-fine text-ruby/80">Informations principales</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Titre, slug et presentation</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="admin-stat-card min-w-[180px] p-4">
              <p className="text-fine text-ruby/80">Slug public</p>
              <p className="mt-3 break-all text-sm text-ink/65">/gallery/{suggestedSlug || artwork?.slug || "nouvelle-oeuvre"}</p>
            </div>
            <div className="admin-stat-card min-w-[180px] p-4">
              <p className="text-fine text-ruby/80">Prix affiche</p>
              <p className="mt-3 text-sm text-ink/65">
                {formatPrice(Number(state.values?.priceInCents ?? priceInCents ?? 0))}
              </p>
            </div>
            <div className="admin-stat-card min-w-[180px] p-4">
              <p className="text-fine text-ruby/80">Statut actuel</p>
              <p className="mt-3 text-sm text-ink/65">{status}</p>
            </div>
          </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="admin-label">
          Titre
          <input
            type="text"
            name="title"
            defaultValue={artwork?.title}
            onChange={(event) => setTitle(event.target.value)}
            className="admin-input"
            required
          />
          {state.errors?.title ? <span className="text-xs text-ruby">{state.errors.title[0]}</span> : null}
        </label>

        <label className="admin-label">
          Slug
          <input
            type="text"
            name="slug"
            defaultValue={artwork?.slug ?? suggestedSlug}
            placeholder={suggestedSlug || "slug-genere-automatiquement"}
            className="admin-input"
          />
          <span className="admin-helper">Suggestion: {suggestedSlug || "slug-a-venir"}</span>
        </label>
      </div>

      <label className="admin-label mt-6">
        Description
        <textarea
          name="description"
          rows={7}
          defaultValue={artwork?.description}
          className="admin-textarea"
          required
        />
      </label>
      </section>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Visuels</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Image principale et galerie detail</h2>
        </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          <label className="admin-label">
            Image principale
            <input
              type="text"
              name="coverImage"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              className="admin-input"
              placeholder="/media/artworks/nom-de-loeuvre/cover.jpg"
              required
            />
          </label>

          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-ink/70 transition hover:border-ruby/30 hover:text-ruby">
            {uploading === "cover" ? <LoaderCircle size={16} className="animate-spin" /> : <Upload size={16} />}
            Televerser l'image principale
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadFiles(event.target.files, "cover")}
            />
          </label>

          <label className="admin-label">
            Images secondaires
            <textarea
              name="galleryImages"
              rows={5}
              value={galleryImages}
              onChange={(event) => setGalleryImages(event.target.value)}
              className="admin-textarea"
              placeholder="/media/artworks/nom-de-loeuvre/detail-1.jpg&#10;/media/artworks/nom-de-loeuvre/detail-2.jpg"
            />
            <span className="admin-helper">Une ligne par image. Les apercus ci-dessous permettent de nettoyer la galerie en un clic.</span>
          </label>

          {galleryPreview.length ? (
            <div className="grid gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-ink/40">Galerie secondaire</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {galleryPreview.map((url) => (
                  <div key={url} className="rounded-[1.4rem] border border-black/10 bg-white/78 p-3 shadow-[0_10px_24px_rgba(23,19,17,0.04)]">
                    <div className="relative overflow-hidden rounded-[1rem] border border-black/6 bg-pearl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="Vue secondaire" className="h-32 w-full object-cover" />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <p className="line-clamp-2 text-xs leading-6 text-ink/55">{url}</p>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(url)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink/55 transition hover:border-ruby/25 hover:text-ruby"
                        aria-label={`Retirer ${url} de la galerie`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-ink/70 transition hover:border-ruby/30 hover:text-ruby">
            {uploading === "gallery" ? <LoaderCircle size={16} className="animate-spin" /> : <Upload size={16} />}
            Televerser des vues detail
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => uploadFiles(event.target.files, "gallery")}
            />
          </label>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-black/6 bg-pearl shadow-[0_16px_40px_rgba(23,19,17,0.06)]">
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="Apercu de l'oeuvre" className="h-full min-h-72 w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-72 items-center justify-center text-sm text-ink/45">
              Apercu image
            </div>
          )}
        </div>
      </div>
      </section>

      <section className="admin-panel">
        <div className="mb-6">
          <p className="text-fine text-ruby/80">Vente & affichage</p>
          <h2 className="mt-4 font-display text-3xl text-ink">Prix, collection, statut et ordre</h2>
        </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <label className="admin-label">
          Prix (centimes)
          <input
            type="number"
            name="priceInCents"
            defaultValue={artwork?.priceInCents}
            onChange={(event) => setPriceInCents(event.target.value)}
            className="admin-input"
            required
          />
        </label>

        <label className="admin-label">
          Dimensions
          <input
            type="text"
            name="dimensions"
            defaultValue={artwork?.dimensions}
            className="admin-input"
            required
          />
        </label>

        <label className="admin-label">
          Annee
          <input
            type="number"
            name="year"
            defaultValue={artwork?.year}
            className="admin-input"
            required
          />
        </label>

        <label className="admin-label">
          Collection
          <input
            type="text"
            name="collection"
            defaultValue={artwork?.collection}
            className="admin-input"
            required
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <label className="admin-label">
          Statut
          <select
            name="status"
            defaultValue={artwork?.status ?? ArtworkStatus.AVAILABLE}
            onChange={(event) => setStatus(event.target.value as ArtworkStatus)}
            className="admin-select"
          >
            <option value={ArtworkStatus.AVAILABLE}>Disponible</option>
            <option value={ArtworkStatus.RESERVED}>Reservee</option>
            <option value={ArtworkStatus.SOLD}>Vendue</option>
          </select>
        </label>

        <label className="admin-label">
          Ordre
          <input
            type="number"
            name="sortOrder"
            defaultValue={artwork?.sortOrder ?? 0}
            className="admin-input"
          />
        </label>

        <label className="admin-label">
          Alt image
          <input
            type="text"
            name="altText"
            defaultValue={artwork?.altText}
            className="admin-input"
            required
          />
        </label>

        <label className="inline-flex items-center gap-3 rounded-[1.5rem] border border-black/10 bg-white/90 px-4 py-3 text-sm text-ink/80">
          <input type="checkbox" name="featured" defaultChecked={artwork?.featured} className="h-4 w-4 accent-ruby" />
          Mettre en avant
        </label>
      </div>
      </section>

      <details className="admin-panel">
        <summary className="cursor-pointer list-none text-sm font-medium text-ink">
          Options SEO avancees
        </summary>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <label className="admin-label">
            SEO title
            <input
              type="text"
              name="seoTitle"
              defaultValue={artwork?.seoTitle ?? ""}
              className="admin-input"
            />
          </label>

          <label className="admin-label">
            SEO description
            <textarea
              name="seoDescription"
              rows={4}
              defaultValue={artwork?.seoDescription ?? ""}
              className="admin-textarea"
            />
          </label>
        </div>
      </details>

      {uploadMessage ? <Notice tone={uploadMessage.includes("echoue") ? "error" : "success"}>{uploadMessage}</Notice> : null}
      {state.message ? (
        <Notice tone={state.success ? "success" : "error"}>{state.message}</Notice>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <SubmitButton variant="admin" className="min-w-[220px]">
          {artwork ? "Enregistrer les modifications" : "Creer l'oeuvre"}
        </SubmitButton>
      </div>
    </form>
  );
}

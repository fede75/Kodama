import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBonsaiForm } from "@/components/bonsais/delete-bonsai-form";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { PhotoUploadForm } from "@/components/bonsais/photo-upload-form";
import { BonsaiTimeline } from "@/components/bonsais/timeline";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth-guards";
import { getBonsaiTimeline } from "@/lib/timeline";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BonsaiDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireCurrentUser();
  const result = await getBonsaiTimeline(id, user.id);

  if (!result) {
    notFound();
  }

  const { bonsai, items } = result;
  const mainPhoto = bonsai.photos[0] ?? null;
  const photoGalleryItems = bonsai.photos.map((photo) => ({
    id: photo.id,
    bonsaiId: bonsai.id,
    imageUrl: photo.imageUrl,
    caption: photo.caption,
    isPrimary: photo.isPrimary,
    takenAt: photo.takenAt.toISOString()
  }));

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-ink-200/75 bg-paper/85 p-8 shadow-paper lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-clay-200/35 blur-3xl" />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Link href="/bonsais">
                <Button variant="secondary">Volver al listado</Button>
              </Link>
              <Link href={`/bonsais/${bonsai.id}/editar`}>
                <Button variant="secondary">Editar bonsái</Button>
              </Link>
              <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`}>
                <Button>Añadir evento</Button>
              </Link>
              <DeleteBonsaiForm bonsaiId={bonsai.id} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clay-700">
                Ficha del bonsái
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-ink-900">
                {bonsai.name}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-ink-500">
                {bonsai.species}
              </p>
            </div>

            {bonsai.notes ? (
              <p className="max-w-2xl text-base leading-8 text-ink-700">
                {bonsai.notes}
              </p>
            ) : null}

            <div className="grid gap-4 rounded-[2rem] border border-ink-200/70 bg-gradient-to-br from-ink-900 via-ink-800 to-clay-900 p-6 text-paper shadow-card sm:grid-cols-2">
              <div>
                <p className="text-sm text-paper/60">Estado</p>
                <p className="mt-1 text-lg font-semibold">{bonsai.status}</p>
              </div>
              <div>
                <p className="text-sm text-paper/60">Ubicación</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.location ?? "No indicada"}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/60">Estilo</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.style ?? "Sin definir"}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/60">Adquirido</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt) : "Sin fecha"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-clay-700">
                  Foto principal
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-700">
                  Esta imagen se usa como portada del bonsái en el listado y como
                  referencia visual principal de la ficha.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2.2rem] border border-ink-200/75 bg-white/60 shadow-paper">
              {mainPhoto ? (
                <img
                  src={mainPhoto.imageUrl}
                  alt={mainPhoto.caption ?? `Foto principal de ${bonsai.name}`}
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-end bg-gradient-to-br from-moss-100 via-paper to-clay-100 p-6">
                  <div className="rounded-full border border-clay-200 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">
                    Sin foto principal
                  </div>
                </div>
              )}
            </div>
            {mainPhoto ? (
              <div className="rounded-[1.6rem] border border-ink-200/70 bg-white/55 px-5 py-4 text-sm text-ink-700 shadow-card">
                <p className="font-semibold text-ink-950">
                  {mainPhoto.caption ?? "Foto principal del bonsái"}
                </p>
                <p className="mt-1 uppercase tracking-[0.18em] text-ink-500">
                  {formatDate(mainPhoto.takenAt)}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.35fr_0.8fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-ink-900">
              Bitácora cronológica
            </h2>
            <p className="text-sm uppercase tracking-[0.24em] text-ink-500">
              {items.length} entradas
            </p>
          </div>
          <BonsaiTimeline items={items} />
        </div>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-ink-200/75 bg-paper/85 p-6 shadow-card">
            <h2 className="font-display text-3xl text-ink-900">
              Fotos
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink-700">
              Sube imágenes de evolución para mantener un historial visual del
              árbol directamente en Vercel Blob.
            </p>
            <div className="mt-5 rounded-[1.6rem] border border-ink-200/70 bg-white/55 p-4">
              <PhotoUploadForm bonsaiId={bonsai.id} />
            </div>
            <div className="mt-4 space-y-3">
              {photoGalleryItems.length > 0 ? (
                <PhotoGallery photos={photoGalleryItems} />
              ) : (
                <p className="rounded-2xl border border-dashed border-ink-200 px-4 py-5 text-sm text-ink-600">
                  Aún no hay fotos registradas.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-ink-200/75 bg-paper/85 p-6 shadow-card">
            <h2 className="font-display text-3xl text-ink-900">
              Incidencias
            </h2>
            <div className="mt-4 space-y-3">
              {bonsai.healthIssues.length > 0 ? (
                bonsai.healthIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-900"
                  >
                    <p className="font-semibold">{issue.title}</p>
                    {issue.description ? (
                      <p className="mt-1 text-red-800">{issue.description}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-ink-200 px-4 py-5 text-sm text-ink-600">
                  Sin incidencias registradas.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

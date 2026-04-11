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
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-8 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)] lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-clay-700/18 blur-3xl" />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Link href="/bonsais">
                <Button
                  variant="secondary"
                  className="border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
                >
                  Volver
                </Button>
              </Link>
              <Link href={`/bonsais/${bonsai.id}/editar`}>
                <Button
                  variant="secondary"
                  className="border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
                >
                  Editar
                </Button>
              </Link>
              <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`}>
                <Button className="bg-moss-500 text-paper hover:bg-moss-400">
                  Añadir evento
                </Button>
              </Link>
              <DeleteBonsaiForm bonsaiId={bonsai.id} />
            </div>

            <div>
              <h1 className="font-display text-5xl leading-none text-paper">
                {bonsai.name}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-paper/42">
                {bonsai.species}
              </p>
            </div>

            {bonsai.notes ? (
              <p className="max-w-2xl text-base leading-8 text-paper/62">
                {bonsai.notes}
              </p>
            ) : null}

            <div className="grid gap-4 rounded-[2rem] border border-white/8 bg-black/30 p-6 text-paper shadow-card sm:grid-cols-2">
              <div>
                <p className="text-sm text-paper/42">Estado</p>
                <p className="mt-1 text-lg font-semibold">{bonsai.status}</p>
              </div>
              <div>
                <p className="text-sm text-paper/42">Ubicación</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.location ?? "No indicada"}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/42">Estilo</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.style ?? "Sin definir"}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/42">Adquirido</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt) : "Sin fecha"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2.2rem] border border-white/8 bg-white/[0.04] shadow-paper">
              {mainPhoto ? (
                <img
                  src={mainPhoto.imageUrl}
                  alt={mainPhoto.caption ?? `Foto principal de ${bonsai.name}`}
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-end bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-6">
                  <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper/72">
                    Sin foto
                  </div>
                </div>
              )}
            </div>
            {mainPhoto ? (
              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-paper/62 shadow-card">
                <p className="font-semibold text-paper">
                  {mainPhoto.caption ?? "Foto"}
                </p>
                <p className="mt-1 uppercase tracking-[0.18em] text-paper/38">
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
            <h2 className="font-display text-3xl text-paper">
              Bitácora
            </h2>
            <p className="text-sm uppercase tracking-[0.24em] text-paper/38">
              {items.length} entradas
            </p>
          </div>
          <BonsaiTimeline items={items} />
        </div>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-6 shadow-card">
            <h2 className="font-display text-3xl text-paper">
              Fotos
            </h2>
            <div className="mt-5 rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-4">
              <PhotoUploadForm bonsaiId={bonsai.id} />
            </div>
            <div className="mt-4 space-y-3">
              {photoGalleryItems.length > 0 ? (
                <PhotoGallery photos={photoGalleryItems} />
              ) : (
                <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-paper/62">
                  Aún no hay fotos registradas.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-6 shadow-card">
            <h2 className="font-display text-3xl text-paper">
              Incidencias
            </h2>
            <div className="mt-4 space-y-3">
              {bonsai.healthIssues.length > 0 ? (
                bonsai.healthIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-2xl border border-red-500/20 bg-red-500/12 px-4 py-3 text-sm text-red-100"
                  >
                    <p className="font-semibold">{issue.title}</p>
                    {issue.description ? (
                      <p className="mt-1 text-red-100/82">{issue.description}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-paper/62">
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

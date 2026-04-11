import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { Button } from "@/components/ui/button";
import { getPublicBonsaiDetail } from "@/lib/bonsais";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PublicBonsaiDetailPage({
  params
}: {
  params: Promise<{ userId: string; bonsaiId: string }>;
}) {
  const { userId, bonsaiId } = await params;
  const result = await getPublicBonsaiDetail(userId, bonsaiId);
  const bonsai = result?.bonsais[0];

  if (!result || !bonsai) {
    notFound();
  }

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
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)] sm:rounded-[2.5rem] sm:p-8 lg:p-10">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <Link href={`/colecciones-publicas/${userId}`} className="block sm:inline-flex">
              <Button
                variant="secondary"
                className="w-full border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper sm:w-auto"
              >
                Volver
              </Button>
            </Link>

            <div>
              <h1 className="font-display text-4xl leading-none text-paper sm:text-5xl">
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
                  className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                />
              ) : (
                <div className="flex h-[280px] items-end bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-6 sm:h-[360px] lg:h-[420px]">
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

      <section className="space-y-5 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card sm:p-6">
        <h2 className="font-display text-3xl text-paper">Fotos</h2>
        {photoGalleryItems.length > 0 ? (
          <PhotoGallery photos={photoGalleryItems} readOnly />
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-paper/62">
            Aún no hay fotos registradas.
          </p>
        )}
      </section>

      {result.showCareInPublic ? (
        <section className="space-y-5 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card sm:p-6">
          <h2 className="font-display text-3xl text-paper">Cuidados</h2>
          <CareEventsList
            bonsaiId={bonsai.id}
            items={bonsai.careEvents.map((event) => ({
              id: event.id,
              bonsaiId: bonsai.id,
              type: event.type,
              title: event.title,
              notes: event.notes,
              performedAt: event.performedAt,
              photos: event.photos
            }))}
            readOnly
          />
        </section>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { DeleteBonsaiForm } from "@/components/bonsais/delete-bonsai-form";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { PhotoUploadForm } from "@/components/bonsais/photo-upload-form";
import { TogglePanel } from "@/components/bonsais/toggle-panel";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth-guards";
import { COLLECTION_STATUS_LABELS } from "@/lib/constants";
import { getBonsaiDetail, listBonsais } from "@/lib/bonsais";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BonsaiDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireCurrentUser();
  const [bonsai, bonsais] = await Promise.all([
    getBonsaiDetail(id, user.id),
    listBonsais(user.id)
  ]);

  if (!bonsai) {
    notFound();
  }
  const mainPhoto = bonsai.photos[0] ?? null;
  const photoGalleryItems = [...bonsai.photos]
    .sort(
      (a, b) =>
        new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
    )
    .map((photo) => ({
    id: photo.id,
    bonsaiId: bonsai.id,
    imageUrl: photo.imageUrl,
    caption: photo.caption,
    isPrimary: photo.isPrimary,
    takenAt: photo.takenAt.toISOString()
  }));
  const currentIndex = bonsais.findIndex((item) => item.id === bonsai.id);
  const previousBonsai =
    currentIndex > 0 ? bonsais[currentIndex - 1] : null;
  const nextBonsai =
    currentIndex >= 0 && currentIndex < bonsais.length - 1
      ? bonsais[currentIndex + 1]
      : null;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.4rem] surface-panel p-4 sm:p-6 xl:p-7">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-clay-700/14 blur-3xl" />
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-black/20">
            {mainPhoto ? (
              <img
                src={mainPhoto.imageUrl}
                alt={mainPhoto.caption ?? `Foto principal de ${bonsai.name}`}
                className="h-[360px] w-full object-cover sm:h-[460px] xl:h-[620px]"
              />
            ) : (
              <div className="flex h-[360px] items-end bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-6 sm:h-[460px] xl:h-[620px]">
                <div className="rounded-full bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper/72">
                  Sin foto
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.5))]" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="max-w-xl rounded-[1.7rem] bg-black/36 p-5 backdrop-blur-md">
                <p className="editorial-kicker text-[10px]">Ficha</p>
                <h1 className="mt-3 font-display text-4xl leading-none text-paper sm:text-5xl xl:text-[4.6rem]">
                  {bonsai.name}
                </h1>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-paper/46">
                  {bonsai.species}
                </p>
                {bonsai.notes ? (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/62 sm:text-base">
                    {bonsai.notes}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] surface-soft p-5 sm:p-6">
              <div className="flex flex-wrap gap-3">
                <Link href="/bonsais" className="block sm:inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Volver
                  </Button>
                </Link>
                <Link href={`/bonsais/${bonsai.id}/editar`} className="block sm:inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Editar
                  </Button>
                </Link>
                <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`} className="block sm:inline-flex">
                  <Button className="w-full sm:w-auto">Añadir cuidado</Button>
                </Link>
                <DeleteBonsaiForm bonsaiId={bonsai.id} />
              </div>
            </div>

            {(previousBonsai || nextBonsai) ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {previousBonsai ? (
                  <Link href={`/bonsais/${previousBonsai.id}`} className="rounded-[1.6rem] surface-soft p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
                    <p className="editorial-kicker text-[10px]">Anterior</p>
                    <p className="mt-3 font-display text-3xl text-paper">
                      {previousBonsai.name}
                    </p>
                  </Link>
                ) : <div />}
                {nextBonsai ? (
                  <Link href={`/bonsais/${nextBonsai.id}`} className="rounded-[1.6rem] surface-soft p-4 text-right transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
                    <p className="editorial-kicker text-[10px]">Siguiente</p>
                    <p className="mt-3 font-display text-3xl text-paper">
                      {nextBonsai.name}
                    </p>
                  </Link>
                ) : null}
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">Estado</p>
                <p className="mt-3 text-lg text-paper">{bonsai.status}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">Colección</p>
                <p className="mt-3 text-lg text-paper">{COLLECTION_STATUS_LABELS[bonsai.collectionStatus]}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">Ubicación</p>
                <p className="mt-3 text-lg text-paper">{bonsai.location ?? "No indicada"}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">Estilo</p>
                <p className="mt-3 text-lg text-paper">{bonsai.style ?? "Sin definir"}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4 sm:col-span-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">Adquirido</p>
                <p className="mt-3 text-lg text-paper">
                  {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt) : "Sin fecha"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-[2.2rem] surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">Imágenes</p>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">Galería</h2>
          </div>
        </div>

        <TogglePanel buttonLabel="Añadir imagen">
          <div className="w-full rounded-[1.8rem] bg-white/[0.035] p-4">
            <PhotoUploadForm bonsaiId={bonsai.id} />
          </div>
        </TogglePanel>

        {photoGalleryItems.length > 0 ? (
          <PhotoGallery photos={photoGalleryItems} />
        ) : (
          <p className="rounded-[1.8rem] bg-white/[0.035] px-5 py-6 text-sm text-paper/56">
            Aún no hay fotos registradas.
          </p>
        )}
      </section>

      <section className="space-y-5 rounded-[2.2rem] surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">Evolución</p>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">Cuidados</h2>
          </div>
          <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`} className="block sm:inline-flex">
            <Button className="w-full sm:w-auto">Añadir cuidado</Button>
          </Link>
        </div>

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
        />
      </section>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { DeleteBonsaiForm } from "@/components/bonsais/delete-bonsai-form";
import { MainPhotoViewer } from "@/components/bonsais/main-photo-viewer";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { PhotoUploadForm } from "@/components/bonsais/photo-upload-form";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth-guards";
import { COLLECTION_STATUS_LABELS } from "@/lib/constants";
import { getBonsaiDetail, listBonsais } from "@/lib/bonsais";
import { calculateEstimatedAge, formatDate } from "@/lib/utils";

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

  const photoGalleryItems = [...bonsai.photos]
    .sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime())
    .map((photo) => ({
      id: photo.id,
      bonsaiId: bonsai.id,
      imageUrl: photo.imageUrl,
      caption: photo.caption,
      isPrimary: photo.isPrimary,
      takenAt: photo.takenAt.toISOString()
    }));

  const currentIndex = bonsais.findIndex((item) => item.id === bonsai.id);
  const previousBonsai = currentIndex > 0 ? bonsais[currentIndex - 1] : null;
  const nextBonsai =
    currentIndex >= 0 && currentIndex < bonsais.length - 1
      ? bonsais[currentIndex + 1]
      : null;
  const estimatedAge = calculateEstimatedAge(
    bonsai.acquiredAt,
    bonsai.ageAtAcquisitionYears
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[1.35fr_0.84fr]">
        <div className="relative overflow-hidden rounded-[2.6rem] border border-white/6 bg-black/20">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.12))]" />
          <div className="pointer-events-none absolute left-8 top-8 z-10 rounded-full bg-black/32 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/68 backdrop-blur-sm">
            Ejemplar
          </div>
          <div className="overflow-hidden rounded-[2.6rem]">
            <MainPhotoViewer
              imageUrl={photoGalleryItems[0]?.imageUrl ?? null}
              alt={photoGalleryItems[0]?.caption ?? `Foto principal de ${bonsai.name}`}
              caption={photoGalleryItems[0]?.caption}
              takenAt={photoGalleryItems[0]?.takenAt}
            />
          </div>

          {(previousBonsai || nextBonsai) ? (
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              {previousBonsai ? (
                <Link
                  href={`/bonsais/${previousBonsai.id}`}
                  className="rounded-[1.4rem] bg-black/38 px-4 py-3 text-left backdrop-blur-sm transition hover:bg-black/50"
                >
                  <p className="metadata-label">Anterior</p>
                  <p className="mt-2 font-display text-2xl text-paper">
                    {previousBonsai.name}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextBonsai ? (
                <Link
                  href={`/bonsais/${nextBonsai.id}`}
                  className="ml-auto rounded-[1.4rem] bg-black/38 px-4 py-3 text-right backdrop-blur-sm transition hover:bg-black/50"
                >
                  <p className="metadata-label">Siguiente</p>
                  <p className="mt-2 font-display text-2xl text-paper">
                    {nextBonsai.name}
                  </p>
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-8 py-2">
          <div className="space-y-6">
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

            <div>
              <p className="editorial-kicker text-[10px]">Ficha del ejemplar</p>
              <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] text-paper">
                {bonsai.name}
              </h1>
              <p className="mt-4 text-[1.06rem] text-paper/56">{bonsai.species}</p>
              {bonsai.notes ? (
                <p className="mt-6 max-w-2xl text-[1.04rem] leading-8 text-paper/72">
                  {bonsai.notes}
                </p>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-white/6 bg-white/[0.02] px-5 py-6">
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <div>
                  <p className="metadata-label">Estado</p>
                  <p className="mt-2 text-[1.05rem] text-paper">{bonsai.status}</p>
                </div>
                <div>
                  <p className="metadata-label">Colección</p>
                  <p className="mt-2 text-[1.05rem] text-paper">
                    {COLLECTION_STATUS_LABELS[bonsai.collectionStatus]}
                  </p>
                </div>
                <div>
                  <p className="metadata-label">Ubicación</p>
                  <p className="mt-2 text-[1.05rem] text-paper">
                    {bonsai.location ?? "No indicada"}
                  </p>
                </div>
                <div>
                  <p className="metadata-label">Estilo</p>
                  <p className="mt-2 text-[1.05rem] text-paper">
                    {bonsai.style ?? "Sin definir"}
                  </p>
                </div>
                <div>
                  <p className="metadata-label">Edad estimada</p>
                  <p className="mt-2 text-[1.05rem] text-paper">
                    {estimatedAge != null ? `${estimatedAge} años` : "No disponible"}
                  </p>
                </div>
                <div>
                  <p className="metadata-label">Adquirido</p>
                  <p className="mt-2 text-[1.05rem] text-paper">
                    {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt) : "Sin fecha"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-etched rounded-[2rem] px-5 py-5">
            <p className="metadata-label">Cuaderno</p>
            <p className="mt-3 max-w-lg text-[0.98rem] leading-7 text-paper/58">
              Esta página reúne identidad, evolución y memoria visual del árbol
              como si fuera una entrada de catálogo de la colección.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.32fr_0.8fr] xl:items-start">
        <div className="space-y-5">
          <div>
            <p className="editorial-kicker text-xs">Imágenes</p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] text-paper">
              Evolución fotográfica
            </h2>
          </div>

          {photoGalleryItems.length > 0 ? (
            <PhotoGallery photos={photoGalleryItems} />
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/10 px-6 py-10 text-paper/56">
              Aún no hay fotos registradas.
            </div>
          )}
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <div className="surface-panel rounded-[2.1rem] p-5 sm:p-6">
            <p className="editorial-kicker text-xs">Añadir imagen</p>
            <p className="mt-3 text-[0.98rem] leading-7 text-paper/58">
              Amplía la memoria visual del árbol con nuevas fotografías de evolución.
            </p>
            <div className="mt-5">
              <PhotoUploadForm bonsaiId={bonsai.id} />
            </div>
          </div>

          <div className="surface-etched rounded-[2rem] px-5 py-5">
            <p className="metadata-label">Imagen principal</p>
            <p className="mt-3 text-sm leading-7 text-paper/54">
              La imagen principal actúa como portada del ejemplar en la colección.
            </p>
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">Evolución</p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] text-paper">
              Historia de cuidados
            </h2>
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

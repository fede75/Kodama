import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { DeleteBonsaiForm } from "@/components/bonsais/delete-bonsai-form";
import { MainPhotoViewer } from "@/components/bonsais/main-photo-viewer";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { PhotoUploadForm } from "@/components/bonsais/photo-upload-form";
import { TogglePanel } from "@/components/bonsais/toggle-panel";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth-guards";
import { getBonsaiDetail, listBonsais } from "@/lib/bonsais";
import {
  getCollectionStatusLabel,
  getDictionary,
  getIntlLocale,
  getLocale
} from "@/lib/i18n";
import { calculateEstimatedAge, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BonsaiDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const intlLocale = getIntlLocale(locale);
  const user = await requireCurrentUser();
  const [bonsai, bonsais] = await Promise.all([
    getBonsaiDetail(id, user.id),
    listBonsais(user.id)
  ]);

  if (!bonsai) {
    notFound();
  }
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
  const estimatedAge = calculateEstimatedAge(
    bonsai.acquiredAt,
    bonsai.ageAtAcquisitionYears
  );
  const previousBonsai =
    currentIndex > 0 ? bonsais[currentIndex - 1] : null;
  const nextBonsai =
    currentIndex >= 0 && currentIndex < bonsais.length - 1
      ? bonsais[currentIndex + 1]
      : null;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] surface-panel p-4 sm:p-5 xl:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-clay-700/14 blur-3xl" />
        <div className="grid gap-5 2xl:grid-cols-[1.35fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-black/20">
            <MainPhotoViewer
              imageUrl={photoGalleryItems[0]?.imageUrl ?? null}
              alt={photoGalleryItems[0]?.caption ?? `${dict.common.photos} · ${bonsai.name}`}
              caption={photoGalleryItems[0]?.caption}
              takenAt={photoGalleryItems[0]?.takenAt}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] surface-soft p-5 sm:p-6">
              <div className="flex flex-wrap gap-3">
                <Link href="/bonsais" className="block sm:inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {dict.common.back}
                  </Button>
                </Link>
                <Link href={`/bonsais/${bonsai.id}/editar`} className="block sm:inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {dict.common.edit}
                  </Button>
                </Link>
                <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`} className="block sm:inline-flex">
                  <Button className="w-full sm:w-auto">{dict.common.addCare}</Button>
                </Link>
                <DeleteBonsaiForm bonsaiId={bonsai.id} />
              </div>
            </div>

            <div>
              <p className="editorial-kicker text-[10px]">{dict.common.collectionSheet}</p>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-none text-paper">
                {bonsai.name}
              </h1>
              <p className="mt-3 text-[1rem] text-paper/56">
                {bonsai.species}
              </p>
              {bonsai.notes ? (
                <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-paper/72 sm:text-[1.04rem]">
                  {bonsai.notes}
                </p>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.state}</p>
                <p className="mt-3 text-[1.02rem] text-paper">{bonsai.status}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.collection}</p>
                <p className="mt-3 text-[1.02rem] text-paper">{getCollectionStatusLabel(locale, bonsai.collectionStatus)}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.location}</p>
                <p className="mt-3 text-[1.02rem] text-paper">{bonsai.location ?? dict.common.notIndicated}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.style}</p>
                <p className="mt-3 text-[1.02rem] text-paper">{bonsai.style ?? dict.common.notDefined}</p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.estimatedAge}</p>
                <p className="mt-3 text-[1.02rem] text-paper">
                  {estimatedAge != null ? `${estimatedAge} ${dict.common.years}` : dict.common.unavailable}
                </p>
              </div>
              <div className="rounded-[1.6rem] surface-soft p-4 sm:col-span-2">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">{dict.common.acquired}</p>
                <p className="mt-3 text-[1.02rem] text-paper">
                  {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt, intlLocale) : dict.common.noDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {(previousBonsai || nextBonsai) ? (
          <div className="mt-5 grid gap-3 border-t border-white/8 pt-5 xl:grid-cols-2">
            {previousBonsai ? (
              <Link
                href={`/bonsais/${previousBonsai.id}`}
                className="group flex items-center gap-4 rounded-[1.6rem] surface-soft p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-xl text-paper/82 transition group-hover:bg-white/[0.1]">
                  &lt;
                </span>
                <div>
                  <p className="editorial-kicker text-[10px]">{dict.common.previous}</p>
                  <p className="mt-2 font-display text-3xl text-paper">
                    {previousBonsai.name}
                  </p>
                </div>
              </Link>
            ) : <div />}
            {nextBonsai ? (
              <Link
                href={`/bonsais/${nextBonsai.id}`}
                className="group flex items-center justify-end gap-4 rounded-[1.6rem] surface-soft p-4 text-right transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <div>
                  <p className="editorial-kicker text-[10px]">{dict.common.next}</p>
                  <p className="mt-2 font-display text-3xl text-paper">
                    {nextBonsai.name}
                  </p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-xl text-paper/82 transition group-hover:bg-white/[0.1]">
                  &gt;
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="space-y-5 rounded-[2.2rem] surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">{dict.common.photos}</p>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">{dict.common.gallery}</h2>
          </div>
        </div>

        <TogglePanel buttonLabel={dict.common.addImage}>
          <div className="w-full rounded-[1.8rem] bg-white/[0.035] p-4">
            <PhotoUploadForm bonsaiId={bonsai.id} />
          </div>
        </TogglePanel>

        {photoGalleryItems.length > 0 ? (
          <PhotoGallery photos={photoGalleryItems} />
        ) : (
          <p className="rounded-[1.8rem] bg-white/[0.035] px-5 py-6 text-sm text-paper/56">
            {dict.common.noPhotosYet}
          </p>
        )}
      </section>

      <section className="space-y-5 rounded-[2.2rem] surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">{dict.common.timeline}</p>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">{dict.common.care}</h2>
          </div>
          <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`} className="block sm:inline-flex">
            <Button className="w-full sm:w-auto">{dict.common.addCare}</Button>
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
          locale={locale}
        />
      </section>
    </div>
  );
}

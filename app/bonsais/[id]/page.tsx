import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { DeleteBonsaiForm } from "@/components/bonsais/delete-bonsai-form";
import { MainPhotoViewer } from "@/components/bonsais/main-photo-viewer";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { PhotoUploadForm } from "@/components/bonsais/photo-upload-form";
import { TogglePanel } from "@/components/bonsais/toggle-panel";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { requireCurrentUser } from "@/lib/auth-guards";
import { getBonsaiDetail, listBonsais } from "@/lib/bonsais";
import {
  getCollectionStatusLabel,
  getDictionary,
  getIntlLocale
} from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { findSpeciesForDisplay } from "@/lib/species";
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

  const speciesReference = await findSpeciesForDisplay(bonsai.species, locale);

  return (
    <div className="space-y-7">
      {(previousBonsai || nextBonsai) && (
        <nav className="flex items-center justify-between gap-4 text-[0.95rem] text-paper/58" aria-label="Navegación entre bonsáis">
          <div className="min-w-0">
            {previousBonsai ? (
              <Link
                href={`/bonsais/${previousBonsai.id}`}
                className="inline-flex items-center gap-2 transition hover:text-paper"
                title={`${dict.common.previous}: ${previousBonsai.name}`}
              >
                <AppIcon name="arrow-left" className="h-[1.05rem] w-[1.05rem]" />
                <span className="truncate">{previousBonsai.name}</span>
              </Link>
            ) : null}
          </div>
          <div className="min-w-0 text-right">
            {nextBonsai ? (
              <Link
                href={`/bonsais/${nextBonsai.id}`}
                className="inline-flex items-center gap-2 transition hover:text-paper"
                title={`${dict.common.next}: ${nextBonsai.name}`}
              >
                <span className="truncate">{nextBonsai.name}</span>
                <AppIcon name="arrow-left" className="h-[1.05rem] w-[1.05rem] rotate-180" />
              </Link>
            ) : null}
          </div>
        </nav>
      )}

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
            <div>
              <p className="editorial-kicker text-[10px]">{dict.common.collectionSheet}</p>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-none text-paper">
                {bonsai.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <p className="text-[1rem] text-paper/56">
                  {bonsai.species}
                </p>
                <Link
                  href={`/bonsais/${bonsai.id}/editar`}
                  className="inline-flex items-center justify-center text-paper/62 transition hover:text-paper"
                  aria-label={dict.common.edit}
                  title={dict.common.edit}
                >
                  <AppIcon name="edit" className="h-[1.55rem] w-[1.55rem]" />
                </Link>
                <DeleteBonsaiForm bonsaiId={bonsai.id} iconOnly />
                {speciesReference ? (
                  <Link
                    href={`/especies/${speciesReference.slug}`}
                    className="inline-flex items-center justify-center text-paper/60 transition hover:text-paper"
                    title={locale === "es" ? "Ver ficha de la especie" : locale === "en" ? "View species record" : "樹種情報を見る"}
                    aria-label={locale === "es" ? "Ver ficha de la especie" : locale === "en" ? "View species record" : "樹種情報を見る"}
                  >
                    <AppIcon name="info" className="h-[1.65rem] w-[1.65rem]" />
                  </Link>
                ) : null}
              </div>
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

      </section>

      <section className="space-y-5 rounded-[2.2rem] surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">{dict.common.photos}</p>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">{dict.common.gallery}</h2>
          </div>
          <TogglePanel
            buttonLabel={dict.common.addImage}
            buttonClassName="w-full border-moss-500/30 bg-[linear-gradient(135deg,rgba(129,165,85,0.96),rgba(72,95,49,0.96))] text-paper hover:border-moss-400/40 hover:bg-[linear-gradient(135deg,rgba(139,178,91,0.98),rgba(79,104,54,0.98))] sm:w-auto"
            buttonIcon={<AppIcon name="plus" className="h-[0.95rem] w-[0.95rem]" />}
          >
            <div className="w-full rounded-[1.8rem] bg-white/[0.035] p-4">
              <PhotoUploadForm bonsaiId={bonsai.id} />
            </div>
          </TogglePanel>
        </div>

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
            <Button className="w-full sm:w-auto">
              <AppIcon name="plus" className="h-[0.95rem] w-[0.95rem]" />
              {dict.common.addCare}
            </Button>
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

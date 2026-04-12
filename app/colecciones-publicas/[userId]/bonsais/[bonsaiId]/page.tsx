import Link from "next/link";
import { notFound } from "next/navigation";
import { CareEventsList } from "@/components/bonsais/care-events-list";
import { PhotoGallery } from "@/components/bonsais/photo-gallery";
import { CommentsSection } from "@/components/social/comments-section";
import { VoteForm } from "@/components/social/vote-form";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { getCurrentUser } from "@/lib/auth-guards";
import { getPublicBonsaiDetail } from "@/lib/bonsais";
import {
  getCollectionStatusLabel,
  getDictionary,
  getIntlLocale,
  replaceTemplate
} from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { findSpeciesForDisplay } from "@/lib/species";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PublicBonsaiDetailPage({
  params
}: {
  params: Promise<{ userId: string; bonsaiId: string }>;
}) {
  const { userId, bonsaiId } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const intlLocale = getIntlLocale(locale);
  const currentUser = await getCurrentUser();
  const result = await getPublicBonsaiDetail(userId, bonsaiId, currentUser?.id);
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

  const speciesReference = await findSpeciesForDisplay(bonsai.species, locale);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-4 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)] sm:rounded-[2.5rem] sm:p-6 lg:p-8">
        <div className="grid gap-6 2xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <Link href={`/colecciones-publicas/${userId}`} className="block sm:inline-flex">
              <Button
                variant="secondary"
                className="w-full border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper sm:w-auto"
                aria-label={dict.common.back}
              >
                <AppIcon name="arrow-left" className="h-[1rem] w-[1rem]" />
              </Button>
            </Link>

            <div>
              <h1 className="font-display text-[clamp(2.2rem,6vw,3rem)] leading-none text-paper">
                {bonsai.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <p className="text-[1rem] text-paper/56">
                  {bonsai.species}
                </p>
                {speciesReference ? (
                  <Link
                    href={`/especies/${speciesReference.slug}`}
                    className="inline-flex items-center justify-center text-paper/60 transition hover:text-paper"
                    title={locale === "es" ? "Ver ficha de la especie" : locale === "en" ? "View species record" : "樹種情報を見る"}
                    aria-label={locale === "es" ? "Ver ficha de la especie" : locale === "en" ? "View species record" : "樹種情報を見る"}
                  >
                    <AppIcon name="info" className="h-[1.1rem] w-[1.1rem]" />
                  </Link>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {currentUser ? (
                  <VoteForm
                    bonsaiId={bonsai.id}
                    ownerId={result.id}
                    voted={bonsai.votes.length > 0}
                    voteCount={bonsai._count.votes}
                    locale={locale}
                  />
                ) : (
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-paper/70">
                    {bonsai._count.votes} {dict.common.votes}
                  </div>
                )}
                <Link
                  href={`/colecciones-publicas/${result.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-paper/78 transition hover:bg-white/[0.08]"
                >
                  {replaceTemplate(dict.publicBonsaiDetail.viewCollectionOf, {
                    name:
                      result.name ??
                      (locale === "es"
                        ? "este usuario"
                        : locale === "en"
                          ? "this user"
                          : "このユーザー")
                  })}
                </Link>
              </div>
            </div>

            {bonsai.notes ? (
              <p className="max-w-2xl text-base leading-8 text-paper/62">
                {bonsai.notes}
              </p>
            ) : null}

            <div className="grid gap-4 rounded-[2rem] border border-white/8 bg-black/30 p-5 text-paper shadow-card md:grid-cols-2 sm:p-6">
              <div>
                <p className="text-sm text-paper/42">{dict.common.state}</p>
                <p className="mt-1 text-lg font-semibold">{bonsai.status}</p>
              </div>
              <div>
                <p className="text-sm text-paper/42">{dict.common.collection}</p>
                <p className="mt-1 text-lg font-semibold">
                  {getCollectionStatusLabel(locale, bonsai.collectionStatus)}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/42">{dict.common.location}</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.location ?? dict.common.notIndicated}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/42">{dict.common.style}</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.style ?? dict.common.notDefined}
                </p>
              </div>
              <div>
                <p className="text-sm text-paper/42">{dict.common.acquired}</p>
                <p className="mt-1 text-lg font-semibold">
                  {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt, intlLocale) : dict.common.noDate}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2.2rem] border border-white/8 bg-white/[0.04] shadow-paper">
              {mainPhoto ? (
                <img
                  src={mainPhoto.imageUrl}
                  alt={mainPhoto.caption ?? `${dict.common.photos} · ${bonsai.name}`}
                  className="h-[clamp(16rem,42vw,26rem)] w-full object-cover"
                />
              ) : (
                <div className="flex h-[clamp(16rem,42vw,26rem)] items-end bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-6">
                  <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper/72">
                    {dict.common.noPhoto}
                  </div>
                </div>
              )}
            </div>
            {mainPhoto ? (
              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-paper/62 shadow-card">
                <p className="font-semibold text-paper">
                  {mainPhoto.caption ?? dict.publicBonsaiDetail.photo}
                </p>
                <p className="mt-1 uppercase tracking-[0.18em] text-paper/38">
                  {formatDate(mainPhoto.takenAt, intlLocale)}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card sm:p-6">
        <h2 className="font-display text-3xl text-paper">{dict.common.photos}</h2>
        {photoGalleryItems.length > 0 ? (
          <PhotoGallery photos={photoGalleryItems} readOnly />
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-paper/62">
            {dict.common.noPhotosYet}
          </p>
        )}
      </section>

      {result.showCareInPublic ? (
        <section className="space-y-5 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card sm:p-6">
          <h2 className="font-display text-3xl text-paper">{dict.publicBonsaiDetail.careSection}</h2>
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
            locale={locale}
          />
        </section>
      ) : null}

      <CommentsSection
        bonsaiId={bonsai.id}
        ownerId={result.id}
        currentUserId={currentUser?.id}
        comments={bonsai.comments}
        locale={locale}
      />
    </div>
  );
}

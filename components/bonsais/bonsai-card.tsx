import Link from "next/link";
import { getCareEventLabel, getCollectionStatusLabel, getDictionary, getIntlLocale, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type BonsaiCardProps = {
  bonsai: {
    id: string;
    name: string;
    species: string;
    style: string | null;
    location: string | null;
    status: string;
    collectionStatus: "ACTIVE" | "DECEASED" | "SOLD" | "GIFTED" | "OTHER";
    photos: Array<{
      id: string;
      imageUrl: string;
      caption: string | null;
      isPrimary: boolean;
    }>;
    careEvents: Array<{
      type: "WATERING" | "FERTILIZING" | "PRUNING" | "PINCHING" | "REPOTTING" | "WIRING" | "DEFOLIATION" | "PEST_TREATMENT";
      performedAt: Date;
    }>;
    _count: {
      careEvents: number;
      photos: number;
      votes: number;
      comments: number;
    };
  };
  href?: string;
  locale: Locale;
  footerAction?: React.ReactNode;
};

export function BonsaiCard({
  bonsai,
  href = `/bonsais/${bonsai.id}`,
  locale,
  footerAction
}: BonsaiCardProps) {
  const latestCare = bonsai.careEvents[0];
  const coverPhoto = bonsai.photos[0];
  const isInactive = bonsai.collectionStatus !== "ACTIVE";
  const dict = getDictionary(locale);
  const intlLocale = getIntlLocale(locale);

  return (
    <article className="group relative overflow-hidden rounded-[2.2rem] surface-panel p-4 transition duration-500 hover:-translate-y-1.5 sm:p-5">
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-clay-700/15 blur-3xl transition duration-500 group-hover:bg-clay-600/24" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%)]" />

      <Link href={href} className="block">
        <div className="grid gap-4 md:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr] md:items-stretch">
          {coverPhoto ? (
            <div className="order-1 overflow-hidden rounded-[1.7rem] bg-black/20 sm:h-full">
              <img
                src={coverPhoto.imageUrl}
                alt={coverPhoto.caption ?? `${dict.common.photos} · ${bonsai.name}`}
                className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="order-1 flex items-end overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-4 sm:h-full">
              <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-paper/72">
                {dict.common.noPhoto}
              </div>
            </div>
          )}

          <div className="order-2 flex min-h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.6rem)] leading-none text-paper">
                  {bonsai.name}
                </p>
                <p className="mt-3 text-[0.98rem] text-paper/52">
                  {bonsai.species}
                </p>
              </div>
              {isInactive ? (
                <span className="shrink-0 rounded-full bg-clay-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-200">
                  {getCollectionStatusLabel(locale, bonsai.collectionStatus)}
                </span>
              ) : null}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                  {dict.common.state}
                </p>
                <p className="text-[0.98rem] text-paper/80">{bonsai.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                  {dict.common.location}
                </p>
                <p className="text-[0.98rem] text-paper/80">{bonsai.location ?? dict.common.notIndicated}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                  {dict.common.style}
                </p>
                <p className="text-[0.98rem] text-paper/80">{bonsai.style ?? dict.common.notDefined}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                  {dict.card.latestCare}
                </p>
                <p className="text-[0.98rem] text-paper/80">
                  {latestCare
                    ? `${getCareEventLabel(locale, latestCare.type)} · ${formatDate(latestCare.performedAt, intlLocale)}`
                    : dict.card.notYetRecorded}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-paper/42">
        <span>{bonsai._count.votes} {dict.common.votes}</span>
        <span>{bonsai._count.comments} {dict.common.messages}</span>
        <span>{bonsai._count.careEvents} {dict.common.care.toLowerCase()}</span>
        <span>{bonsai._count.photos} {dict.common.photos.toLowerCase()}</span>
        {footerAction ? <div className="ml-auto normal-case tracking-normal text-paper">{footerAction}</div> : null}
      </div>
    </article>
  );
}

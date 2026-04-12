import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export function FeaturedBonsaiCard({
  bonsai,
  rank,
  rangeLabel,
  locale
}: {
  bonsai: {
    id: string;
    name: string;
    species: string;
    voteCount: number;
    user: {
      id: string;
      name: string | null;
      collectionLocation: string | null;
    };
    photos: Array<{
      id: string;
      imageUrl: string;
      caption: string | null;
    }>;
    _count: {
      comments: number;
    };
  };
  rank?: number;
  rangeLabel?: string;
  locale: Locale;
}) {
  const photo = bonsai.photos[0] ?? null;
  const dict = getDictionary(locale);

  return (
    <article className="group relative overflow-hidden rounded-[2.2rem] surface-panel p-4 transition duration-500 hover:-translate-y-1.5 sm:p-5">
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-moss-700/16 blur-3xl transition duration-500 group-hover:bg-moss-600/24" />
      <div className="grid gap-4 md:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr] md:items-stretch">
        {photo ? (
          <div className="overflow-hidden rounded-[1.7rem] bg-black/20">
            <img
              src={photo.imageUrl}
              alt={photo.caption ?? `${dict.common.photos} · ${bonsai.name}`}
              className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex items-end overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-4">
            <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-paper/72">
              {dict.common.noPhoto}
            </div>
          </div>
        )}

        <div className="flex min-h-full flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {rank ? (
                <span className="rounded-full bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-moss-100">
                  #{rank}
                </span>
              ) : null}
              {rangeLabel ? (
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-paper/60">
                  {rangeLabel}
                </span>
              ) : null}
            </div>

            <Link
              href={`/colecciones-publicas/${bonsai.user.id}/bonsais/${bonsai.id}`}
              className="mt-4 inline-flex"
            >
              <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] leading-none text-paper transition hover:text-moss-200">
                {bonsai.name}
              </h2>
            </Link>
            <p className="mt-3 text-[0.98rem] text-paper/54">{bonsai.species}</p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                {locale === "es" ? "Votos" : locale === "en" ? "Votes" : "投票"}
              </p>
              <p className="text-[0.98rem] text-paper/82">{bonsai.voteCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                {dict.common.comments}
              </p>
              <p className="text-[0.98rem] text-paper/82">{bonsai._count.comments}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                {dict.common.collection}
              </p>
              <Link
                href={`/colecciones-publicas/${bonsai.user.id}`}
                className="text-[0.98rem] text-paper/82 underline-offset-4 transition hover:text-moss-200 hover:underline"
              >
                {bonsai.user.name ?? (locale === "es" ? "Usuario Kodama" : locale === "en" ? "Kodama user" : "Kodama ユーザー")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

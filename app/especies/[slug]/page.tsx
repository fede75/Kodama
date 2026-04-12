import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppIcon, IconBadge } from "@/components/ui/icon";
import { getCurrentUser } from "@/lib/auth-guards";
import { getLocale } from "@/lib/i18n-server";
import { getSpeciesBySlug } from "@/lib/species";

export const dynamic = "force-dynamic";

function getMonthFormatter(locale: string) {
  const intlLocale =
    locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "ja-JP";

  return new Intl.DateTimeFormat(intlLocale, { month: "long" });
}

function formatMonths(months: unknown, locale: string) {
  if (!Array.isArray(months) || months.length === 0) {
    return null;
  }

  const formatter = getMonthFormatter(locale);

  return months
    .filter((month): month is number => typeof month === "number" && month >= 1 && month <= 12)
    .map((month) => formatter.format(new Date(Date.UTC(2024, month - 1, 1))))
    .join(", ");
}

function formatCadence(
  days: number | null | undefined,
  locale: string
) {
  if (days == null) {
    return null;
  }

  if (locale === "es") {
    return `Cada ${days} días`;
  }

  if (locale === "en") {
    return `Every ${days} days`;
  }

  return `${days}日ごと`;
}

function formatWateringFrequency(
  value: unknown,
  locale: string
) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const entries = [
    ["spring", locale === "es" ? "Primavera" : locale === "en" ? "Spring" : "春"],
    ["summer", locale === "es" ? "Verano" : locale === "en" ? "Summer" : "夏"],
    ["autumn", locale === "es" ? "Otoño" : locale === "en" ? "Autumn" : "秋"],
    ["winter", locale === "es" ? "Invierno" : locale === "en" ? "Winter" : "冬"]
  ] as const;

  const record = value as Record<string, unknown>;
  const chunks = entries
    .map(([key, label]) => {
      const days = record[key];

      if (typeof days !== "number") {
        return null;
      }

      if (locale === "es") {
        return `${label}: cada ${days} días`;
      }

      if (locale === "en") {
        return `${label}: every ${days} days`;
      }

      return `${label}: ${days}日ごと`;
    })
    .filter(Boolean);

  return chunks.length > 0 ? chunks.join(" · ") : null;
}

export default async function SpeciesDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const user = await getCurrentUser();
  const species = await getSpeciesBySlug(slug, locale);

  if (!species) {
    notFound();
  }

  const translation = species.translations[0];

  return (
    <div className="space-y-8">
      <section className="rounded-[2.4rem] surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="editorial-kicker text-xs">
              {locale === "es" ? "Ficha de especie" : locale === "en" ? "Species record" : "樹種カード"}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-paper">
              {translation?.commonName ?? species.slug}
            </h1>
            <p className="mt-4 text-base uppercase tracking-[0.16em] text-paper/42">
              {translation?.scientificName ?? species.slug}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/especies" className="inline-flex">
              <Button variant="secondary" aria-label={locale === "es" ? "Volver" : locale === "en" ? "Back" : "戻る"}>
                <AppIcon name="arrow-left" className="h-[1.05rem] w-[1.05rem]" />
              </Button>
            </Link>
            {user?.role === "ADMIN" ? (
              <Link href={`/especies?species=${species.slug}`} className="inline-flex">
                <Button variant="secondary">
                  <AppIcon name="edit" className="h-[1.05rem] w-[1.05rem]" />
                  {locale === "es" ? "Editar" : locale === "en" ? "Edit" : "編集"}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] surface-soft p-6">
          <h2 className="font-display text-3xl text-paper">
            {locale === "es" ? "Condiciones base" : locale === "en" ? "Core conditions" : "基本条件"}
          </h2>
          <div className="mt-5 space-y-4 text-paper/70">
            <div className="flex gap-4">
              <IconBadge name="map-pin" className="mt-1 shrink-0" />
              <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper/36">
                {locale === "es" ? "Ubicación" : locale === "en" ? "Placement" : "置き場所"}
              </p>
              <p className="mt-2 text-base text-paper">
                {translation?.placementNotes ?? "—"}
              </p>
              </div>
            </div>
            <div className="flex gap-4">
              <IconBadge name="thermometer" className="mt-1 shrink-0" />
              <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper/36">
                {locale === "es" ? "Temperatura" : locale === "en" ? "Temperature" : "温度"}
              </p>
              <p className="mt-2 text-base text-paper">
                {translation?.temperatureNotes ?? "—"}
              </p>
              <p className="mt-2 text-sm text-paper/48">
                {species.minTemperatureC ?? "—"}° / {species.maxTemperatureC ?? "—"}°
              </p>
              </div>
            </div>
            <div className="flex gap-4">
              <IconBadge name="layers" className="mt-1 shrink-0" />
              <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper/36">
                {locale === "es" ? "Sustrato" : locale === "en" ? "Substrate" : "用土"}
              </p>
              <p className="mt-2 text-base text-paper">
                {translation?.substrateNotes ?? "—"}
              </p>
              </div>
            </div>
          </div>
        </article>

        <article className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: "droplets" as const,
              title: locale === "es" ? "Riego" : locale === "en" ? "Watering" : "水やり",
              notes: translation?.wateringNotes,
              meta: formatWateringFrequency(species.wateringFrequencyDays, locale)
            },
            {
              icon: "leaf" as const,
              title: locale === "es" ? "Abonado" : locale === "en" ? "Fertilizing" : "施肥",
              notes: translation?.fertilizingNotes,
              meta: [
                formatMonths(species.fertilizingActiveMonths, locale)
                  ? locale === "es"
                    ? `Meses recomendados: ${formatMonths(species.fertilizingActiveMonths, locale)}`
                    : locale === "en"
                      ? `Recommended months: ${formatMonths(species.fertilizingActiveMonths, locale)}`
                      : `推奨時期: ${formatMonths(species.fertilizingActiveMonths, locale)}`
                  : null,
                formatCadence(species.fertilizingFrequencyDays, locale)
              ].filter(Boolean).join(" · ")
            },
            {
              icon: "scissors" as const,
              title: locale === "es" ? "Poda" : locale === "en" ? "Pruning" : "剪定",
              notes: translation?.pruningNotes,
              meta: [
                formatMonths(species.pruningActiveMonths, locale)
                  ? locale === "es"
                    ? `Meses recomendados: ${formatMonths(species.pruningActiveMonths, locale)}`
                    : locale === "en"
                      ? `Recommended months: ${formatMonths(species.pruningActiveMonths, locale)}`
                      : `推奨時期: ${formatMonths(species.pruningActiveMonths, locale)}`
                  : null,
                formatCadence(species.pruningFrequencyDays, locale)
              ].filter(Boolean).join(" · ")
            },
            {
              icon: "shovel" as const,
              title: locale === "es" ? "Trasplante" : locale === "en" ? "Repotting" : "植え替え",
              notes: translation?.repottingNotes,
              meta: [
                formatMonths(species.repottingActiveMonths, locale)
                  ? locale === "es"
                    ? `Meses recomendados: ${formatMonths(species.repottingActiveMonths, locale)}`
                    : locale === "en"
                      ? `Recommended months: ${formatMonths(species.repottingActiveMonths, locale)}`
                      : `推奨時期: ${formatMonths(species.repottingActiveMonths, locale)}`
                  : null,
                formatCadence(species.repottingFrequencyDays, locale)
              ].filter(Boolean).join(" · ")
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[1.8rem] surface-soft p-5">
              <div className="flex items-center gap-3">
                <IconBadge name={item.icon} iconClassName="h-[1.5rem] w-[1.5rem]" />
                <p className="font-display text-2xl text-paper">{item.title}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-paper/62">{item.notes ?? "—"}</p>
              {item.meta ? (
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-paper/36">
                  {item.meta}
                </p>
              ) : null}
            </div>
          ))}
        </article>
      </section>
    </div>
  );
}

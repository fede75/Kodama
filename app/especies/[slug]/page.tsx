import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";
import { getLocale } from "@/lib/i18n-server";
import { getSpeciesBySlug } from "@/lib/species";

export const dynamic = "force-dynamic";

function formatMonths(months: unknown) {
  if (!Array.isArray(months) || months.length === 0) {
    return null;
  }

  return months.join(", ");
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
              <Button variant="secondary">←</Button>
            </Link>
            {user?.role === "ADMIN" ? (
              <a href={`/admin?species=${species.slug}`} className="inline-flex">
                <Button variant="secondary">
                  {locale === "es" ? "Editar JSON" : locale === "en" ? "Edit JSON" : "JSONを編集"}
                </Button>
              </a>
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
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper/36">
                {locale === "es" ? "Ubicación" : locale === "en" ? "Placement" : "置き場所"}
              </p>
              <p className="mt-2 text-base text-paper">
                {translation?.placementNotes ?? "—"}
              </p>
            </div>
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
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper/36">
                {locale === "es" ? "Sustrato" : locale === "en" ? "Substrate" : "用土"}
              </p>
              <p className="mt-2 text-base text-paper">
                {translation?.substrateNotes ?? "—"}
              </p>
            </div>
          </div>
        </article>

        <article className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: locale === "es" ? "Riego" : locale === "en" ? "Watering" : "水やり",
              notes: translation?.wateringNotes,
              meta:
                typeof species.wateringFrequencyDays === "object" && species.wateringFrequencyDays
                  ? JSON.stringify(species.wateringFrequencyDays)
                  : null
            },
            {
              title: locale === "es" ? "Abonado" : locale === "en" ? "Fertilizing" : "施肥",
              notes: translation?.fertilizingNotes,
              meta: formatMonths(species.fertilizingActiveMonths)
            },
            {
              title: locale === "es" ? "Poda" : locale === "en" ? "Pruning" : "剪定",
              notes: translation?.pruningNotes,
              meta: formatMonths(species.pruningActiveMonths)
            },
            {
              title: locale === "es" ? "Trasplante" : locale === "en" ? "Repotting" : "植え替え",
              notes: translation?.repottingNotes,
              meta: formatMonths(species.repottingActiveMonths)
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[1.8rem] surface-soft p-5">
              <p className="font-display text-2xl text-paper">{item.title}</p>
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

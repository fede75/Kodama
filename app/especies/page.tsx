import Link from "next/link";
import { getLocale } from "@/lib/i18n-server";
import { listSpecies } from "@/lib/species";

export const dynamic = "force-dynamic";

export default async function SpeciesPage() {
  const locale = await getLocale();
  const species = await listSpecies(locale);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.4rem] surface-panel p-6 sm:p-8">
        <p className="editorial-kicker text-xs">
          {locale === "es" ? "Inventario" : locale === "en" ? "Inventory" : "インベントリ"}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-paper">
          {locale === "es" ? "Especies" : locale === "en" ? "Species" : "樹種"}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-paper/58">
          {locale === "es"
            ? "Consulta el catálogo de especies dadas de alta y utiliza cada ficha como referencia de cultivo, riego, abonado, poda y trasplante."
            : locale === "en"
              ? "Browse the registered species catalogue and use each record as a reference for cultivation, watering, fertilizing, pruning and repotting."
              : "登録済みの樹種カタログを一覧し、それぞれの記録を栽培、水やり、施肥、剪定、植え替えの参考として活用できます。"}
        </p>
      </section>

      {species.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {species.map((item) => {
            const translation = item.translations[0];
            return (
              <Link
                key={item.id}
                href={`/especies/${item.slug}`}
                className="group rounded-[2rem] surface-soft p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <p className="font-display text-3xl text-paper">
                  {translation?.commonName ?? item.slug}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-paper/40">
                  {translation?.scientificName ?? item.slug}
                </p>
                <div className="mt-5 space-y-3 text-sm leading-7 text-paper/58">
                  <p>{translation?.placementNotes ?? translation?.wateringNotes ?? translation?.substrateNotes ?? ""}</p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-paper/36">
                    {item.placementType ? <span>{item.placementType}</span> : null}
                    {item.lightExposure ? <span>{item.lightExposure}</span> : null}
                    {item.substrateDrainage ? <span>{item.substrateDrainage}</span> : null}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="rounded-[2rem] surface-soft p-6 text-paper/58">
          {locale === "es"
            ? "Todavía no hay especies cargadas."
            : locale === "en"
              ? "No species have been loaded yet."
              : "まだ樹種は登録されていません。"}
        </section>
      )}
    </div>
  );
}

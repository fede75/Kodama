import Link from "next/link";
import { DeleteSpeciesForm } from "@/components/admin/delete-species-form";
import { SpeciesJsonEditor } from "@/components/admin/species-json-editor";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { getCurrentUser } from "@/lib/auth-guards";
import { getLocale } from "@/lib/i18n-server";
import {
  getSpeciesForAdmin,
  getSpeciesJsonExampleString,
  listSpecies,
  serializeSpeciesToJson
} from "@/lib/species";

export const dynamic = "force-dynamic";

export default async function SpeciesPage({
  searchParams
}: {
  searchParams?: Promise<{ species?: string; mode?: string }>;
}) {
  const locale = await getLocale();
  const currentUser = await getCurrentUser();
  const params = (await searchParams) ?? {};
  const species = await listSpecies(locale);
  const isAdmin = currentUser?.role === "ADMIN";
  const selectedSpecies = isAdmin && params.species
    ? await getSpeciesForAdmin(params.species)
    : null;
  const isCreating = isAdmin && params.mode === "new";
  const showEditor = isCreating || Boolean(selectedSpecies);
  const exampleJson = getSpeciesJsonExampleString();
  const editorJson = selectedSpecies
    ? serializeSpeciesToJson(selectedSpecies)
    : exampleJson;

  return (
    <div className="space-y-8">
      <section className="rounded-[2.4rem] surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
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
          </div>

          {isAdmin ? (
            <Link href="/especies?mode=new" className="inline-flex">
              <Button>
                <AppIcon name="plus" className="h-[1rem] w-[1rem]" />
                {locale === "es"
                  ? "Nueva especie"
                  : locale === "en"
                    ? "New species"
                    : "新しい樹種"}
              </Button>
            </Link>
          ) : null}
        </div>
      </section>

      {isAdmin && showEditor ? (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2.3rem] surface-panel p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="editorial-kicker text-xs">
                  {locale === "es" ? "Edición" : locale === "en" ? "Editing" : "編集"}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-none text-paper">
                  {locale === "es"
                    ? "Alta y edición por JSON"
                    : locale === "en"
                      ? "Create and edit through JSON"
                      : "JSONで登録・編集"}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-paper/58">
                  {locale === "es"
                    ? "Pega un JSON completo para crear una especie nueva o actualizar una existente por su slug."
                    : locale === "en"
                      ? "Paste a complete JSON object to create a new species or update an existing one by slug."
                      : "完全な JSON を貼り付けると、slug を基準に新規登録または既存樹種の更新ができます。"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/especies?mode=new" className="inline-flex">
                  <Button variant="secondary">
                    <AppIcon name="plus" className="h-[0.95rem] w-[0.95rem]" />
                    {locale === "es" ? "Nueva especie" : locale === "en" ? "New species" : "新しい樹種"}
                  </Button>
                </Link>
                {selectedSpecies ? (
                  <Link href={`/especies/${selectedSpecies.slug}`} className="inline-flex">
                    <Button variant="secondary">
                      <AppIcon name="info" className="h-[0.95rem] w-[0.95rem]" />
                      {locale === "es" ? "Ver ficha" : locale === "en" ? "View record" : "詳細を見る"}
                    </Button>
                  </Link>
                ) : null}
                <Link href="/especies" className="inline-flex">
                  <Button variant="secondary">
                    <AppIcon name="close" className="h-[0.95rem] w-[0.95rem]" />
                    {locale === "es" ? "Cerrar editor" : locale === "en" ? "Close editor" : "エディタを閉じる"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-[1.8rem] bg-white/[0.035] p-4 sm:p-5">
              <SpeciesJsonEditor initialJson={editorJson} exampleJson={exampleJson} />
            </div>
          </article>

          <article className="space-y-4 rounded-[2.3rem] surface-panel p-6 sm:p-8">
            <div>
              <p className="editorial-kicker text-xs">
                {locale === "es" ? "Ayuda" : locale === "en" ? "Help" : "ヘルプ"}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-none text-paper">
                {locale === "es" ? "JSON esperado" : locale === "en" ? "Expected JSON" : "想定JSON"}
              </h2>
              <p className="mt-4 text-base leading-8 text-paper/58">
                {locale === "es"
                  ? "Usa este ejemplo como referencia para pedírselo a ChatGPT o para editar una especie ya existente."
                  : locale === "en"
                    ? "Use this example as a reference for ChatGPT or to update an existing species."
                    : "この例を ChatGPT への指示や既存樹種の編集の参考に使えます。"}
              </p>
            </div>

            <details className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-paper/72">
                {locale === "es" ? "Ver ejemplo JSON" : locale === "en" ? "View JSON example" : "JSON例を見る"}
              </summary>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[1.4rem] bg-ink-950 px-4 py-4 text-xs leading-6 text-paper">
                {exampleJson}
              </pre>
            </details>

            {selectedSpecies ? (
              <details className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5">
                <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-paper/72">
                  {locale === "es"
                    ? `JSON actual de ${selectedSpecies.slug}`
                    : locale === "en"
                      ? `Current JSON for ${selectedSpecies.slug}`
                      : `${selectedSpecies.slug} の現在のJSON`}
                </summary>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[1.4rem] bg-ink-950 px-4 py-4 text-xs leading-6 text-paper">
                  {editorJson}
                </pre>
              </details>
            ) : null}
          </article>
        </section>
      ) : null}

      {species.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {species.map((item) => {
            const translation = item.translations[0];
            return (
              <article
                key={item.id}
                className="group rounded-[2rem] surface-soft p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <Link href={`/especies/${item.slug}`} className="block">
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

                {isAdmin ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/especies?species=${item.slug}`} className="inline-flex">
                      <Button variant="secondary">
                        <AppIcon name="edit" className="h-[0.95rem] w-[0.95rem]" />
                        {locale === "es" ? "Editar" : locale === "en" ? "Edit" : "編集"}
                      </Button>
                    </Link>
                    <DeleteSpeciesForm slug={item.slug} />
                  </div>
                ) : null}
              </article>
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

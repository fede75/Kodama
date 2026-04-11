import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listPublicCollections } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function PublicCollectionsPage() {
  const collections = await listPublicCollections();

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="editorial-kicker text-xs">Explorar</p>
          <h1 className="font-display text-4xl leading-none text-paper sm:text-5xl">
            Colecciones públicas
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-paper/50 sm:text-base">
            Un inventario abierto de colecciones vivas, con foco en imagen, procedencia y acceso directo a cada cuaderno.
          </p>
        </div>
        <div className="rounded-full bg-white/[0.035] px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/42">
          {collections.length} colecciones visibles
        </div>
      </section>

      {collections.length === 0 ? (
        <div className="rounded-[2rem] surface-soft p-6 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-8">
          Todavía no hay colecciones públicas.
        </div>
      ) : (
        <section className="grid gap-6 2xl:grid-cols-2">
          {collections.map((collection) => {
            const sampleBonsai = collection.bonsais[0];
            const samplePhoto = sampleBonsai?.photos[0];

            return (
              <article
                key={collection.id}
                className="group relative overflow-hidden rounded-[2.2rem] surface-panel p-4 transition duration-500 hover:-translate-y-1.5 sm:p-5"
              >
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-clay-700/15 blur-3xl transition duration-500 group-hover:bg-clay-600/24" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%)]" />

                <div className="grid gap-4 md:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr] md:items-stretch">
                  {samplePhoto ? (
                    <div className="overflow-hidden rounded-[1.7rem] bg-black/20">
                      <img
                        src={samplePhoto.imageUrl}
                        alt={samplePhoto.caption ?? `Foto de ${sampleBonsai?.name ?? "bonsái"}`}
                        className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex items-end overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-4">
                      <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-paper/72">
                        Sin foto
                      </div>
                    </div>
                  )}

                  <div className="flex min-h-full flex-col justify-between">
                    <div>
                      <p className="editorial-kicker text-[10px]">Colección pública</p>
                      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.5rem)] leading-none text-paper">
                        {collection.name ?? "Usuario"}
                      </h2>
                      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-paper/38">
                        {collection.collectionLocation ?? "Ubicación no indicada"}
                      </p>
                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">
                          Bonsái destacado
                        </p>
                        <p className="text-sm text-paper/76">
                          {sampleBonsai?.name ?? "Sin destacar"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-paper/34">
                          Visibles
                        </p>
                        <p className="text-sm text-paper/76">
                          {collection.bonsais.length} árboles
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/colecciones-publicas/${collection.id}`}
                        className="inline-flex"
                      >
                        <Button>Ver colección</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

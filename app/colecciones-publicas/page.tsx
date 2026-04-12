import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listPublicCollections } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function PublicCollectionsPage() {
  const collections = await listPublicCollections();

  return (
    <div className="space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
        <div className="space-y-4">
          <p className="editorial-kicker text-xs">Explorar</p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.6rem)] leading-[0.9] text-paper">
            Colecciones públicas
          </h1>
          <p className="max-w-2xl text-[1.04rem] leading-8 text-paper/56">
            Un recorrido por colecciones abiertas, árboles compartidos y cuadernos vivos que invitan a mirar con más calma.
          </p>
        </div>
        <div className="justify-self-start rounded-[2rem] border border-white/6 bg-white/[0.025] px-6 py-5 xl:justify-self-end">
          <p className="metadata-label">Colecciones visibles</p>
          <p className="mt-3 font-display text-4xl text-paper">{collections.length}</p>
        </div>
      </section>

      {collections.length === 0 ? (
        <div className="rounded-[2rem] surface-soft p-6 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-8">
          Todavía no hay colecciones públicas.
        </div>
      ) : (
        <section className="grid gap-8 2xl:grid-cols-2">
          {collections.map((collection, index) => {
            const sampleBonsai = collection.bonsais[0];
            const samplePhoto = sampleBonsai?.photos[0];

            return (
              <article
                key={collection.id}
                className={`group relative overflow-hidden rounded-[2.4rem] transition duration-500 hover:-translate-y-1.5 ${
                  index % 2 === 0
                    ? "border border-white/6 bg-[linear-gradient(180deg,rgba(14,18,17,0.84),rgba(8,10,10,0.96))]"
                    : "border border-white/6 bg-[linear-gradient(180deg,rgba(11,14,13,0.9),rgba(8,10,10,0.98))]"
                }`}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-clay-700/12 blur-3xl transition duration-500 group-hover:bg-clay-600/18" />

                <div className="grid gap-4 p-4 md:grid-cols-[1.02fr_0.98fr] md:items-stretch lg:p-5">
                  {samplePhoto ? (
                    <div className="overflow-hidden rounded-[2rem] bg-black/20">
                      <img
                        src={samplePhoto.imageUrl}
                        alt={samplePhoto.caption ?? `Foto de ${sampleBonsai?.name ?? "bonsái"}`}
                        className="aspect-[5/6] h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex items-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-5">
                      <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-paper/72">
                        Sin foto
                      </div>
                    </div>
                  )}

                    <div className="flex min-h-full flex-col justify-between">
                      <div>
                        <p className="editorial-kicker text-[10px]">Colección pública</p>
                        <h2 className="mt-4 font-display text-[clamp(2.2rem,4.2vw,3rem)] leading-[0.96] text-paper">
                          {collection.name ?? "Usuario"}
                        </h2>
                        <p className="mt-4 text-[1rem] text-paper/52">
                          {collection.collectionLocation ?? "Ubicación no indicada"}
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="metadata-label">
                          Bonsái destacado
                        </p>
                        <p className="text-[1rem] text-paper/78">
                          {sampleBonsai?.name ?? "Sin destacar"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="metadata-label">
                          Visibles
                        </p>
                        <p className="text-[1rem] text-paper/78">
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

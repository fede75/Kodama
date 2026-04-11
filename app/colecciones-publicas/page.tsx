import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listPublicCollections } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function PublicCollectionsPage() {
  const collections = await listPublicCollections();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-paper">Colecciones públicas</h1>
      </div>

      {collections.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-8 text-paper/62 shadow-card">
          Todavía no hay colecciones públicas.
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.04] shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-white/8 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                    Usuario
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                    Localización
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                    Imagen
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                    Acceso
                  </th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => {
                  const sampleBonsai = collection.bonsais[0];
                  const samplePhoto = sampleBonsai?.photos[0];

                  return (
                    <tr
                      key={collection.id}
                      className="border-b border-white/8 last:border-b-0"
                    >
                      <td className="px-5 py-4 text-sm text-paper/72">
                        {collection.name ?? "Usuario"}
                      </td>
                      <td className="px-5 py-4 text-sm text-paper/62">
                        {collection.collectionLocation ?? "Sin indicar"}
                      </td>
                      <td className="px-5 py-4">
                        {samplePhoto ? (
                          <div className="w-20 overflow-hidden rounded-[1rem] border border-white/8 bg-black/20">
                            <img
                              src={samplePhoto.imageUrl}
                              alt={samplePhoto.caption ?? `Foto de ${sampleBonsai?.name ?? "bonsái"}`}
                              className="aspect-square w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-paper/38">Sin imagen</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/colecciones-publicas/${collection.id}`}
                          className="inline-flex"
                        >
                          <Button className="bg-moss-500 text-paper hover:bg-moss-400">
                            Ver colección
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { getPublicCollection } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function PublicCollectionDetailPage({
  params
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const collection = await getPublicCollection(userId);

  if (!collection) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <h1 className="font-display text-[clamp(2.2rem,6vw,3rem)] text-paper">
          {collection.name ?? "Colección pública"}
        </h1>
        {collection.collectionLocation ? (
          <p className="text-sm uppercase tracking-[0.18em] text-paper/38">
            {collection.collectionLocation}
          </p>
        ) : null}
      </div>

      {collection.bonsais.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-paper/62 shadow-card sm:p-8">
          Esta colección no tiene bonsáis públicos visibles.
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {collection.bonsais.map((bonsai) => (
            <BonsaiCard
              key={bonsai.id}
              bonsai={bonsai}
              href={`/colecciones-publicas/${collection.id}/bonsais/${bonsai.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

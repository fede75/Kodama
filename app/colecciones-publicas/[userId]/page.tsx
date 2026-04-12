import { notFound } from "next/navigation";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { VoteForm } from "@/components/social/vote-form";
import { getCurrentUser } from "@/lib/auth-guards";
import { getPublicCollection } from "@/lib/bonsais";
import { getDictionary, getLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PublicCollectionDetailPage({
  params
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const currentUser = await getCurrentUser();
  const collection = await getPublicCollection(userId, currentUser?.id);

  if (!collection) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <h1 className="font-display text-[clamp(2.2rem,6vw,3rem)] text-paper">
          {collection.name ?? dict.publicCollectionDetail.publicCollection}
        </h1>
        {collection.collectionLocation ? (
          <p className="text-sm uppercase tracking-[0.18em] text-paper/38">
            {collection.collectionLocation}
          </p>
        ) : null}
      </div>

      {collection.bonsais.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-paper/62 shadow-card sm:p-8">
          {dict.publicCollectionDetail.noVisibleBonsais}
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {collection.bonsais.map((bonsai) => (
            <div key={bonsai.id} className="space-y-3">
              <BonsaiCard
                bonsai={bonsai}
                locale={locale}
                href={`/colecciones-publicas/${collection.id}/bonsais/${bonsai.id}`}
              />
              <div className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.025] px-4 py-3">
                <p className="text-sm text-paper/60">
                  {dict.common.voteThisBonsai}
                </p>
                {currentUser ? (
                  <VoteForm
                    bonsaiId={bonsai.id}
                    ownerId={collection.id}
                    voted={bonsai.votes.length > 0}
                    voteCount={bonsai._count.votes}
                    locale={locale}
                  />
                ) : (
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-paper/70">
                    {bonsai._count.votes} {dict.common.votes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

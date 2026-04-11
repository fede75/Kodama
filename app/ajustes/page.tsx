import { CollectionSettingsForm } from "@/components/settings/collection-settings-form";
import { requireCurrentUser } from "@/lib/auth-guards";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireCurrentUser();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl text-paper">Ajustes</h1>
      </div>

      <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-6 shadow-card">
        <CollectionSettingsForm
          user={{
            collectionLocation: user.collectionLocation ?? null,
            isCollectionPublic: user.isCollectionPublic,
            showCareInPublic: user.showCareInPublic
          }}
        />
      </section>
    </div>
  );
}

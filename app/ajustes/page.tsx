import { CollectionSettingsForm } from "@/components/settings/collection-settings-form";
import { requireCurrentUser } from "@/lib/auth-guards";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireCurrentUser();

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.42fr] xl:items-end">
        <div>
          <p className="editorial-kicker text-xs">Ajustes</p>
          <h1 className="mt-3 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.9] text-paper">
            Cómo se muestra tu colección
          </h1>
          <p className="mt-4 max-w-2xl text-[1.04rem] leading-8 text-paper/56">
            Ajusta la localización y el grado de apertura pública de tu cuaderno para decidir qué parte de la colección compartes con otros.
          </p>
        </div>

        <div className="surface-etched rounded-[2rem] px-5 py-5">
          <p className="metadata-label">Estado público</p>
          <p className="mt-3 text-[0.98rem] leading-7 text-paper/58">
            Puedes mantener visible tu colección y decidir si los cuidados forman parte del relato público.
          </p>
        </div>
      </div>

      <section className="rounded-[2.4rem] border border-white/6 bg-[linear-gradient(180deg,rgba(13,17,16,0.94),rgba(8,10,10,0.98))] p-6 shadow-card sm:p-10">
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

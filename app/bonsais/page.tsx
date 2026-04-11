import Link from "next/link";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { Button } from "@/components/ui/button";
import { listBonsais } from "@/lib/bonsais";
import { requireCurrentUser } from "@/lib/auth-guards";

export const dynamic = "force-dynamic";

export default async function BonsaisPage() {
  const user = await requireCurrentUser();
  const bonsais = await listBonsais(user.id);
  const activeCount = bonsais.filter((bonsai) => bonsai.collectionStatus === "ACTIVE").length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="editorial-kicker text-xs">Mi colección</p>
          <h1 className="font-display text-4xl leading-none text-paper sm:text-5xl">
            {bonsais.length} árboles
          </h1>
          <p className="max-w-xl text-sm leading-7 text-paper/50 sm:text-base">
            Vista editorial de la colección con foco en imagen, estado y evolución reciente.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-full bg-white/[0.035] px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/42">
            {activeCount} activos
          </div>
          <Link href="/bonsais/new" className="block sm:inline-flex">
            <Button className="w-full sm:w-auto">Registra bonsái</Button>
          </Link>
        </div>
      </section>

      {bonsais.length === 0 ? (
        <div className="rounded-[2.4rem] surface-soft p-10 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)]">
          Empieza registrando tu primer bonsái.
        </div>
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {bonsais.map((bonsai) => (
            <BonsaiCard key={bonsai.id} bonsai={bonsai} />
          ))}
        </section>
      )}
    </div>
  );
}

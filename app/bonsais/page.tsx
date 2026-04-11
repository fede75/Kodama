import Link from "next/link";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { Button } from "@/components/ui/button";
import { listBonsais } from "@/lib/bonsais";
import { requireCurrentUser } from "@/lib/auth-guards";

export const dynamic = "force-dynamic";

export default async function BonsaisPage() {
  const user = await requireCurrentUser();
  const bonsais = await listBonsais(user.id);

  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-paper">
            Tus bonsáis
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-sm uppercase tracking-[0.24em] text-paper/42">
              {bonsais.length} registrados
            </p>
            <Link href="/bonsais/new">
              <Button className="bg-moss-500 text-paper hover:bg-moss-400">
                Crear bonsái
              </Button>
            </Link>
          </div>
        </div>

        {bonsais.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-8 text-paper/62 shadow-card">
            Empieza creando tu primer bonsái.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {bonsais.map((bonsai) => (
              <BonsaiCard key={bonsai.id} bonsai={bonsai} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { LatestCareList } from "@/components/bonsais/latest-care-list";
import { Button } from "@/components/ui/button";
import { getLatestCareEvents, listBonsais } from "@/lib/bonsais";
import { requireCurrentUser } from "@/lib/auth-guards";

export const dynamic = "force-dynamic";

export default async function BonsaisPage() {
  const user = await requireCurrentUser();
  const [bonsais, latestCare] = await Promise.all([
    listBonsais(user.id),
    getLatestCareEvents(user.id)
  ]);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-8 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)] lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-clay-700/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-24 h-32 w-32 rounded-full bg-moss-500/15 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
          <div className="space-y-5">
            <h1 className="max-w-3xl font-display text-5xl leading-none text-paper sm:text-6xl">
              Tus bonsáis.
            </h1>
            <div className="flex flex-wrap gap-3">
              <Link href="/bonsais/new">
                <Button className="bg-moss-500 text-paper hover:bg-moss-400">
                  Crear bonsái
                </Button>
              </Link>
              <Link href="/bonsais">
                <Button
                  variant="secondary"
                  className="border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
                >
                  Ver colección
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/42">
                  Total en colección
                </p>
                <p className="mt-3 font-display text-4xl text-paper">
                  {bonsais.length}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/42">
                  Último cuidado
                </p>
                <p className="mt-3 text-lg font-semibold text-paper">
                  {latestCare[0] ? latestCare[0].bonsai.name : "Sin actividad"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/42">
                  Ritmo reciente
                </p>
                <p className="mt-3 text-lg font-semibold text-paper">
                  {latestCare.length} registros
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2.2rem] border border-white/8 bg-gradient-to-br from-black via-ink-900 to-clay-900 p-6 text-paper shadow-card">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_34%),linear-gradient(135deg,_transparent_0%,_rgba(255,255,255,0.06)_100%)]" />
            <div className="relative">
              <p className="mt-4 max-w-xs font-display text-4xl leading-tight">
                Colección activa.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 text-paper/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-clay-300/30 bg-clay-500/25 text-xl">
                  印
                </div>
                <p className="text-sm leading-6">Fotos y cuidados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-paper">
              Tus bonsáis
            </h2>
            <p className="text-sm uppercase tracking-[0.24em] text-paper/42">
              {bonsais.length} registrados
            </p>
          </div>

          {bonsais.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-8 text-paper/62 shadow-card">
              Empieza creando tu primer bonsái para construir su historial.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {bonsais.map((bonsai) => (
                <BonsaiCard key={bonsai.id} bonsai={bonsai} />
              ))}
            </div>
          )}
        </div>

        <section className="space-y-5">
          <h2 className="font-display text-3xl text-paper">
            Últimos cuidados
          </h2>
          <LatestCareList items={latestCare} />
        </section>
      </section>
    </div>
  );
}

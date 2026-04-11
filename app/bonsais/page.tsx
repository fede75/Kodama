import Link from "next/link";
import { BonsaiCard } from "@/components/bonsais/bonsai-card";
import { LatestCareList } from "@/components/bonsais/latest-care-list";
import { Button } from "@/components/ui/button";
import { getLatestCareEvents, listBonsais } from "@/lib/bonsais";
import { getDefaultUser } from "@/lib/default-user";

export const dynamic = "force-dynamic";

export default async function BonsaisPage() {
  const user = await getDefaultUser();
  const [bonsais, latestCare] = await Promise.all([
    listBonsais(user.id),
    getLatestCareEvents(user.id)
  ]);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-ink-200/70 bg-paper/85 p-8 shadow-paper lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300 to-transparent" />
        <div className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-clay-200/40 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-24 h-32 w-32 rounded-full bg-moss-200/30 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-clay-700">
              Atelier japonés
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-none text-ink-900 sm:text-6xl">
              Cada bonsái merece un cuaderno con memoria y presencia.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-ink-700">
              Kodama reúne árbol, gesto y estación en un espacio más íntimo:
              una ficha viva donde el cuidado cotidiano, las fotos y la
              evolución quedan registrados con calma y claridad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/bonsais/new">
                <Button className="bg-clay-600 hover:bg-clay-700">
                  Crear bonsái
                </Button>
              </Link>
              <Link href="/bonsais">
                <Button
                  variant="secondary"
                  className="border-ink-200 bg-white/60 hover:border-clay-300 hover:text-clay-700"
                >
                  Ver colección
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-ink-200/70 bg-white/55 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
                  Total en colección
                </p>
                <p className="mt-3 font-display text-4xl text-ink-900">
                  {bonsais.length}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-ink-200/70 bg-white/55 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
                  Último cuidado
                </p>
                <p className="mt-3 text-lg font-semibold text-ink-900">
                  {latestCare[0] ? latestCare[0].bonsai.name : "Sin actividad"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-ink-200/70 bg-white/55 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
                  Ritmo reciente
                </p>
                <p className="mt-3 text-lg font-semibold text-ink-900">
                  {latestCare.length} registros
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2.2rem] border border-ink-200/80 bg-gradient-to-br from-ink-900 via-ink-800 to-clay-900 p-6 text-paper shadow-card">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_34%),linear-gradient(135deg,_transparent_0%,_rgba(255,255,255,0.06)_100%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.32em] text-paper/60">
                Ritual diario
              </p>
              <p className="mt-4 max-w-xs font-display text-4xl leading-tight">
                Un taller digital para observar el paso del tiempo.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/55">
                  Bitácora viva
                </p>
                <p className="mt-2 text-sm leading-7 text-paper/90">
                  Guarda riegos, alambrados, incidencias y fotografías como si
                  fueran apuntes de banco de trabajo.
                </p>
              </div>
              <div className="flex items-center gap-3 text-paper/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-clay-300/30 bg-clay-500/25 text-xl">
                  印
                </div>
                <p className="text-sm leading-6">
                  Un lenguaje más cálido, textural y ceremonial para seguir la
                  evolución de cada árbol.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-ink-900">
              Tus bonsáis
            </h2>
            <p className="text-sm uppercase tracking-[0.24em] text-ink-500">
              {bonsais.length} registrados
            </p>
          </div>

          {bonsais.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-ink-200 bg-white/55 p-8 text-ink-600 shadow-card">
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
          <h2 className="font-display text-3xl text-ink-900">
            Últimos cuidados
          </h2>
          <LatestCareList items={latestCare} />
        </section>
      </section>
    </div>
  );
}

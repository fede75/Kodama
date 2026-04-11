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
      <section className="grid gap-6 rounded-[2rem] border border-bark-100 bg-white/70 p-8 shadow-card lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
            Colección viva
          </p>
          <h1 className="font-display text-4xl text-bark-900">
            Gestiona el ritmo de cuidado de cada bonsái.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-bark-700">
            Kodama reúne tus árboles, su historial de cuidados y las señales de
            evolución en un único lugar, con una base preparada para crecer a
            multiusuario cuando lo necesites.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/bonsais/new">
              <Button>Crear bonsái</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] bg-moss-900 px-6 py-6 text-white">
          <div>
            <p className="text-sm text-moss-100">Total en colección</p>
            <p className="mt-2 text-4xl font-semibold">{bonsais.length}</p>
          </div>
          <div>
            <p className="text-sm text-moss-100">Último cuidado registrado</p>
            <p className="mt-2 text-lg font-semibold">
              {latestCare[0] ? latestCare[0].bonsai.name : "Sin actividad"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-bark-900">
              Tus bonsáis
            </h2>
            <p className="text-sm text-bark-600">
              {bonsais.length} registrados
            </p>
          </div>

          {bonsais.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-bark-200 bg-white/70 p-8 text-bark-600">
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
          <h2 className="font-display text-2xl text-bark-900">
            Últimos cuidados
          </h2>
          <LatestCareList items={latestCare} />
        </section>
      </section>
    </div>
  );
}

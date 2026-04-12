import Link from "next/link";
import { FeaturedBonsaiCard } from "@/components/social/featured-bonsai-card";
import { Button } from "@/components/ui/button";
import { listFeaturedBonsais } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function FeaturedBonsaisPage({
  searchParams
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const range = params?.range === "all" ? "all" : "30d";
  const bonsais = await listFeaturedBonsais({ range, limit: 30 });

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="editorial-kicker text-xs">Comunidad</p>
          <h1 className="font-display text-4xl leading-none text-paper sm:text-5xl">
            Bonsáis destacados
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-paper/50 sm:text-base">
            Descubre qué árboles están despertando más interés en la comunidad y entra en la colección de cada propietario.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/bonsais-destacados?range=30d">
            <Button variant={range === "30d" ? "primary" : "secondary"}>
              Últimos 30 días
            </Button>
          </Link>
          <Link href="/bonsais-destacados?range=all">
            <Button variant={range === "all" ? "primary" : "secondary"}>
              Histórico
            </Button>
          </Link>
        </div>
      </section>

      {bonsais.length === 0 ? (
        <div className="rounded-[2rem] surface-soft p-6 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-8">
          Aún no hay votos suficientes para construir el ranking.
        </div>
      ) : (
        <section className="grid gap-6">
          {bonsais.map((bonsai, index) => (
            <FeaturedBonsaiCard
              key={bonsai.id}
              bonsai={bonsai}
              rank={index + 1}
              rangeLabel={range === "30d" ? "30 días" : "Histórico"}
            />
          ))}
        </section>
      )}
    </div>
  );
}

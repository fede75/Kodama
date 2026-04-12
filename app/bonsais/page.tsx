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
  const withPhotos = bonsais.filter((bonsai) => bonsai.photos.length > 0).length;

  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
        <div className="space-y-5">
          <p className="editorial-kicker text-xs">Mi colección</p>
          <h1 className="max-w-4xl font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-paper">
            Una galería viva de árboles, memoria y cuidado lento.
          </h1>
          <p className="max-w-2xl text-[1.05rem] leading-8 text-paper/58">
            Tu colección no se presenta como una lista de fichas, sino como un conjunto de ejemplares con carácter propio, imagen, contexto y evolución.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_auto] sm:justify-start xl:justify-end">
          <div className="surface-etched rounded-[1.9rem] px-5 py-5">
            <p className="metadata-label">Activos</p>
            <p className="mt-3 font-display text-4xl text-paper">{activeCount}</p>
            <p className="mt-2 text-sm text-paper/48">árboles en seguimiento</p>
          </div>
          <div className="surface-etched rounded-[1.9rem] px-5 py-5">
            <p className="metadata-label">Con fotografía</p>
            <p className="mt-3 font-display text-4xl text-paper">{withPhotos}</p>
            <p className="mt-2 text-sm text-paper/48">ejemplares documentados</p>
          </div>
          <Link href="/bonsais/new" className="block sm:col-span-2 sm:inline-flex sm:justify-end">
            <Button className="w-full sm:w-auto">Registrar nuevo bonsái</Button>
          </Link>
        </div>
      </section>

      {bonsais.length === 0 ? (
        <div className="rounded-[2.4rem] surface-soft p-8 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-10">
          Empieza registrando tu primer bonsái.
        </div>
      ) : (
        <section className="grid gap-8 xl:grid-cols-2">
          {bonsais.map((bonsai, index) => (
            <div
              key={bonsai.id}
              className={index % 3 === 0 ? "xl:translate-y-6" : index % 3 === 1 ? "" : "xl:-translate-y-4"}
            >
              <BonsaiCard bonsai={bonsai} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

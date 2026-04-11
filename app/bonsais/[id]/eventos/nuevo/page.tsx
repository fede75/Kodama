import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth-guards";
import { CareEventForm } from "@/components/bonsais/care-event-form";
import { Button } from "@/components/ui/button";
import { getBonsaiDetail } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function NewCareEventPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireCurrentUser();
  const bonsai = await getBonsaiDetail(id, user.id);

  if (!bonsai) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
            Registrar cuidado
          </p>
          <h1 className="mt-2 font-display text-4xl text-bark-900">
            Añadir evento para {bonsai.name}
          </h1>
          <p className="mt-3 text-bark-700">
            Guarda el último riego, abonado, poda o cualquier otro cuidado
            relevante.
          </p>
        </div>

        <Link href={`/bonsais/${bonsai.id}`}>
          <Button variant="secondary">Volver al detalle</Button>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-bark-100 bg-white/90 p-8 shadow-card">
        <CareEventForm bonsai={bonsai} />
      </div>
    </div>
  );
}

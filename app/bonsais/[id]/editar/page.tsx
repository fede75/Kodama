import Link from "next/link";
import { notFound } from "next/navigation";
import { BonsaiForm } from "@/components/bonsais/bonsai-form";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth-guards";
import { getBonsaiDetail } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function EditBonsaiPage({
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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay-700">
            Mantenimiento del inventario
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink-950">
            Editar {bonsai.name}
          </h1>
          <p className="mt-3 text-ink-700">
            Actualiza los datos generales y comentarios del bonsái para mantener
            la ficha siempre al día.
          </p>
        </div>

        <Link href={`/bonsais/${bonsai.id}`}>
          <Button variant="secondary">Volver al detalle</Button>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-ink-200/75 bg-paper/85 p-8 shadow-card">
        <BonsaiForm
          mode="edit"
          bonsai={{
            id: bonsai.id,
            name: bonsai.name,
            species: bonsai.species,
            style: bonsai.style,
            location: bonsai.location,
            acquiredAt: bonsai.acquiredAt,
            notes: bonsai.notes
          }}
        />
      </div>
    </div>
  );
}

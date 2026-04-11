import Link from "next/link";
import { BonsaiForm } from "@/components/bonsais/bonsai-form";
import { Button } from "@/components/ui/button";

export default function NewBonsaiPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
            Nuevo ejemplar
          </p>
          <h1 className="mt-2 font-display text-4xl text-bark-900">
            Añadir bonsái
          </h1>
          <p className="mt-3 text-bark-700">
            Registra los datos base del árbol para empezar su seguimiento.
          </p>
        </div>

        <Link href="/bonsais">
          <Button variant="secondary">Volver al listado</Button>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-bark-100 bg-white/90 p-8 shadow-card">
        <BonsaiForm />
      </div>
    </div>
  );
}

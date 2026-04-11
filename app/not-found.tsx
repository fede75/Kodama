import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-bark-100 bg-white/90 p-10 text-center shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
        No encontrado
      </p>
      <h1 className="mt-3 font-display text-4xl text-bark-900">
        Este bonsái no existe en tu colección.
      </h1>
      <p className="mt-4 text-bark-700">
        Puede que aún no lo hayas creado o que la base de datos no esté
        inicializada.
      </p>
      <div className="mt-6">
        <Link href="/bonsais">
          <Button>Volver a Kodama</Button>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

type BonsaiCardProps = {
  bonsai: {
    id: string;
    name: string;
    species: string;
    style: string | null;
    location: string | null;
    status: string;
    careEvents: Array<{
      type: keyof typeof CARE_EVENT_LABELS;
      performedAt: Date;
    }>;
    _count: {
      careEvents: number;
      healthIssues: number;
      journal: number;
      photos: number;
    };
  };
};

export function BonsaiCard({ bonsai }: BonsaiCardProps) {
  const latestCare = bonsai.careEvents[0];

  return (
    <Link
      href={`/bonsais/${bonsai.id}`}
      className="group rounded-[2rem] border border-bark-100 bg-white/90 p-6 shadow-card transition hover:-translate-y-1 hover:border-moss-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl text-bark-900">
            {bonsai.name}
          </p>
          <p className="mt-1 text-sm text-bark-600">{bonsai.species}</p>
        </div>
        <span className="rounded-full bg-moss-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-800">
          {bonsai.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-bark-700">
        <p>
          <span className="font-semibold text-bark-900">Estilo:</span>{" "}
          {bonsai.style ?? "Sin definir"}
        </p>
        <p>
          <span className="font-semibold text-bark-900">Ubicación:</span>{" "}
          {bonsai.location ?? "No indicada"}
        </p>
        <p>
          <span className="font-semibold text-bark-900">Último cuidado:</span>{" "}
          {latestCare
            ? `${CARE_EVENT_LABELS[latestCare.type]} · ${formatDate(latestCare.performedAt)}`
            : "Todavía no registrado"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-bark-600">
        <span className="rounded-full bg-bark-50 px-3 py-1">
          {bonsai._count.careEvents} cuidados
        </span>
        <span className="rounded-full bg-bark-50 px-3 py-1">
          {bonsai._count.healthIssues} incidencias
        </span>
        <span className="rounded-full bg-bark-50 px-3 py-1">
          {bonsai._count.journal} notas
        </span>
        <span className="rounded-full bg-bark-50 px-3 py-1">
          {bonsai._count.photos} fotos
        </span>
      </div>
    </Link>
  );
}

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
    photos: Array<{
      id: string;
      imageUrl: string;
      caption: string | null;
      isPrimary: boolean;
    }>;
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
  const coverPhoto = bonsai.photos[0];

  return (
    <Link
      href={`/bonsais/${bonsai.id}`}
      className="group relative overflow-hidden rounded-[2.1rem] border border-ink-200/75 bg-paper/85 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-clay-300 hover:shadow-paper"
    >
      {coverPhoto ? (
        <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-ink-200/70">
          <img
            src={coverPhoto.imageUrl}
            alt={coverPhoto.caption ?? `Foto de ${bonsai.name}`}
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="-mx-6 -mt-6 mb-6 flex h-44 items-end overflow-hidden border-b border-ink-200/70 bg-gradient-to-br from-moss-100 via-paper to-clay-100 p-5">
          <div className="rounded-full border border-clay-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
            Sin foto
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-clay-200/40 blur-3xl transition duration-300 group-hover:bg-clay-300/50" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-clay-300/70 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-3xl leading-none text-ink-900">
            {bonsai.name}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-ink-500">
            {bonsai.species}
          </p>
        </div>
        <span className="rounded-full border border-moss-200 bg-moss-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-800">
          {bonsai.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm leading-7 text-ink-700">
        <p>
          <span className="font-semibold text-ink-900">Estilo:</span>{" "}
          {bonsai.style ?? "Sin definir"}
        </p>
        <p>
          <span className="font-semibold text-ink-900">Ubicación:</span>{" "}
          {bonsai.location ?? "No indicada"}
        </p>
        <p>
          <span className="font-semibold text-ink-900">Último cuidado:</span>{" "}
          {latestCare
            ? `${CARE_EVENT_LABELS[latestCare.type]} · ${formatDate(latestCare.performedAt)}`
            : "Todavía no registrado"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-ink-600">
        <span className="rounded-full border border-ink-200 bg-white/50 px-3 py-1">
          {bonsai._count.careEvents} cuidados
        </span>
        <span className="rounded-full border border-ink-200 bg-white/50 px-3 py-1">
          {bonsai._count.healthIssues} incidencias
        </span>
        <span className="rounded-full border border-ink-200 bg-white/50 px-3 py-1">
          {bonsai._count.journal} notas
        </span>
        <span className="rounded-full border border-ink-200 bg-white/50 px-3 py-1">
          {bonsai._count.photos} fotos
        </span>
      </div>
    </Link>
  );
}

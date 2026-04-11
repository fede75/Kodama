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
  href?: string;
};

export function BonsaiCard({ bonsai, href = `/bonsais/${bonsai.id}` }: BonsaiCardProps) {
  const latestCare = bonsai.careEvents[0];
  const coverPhoto = bonsai.photos[0];

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[2.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-moss-500/30"
    >
      {coverPhoto ? (
        <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-white/8">
          <img
            src={coverPhoto.imageUrl}
            alt={coverPhoto.caption ?? `Foto de ${bonsai.name}`}
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="-mx-6 -mt-6 mb-6 flex h-44 items-end overflow-hidden border-b border-white/8 bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-5">
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-paper/72">
            Sin foto
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-clay-700/18 blur-3xl transition duration-300 group-hover:bg-clay-600/22" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-3xl leading-none text-paper">
            {bonsai.name}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-paper/42">
            {bonsai.species}
          </p>
        </div>
        <span className="rounded-full border border-moss-500/20 bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-200">
          {bonsai.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm leading-7 text-paper/62">
        <p>
          <span className="font-semibold text-paper">Estilo:</span>{" "}
          {bonsai.style ?? "Sin definir"}
        </p>
        <p>
          <span className="font-semibold text-paper">Ubicación:</span>{" "}
          {bonsai.location ?? "No indicada"}
        </p>
        <p>
          <span className="font-semibold text-paper">Último cuidado:</span>{" "}
          {latestCare
            ? `${CARE_EVENT_LABELS[latestCare.type]} · ${formatDate(latestCare.performedAt)}`
            : "Todavía no registrado"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-paper/46">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
          {bonsai._count.careEvents} cuidados
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
          {bonsai._count.healthIssues} incidencias
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
          {bonsai._count.journal} notas
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
          {bonsai._count.photos} fotos
        </span>
      </div>
    </Link>
  );
}

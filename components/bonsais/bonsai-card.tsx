import Link from "next/link";
import { CARE_EVENT_LABELS, COLLECTION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

type BonsaiCardProps = {
  bonsai: {
    id: string;
    name: string;
    species: string;
    style: string | null;
    location: string | null;
    status: string;
    collectionStatus: keyof typeof COLLECTION_STATUS_LABELS;
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
  const isInactive = bonsai.collectionStatus !== "ACTIVE";

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[2.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-moss-500/30 sm:p-6"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-clay-700/18 blur-3xl transition duration-300 group-hover:bg-clay-600/22" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent sm:inset-x-6" />

      <div className="grid gap-5 sm:grid-cols-[1fr_9rem] sm:items-start">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-3xl leading-none text-paper">
                {bonsai.name}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-paper/42">
                {bonsai.species}
              </p>
            </div>
            {isInactive ? (
              <span className="shrink-0 rounded-full border border-clay-500/20 bg-clay-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-200">
                {COLLECTION_STATUS_LABELS[bonsai.collectionStatus]}
              </span>
            ) : null}
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
              <span className="font-semibold text-paper">Estado:</span>{" "}
              {bonsai.status}
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
        </div>

        {coverPhoto ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20 sm:h-full">
            <img
              src={coverPhoto.imageUrl}
              alt={coverPhoto.caption ?? `Foto de ${bonsai.name}`}
              className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex items-end overflow-hidden rounded-[1.5rem] border border-white/8 bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-4 sm:h-full">
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-paper/72">
              Sin foto
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

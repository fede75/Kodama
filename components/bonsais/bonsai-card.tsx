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
      className="group relative block overflow-hidden rounded-[2.35rem] transition duration-500 hover:-translate-y-1.5"
    >
      <div className="absolute inset-0 rounded-[2.35rem] border border-white/6 bg-[linear-gradient(180deg,rgba(14,18,17,0.84),rgba(8,10,10,0.96))]" />
      <div className="pointer-events-none absolute left-[-8%] top-[-12%] h-44 w-44 rounded-full bg-moss-700/10 blur-3xl transition duration-500 group-hover:bg-moss-600/16" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative grid gap-4 p-4 md:grid-cols-[1fr_0.95fr] md:items-end lg:p-5">
        {coverPhoto ? (
          <div className="order-1 overflow-hidden rounded-[1.95rem] bg-black/20">
            <img
              src={coverPhoto.imageUrl}
              alt={coverPhoto.caption ?? `Foto de ${bonsai.name}`}
              className="aspect-[5/6] h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="order-1 flex items-end overflow-hidden rounded-[1.95rem] bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-5">
            <div className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-paper/72">
              Sin foto
            </div>
          </div>
        )}

        <div className="order-2 flex min-h-full flex-col justify-between gap-6 px-1 pb-1 pt-2 md:px-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="metadata-label">Ejemplar</p>
              <p className="mt-3 font-display text-[clamp(2.15rem,4.4vw,3.25rem)] leading-[0.95] text-paper">
                {bonsai.name}
              </p>
              <p className="mt-4 max-w-md text-[1rem] leading-7 text-paper/54">
                {bonsai.species}
              </p>
            </div>
            {isInactive ? (
              <span className="shrink-0 rounded-full bg-clay-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.11em] text-clay-200">
                {COLLECTION_STATUS_LABELS[bonsai.collectionStatus]}
              </span>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="metadata-label">
                Estado
              </p>
              <p className="text-[1rem] text-paper/82">{bonsai.status}</p>
            </div>
            <div className="space-y-1.5">
              <p className="metadata-label">
                Ubicación
              </p>
              <p className="text-[1rem] text-paper/82">{bonsai.location ?? "No indicada"}</p>
            </div>
            <div className="space-y-1.5">
              <p className="metadata-label">
                Estilo
              </p>
              <p className="text-[1rem] text-paper/82">{bonsai.style ?? "Sin definir"}</p>
            </div>
            <div className="space-y-1.5">
              <p className="metadata-label">
                Último cuidado
              </p>
              <p className="text-[1rem] leading-7 text-paper/82">
                {latestCare
                  ? `${CARE_EVENT_LABELS[latestCare.type]} · ${formatDate(latestCare.performedAt)}`
                  : "Todavía no registrado"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-paper/42">
            <span>{bonsai._count.careEvents} cuidados</span>
            <span>{bonsai._count.photos} fotos</span>
            <span>{bonsai._count.journal} notas</span>
            <span>{bonsai._count.healthIssues} incidencias</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

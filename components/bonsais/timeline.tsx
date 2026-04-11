import { CARE_EVENT_LABELS } from "@/lib/constants";
import { TimelineItem } from "@/lib/timeline";
import { formatDateTime } from "@/lib/utils";

const toneByKind = {
  care: "border border-moss-500/25 bg-moss-500/12 text-moss-200",
  health: "border border-red-500/20 bg-red-500/12 text-red-200",
  journal: "border border-clay-500/20 bg-clay-500/12 text-clay-200",
  photo: "border border-white/10 bg-white/[0.05] text-paper/72"
} as const;

const labelByKind = {
  care: "Cuidado",
  health: "Incidencia",
  journal: "Bitácora",
  photo: "Foto"
} as const;

function mapTitle(item: TimelineItem) {
  if (item.kind === "care" && item.title in CARE_EVENT_LABELS) {
    return CARE_EVENT_LABELS[item.title as keyof typeof CARE_EVENT_LABELS];
  }

  return item.title;
}

export function BonsaiTimeline({ items }: { items: TimelineItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-8 text-sm text-paper/62 shadow-card">
        Todavía no hay actividad registrada para este bonsái.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.kind}-${item.id}`}
          className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 shadow-card"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneByKind[item.kind]}`}
              >
                {labelByKind[item.kind]}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-paper">
                {mapTitle(item)}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-7 text-paper/62">
                  {item.description}
                </p>
              ) : null}
            </div>

            <p className="text-sm uppercase tracking-[0.18em] text-paper/38">
              {formatDateTime(item.date)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

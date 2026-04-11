import { CARE_EVENT_LABELS } from "@/lib/constants";
import { TimelineItem } from "@/lib/timeline";
import { formatDateTime } from "@/lib/utils";

const toneByKind = {
  care: "border border-moss-200 bg-moss-50 text-moss-800",
  health: "border border-red-200 bg-red-50 text-red-800",
  journal: "border border-clay-200 bg-clay-50 text-clay-800",
  photo: "border border-ink-200 bg-white/70 text-ink-700"
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
      <div className="rounded-[2rem] border border-dashed border-ink-200 bg-white/55 p-8 text-sm text-ink-600 shadow-card">
        Todavía no hay actividad registrada para este bonsái.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.kind}-${item.id}`}
          className="rounded-[2rem] border border-ink-200/75 bg-paper/80 p-5 shadow-card"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneByKind[item.kind]}`}
              >
                {labelByKind[item.kind]}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">
                {mapTitle(item)}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-7 text-ink-700">
                  {item.description}
                </p>
              ) : null}
            </div>

            <p className="text-sm uppercase tracking-[0.18em] text-ink-500">
              {formatDateTime(item.date)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

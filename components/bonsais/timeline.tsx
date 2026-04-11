import { CARE_EVENT_LABELS } from "@/lib/constants";
import { TimelineItem } from "@/lib/timeline";
import { formatDateTime } from "@/lib/utils";

const toneByKind = {
  care: "bg-moss-100 text-moss-800",
  health: "bg-red-100 text-red-800",
  journal: "bg-amber-100 text-amber-800",
  photo: "bg-sky-100 text-sky-800"
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
      <div className="rounded-[2rem] border border-dashed border-bark-200 bg-white/70 p-8 text-sm text-bark-600">
        Todavía no hay actividad registrada para este bonsái.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.kind}-${item.id}`}
          className="rounded-[2rem] border border-bark-100 bg-white/90 p-5 shadow-card"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneByKind[item.kind]}`}
              >
                {labelByKind[item.kind]}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-bark-900">
                {mapTitle(item)}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-bark-700">
                  {item.description}
                </p>
              ) : null}
            </div>

            <p className="text-sm text-bark-500">{formatDateTime(item.date)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

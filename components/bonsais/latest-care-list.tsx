import Link from "next/link";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";

export function LatestCareList({
  items
}: {
  items: Array<{
    id: string;
    type: keyof typeof CARE_EVENT_LABELS;
    performedAt: Date;
    title: string | null;
    bonsai: {
      id: string;
      name: string;
    };
  }>;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-ink-200 bg-white/55 p-6 text-sm text-ink-600 shadow-card">
        Aún no hay cuidados registrados.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/bonsais/${item.bonsai.id}`}
          className="group flex items-center justify-between gap-4 rounded-[1.7rem] border border-ink-200/80 bg-paper/80 px-4 py-4 shadow-card transition hover:-translate-y-0.5 hover:border-clay-300"
        >
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {item.title ?? CARE_EVENT_LABELS[item.type]}
            </p>
            <p className="text-sm text-ink-600">{item.bonsai.name}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-500 group-hover:text-clay-700">
            {formatDateTime(item.performedAt)}
          </p>
        </Link>
      ))}
    </div>
  );
}

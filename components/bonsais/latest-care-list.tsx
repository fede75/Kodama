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
      <div className="rounded-[2rem] border border-dashed border-bark-200 bg-white/70 p-6 text-sm text-bark-600">
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
          className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-bark-100 bg-white/90 px-4 py-4 shadow-card transition hover:border-moss-300"
        >
          <div>
            <p className="text-sm font-semibold text-bark-900">
              {item.title ?? CARE_EVENT_LABELS[item.type]}
            </p>
            <p className="text-sm text-bark-600">{item.bonsai.name}</p>
          </div>
          <p className="text-xs text-bark-500">{formatDateTime(item.performedAt)}</p>
        </Link>
      ))}
    </div>
  );
}

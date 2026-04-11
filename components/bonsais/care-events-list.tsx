import Link from "next/link";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { DeleteCareEventForm } from "@/components/bonsais/delete-care-event-form";

type CareEventListItem = {
  id: string;
  bonsaiId: string;
  type: keyof typeof CARE_EVENT_LABELS;
  title: string | null;
  notes: string | null;
  performedAt: Date;
  photos: Array<{
    id: string;
    imageUrl: string;
    caption: string | null;
    isPrimary: boolean;
    takenAt: Date;
  }>;
};

export function CareEventsList({
  bonsaiId,
  items
}: {
  bonsaiId: string;
  items: CareEventListItem[];
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-paper/62">
        Aún no hay cuidados registrados.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.04] shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/8 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                Fecha
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                Cuidado
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                Notas
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                Imagen
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/38">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/8 last:border-b-0"
              >
                <td className="px-5 py-4 align-top text-sm text-paper/62">
                  {formatDateTime(item.performedAt)}
                </td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex rounded-full border border-moss-500/20 bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-moss-200">
                    {CARE_EVENT_LABELS[item.type]}
                  </span>
                </td>
                <td className="px-5 py-4 align-top text-sm leading-7 text-paper/62">
                  {item.notes ?? "Sin notas"}
                </td>
                <td className="px-5 py-4 align-top">
                  {item.photos[0] ? (
                    <div className="w-20 overflow-hidden rounded-[1rem] border border-white/8 bg-black/20">
                      <img
                        src={item.photos[0].imageUrl}
                        alt={item.photos[0].caption ?? "Imagen principal del cuidado"}
                        className="aspect-square w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-paper/38">Sin imagen</span>
                  )}
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/bonsais/${bonsaiId}/eventos/${item.id}/editar`}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition hover:border-white/24 hover:bg-white/[0.08]"
                    >
                      Editar
                    </Link>
                    <DeleteCareEventForm bonsaiId={bonsaiId} careEventId={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

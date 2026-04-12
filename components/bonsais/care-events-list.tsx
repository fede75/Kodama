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
  items,
  readOnly = false
}: {
  bonsaiId: string;
  items: CareEventListItem[];
  readOnly?: boolean;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 px-6 py-10 text-paper/56">
        Aún no hay cuidados registrados.
      </div>
    );
  }

  return (
    <div className="relative space-y-8 before:absolute before:bottom-0 before:left-[1.1rem] before:top-2 before:w-px before:bg-gradient-to-b before:from-white/12 before:via-white/10 before:to-transparent sm:before:left-[9.6rem] lg:before:left-[12rem]">
      {items.map((item) => {
        const mainPhoto = item.photos[0] ?? null;

        return (
          <article key={item.id} className="relative grid gap-4 sm:grid-cols-[8rem_1fr] lg:grid-cols-[10.5rem_1fr]">
            <div className="relative z-10 pl-10 sm:pl-0">
              <div className="absolute left-0 top-2 h-4 w-4 rounded-full border border-moss-400/40 bg-[#0d1312] shadow-[0_0_0_6px_rgba(10,13,12,1)] sm:left-auto sm:right-[-0.56rem] lg:right-[-0.62rem]" />
              <p className="metadata-label">Fecha</p>
              <p className="mt-2 text-sm leading-6 text-moss-100 sm:text-[0.98rem]">
                {formatDateTime(item.performedAt)}
              </p>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-5 md:grid-cols-[1fr_auto] md:gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    {readOnly ? (
                      <h3 className="font-display text-[clamp(1.65rem,3vw,2.2rem)] leading-[0.98] text-paper">
                        {CARE_EVENT_LABELS[item.type]}
                      </h3>
                    ) : (
                      <Link
                        href={`/bonsais/${bonsaiId}/eventos/${item.id}/editar`}
                        className="inline-flex font-display text-[clamp(1.65rem,3vw,2.2rem)] leading-[0.98] text-paper transition hover:text-moss-200"
                      >
                        {CARE_EVENT_LABELS[item.type]}
                      </Link>
                    )}
                    {item.title ? (
                      <p className="mt-2 text-[0.98rem] text-paper/52">{item.title}</p>
                    ) : null}
                  </div>
                  {!readOnly ? (
                    <div className="shrink-0">
                      <DeleteCareEventForm bonsaiId={bonsaiId} careEventId={item.id} />
                    </div>
                  ) : null}
                </div>

                <p className="max-w-3xl text-[1rem] leading-8 text-paper/76">
                  {item.notes ?? "Sin notas"}
                </p>
              </div>

              <div className="md:w-[11rem]">
                {mainPhoto ? (
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/6 bg-black/20">
                    <img
                      src={mainPhoto.imageUrl}
                      alt={mainPhoto.caption ?? "Imagen del cuidado"}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[10rem] items-end rounded-[1.6rem] border border-white/6 bg-[linear-gradient(135deg,rgba(111,149,70,0.18),rgba(8,10,10,0.94))] p-4 text-[0.76rem] font-semibold uppercase tracking-[0.1em] text-paper/42">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

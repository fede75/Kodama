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
      <p className="rounded-[1.8rem] bg-white/[0.035] px-5 py-6 text-sm text-paper/56">
        Aún no hay cuidados registrados.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const mainPhoto = item.photos[0] ?? null;
        const extraPhotos = item.photos.slice(1, 4);

        return (
          <article
            key={item.id}
            className="relative overflow-hidden rounded-[2rem] surface-soft p-5 shadow-[0_26px_70px_-46px_rgba(0,0,0,0.95)] sm:p-6"
          >
            <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
              <div className="xl:w-[11rem] xl:shrink-0">
                <p className="font-display text-[clamp(1.8rem,4vw,2.2rem)] leading-none text-moss-200">
                  {formatDateTime(item.performedAt)}
                </p>
              </div>

              <div className="xl:w-[10rem] xl:shrink-0">
                {readOnly ? (
                  <p className="font-display text-[clamp(1.7rem,3.5vw,2rem)] leading-none text-paper">
                    {CARE_EVENT_LABELS[item.type]}
                  </p>
                ) : (
                  <Link
                    href={`/bonsais/${bonsaiId}/eventos/${item.id}/editar`}
                    className="inline-flex font-display text-[clamp(1.7rem,3.5vw,2rem)] leading-none text-paper transition hover:text-moss-200"
                  >
                    {CARE_EVENT_LABELS[item.type]}
                  </Link>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-sm leading-7 text-paper/62">
                  {item.notes ?? "Sin notas"}
                </p>
                {extraPhotos.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {extraPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="w-14 shrink-0 overflow-hidden rounded-[0.9rem] bg-black/20"
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption ?? "Imagen del cuidado"}
                          className="aspect-square w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {!readOnly ? (
                <div className="shrink-0 scale-[0.92] origin-left lg:origin-center">
                  <DeleteCareEventForm bonsaiId={bonsaiId} careEventId={item.id} />
                </div>
              ) : null}

              <div className="shrink-0 self-start xl:self-center">
                {mainPhoto ? (
                  <div className="w-[4.5rem] overflow-hidden rounded-[1rem] bg-black/20 sm:w-[5.5rem]">
                    <img
                      src={mainPhoto.imageUrl}
                      alt={mainPhoto.caption ?? "Imagen principal del cuidado"}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex w-[4.5rem] items-end rounded-[1rem] bg-[linear-gradient(135deg,rgba(111,149,70,0.2),rgba(10,13,12,0.85))] p-2 text-[9px] uppercase tracking-[0.14em] text-paper/38 sm:w-[5.5rem] sm:p-3 sm:text-[10px]">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>
            {index < items.length - 1 ? (
              <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

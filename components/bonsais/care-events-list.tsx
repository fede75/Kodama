import Link from "next/link";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { CareEventPhotoGallery } from "@/components/bonsais/care-event-photo-gallery";
import { DeleteCareEventForm } from "@/components/bonsais/delete-care-event-form";
import { TogglePanel } from "@/components/bonsais/toggle-panel";
import { CareEventPhotoUploadForm } from "@/components/bonsais/care-event-photo-upload-form";

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
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 shadow-card"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-1 gap-4">
              {item.photos[0] ? (
                <div className="hidden w-36 shrink-0 overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/20 sm:block">
                  <img
                    src={item.photos[0].imageUrl}
                    alt={item.photos[0].caption ?? "Imagen principal del cuidado"}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-moss-500/20 bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-moss-200">
                    {CARE_EVENT_LABELS[item.type]}
                  </span>
                  <p className="text-xs uppercase tracking-[0.18em] text-paper/38">
                    {formatDateTime(item.performedAt)}
                  </p>
                </div>

                {item.title ? (
                  <h3 className="text-lg font-semibold text-paper">{item.title}</h3>
                ) : null}

                {item.notes ? (
                  <p className="max-w-3xl text-sm leading-7 text-paper/62">
                    {item.notes}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <Link
                href={`/bonsais/${bonsaiId}/eventos/${item.id}/editar`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition hover:border-white/24 hover:bg-white/[0.08]"
              >
                Editar
              </Link>
              <DeleteCareEventForm bonsaiId={bonsaiId} careEventId={item.id} />
            </div>
          </div>

          {item.photos.length > 0 ? (
            <div className="mt-4">
              <CareEventPhotoGallery
                photos={item.photos.map((photo) => ({
                  id: photo.id,
                  bonsaiId,
                  careEventId: item.id,
                  imageUrl: photo.imageUrl,
                  caption: photo.caption,
                  isPrimary: photo.isPrimary,
                  takenAt: photo.takenAt
                }))}
              />
            </div>
          ) : null}

          <div className="mt-4">
            <TogglePanel buttonLabel="Añadir imagen">
              <CareEventPhotoUploadForm careEventId={item.id} />
            </TogglePanel>
          </div>
        </article>
      ))}
    </div>
  );
}

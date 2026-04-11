import Link from "next/link";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
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

              {item.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
                  {item.photos.map((photo) => (
                    <a
                      key={photo.id}
                      href={photo.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-[1.2rem] border border-white/8 bg-black/20"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption ?? "Imagen del cuidado"}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
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

import { setPrimarySpeciesPhotoAction } from "@/app/admin/actions";
import { DeleteSpeciesPhotoForm } from "@/components/species/delete-species-photo-form";
import { formatDate } from "@/lib/utils";

type SpeciesPhotoItem = {
  id: string;
  speciesId: string;
  slug: string;
  imageUrl: string;
  caption: string | null;
  isPrimary: boolean;
  takenAt: Date | string;
};

export function SpeciesPhotoGallery({
  photos,
  readOnly = false
}: {
  photos: SpeciesPhotoItem[];
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="rounded-[1.1rem] surface-soft p-2"
        >
          <div className="overflow-hidden rounded-[0.95rem] bg-black/20">
            <img
              src={photo.imageUrl}
              alt={photo.caption ?? `Imagen de la especie del ${formatDate(photo.takenAt)}`}
              className="aspect-[4/5] h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="px-1 pb-1 pt-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-paper/36">
              {formatDate(photo.takenAt)}
            </p>
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-paper/58 sm:text-xs sm:leading-5">
              {photo.caption ?? "Sin nota"}
            </p>
            {!readOnly ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {photo.isPrimary ? (
                  <span className="inline-flex rounded-full bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-200">
                    Principal
                  </span>
                ) : (
                  <form action={setPrimarySpeciesPhotoAction}>
                    <input type="hidden" name="photoId" value={photo.id} />
                    <input type="hidden" name="speciesId" value={photo.speciesId} />
                    <input type="hidden" name="slug" value={photo.slug} />
                    <button
                      type="submit"
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-paper/72 transition hover:bg-white/[0.1]"
                    >
                      Poner principal
                    </button>
                  </form>
                )}
                <DeleteSpeciesPhotoForm
                  photoId={photo.id}
                  speciesId={photo.speciesId}
                  slug={photo.slug}
                />
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { DeletePhotoForm } from "@/components/bonsais/delete-photo-form";
import { setPrimaryPhotoAction } from "@/app/actions";
import { formatDate } from "@/lib/utils";

type PhotoItem = {
  id: string;
  bonsaiId: string;
  imageUrl: string;
  caption: string | null;
  isPrimary: boolean;
  takenAt: Date | string;
};

export function PhotoGallery({
  photos,
  readOnly = false
}: {
  photos: PhotoItem[];
  readOnly?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === 0 ? photos.length - 1 : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === photos.length - 1 ? 0 : current + 1;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const activePhotoNumber = activeIndex === null ? null : activeIndex + 1;

  function showPreviousPhoto() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? photos.length - 1 : current - 1;
    });
  }

  function showNextPhoto() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === photos.length - 1 ? 0 : current + 1;
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="rounded-[1.1rem] surface-soft p-2"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group block w-full text-left"
              aria-label={`Abrir foto del ${formatDate(photo.takenAt)}`}
            >
              <div className="overflow-hidden rounded-[0.95rem] bg-black/20 transition duration-300 group-hover:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.95)]">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption ?? `Foto del bonsái del ${formatDate(photo.takenAt)}`}
                  className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </button>

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
                    <form action={setPrimaryPhotoAction}>
                      <input type="hidden" name="photoId" value={photo.id} />
                      <input type="hidden" name="bonsaiId" value={photo.bonsaiId} />
                      <button
                        type="submit"
                        className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-paper/72 transition hover:bg-white/[0.1]"
                      >
                        Poner principal
                      </button>
                    </form>
                  )}
                  <DeletePhotoForm photoId={photo.id} bonsaiId={photo.bonsaiId} />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(6,8,8,0.92)] p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between text-sm text-paper/80">
              <div>
                <p className="font-semibold text-paper">
                  {activePhoto.caption ?? "Foto"}
                </p>
                <p className="mt-1">{formatDate(activePhoto.takenAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-full border border-paper/20 px-4 py-2 font-medium text-paper transition hover:border-paper/50 hover:bg-white/10"
              >
                Cerrar
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2.2rem] bg-black/30 shadow-[0_32px_100px_-38px_rgba(0,0,0,0.96)]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption ?? `Foto del bonsái del ${formatDate(activePhoto.takenAt)}`}
                className="max-h-[75vh] w-full object-contain"
              />

              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-paper backdrop-blur transition hover:bg-white/24"
                    aria-label="Ver foto anterior"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-paper backdrop-blur transition hover:bg-white/24"
                    aria-label="Ver foto siguiente"
                  >
                    Siguiente
                  </button>
                </>
              ) : null}
            </div>

            {photos.length > 1 && activePhotoNumber !== null ? (
              <p className="text-center text-sm text-paper/75">
                {activePhotoNumber} / {photos.length}. Usa las flechas del teclado
                para navegar.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

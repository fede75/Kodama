"use client";

import { useEffect, useState } from "react";
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-2 shadow-sm"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group block w-full text-left"
              aria-label={`Abrir foto del ${formatDate(photo.takenAt)}`}
            >
              <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/20 transition group-hover:border-white/14 group-hover:shadow-card">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption ?? `Foto del bonsái del ${formatDate(photo.takenAt)}`}
                  className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </button>

            <div className="px-1 pb-1 pt-3">
              <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-paper/38">
                {formatDate(photo.takenAt)}
              </p>
              {!readOnly ? (
                <div className="mt-3 flex justify-center">
                  {photo.isPrimary ? (
                    <span className="rounded-full border border-moss-500/20 bg-moss-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-200">
                      Principal
                    </span>
                  ) : (
                    <form action={setPrimaryPhotoAction}>
                      <input type="hidden" name="photoId" value={photo.id} />
                      <input type="hidden" name="bonsaiId" value={photo.bonsaiId} />
                      <button
                        type="submit"
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-paper/72 transition hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        Poner principal
                      </button>
                    </form>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-4 sm:p-6"
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

            <div className="relative overflow-hidden rounded-[2rem] border border-paper/10 bg-black/30 shadow-2xl">
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

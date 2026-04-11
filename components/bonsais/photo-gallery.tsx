"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

type PhotoItem = {
  id: string;
  imageUrl: string;
  caption: string | null;
  takenAt: Date | string;
};

export function PhotoGallery({ photos }: { photos: PhotoItem[] }) {
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group text-left"
            aria-label={`Abrir foto del ${formatDate(photo.takenAt)}`}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-bark-100 bg-bark-50 shadow-sm transition group-hover:border-moss-300 group-hover:shadow-card">
              <img
                src={photo.imageUrl}
                alt={photo.caption ?? `Foto del bonsái del ${formatDate(photo.takenAt)}`}
                className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium text-bark-600">
              {formatDate(photo.takenAt)}
            </p>
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark-950/88 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between text-sm text-white/80">
              <div>
                <p className="font-semibold text-white">
                  {activePhoto.caption ?? "Foto de evolución"}
                </p>
                <p className="mt-1">{formatDate(activePhoto.takenAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-full border border-white/20 px-4 py-2 font-medium text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Cerrar
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-black/30 shadow-2xl">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/24"
                    aria-label="Ver foto anterior"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/24"
                    aria-label="Ver foto siguiente"
                  >
                    Siguiente
                  </button>
                </>
              ) : null}
            </div>

            {photos.length > 1 ? (
              <p className="text-center text-sm text-white/75">
                {activeIndex + 1} / {photos.length}. Usa las flechas del teclado
                para navegar.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

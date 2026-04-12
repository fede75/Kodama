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
  const initialIndex = Math.max(
    0,
    photos.findIndex((photo) => photo.isPrimary)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(
      Math.max(
        0,
        photos.findIndex((photo) => photo.isPrimary)
      )
    );
  }, [photos]);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === 0 ? photos.length - 1 : current - 1));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === photos.length - 1 ? 0 : current + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, photos.length]);

  const activePhoto = photos[activeIndex];

  if (!activePhoto) {
    return null;
  }

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block w-full overflow-hidden rounded-[2.25rem] border border-white/6 bg-black/20 text-left"
            aria-label={`Abrir foto principal del ${formatDate(activePhoto.takenAt)}`}
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.caption ?? `Foto del bonsái del ${formatDate(activePhoto.takenAt)}`}
              className="h-[clamp(20rem,48vw,38rem)] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent p-6">
              <p className="metadata-label">Imagen principal</p>
              <p className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.96] text-paper">
                {activePhoto.caption ?? "Evolución del ejemplar"}
              </p>
              <p className="mt-3 text-sm text-paper/60">{formatDate(activePhoto.takenAt)}</p>
            </div>
          </button>

          {!readOnly ? (
            <div className="flex flex-wrap items-center gap-3">
              {activePhoto.isPrimary ? (
                <span className="rounded-full bg-moss-500/12 px-4 py-2 text-sm font-semibold text-moss-100">
                  Portada actual
                </span>
              ) : (
                <form action={setPrimaryPhotoAction}>
                  <input type="hidden" name="photoId" value={activePhoto.id} />
                  <input type="hidden" name="bonsaiId" value={activePhoto.bonsaiId} />
                  <button
                    type="submit"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-paper/82 transition hover:bg-white/[0.08]"
                  >
                    Marcar como principal
                  </button>
                </form>
              )}
              <DeletePhotoForm
                photoId={activePhoto.id}
                bonsaiId={activePhoto.bonsaiId}
              />
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="metadata-label">Secuencia</p>
              <p className="mt-2 text-sm leading-6 text-paper/54">
                Selección de fotografías del proceso.
              </p>
            </div>
            <p className="text-sm text-paper/42">{activeIndex + 1} / {photos.length}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group overflow-hidden rounded-[1.6rem] border p-2 text-left transition ${
                  index === activeIndex
                    ? "border-moss-500/30 bg-white/[0.06]"
                    : "border-white/6 bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                <div className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <div className="overflow-hidden rounded-[1.15rem] bg-black/20">
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption ?? `Foto del ${formatDate(photo.takenAt)}`}
                      className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-between py-1">
                    <div>
                      <p className="metadata-label">{formatDate(photo.takenAt)}</p>
                      <p className="mt-2 line-clamp-3 text-[0.96rem] leading-6 text-paper/76">
                        {photo.caption ?? "Sin nota"}
                      </p>
                    </div>
                    {!readOnly && photo.isPrimary ? (
                      <span className="mt-3 inline-flex w-fit rounded-full bg-moss-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-moss-100">
                        Principal
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,7,7,0.94)] p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-paper">
                  {activePhoto.caption ?? "Fotografía del bonsái"}
                </p>
                <p className="mt-1 text-sm text-paper/62">
                  {formatDate(activePhoto.takenAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-paper transition hover:bg-white/[0.08]"
              >
                Cerrar
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/8 bg-black/30">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption ?? `Foto del bonsái del ${formatDate(activePhoto.takenAt)}`}
                className="max-h-[78vh] w-full object-contain"
              />

              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) =>
                        current === 0 ? photos.length - 1 : current - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-sm font-semibold text-paper transition hover:bg-black/56"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) =>
                        current === photos.length - 1 ? 0 : current + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-sm font-semibold text-paper transition hover:bg-black/56"
                  >
                    Siguiente
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

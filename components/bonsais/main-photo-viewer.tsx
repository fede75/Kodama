"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

export function MainPhotoViewer({
  imageUrl,
  alt,
  caption,
  takenAt
}: {
  imageUrl: string | null;
  alt: string;
  caption?: string | null;
  takenAt?: Date | string | null;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!imageUrl) {
    return (
      <div className="flex h-[360px] items-end bg-gradient-to-br from-moss-900/40 via-black to-clay-900/40 p-6 sm:h-[460px] xl:h-[620px]">
        <div className="rounded-full bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper/72">
          Sin foto
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left"
        aria-label="Abrir imagen principal"
      >
        <img
          src={imageUrl}
          alt={alt}
          className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.015] sm:h-[460px] xl:h-[620px]"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(6,8,8,0.92)] p-4 sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen principal del bonsái"
        >
          <div
            className="relative flex w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm text-paper/72">
                {caption ? <p className="font-semibold text-paper">{caption}</p> : null}
                {takenAt ? <p className="mt-1">{formatDate(takenAt)}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-xl text-paper transition hover:bg-white/[0.14]"
                aria-label="Cerrar"
              >
                X
              </button>
            </div>

            <div className="overflow-hidden rounded-[2.2rem] bg-black/30 shadow-[0_32px_100px_-38px_rgba(0,0,0,0.96)]">
              <img
                src={imageUrl}
                alt={alt}
                className="max-h-[82vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

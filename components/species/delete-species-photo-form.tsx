"use client";

import { useFormStatus } from "react-dom";
import { deleteSpeciesPhotoAction } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-red-100 transition hover:bg-red-500/16 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Borrando..." : "Eliminar"}
    </button>
  );
}

export function DeleteSpeciesPhotoForm({
  photoId,
  speciesId,
  slug
}: {
  photoId: string;
  speciesId: string;
  slug: string;
}) {
  return (
    <form
      action={deleteSpeciesPhotoAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar esta imagen de la especie?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="photoId" value={photoId} />
      <input type="hidden" name="speciesId" value={speciesId} />
      <input type="hidden" name="slug" value={slug} />
      <SubmitButton />
    </form>
  );
}

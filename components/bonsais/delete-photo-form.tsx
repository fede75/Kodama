"use client";

import { useFormStatus } from "react-dom";
import { deleteCareEventPhotoAction, deletePhotoAction } from "@/app/actions";

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

export function DeletePhotoForm({
  photoId,
  bonsaiId
}: {
  photoId: string;
  bonsaiId: string;
}) {
  return (
    <form
      action={deletePhotoAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar esta foto del bonsái?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="photoId" value={photoId} />
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <SubmitButton />
    </form>
  );
}

export function DeleteCareEventPhotoForm({
  photoId,
  careEventId,
  bonsaiId
}: {
  photoId: string;
  careEventId: string;
  bonsaiId: string;
}) {
  return (
    <form
      action={deleteCareEventPhotoAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar esta imagen del cuidado?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="photoId" value={photoId} />
      <input type="hidden" name="careEventId" value={careEventId} />
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <SubmitButton />
    </form>
  );
}

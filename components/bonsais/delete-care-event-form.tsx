"use client";

import { useFormStatus } from "react-dom";
import { deleteCareEventAction } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-100 transition hover:bg-red-500/16 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Eliminando..." : "Borrar"}
    </button>
  );
}

export function DeleteCareEventForm({
  bonsaiId,
  careEventId
}: {
  bonsaiId: string;
  careEventId: string;
}) {
  return (
    <form
      action={deleteCareEventAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar este cuidado?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="careEventId" value={careEventId} />
      <SubmitButton />
    </form>
  );
}

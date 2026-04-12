"use client";

import { useFormStatus } from "react-dom";
import { deletePublicBonsaiCommentAction } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-red-100 transition hover:bg-red-500/16 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Borrando..." : "Eliminar"}
    </button>
  );
}

export function DeleteCommentForm({
  commentId,
  bonsaiId,
  ownerId
}: {
  commentId: string;
  bonsaiId: string;
  ownerId: string;
}) {
  return (
    <form
      action={deletePublicBonsaiCommentAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar este comentario?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      <SubmitButton />
    </form>
  );
}

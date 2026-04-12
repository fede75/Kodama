"use client";

import { useFormStatus } from "react-dom";
import { deletePublicBonsaiCommentAction } from "@/app/actions";
import { type Locale } from "@/lib/i18n";

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-red-100 transition hover:bg-red-500/16 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? locale === "es"
          ? "Borrando..."
          : locale === "en"
            ? "Deleting..."
            : "削除中..."
        : locale === "es"
          ? "Eliminar"
          : locale === "en"
            ? "Delete"
            : "削除"}
    </button>
  );
}

export function DeleteCommentForm({
  commentId,
  bonsaiId,
  ownerId,
  locale
}: {
  commentId: string;
  bonsaiId: string;
  ownerId: string;
  locale: Locale;
}) {
  return (
    <form
      action={deletePublicBonsaiCommentAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            locale === "es"
              ? "¿Eliminar este comentario?"
              : locale === "en"
                ? "Delete this comment?"
                : "このコメントを削除しますか？"
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      <SubmitButton locale={locale} />
    </form>
  );
}

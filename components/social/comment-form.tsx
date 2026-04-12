"use client";

import { useFormStatus } from "react-dom";
import { createPublicBonsaiCommentAction } from "@/app/actions";
import { type Locale } from "@/lib/i18n";

function SubmitButton({ reply, locale }: { reply?: boolean; locale: Locale }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-paper/84 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? locale === "es"
          ? "Enviando..."
          : locale === "en"
            ? "Sending..."
            : "送信中..."
        : reply
          ? locale === "es"
            ? "Responder"
            : locale === "en"
              ? "Reply"
              : "返信"
          : locale === "es"
            ? "Comentar"
            : locale === "en"
              ? "Comment"
              : "コメントする"}
    </button>
  );
}

export function CommentForm({
  bonsaiId,
  ownerId,
  parentCommentId,
  placeholder,
  buttonLabel,
  locale
}: {
  bonsaiId: string;
  ownerId: string;
  parentCommentId?: string;
  placeholder?: string;
  buttonLabel?: string;
  locale: Locale;
}) {
  return (
    <form action={createPublicBonsaiCommentAction} className="space-y-3">
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      {parentCommentId ? (
        <input type="hidden" name="parentCommentId" value={parentCommentId} />
      ) : null}
      <textarea
        name="content"
        required
        rows={parentCommentId ? 3 : 4}
        placeholder={
          placeholder ??
          (locale === "es"
            ? "Comparte una observación o una pregunta sobre este bonsái"
            : locale === "en"
              ? "Share an observation or a question about this bonsai"
              : "この盆栽についての感想や質問を書いてください")
        }
        className="min-h-28 w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/20"
      />
      <div className="flex justify-end">
        {buttonLabel ? (
          <button
            type="submit"
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-paper/84 transition hover:bg-white/[0.08]"
          >
            {buttonLabel}
          </button>
        ) : (
          <SubmitButton reply={Boolean(parentCommentId)} locale={locale} />
        )}
      </div>
    </form>
  );
}

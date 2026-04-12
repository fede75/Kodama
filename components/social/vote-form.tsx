"use client";

import { useFormStatus } from "react-dom";
import { togglePublicBonsaiVoteAction } from "@/app/actions";
import { type Locale } from "@/lib/i18n";

function SubmitButton({
  voted,
  voteCount,
  locale,
  label,
  showCount = true,
  compact = false,
  iconOnly = false
}: {
  voted: boolean;
  voteCount: number;
  locale: Locale;
  label?: string;
  showCount?: boolean;
  compact?: boolean;
  iconOnly?: boolean;
}) {
  const { pending } = useFormStatus();
  const buttonLabel =
    label ??
    (pending
      ? locale === "es"
        ? "Guardando..."
        : locale === "en"
          ? "Saving..."
          : "保存中..."
      : voted
        ? locale === "es"
          ? "Has votado"
          : locale === "en"
            ? "Voted"
            : "投票済み"
        : locale === "es"
          ? "Votar"
          : locale === "en"
            ? "Vote"
            : "投票");

  return (
    <button
      type="submit"
      disabled={pending}
      title={buttonLabel}
      aria-label={buttonLabel}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        voted
          ? "border-moss-500/30 bg-moss-500/14 text-moss-100 hover:bg-moss-500/20"
          : "border-white/10 bg-white/[0.04] text-paper/82 hover:bg-white/[0.08]"
      } ${
        compact ? "px-3 py-1.5 text-[0.76rem] uppercase tracking-[0.08em]" : ""
      } ${
        iconOnly ? "h-8 min-w-8 justify-center px-2 py-0 text-base" : ""
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {iconOnly ? (
        <span aria-hidden="true" className="text-[1.15rem] leading-none">
          {voted ? "♥" : "♡"}
        </span>
      ) : (
        <span>{buttonLabel}</span>
      )}
      {showCount ? (
        <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs text-paper/78">
          {voteCount}
        </span>
      ) : null}
    </button>
  );
}

export function VoteForm({
  bonsaiId,
  ownerId,
  voted,
  voteCount,
  locale,
  label,
  showCount,
  compact,
  iconOnly
}: {
  bonsaiId: string;
  ownerId: string;
  voted: boolean;
  voteCount: number;
  locale: Locale;
  label?: string;
  showCount?: boolean;
  compact?: boolean;
  iconOnly?: boolean;
}) {
  return (
    <form action={togglePublicBonsaiVoteAction}>
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      <SubmitButton
        voted={voted}
        voteCount={voteCount}
        locale={locale}
        label={label}
        showCount={showCount}
        compact={compact}
        iconOnly={iconOnly}
      />
    </form>
  );
}

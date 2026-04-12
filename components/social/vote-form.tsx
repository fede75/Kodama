"use client";

import { useFormStatus } from "react-dom";
import { togglePublicBonsaiVoteAction } from "@/app/actions";

function SubmitButton({
  voted,
  voteCount
}: {
  voted: boolean;
  voteCount: number;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        voted
          ? "border-moss-500/30 bg-moss-500/14 text-moss-100 hover:bg-moss-500/20"
          : "border-white/10 bg-white/[0.04] text-paper/82 hover:bg-white/[0.08]"
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <span>{pending ? "Guardando..." : voted ? "Has votado" : "Votar"}</span>
      <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs text-paper/78">
        {voteCount}
      </span>
    </button>
  );
}

export function VoteForm({
  bonsaiId,
  ownerId,
  voted,
  voteCount
}: {
  bonsaiId: string;
  ownerId: string;
  voted: boolean;
  voteCount: number;
}) {
  return (
    <form action={togglePublicBonsaiVoteAction}>
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      <SubmitButton voted={voted} voteCount={voteCount} />
    </form>
  );
}

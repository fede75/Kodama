"use client";

import { deleteBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";

export function DeleteBonsaiForm({
  bonsaiId,
  iconOnly = false
}: {
  bonsaiId: string;
  iconOnly?: boolean;
}) {
  return (
    <form
      action={deleteBonsaiAction}
      onSubmit={(event) => {
        const isConfirmed = window.confirm(
          "¿Seguro que quieres eliminar este bonsái? Esta acción no se puede deshacer."
        );

        if (!isConfirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="bonsaiId" value={bonsaiId} />
      {iconOnly ? (
        <button
          type="submit"
          className="inline-flex h-12 w-12 items-center justify-center text-paper/62 transition hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400/45"
          aria-label="Eliminar bonsái"
          title="Eliminar bonsái"
        >
          <AppIcon name="trash" className="h-[1.55rem] w-[1.55rem]" />
        </button>
      ) : (
        <Button
          type="submit"
          className="bg-red-700 text-white hover:bg-red-800"
          aria-label="Eliminar bonsái"
          title="Eliminar bonsái"
        >
          <AppIcon name="trash" className="h-[1.45rem] w-[1.45rem]" />
          Eliminar bonsái
        </Button>
      )}
    </form>
  );
}

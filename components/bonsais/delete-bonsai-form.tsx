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
      <Button
        type="submit"
        className={
          iconOnly
            ? "h-11 w-11 rounded-full border-white/14 bg-white/[0.03] px-0 text-red-200 hover:border-red-300/30 hover:bg-red-500/12 hover:text-red-100"
            : "bg-red-700 text-white hover:bg-red-800"
        }
        aria-label="Eliminar bonsái"
        title="Eliminar bonsái"
      >
        <AppIcon name="trash" className="h-[1.1rem] w-[1.1rem]" />
        {iconOnly ? null : "Eliminar bonsái"}
      </Button>
    </form>
  );
}

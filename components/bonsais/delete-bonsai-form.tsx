"use client";

import { deleteBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";

export function DeleteBonsaiForm({ bonsaiId }: { bonsaiId: string }) {
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
        className="bg-red-700 text-white hover:bg-red-800"
      >
        <AppIcon name="trash" className="h-[0.95rem] w-[0.95rem]" />
        Eliminar bonsái
      </Button>
    </form>
  );
}

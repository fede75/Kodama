"use client";

import { deleteBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

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
        variant="danger"
      >
        Eliminar bonsái
      </Button>
    </form>
  );
}

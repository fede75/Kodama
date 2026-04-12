"use client";

import { useRef } from "react";
import { deleteSpeciesAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function DeleteSpeciesForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={deleteSpeciesAction}
      onSubmit={(event) => {
        if (!window.confirm(`¿Eliminar la especie ${slug}?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <Button
        type="submit"
        variant="secondary"
        className="border-red-400/20 bg-red-500/10 text-red-100 hover:border-red-300/30 hover:bg-red-500/16 hover:text-red-50"
      >
        Eliminar
      </Button>
    </form>
  );
}

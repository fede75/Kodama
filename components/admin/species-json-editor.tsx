"use client";

import { useActionState, useEffect, useState } from "react";
import { upsertSpeciesJsonAction, type SpeciesImportState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { Textarea } from "@/components/ui/input";

const initialState: SpeciesImportState = {
  status: "idle"
};

export function SpeciesJsonEditor({
  initialJson,
  exampleJson
}: {
  initialJson: string;
  exampleJson: string;
}) {
  const [state, formAction, pending] = useActionState(upsertSpeciesJsonAction, initialState);
  const [value, setValue] = useState(initialJson);

  useEffect(() => {
    setValue(initialJson);
  }, [initialJson]);

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-4">
        <Textarea
          name="speciesJson"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-[26rem] font-mono text-[0.8rem] leading-6"
          spellCheck={false}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>
            <AppIcon name="edit" className="h-[0.95rem] w-[0.95rem]" />
            {pending ? "Guardando..." : "Guardar especie"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setValue(exampleJson)}
          >
            <AppIcon name="info" className="h-[0.95rem] w-[0.95rem]" />
            Cargar ejemplo
          </Button>
        </div>
      </form>

      {state.message ? (
        <p
          className={
            state.status === "error"
              ? "text-sm text-red-300"
              : "text-sm text-moss-300"
          }
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

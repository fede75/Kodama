import { createCareEventAction, updateCareEventAction } from "@/app/actions";
import { CARE_EVENT_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function CareEventForm({
  bonsai,
  mode = "create",
  careEvent
}: {
  bonsai: {
    id: string;
    name: string;
  };
  mode?: "create" | "edit";
  careEvent?: {
    id: string;
    type: string;
    performedAt: Date;
    title: string | null;
    notes: string | null;
  };
}) {
  const action = mode === "edit" ? updateCareEventAction : createCareEventAction;

  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="bonsaiId" value={bonsai.id} />
      {mode === "edit" && careEvent ? (
        <input type="hidden" name="careEventId" value={careEvent.id} />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Tipo de cuidado">
          <Select
            name="type"
            defaultValue={careEvent?.type ?? "WATERING"}
            required
          >
            {CARE_EVENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Fecha y hora">
          <Input
            name="performedAt"
            type="datetime-local"
            defaultValue={(careEvent?.performedAt ?? new Date())
              .toISOString()
              .slice(0, 16)}
          />
        </FormField>

        <FormField label="Título">
          <Input
            name="title"
            placeholder={`Ej. Riego de ${bonsai.name.toLowerCase()}`}
            defaultValue={careEvent?.title ?? ""}
          />
        </FormField>
      </div>

      <FormField label="Notas">
        <Textarea
          name="notes"
          placeholder="Cantidad de agua, respuesta del árbol, tareas pendientes..."
          defaultValue={careEvent?.notes ?? ""}
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit" className="bg-moss-500 text-paper hover:bg-moss-400">
          {mode === "edit" ? "Guardar cambios" : "Guardar cuidado"}
        </Button>
      </div>
    </form>
  );
}

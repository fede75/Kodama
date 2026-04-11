import { createCareEventAction } from "@/app/actions";
import { CARE_EVENT_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function CareEventForm({
  bonsai
}: {
  bonsai: {
    id: string;
    name: string;
  };
}) {
  return (
    <form action={createCareEventAction} className="grid gap-5">
      <input type="hidden" name="bonsaiId" value={bonsai.id} />

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Tipo de cuidado">
          <Select name="type" defaultValue="WATERING" required>
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
            defaultValue={new Date().toISOString().slice(0, 16)}
          />
        </FormField>

        <FormField label="Título">
          <Input
            name="title"
            placeholder={`Ej. Riego de ${bonsai.name.toLowerCase()}`}
          />
        </FormField>
      </div>

      <FormField label="Notas">
        <Textarea
          name="notes"
          placeholder="Cantidad de agua, respuesta del árbol, tareas pendientes..."
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit">Guardar evento</Button>
      </div>
    </form>
  );
}

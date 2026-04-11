import { createBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";

export function BonsaiForm() {
  return (
    <form action={createBonsaiAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Nombre" hint="Ej. Pino negro del balcón">
          <Input name="name" required placeholder="Nombre del bonsái" />
        </FormField>

        <FormField label="Especie" hint="Nombre común o científico">
          <Input
            name="species"
            required
            placeholder="Juniperus procumbens nana"
          />
        </FormField>

        <FormField label="Estilo">
          <Input name="style" placeholder="Moyogi, Chokkan, Kengai..." />
        </FormField>

        <FormField label="Ubicación">
          <Input name="location" placeholder="Terraza norte, interior..." />
        </FormField>

        <FormField label="Fecha de adquisición">
          <Input name="acquiredAt" type="date" />
        </FormField>
      </div>

      <FormField label="Notas">
        <Textarea
          name="notes"
          placeholder="Observaciones iniciales, sustrato, procedencia..."
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit">Guardar bonsái</Button>
      </div>
    </form>
  );
}

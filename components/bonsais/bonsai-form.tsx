import { createBonsaiAction, updateBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { COLLECTION_STATUS_OPTIONS } from "@/lib/constants";

type BonsaiFormProps = {
  mode?: "create" | "edit";
  bonsai?: {
    id: string;
    name: string;
    species: string;
    style: string | null;
    location: string | null;
    acquiredAt: Date | null;
    notes: string | null;
    collectionStatus: string;
    isPublic: boolean;
  };
};

function formatDateInput(value: Date | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

export function BonsaiForm({
  mode = "create",
  bonsai
}: BonsaiFormProps) {
  const action = mode === "edit" ? updateBonsaiAction : createBonsaiAction;

  return (
    <form action={action} className="grid gap-5">
      {mode === "edit" && bonsai ? (
        <input type="hidden" name="bonsaiId" value={bonsai.id} />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Nombre">
          <Input
            name="name"
            required
            placeholder="Nombre del bonsái"
            defaultValue={bonsai?.name ?? ""}
          />
        </FormField>

        <FormField label="Especie">
          <Input
            name="species"
            required
            placeholder="Juniperus procumbens nana"
            defaultValue={bonsai?.species ?? ""}
          />
        </FormField>

        <FormField label="Estilo">
          <Input
            name="style"
            placeholder="Moyogi, Chokkan, Kengai..."
            defaultValue={bonsai?.style ?? ""}
          />
        </FormField>

        <FormField label="Ubicación">
          <Input
            name="location"
            placeholder="Terraza norte, interior..."
            defaultValue={bonsai?.location ?? ""}
          />
        </FormField>

        <FormField label="Fecha de adquisición">
          <Input
            name="acquiredAt"
            type="date"
            defaultValue={formatDateInput(bonsai?.acquiredAt ?? null)}
          />
        </FormField>

        <FormField label="Estado en colección">
          <Select
            name="collectionStatus"
            defaultValue={bonsai?.collectionStatus ?? "ACTIVE"}
          >
            {COLLECTION_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Notas">
        <Textarea
          name="notes"
          placeholder="Observaciones iniciales, sustrato, procedencia..."
          defaultValue={bonsai?.notes ?? ""}
        />
      </FormField>

      <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-paper/78">
        <input
          type="checkbox"
          name="isPublic"
          defaultChecked={bonsai?.isPublic ?? true}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        <span>Mostrar este bonsái en la colección pública</span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" className="bg-moss-500 text-paper hover:bg-moss-400">
          {mode === "edit" ? "Guardar cambios" : "Guardar bonsái"}
        </Button>
      </div>
    </form>
  );
}

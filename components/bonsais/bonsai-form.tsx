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
    ageAtAcquisitionYears: number | null;
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
    <form action={action} className="grid gap-8">
      {mode === "edit" && bonsai ? (
        <input type="hidden" name="bonsaiId" value={bonsai.id} />
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div>
            <p className="metadata-label">Identidad</p>
            <h2 className="mt-3 font-display text-3xl text-paper">
              Datos del ejemplar
            </h2>
          </div>

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
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/6 bg-white/[0.025] p-5">
          <p className="metadata-label">Contexto</p>
          <div className="mt-4 grid gap-5">
            <FormField label="Fecha de adquisición">
              <Input
                name="acquiredAt"
                type="date"
                defaultValue={formatDateInput(bonsai?.acquiredAt ?? null)}
              />
            </FormField>

            <FormField
              label="Edad al comprarlo"
              hint="Edad estimada en años en el momento de adquisición"
            >
              <Input
                name="ageAtAcquisitionYears"
                type="number"
                min="0"
                step="1"
                placeholder="Ej. 8"
                defaultValue={bonsai?.ageAtAcquisitionYears ?? ""}
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
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <p className="metadata-label">Observación</p>
            <h2 className="mt-3 font-display text-3xl text-paper">
              Notas iniciales
            </h2>
          </div>

          <FormField
            label="Notas"
            hint="Sustrato, procedencia, primeras impresiones o tareas pendientes"
          >
            <Textarea
              name="notes"
              placeholder="Observaciones iniciales, sustrato, procedencia..."
              defaultValue={bonsai?.notes ?? ""}
            />
          </FormField>
        </div>

        <div className="space-y-4">
          <div>
            <p className="metadata-label">Visibilidad</p>
            <h2 className="mt-3 font-display text-3xl text-paper">
              Colección pública
            </h2>
          </div>

          <label className="flex items-start gap-4 rounded-[1.8rem] border border-white/8 bg-white/[0.025] px-5 py-5 text-paper/78">
            <input
              type="checkbox"
              name="isPublic"
              defaultChecked={bonsai?.isPublic ?? true}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
            />
            <span className="space-y-2">
              <span className="block text-[0.98rem] font-semibold text-paper">
                Mostrar este bonsái en la colección pública
              </span>
              <span className="block text-sm leading-6 text-paper/48">
                Permite que otros usuarios descubran el árbol, lo voten y comenten su evolución.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div className="quiet-rule" />

      <div className="flex justify-end">
        <Button type="submit" className="px-7 py-3">
          {mode === "edit" ? "Guardar cambios" : "Guardar bonsái"}
        </Button>
      </div>
    </form>
  );
}

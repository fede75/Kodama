import { updateCollectionSettingsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export function CollectionSettingsForm({
  user
}: {
  user: {
    collectionLocation: string | null;
    isCollectionPublic: boolean;
    showCareInPublic: boolean;
  };
}) {
  return (
    <form action={updateCollectionSettingsAction} className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="metadata-label">Identidad pública</p>
          <h2 className="mt-3 font-display text-3xl text-paper">Contexto de la colección</h2>
        </div>
        <FormField label="Localización" hint="Se mostrará como referencia geográfica en la colección pública">
          <Input
            name="collectionLocation"
            placeholder="Madrid"
            defaultValue={user.collectionLocation ?? ""}
          />
        </FormField>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <label className="flex items-start gap-4 rounded-[1.9rem] border border-white/8 bg-white/[0.025] px-5 py-5 text-paper/78">
          <input
            type="checkbox"
            name="isCollectionPublic"
            defaultChecked={user.isCollectionPublic}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
          />
          <span className="space-y-2">
            <span className="block text-[0.98rem] font-semibold text-paper">
              Hacer pública mi colección
            </span>
            <span className="block text-sm leading-6 text-paper/48">
              Permite que otros usuarios visiten tu colección y exploren tus árboles visibles.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-4 rounded-[1.9rem] border border-white/8 bg-white/[0.025] px-5 py-5 text-paper/78">
          <input
            type="checkbox"
            name="showCareInPublic"
            defaultChecked={user.showCareInPublic}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
          />
          <span className="space-y-2">
            <span className="block text-[0.98rem] font-semibold text-paper">
              Mostrar cuidados en la colección pública
            </span>
            <span className="block text-sm leading-6 text-paper/48">
              Comparte también la evolución y el historial de cuidados de los bonsáis públicos.
            </span>
          </span>
        </label>
      </section>

      <div className="quiet-rule" />

      <div className="flex justify-end">
        <Button type="submit" className="px-7 py-3">
          Guardar ajustes
        </Button>
      </div>
    </form>
  );
}

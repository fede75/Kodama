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
    <form action={updateCollectionSettingsAction} className="space-y-6">
      <FormField label="Localización">
        <Input
          name="collectionLocation"
          placeholder="Madrid"
          defaultValue={user.collectionLocation ?? ""}
        />
      </FormField>

      <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-paper/78">
        <input
          type="checkbox"
          name="isCollectionPublic"
          defaultChecked={user.isCollectionPublic}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        <span>Hacer pública mi colección</span>
      </label>

      <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-paper/78">
        <input
          type="checkbox"
          name="showCareInPublic"
          defaultChecked={user.showCareInPublic}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        <span>Mostrar cuidados en la colección pública</span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" className="bg-moss-500 text-paper hover:bg-moss-400">
          Guardar ajustes
        </Button>
      </div>
    </form>
  );
}

import { createBonsaiAction, updateBonsaiAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getCollectionStatusOptions, type Locale } from "@/lib/i18n";

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
  bonsai,
  locale
}: BonsaiFormProps & { locale: Locale }) {
  const action = mode === "edit" ? updateBonsaiAction : createBonsaiAction;
  const statusOptions = getCollectionStatusOptions(locale);

  return (
    <form action={action} className="grid gap-5">
      {mode === "edit" && bonsai ? (
        <input type="hidden" name="bonsaiId" value={bonsai.id} />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label={locale === "es" ? "Nombre" : locale === "en" ? "Name" : "名前"}>
          <Input
            name="name"
            required
            placeholder={locale === "es" ? "Nombre del bonsái" : locale === "en" ? "Bonsai name" : "盆栽の名前"}
            defaultValue={bonsai?.name ?? ""}
          />
        </FormField>

        <FormField label={locale === "es" ? "Especie" : locale === "en" ? "Species" : "樹種"}>
          <Input
            name="species"
            required
            placeholder="Juniperus procumbens nana"
            defaultValue={bonsai?.species ?? ""}
          />
        </FormField>

        <FormField label={locale === "es" ? "Estilo" : locale === "en" ? "Style" : "樹形"}>
          <Input
            name="style"
            placeholder={locale === "ja" ? "模様木、直幹、懸崖..." : "Moyogi, Chokkan, Kengai..."}
            defaultValue={bonsai?.style ?? ""}
          />
        </FormField>

        <FormField label={locale === "es" ? "Ubicación" : locale === "en" ? "Location" : "置き場所"}>
          <Input
            name="location"
            placeholder={
              locale === "es"
                ? "Terraza norte, interior..."
                : locale === "en"
                  ? "North terrace, indoors..."
                  : "北向きのテラス、室内..."
            }
            defaultValue={bonsai?.location ?? ""}
          />
        </FormField>

        <FormField label={locale === "es" ? "Fecha de adquisición" : locale === "en" ? "Acquisition date" : "取得日"}>
          <Input
            name="acquiredAt"
            type="date"
            defaultValue={formatDateInput(bonsai?.acquiredAt ?? null)}
          />
        </FormField>

        <FormField
          label={
            locale === "es"
              ? "Edad al comprarlo"
              : locale === "en"
                ? "Age when acquired"
                : "取得時の樹齢"
          }
          hint={
            locale === "es"
              ? "Edad estimada en años en el momento de adquisición"
              : locale === "en"
                ? "Estimated age in years at the time of acquisition"
                : "取得時点でのおおよその樹齢（年）"
          }
        >
          <Input
            name="ageAtAcquisitionYears"
            type="number"
            min="0"
            step="1"
            placeholder={locale === "ja" ? "例: 8" : locale === "en" ? "e.g. 8" : "Ej. 8"}
            defaultValue={bonsai?.ageAtAcquisitionYears ?? ""}
          />
        </FormField>

        <FormField label={locale === "es" ? "Estado en colección" : locale === "en" ? "Collection status" : "コレクション状態"}>
          <Select
            name="collectionStatus"
            defaultValue={bonsai?.collectionStatus ?? "ACTIVE"}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label={locale === "es" ? "Notas" : locale === "en" ? "Notes" : "メモ"}>
        <Textarea
          name="notes"
          placeholder={
            locale === "es"
              ? "Observaciones iniciales, sustrato, procedencia..."
              : locale === "en"
                ? "Initial observations, substrate, origin..."
                : "初期メモ、用土、入手元..."
          }
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
        <span>
          {locale === "es"
            ? "Mostrar este bonsái en la colección pública"
            : locale === "en"
              ? "Show this bonsai in the public collection"
              : "この盆栽を公開コレクションに表示する"}
        </span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" className="bg-moss-500 text-paper hover:bg-moss-400">
          {mode === "edit"
            ? locale === "es"
              ? "Guardar cambios"
              : locale === "en"
                ? "Save changes"
                : "変更を保存"
            : locale === "es"
              ? "Guardar bonsái"
              : locale === "en"
                ? "Save bonsai"
                : "盆栽を保存"}
        </Button>
      </div>
    </form>
  );
}

import { updateCollectionSettingsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { type Locale } from "@/lib/i18n";

export function CollectionSettingsForm({
  user,
  locale
}: {
  locale: Locale;
  user: {
    collectionLocation: string | null;
    isCollectionPublic: boolean;
    showCareInPublic: boolean;
  };
}) {
  return (
    <form action={updateCollectionSettingsAction} className="space-y-6">
      <FormField label={locale === "es" ? "Localización" : locale === "en" ? "Location" : "所在地"}>
        <Input
          name="collectionLocation"
          placeholder={locale === "ja" ? "マドリード" : "Madrid"}
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
        <span>
          {locale === "es"
            ? "Hacer pública mi colección"
            : locale === "en"
              ? "Make my collection public"
              : "自分のコレクションを公開する"}
        </span>
      </label>

      <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-paper/78">
        <input
          type="checkbox"
          name="showCareInPublic"
          defaultChecked={user.showCareInPublic}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        <span>
          {locale === "es"
            ? "Mostrar cuidados en la colección pública"
            : locale === "en"
              ? "Show care history in the public collection"
              : "公開コレクションで手入れ履歴を表示する"}
        </span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" className="bg-moss-500 text-paper hover:bg-moss-400">
          {locale === "es" ? "Guardar ajustes" : locale === "en" ? "Save settings" : "設定を保存"}
        </Button>
      </div>
    </form>
  );
}

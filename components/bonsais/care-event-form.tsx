"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { saveCareEventAction } from "@/app/actions";
import { CareEventPhotoGallery } from "@/components/bonsais/care-event-photo-gallery";
import { CareEventPhotoUploadForm } from "@/components/bonsais/care-event-photo-upload-form";
import {
  getCareEventLabel,
  getDictionary,
  type Locale
} from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function CareEventForm({
  bonsai,
  mode = "create",
  careEvent,
  locale = "es"
}: {
  bonsai: {
    id: string;
    name: string;
  };
  mode?: "create" | "edit";
  locale?: Locale;
  careEvent?: {
    id: string;
    type: string;
    performedAt: Date;
    title: string | null;
    notes: string | null;
    photos?: Array<{
      id: string;
      imageUrl: string;
      caption: string | null;
      isPrimary: boolean;
      takenAt: Date;
    }>;
  };
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(careEvent?.type ?? "WATERING");
  const [performedAt, setPerformedAt] = useState(
    (careEvent?.performedAt ?? new Date()).toISOString().slice(0, 16)
  );
  const [title, setTitle] = useState(careEvent?.title ?? "");
  const [notes, setNotes] = useState(careEvent?.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dict = getDictionary(locale);
  const careEventOptions = ([
    "WATERING",
    "FERTILIZING",
    "PRUNING",
    "PINCHING",
    "REPOTTING",
    "WIRING",
    "DEFOLIATION",
    "PEST_TREATMENT"
  ] as const).map((value) => ({
    value,
    label: getCareEventLabel(locale, value)
  }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const result = await saveCareEventAction({
        bonsaiId: bonsai.id,
        careEventId: careEvent?.id,
        type,
        performedAt,
        title,
        notes
      });

      const files = Array.from(fileInputRef.current?.files ?? []);

      if (files.length > 0) {
        await Promise.all(
          files.map((file, index) =>
            upload(`care-events/${result.careEventId}/${Date.now()}-${index}-${file.name}`, file, {
              access: "public",
              handleUploadUrl: "/api/care-photos/upload",
              clientPayload: JSON.stringify({
                careEventId: result.careEventId,
                caption: title.trim() || undefined
              })
            })
          )
        );
      }

      router.push(`/bonsais/${bonsai.id}`);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : locale === "es"
            ? "No se pudo guardar el cuidado."
            : locale === "en"
              ? "The care entry could not be saved."
              : "手入れを保存できませんでした。"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label={locale === "es" ? "Tipo de cuidado" : locale === "en" ? "Care type" : "手入れの種類"}>
          <Select
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
          >
            {careEventOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label={locale === "es" ? "Fecha y hora" : locale === "en" ? "Date and time" : "日時"}>
          <Input
            name="performedAt"
            type="datetime-local"
            value={performedAt}
            onChange={(event) => setPerformedAt(event.target.value)}
          />
        </FormField>

        <FormField label={locale === "es" ? "Título" : locale === "en" ? "Title" : "タイトル"}>
          <Input
            name="title"
            placeholder={
              locale === "es"
                ? `Ej. Riego de ${bonsai.name.toLowerCase()}`
                : locale === "en"
                  ? `e.g. Watering ${bonsai.name}`
                  : `${bonsai.name} の手入れ`
            }
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormField>
      </div>

      <FormField label={locale === "es" ? "Notas" : locale === "en" ? "Notes" : "メモ"}>
        <Textarea
          name="notes"
          placeholder={
            locale === "es"
              ? "Cantidad de agua, respuesta del árbol, tareas pendientes..."
              : locale === "en"
                ? "Amount of water, tree response, pending tasks..."
                : "水量、樹の反応、残作業..."
          }
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </FormField>

      <FormField label={locale === "es" ? "Imágenes" : locale === "en" ? "Images" : "画像"}>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={isSaving}
        />
      </FormField>

      {error ? <p className="text-sm text-red-200">{error}</p> : null}

      {mode === "edit" && careEvent?.id ? (
        <div className="space-y-4 rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold text-paper/78">
            {locale === "es" ? "Imágenes actuales" : locale === "en" ? "Current images" : "現在の画像"}
          </p>

          {careEvent.photos && careEvent.photos.length > 0 ? (
            <CareEventPhotoGallery
              photos={careEvent.photos.map((photo) => ({
                id: photo.id,
                bonsaiId: bonsai.id,
                careEventId: careEvent.id,
                imageUrl: photo.imageUrl,
                caption: photo.caption,
                isPrimary: photo.isPrimary,
                takenAt: photo.takenAt
              }))}
            />
          ) : (
            <p className="text-sm text-paper/52">
              {locale === "es" ? "Sin imágenes registradas." : locale === "en" ? "No images recorded." : "画像はまだ登録されていません。"}
            </p>
          )}

          <CareEventPhotoUploadForm careEventId={careEvent.id} />
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-moss-500 text-paper hover:bg-moss-400"
        >
          {isSaving
            ? locale === "es"
              ? "Guardando..."
              : locale === "en"
                ? "Saving..."
                : "保存中..."
            : mode === "edit"
              ? dict.common.saveChanges
              : locale === "es"
                ? "Guardar cuidado"
                : locale === "en"
                  ? "Save care entry"
                  : "手入れを保存"}
        </Button>
      </div>
    </form>
  );
}

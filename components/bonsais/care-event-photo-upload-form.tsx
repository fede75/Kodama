"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export function CareEventPhotoUploadForm({
  careEventId
}: {
  careEventId: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError("Selecciona una imagen.");
      return;
    }

    setIsUploading(true);

    try {
      const pathname = `care-events/${careEventId}/${Date.now()}-${file.name}`;

      await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/care-photos/upload",
        clientPayload: JSON.stringify({
          careEventId,
          caption: caption.trim()
        })
      });

      setCaption("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo subir la imagen."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-4"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <FormField label="Imagen">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={isUploading}
            required
          />
        </FormField>

        <FormField label="Nota">
          <Input
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Detalle opcional"
            disabled={isUploading}
          />
        </FormField>

        <Button
          type="submit"
          disabled={isUploading}
          className="bg-moss-500 text-paper hover:bg-moss-400"
        >
          {isUploading ? "Subiendo..." : "Subir"}
        </Button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}
    </form>
  );
}

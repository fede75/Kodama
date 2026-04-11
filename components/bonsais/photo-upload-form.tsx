"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export function PhotoUploadForm({
  bonsaiId
}: {
  bonsaiId: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError("Selecciona una imagen antes de subirla.");
      return;
    }

    setIsUploading(true);

    try {
      const pathname = `bonsais/${bonsaiId}/${Date.now()}-${file.name}`;

      await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/photos/upload",
        clientPayload: JSON.stringify({
          bonsaiId,
          caption: caption.trim()
        })
      });

      setSuccess("Foto subida correctamente.");
      setCaption("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo subir la foto."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Imagen"
        hint="JPEG, PNG o WebP. La subida se envía directamente a Vercel Blob."
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isUploading}
          required
        />
      </FormField>

      <FormField label="Pie de foto">
        <Input
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder="Ej. Brotación de primavera"
          disabled={isUploading}
        />
      </FormField>

      {error ? (
        <p className="rounded-2xl bg-red-500/12 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-2xl bg-moss-500/12 px-4 py-3 text-sm text-moss-200">
          {success}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isUploading}
        className="w-full bg-moss-500 text-paper hover:bg-moss-400 sm:w-auto"
      >
        {isUploading ? "Subiendo foto..." : "Subir foto"}
      </Button>
    </form>
  );
}

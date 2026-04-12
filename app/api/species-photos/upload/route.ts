import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-guards";
import { createSpeciesPhoto, getSpeciesForAdmin } from "@/lib/species";

type UploadTokenPayload = {
  speciesId: string;
  slug: string;
  userId: string;
  caption?: string;
};

function parseTokenPayload(value: string | null | undefined): UploadTokenPayload {
  if (!value) {
    throw new Error("Falta información de la especie para asociar la imagen.");
  }

  const parsed = JSON.parse(value) as UploadTokenPayload;

  if (!parsed.speciesId || !parsed.slug) {
    throw new Error("No se ha recibido una especie válida.");
  }

  return parsed;
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const user = await getCurrentUser();

        if (!user || user.role !== "ADMIN") {
          throw new Error("Debes ser administrador para subir imágenes de especies.");
        }

        const payload = parseTokenPayload(clientPayload);
        const species = await getSpeciesForAdmin(payload.slug);

        if (!species || species.id !== payload.speciesId) {
          throw new Error("No se puede subir una imagen a una especie inexistente.");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          addRandomSuffix: true,
          callbackUrl: request.url,
          tokenPayload: JSON.stringify({
            ...payload,
            userId: user.id
          })
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = parseTokenPayload(tokenPayload);
        const species = await getSpeciesForAdmin(payload.slug);

        if (!species || species.id !== payload.speciesId) {
          throw new Error("No se puede asociar la imagen a la especie indicada.");
        }

        await createSpeciesPhoto({
          speciesId: payload.speciesId,
          imageUrl: blob.url,
          caption: payload.caption
        });
      }
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload error" },
      { status: 400 }
    );
  }
}

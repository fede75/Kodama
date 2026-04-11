import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { createCareEventPhoto, getCareEventDetail } from "@/lib/bonsais";
import { getCurrentUser } from "@/lib/auth-guards";

type UploadTokenPayload = {
  careEventId: string;
  userId: string;
  caption?: string;
};

function parseTokenPayload(value: string | null | undefined): UploadTokenPayload {
  if (!value) {
    throw new Error("Falta información del cuidado para asociar la imagen.");
  }

  const parsed = JSON.parse(value) as UploadTokenPayload;

  if (!parsed.careEventId) {
    throw new Error("No se ha recibido un cuidado válido.");
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

        if (!user) {
          throw new Error("Debes iniciar sesión para subir imágenes.");
        }

        const payload = parseTokenPayload(clientPayload);
        const careEvent = await getCareEventDetail(payload.careEventId, null, user.id);

        if (!careEvent) {
          throw new Error("No se puede subir una imagen a un cuidado inexistente.");
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
        const careEvent = await getCareEventDetail(
          payload.careEventId,
          null,
          payload.userId
        );

        if (!careEvent) {
          throw new Error("No se puede asociar la imagen al cuidado indicado.");
        }

        await createCareEventPhoto({
          careEventId: payload.careEventId,
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

import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { createPhoto, getBonsaiDetail } from "@/lib/bonsais";
import { getDefaultUser } from "@/lib/default-user";

type UploadTokenPayload = {
  bonsaiId: string;
  caption?: string;
};

function parseTokenPayload(value: string | null | undefined): UploadTokenPayload {
  if (!value) {
    throw new Error("Falta información del bonsái para asociar la foto.");
  }

  const parsed = JSON.parse(value) as UploadTokenPayload;

  if (!parsed.bonsaiId) {
    throw new Error("No se ha recibido un bonsái válido.");
  }

  return parsed;
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const user = await getDefaultUser();

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const payload = parseTokenPayload(clientPayload);
        const bonsai = await getBonsaiDetail(payload.bonsaiId, user.id);

        if (!bonsai) {
          throw new Error("No se puede subir una foto a un bonsái inexistente.");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify(payload)
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = parseTokenPayload(tokenPayload);

        await createPhoto({
          bonsaiId: payload.bonsaiId,
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

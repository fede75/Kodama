"use server";

import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { deleteSpeciesBySlug, parseSpeciesJson, upsertSpeciesFromJson } from "@/lib/species";

function parseRole(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  return value === UserRole.ADMIN || value === UserRole.USER ? value : null;
}

export async function updateUserRoleAction(formData: FormData) {
  const admin = await requireAdmin();
  const userId =
    typeof formData.get("userId") === "string"
      ? String(formData.get("userId"))
      : "";
  const role = parseRole(formData.get("role"));

  if (!userId || !role) {
    throw new Error("Faltan datos para actualizar el rol.");
  }

  if (admin.id === userId && role !== UserRole.ADMIN) {
    const adminCount = await prisma.user.count({
      where: { role: UserRole.ADMIN }
    });

    if (adminCount <= 1) {
      throw new Error("Debe existir al menos un administrador activo.");
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  revalidatePath("/admin");
}

export type SpeciesImportState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function upsertSpeciesJsonAction(
  _prevState: SpeciesImportState,
  formData: FormData
): Promise<SpeciesImportState> {
  await requireAdmin();
  const rawJson =
    typeof formData.get("speciesJson") === "string"
      ? String(formData.get("speciesJson"))
      : "";

  if (!rawJson.trim()) {
    return {
      status: "error",
      message: "Pega un JSON de especie antes de guardar."
    };
  }

  try {
    const payload = parseSpeciesJson(rawJson);
    const species = await upsertSpeciesFromJson(payload);

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/especies");
    revalidatePath(`/especies/${species.slug}`);

    return {
      status: "success",
      message: `Especie ${species.slug} guardada correctamente.`
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No se ha podido guardar la especie."
    };
  }
}

export async function deleteSpeciesAction(formData: FormData) {
  await requireAdmin();
  const slug =
    typeof formData.get("slug") === "string"
      ? String(formData.get("slug")).trim()
      : "";

  if (!slug) {
    throw new Error("Falta el slug de la especie.");
  }

  await deleteSpeciesBySlug(slug);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/especies");
  revalidatePath(`/especies/${slug}`);
  redirect("/admin");
}

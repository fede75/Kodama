"use server";

import { CareEventType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBonsai, createCareEvent, getBonsaiDetail } from "@/lib/bonsais";
import { getDefaultUser } from "@/lib/default-user";

function parseOptionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseDate(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export async function createBonsaiAction(formData: FormData) {
  const user = await getDefaultUser();
  const name = parseOptionalString(formData.get("name"));
  const species = parseOptionalString(formData.get("species"));

  if (!name || !species) {
    throw new Error("Nombre y especie son obligatorios.");
  }

  const bonsai = await createBonsai({
    userId: user.id,
    name,
    species,
    style: parseOptionalString(formData.get("style")),
    location: parseOptionalString(formData.get("location")),
    notes: parseOptionalString(formData.get("notes")),
    acquiredAt: parseDate(formData.get("acquiredAt"))
  });

  revalidatePath("/bonsais");
  redirect(`/bonsais/${bonsai.id}`);
}

export async function createCareEventAction(formData: FormData) {
  const user = await getDefaultUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));
  const type = parseOptionalString(formData.get("type"));
  const validTypes = Object.values(CareEventType);

  if (!bonsaiId || !type || !validTypes.includes(type as CareEventType)) {
    throw new Error("Debes seleccionar un bonsái y un tipo de evento válido.");
  }

  const bonsai = await getBonsaiDetail(bonsaiId, user.id);

  if (!bonsai) {
    throw new Error("El bonsái indicado no existe o no pertenece al usuario actual.");
  }

  await createCareEvent({
    bonsaiId,
    type: type as CareEventType,
    title: parseOptionalString(formData.get("title")),
    notes: parseOptionalString(formData.get("notes")),
    performedAt: parseDate(formData.get("performedAt")) ?? new Date()
  });

  revalidatePath("/bonsais");
  revalidatePath(`/bonsais/${bonsaiId}`);
  revalidatePath(`/bonsais/${bonsaiId}/eventos/nuevo`);
  redirect(`/bonsais/${bonsaiId}`);
}

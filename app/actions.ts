"use server";

import { CareEventType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBonsai,
  createCareEvent,
  deleteBonsai,
  getBonsaiDetail,
  setPrimaryPhoto,
  updateBonsai
} from "@/lib/bonsais";
import { requireCurrentUser } from "@/lib/auth-guards";

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
  const user = await requireCurrentUser();
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
  const user = await requireCurrentUser();
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

export async function updateBonsaiAction(formData: FormData) {
  const user = await requireCurrentUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));
  const name = parseOptionalString(formData.get("name"));
  const species = parseOptionalString(formData.get("species"));

  if (!bonsaiId || !name || !species) {
    throw new Error("Nombre, especie y bonsái son obligatorios.");
  }

  const bonsai = await getBonsaiDetail(bonsaiId, user.id);

  if (!bonsai) {
    throw new Error("El bonsái indicado no existe o no pertenece al usuario actual.");
  }

  await updateBonsai(bonsaiId, user.id, {
    name,
    species,
    style: parseOptionalString(formData.get("style")),
    location: parseOptionalString(formData.get("location")),
    notes: parseOptionalString(formData.get("notes")),
    acquiredAt: parseDate(formData.get("acquiredAt"))
  });

  revalidatePath("/bonsais");
  revalidatePath(`/bonsais/${bonsaiId}`);
  revalidatePath(`/bonsais/${bonsaiId}/editar`);
  redirect(`/bonsais/${bonsaiId}`);
}

export async function deleteBonsaiAction(formData: FormData) {
  const user = await requireCurrentUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));

  if (!bonsaiId) {
    throw new Error("Falta el bonsái a eliminar.");
  }

  const bonsai = await getBonsaiDetail(bonsaiId, user.id);

  if (!bonsai) {
    throw new Error("El bonsái indicado no existe o no pertenece al usuario actual.");
  }

  await deleteBonsai(bonsaiId, user.id);

  revalidatePath("/bonsais");
  redirect("/bonsais");
}

export async function setPrimaryPhotoAction(formData: FormData) {
  const user = await requireCurrentUser();
  const photoId = parseOptionalString(formData.get("photoId"));
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));

  if (!photoId || !bonsaiId) {
    throw new Error("Faltan datos para marcar la foto principal.");
  }

  await setPrimaryPhoto({
    photoId,
    bonsaiId,
    userId: user.id
  });

  revalidatePath("/bonsais");
  revalidatePath(`/bonsais/${bonsaiId}`);
}

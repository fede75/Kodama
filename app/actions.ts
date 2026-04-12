"use server";

import { del } from "@vercel/blob";
import { CareEventType, CollectionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBonsai,
  createCareEvent,
  deleteCareEventPhoto,
  deleteCareEvent,
  deleteBonsai,
  deletePhoto,
  getCareEventDetail,
  getBonsaiDetail,
  setPrimaryCareEventPhoto,
  setPrimaryPhoto,
  updateCollectionSettings,
  updateCareEvent,
  updateBonsai
} from "@/lib/bonsais";
import { requireCurrentUser } from "@/lib/auth-guards";
import { isVercelBlobUrl } from "@/lib/blob";

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

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "on";
}

function parseOptionalInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export async function createBonsaiAction(formData: FormData) {
  const user = await requireCurrentUser();
  const name = parseOptionalString(formData.get("name"));
  const species = parseOptionalString(formData.get("species"));
  const collectionStatus = parseOptionalString(formData.get("collectionStatus"));

  if (
    !name ||
    !species ||
    !collectionStatus ||
    !Object.values(CollectionStatus).includes(collectionStatus as CollectionStatus)
  ) {
    throw new Error("Nombre y especie son obligatorios.");
  }

  const bonsai = await createBonsai({
    userId: user.id,
    name,
    species,
    style: parseOptionalString(formData.get("style")),
    location: parseOptionalString(formData.get("location")),
    notes: parseOptionalString(formData.get("notes")),
    acquiredAt: parseDate(formData.get("acquiredAt")),
    ageAtAcquisitionYears: parseOptionalInteger(formData.get("ageAtAcquisitionYears")),
    collectionStatus: collectionStatus as CollectionStatus,
    isPublic: parseCheckbox(formData.get("isPublic"))
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

export async function saveCareEventAction(input: {
  bonsaiId: string;
  careEventId?: string;
  type: string;
  performedAt?: string;
  title?: string;
  notes?: string;
}) {
  const user = await requireCurrentUser();
  const validTypes = Object.values(CareEventType);

  if (!input.bonsaiId || !validTypes.includes(input.type as CareEventType)) {
    throw new Error("Debes seleccionar un cuidado válido.");
  }

  const bonsai = await getBonsaiDetail(input.bonsaiId, user.id);

  if (!bonsai) {
    throw new Error("El bonsái indicado no existe o no pertenece al usuario actual.");
  }

  const parsedDate = input.performedAt ? parseDate(input.performedAt) : undefined;

  if (input.careEventId) {
    const careEvent = await getCareEventDetail(input.careEventId, input.bonsaiId, user.id);

    if (!careEvent) {
      throw new Error("El cuidado indicado no existe o no pertenece al usuario actual.");
    }

    await updateCareEvent({
      careEventId: input.careEventId,
      bonsaiId: input.bonsaiId,
      userId: user.id,
      type: input.type as CareEventType,
      title: input.title?.trim() || undefined,
      notes: input.notes?.trim() || undefined,
      performedAt: parsedDate ?? new Date()
    });

    revalidatePath(`/bonsais/${input.bonsaiId}`);
    revalidatePath(`/bonsais/${input.bonsaiId}/eventos/${input.careEventId}/editar`);

    return { careEventId: input.careEventId };
  }

  const careEvent = await createCareEvent({
    bonsaiId: input.bonsaiId,
    type: input.type as CareEventType,
    title: input.title?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    performedAt: parsedDate ?? new Date()
  });

  revalidatePath(`/bonsais/${input.bonsaiId}`);
  revalidatePath(`/bonsais/${input.bonsaiId}/eventos/nuevo`);

  return { careEventId: careEvent.id };
}

export async function updateCareEventAction(formData: FormData) {
  const user = await requireCurrentUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));
  const careEventId = parseOptionalString(formData.get("careEventId"));
  const type = parseOptionalString(formData.get("type"));
  const validTypes = Object.values(CareEventType);

  if (
    !bonsaiId ||
    !careEventId ||
    !type ||
    !validTypes.includes(type as CareEventType)
  ) {
    throw new Error("Debes seleccionar un cuidado válido.");
  }

  const careEvent = await getCareEventDetail(careEventId, bonsaiId, user.id);

  if (!careEvent) {
    throw new Error("El cuidado indicado no existe o no pertenece al usuario actual.");
  }

  await updateCareEvent({
    careEventId,
    bonsaiId,
    userId: user.id,
    type: type as CareEventType,
    title: parseOptionalString(formData.get("title")),
    notes: parseOptionalString(formData.get("notes")),
    performedAt: parseDate(formData.get("performedAt")) ?? new Date()
  });

  revalidatePath(`/bonsais/${bonsaiId}`);
  revalidatePath(`/bonsais/${bonsaiId}/eventos/${careEventId}/editar`);
  redirect(`/bonsais/${bonsaiId}`);
}

export async function deleteCareEventAction(formData: FormData) {
  const user = await requireCurrentUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));
  const careEventId = parseOptionalString(formData.get("careEventId"));

  if (!bonsaiId || !careEventId) {
    throw new Error("Faltan datos para eliminar el cuidado.");
  }

  const careEvent = await getCareEventDetail(careEventId, bonsaiId, user.id);

  if (!careEvent) {
    throw new Error("El cuidado indicado no existe o no pertenece al usuario actual.");
  }

  await deleteCareEvent(careEventId, bonsaiId, user.id);

  revalidatePath(`/bonsais/${bonsaiId}`);
}

export async function updateBonsaiAction(formData: FormData) {
  const user = await requireCurrentUser();
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));
  const name = parseOptionalString(formData.get("name"));
  const species = parseOptionalString(formData.get("species"));
  const collectionStatus = parseOptionalString(formData.get("collectionStatus"));

  if (
    !bonsaiId ||
    !name ||
    !species ||
    !collectionStatus ||
    !Object.values(CollectionStatus).includes(collectionStatus as CollectionStatus)
  ) {
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
    acquiredAt: parseDate(formData.get("acquiredAt")),
    ageAtAcquisitionYears: parseOptionalInteger(formData.get("ageAtAcquisitionYears")),
    collectionStatus: collectionStatus as CollectionStatus,
    isPublic: parseCheckbox(formData.get("isPublic"))
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

export async function updateCollectionSettingsAction(formData: FormData) {
  const user = await requireCurrentUser();

  await updateCollectionSettings({
    userId: user.id,
    collectionLocation: parseOptionalString(formData.get("collectionLocation")),
    isCollectionPublic: parseCheckbox(formData.get("isCollectionPublic")),
    showCareInPublic: parseCheckbox(formData.get("showCareInPublic"))
  });

  revalidatePath("/ajustes");
  revalidatePath("/colecciones-publicas");
  revalidatePath(`/colecciones-publicas/${user.id}`);
}

export async function setPrimaryCareEventPhotoAction(formData: FormData) {
  const user = await requireCurrentUser();
  const photoId = parseOptionalString(formData.get("photoId"));
  const careEventId = parseOptionalString(formData.get("careEventId"));
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));

  if (!photoId || !careEventId || !bonsaiId) {
    throw new Error("Faltan datos para marcar la imagen principal.");
  }

  await setPrimaryCareEventPhoto({
    photoId,
    careEventId,
    userId: user.id
  });

  revalidatePath(`/bonsais/${bonsaiId}`);
}

export async function deletePhotoAction(formData: FormData) {
  const user = await requireCurrentUser();
  const photoId = parseOptionalString(formData.get("photoId"));
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));

  if (!photoId || !bonsaiId) {
    throw new Error("Faltan datos para eliminar la foto.");
  }

  const photo = await deletePhoto({
    photoId,
    bonsaiId,
    userId: user.id
  });

  if (isVercelBlobUrl(photo.imageUrl)) {
    try {
      await del(photo.imageUrl);
    } catch (error) {
      console.error("No se pudo eliminar el archivo de Blob", error);
    }
  }

  revalidatePath("/bonsais");
  revalidatePath(`/bonsais/${bonsaiId}`);
}

export async function deleteCareEventPhotoAction(formData: FormData) {
  const user = await requireCurrentUser();
  const photoId = parseOptionalString(formData.get("photoId"));
  const careEventId = parseOptionalString(formData.get("careEventId"));
  const bonsaiId = parseOptionalString(formData.get("bonsaiId"));

  if (!photoId || !careEventId || !bonsaiId) {
    throw new Error("Faltan datos para eliminar la imagen.");
  }

  const photo = await deleteCareEventPhoto({
    photoId,
    careEventId,
    userId: user.id
  });

  if (isVercelBlobUrl(photo.imageUrl)) {
    try {
      await del(photo.imageUrl);
    } catch (error) {
      console.error("No se pudo eliminar el archivo de Blob", error);
    }
  }

  revalidatePath(`/bonsais/${bonsaiId}`);
  revalidatePath(`/bonsais/${bonsaiId}/eventos/${careEventId}/editar`);
}

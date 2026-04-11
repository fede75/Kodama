"use server";

import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

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

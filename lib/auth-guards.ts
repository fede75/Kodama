import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.user.id }
  });
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireCurrentUser();

  if (user.role !== UserRole.ADMIN) {
    redirect("/bonsais");
  }

  return user;
}

import { UserRole } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getPrimaryEmail(user: Awaited<ReturnType<typeof currentUser>>) {
  if (!user) {
    return null;
  }

  const primaryEmail =
    user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    ) ?? user.emailAddresses[0];

  return primaryEmail?.emailAddress.toLowerCase() ?? null;
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();
  const email = getPrimaryEmail(clerkUser);

  if (!clerkUser || !email) {
    return null;
  }

  const adminEmails = parseAdminEmails();
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ clerkId: userId }, { email }]
    }
  });

  const desiredRole =
    existingUser?.role === UserRole.ADMIN || adminEmails.includes(email)
      ? UserRole.ADMIN
      : UserRole.USER;

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: {
        clerkId: userId,
        email,
        name: clerkUser.fullName ?? clerkUser.firstName ?? existingUser.name,
        image: clerkUser.imageUrl,
        role: desiredRole
      }
    });
  }

  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? email.split("@")[0],
      image: clerkUser.imageUrl,
      role: desiredRole
    }
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

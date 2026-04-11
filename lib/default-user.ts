import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_EMAIL } from "@/lib/constants";

export async function getDefaultUser() {
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_USER_EMAIL }
  });

  if (!user) {
    throw new Error(
      `No se ha encontrado el usuario de desarrollo (${DEFAULT_USER_EMAIL}). Ejecuta el seed antes de iniciar la app.`
    );
  }

  return user;
}

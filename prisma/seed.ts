import { PrismaClient, CareEventType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "dev@kodama.local" },
    update: {},
    create: {
      email: "dev@kodama.local",
      name: "Usuario Kodama"
    }
  });

  const bonsai = await prisma.bonsai.upsert({
    where: { id: "seed-bonsai-juniper" },
    update: {},
    create: {
      id: "seed-bonsai-juniper",
      userId: user.id,
      name: "Junípero del patio",
      species: "Juniperus procumbens nana",
      style: "Moyogi",
      location: "Terraza sur",
      notes: "Ejemplar de entrenamiento para seguimiento semanal."
    }
  });

  const existingEvents = await prisma.careEvent.count({
    where: { bonsaiId: bonsai.id }
  });

  if (existingEvents === 0) {
    await prisma.careEvent.createMany({
      data: [
        {
          bonsaiId: bonsai.id,
          type: CareEventType.WATERING,
          performedAt: new Date("2026-04-08T08:00:00.000Z"),
          title: "Riego profundo",
          notes: "Hasta drenaje completo."
        },
        {
          bonsaiId: bonsai.id,
          type: CareEventType.PRUNING,
          performedAt: new Date("2026-04-05T10:30:00.000Z"),
          title: "Poda ligera",
          notes: "Recorte de brotes largos para mantener silueta."
        }
      ]
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

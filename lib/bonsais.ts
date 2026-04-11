import { CareEventType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const bonsaiListInclude = {
  careEvents: {
    orderBy: { performedAt: "desc" as const },
    take: 1
  },
  photos: {
    orderBy: [{ isPrimary: "desc" as const }, { takenAt: "desc" as const }],
    take: 1
  },
  _count: {
    select: {
      careEvents: true,
      healthIssues: true,
      journal: true,
      photos: true
    }
  }
};

const bonsaiDetailInclude = {
  careEvents: {
    orderBy: { performedAt: "desc" as const },
    include: {
      photos: {
        orderBy: { takenAt: "desc" as const }
      }
    }
  },
  healthIssues: {
    orderBy: { detectedAt: "desc" as const }
  },
  journal: {
    orderBy: { entryDate: "desc" as const }
  },
  photos: {
    orderBy: [{ isPrimary: "desc" as const }, { takenAt: "desc" as const }]
  }
};

export async function listBonsais(userId: string) {
  return prisma.bonsai.findMany({
    where: { userId },
    include: bonsaiListInclude,
    orderBy: { createdAt: "desc" }
  });
}

export async function getBonsaiDetail(id: string, userId: string) {
  return prisma.bonsai.findFirst({
    where: { id, userId },
    include: bonsaiDetailInclude
  });
}

export async function createBonsai(
  input: Prisma.BonsaiUncheckedCreateInput
) {
  return prisma.bonsai.create({
    data: input
  });
}

export async function updateBonsai(
  id: string,
  userId: string,
  input: Prisma.BonsaiUncheckedUpdateInput
) {
  return prisma.bonsai.updateMany({
    where: { id, userId },
    data: input
  });
}

export async function deleteBonsai(id: string, userId: string) {
  return prisma.bonsai.deleteMany({
    where: { id, userId }
  });
}

export async function createCareEvent(input: {
  bonsaiId: string;
  type: CareEventType;
  performedAt: Date;
  title?: string;
  notes?: string;
}) {
  return prisma.careEvent.create({
    data: input
  });
}

export async function getCareEventDetail(
  careEventId: string,
  bonsaiId: string | null,
  userId: string
) {
  return prisma.careEvent.findFirst({
    where: {
      id: careEventId,
      ...(bonsaiId ? { bonsaiId } : {}),
      bonsai: {
        userId
      }
    },
    include: {
      bonsai: {
        select: {
          id: true,
          name: true
        }
      },
      photos: {
        orderBy: { takenAt: "desc" }
      }
    }
  });
}

export async function updateCareEvent(input: {
  careEventId: string;
  bonsaiId: string;
  userId: string;
  type: CareEventType;
  performedAt: Date;
  title?: string;
  notes?: string;
}) {
  return prisma.careEvent.updateMany({
    where: {
      id: input.careEventId,
      bonsaiId: input.bonsaiId,
      bonsai: {
        userId: input.userId
      }
    },
    data: {
      type: input.type,
      performedAt: input.performedAt,
      title: input.title,
      notes: input.notes
    }
  });
}

export async function deleteCareEvent(
  careEventId: string,
  bonsaiId: string,
  userId: string
) {
  return prisma.careEvent.deleteMany({
    where: {
      id: careEventId,
      bonsaiId,
      bonsai: {
        userId
      }
    }
  });
}

export async function createCareEventPhoto(input: {
  careEventId: string;
  imageUrl: string;
  caption?: string;
  takenAt?: Date;
}) {
  return prisma.careEventPhoto.create({
    data: {
      careEventId: input.careEventId,
      imageUrl: input.imageUrl,
      caption: input.caption,
      takenAt: input.takenAt ?? new Date()
    }
  });
}

export async function createPhoto(input: {
  bonsaiId: string;
  imageUrl: string;
  caption?: string;
  takenAt?: Date;
}) {
  return prisma.$transaction(async (tx) => {
    const existingPhoto = await tx.photo.findFirst({
      where: { bonsaiId: input.bonsaiId },
      select: { id: true }
    });

    return tx.photo.create({
      data: {
        bonsaiId: input.bonsaiId,
        imageUrl: input.imageUrl,
        caption: input.caption,
        isPrimary: !existingPhoto,
        takenAt: input.takenAt ?? new Date()
      }
    });
  });
}

export async function setPrimaryPhoto(input: {
  photoId: string;
  bonsaiId: string;
  userId: string;
}) {
  const bonsai = await prisma.bonsai.findFirst({
    where: {
      id: input.bonsaiId,
      userId: input.userId,
      photos: {
        some: {
          id: input.photoId
        }
      }
    },
    select: { id: true }
  });

  if (!bonsai) {
    throw new Error("La foto indicada no existe o no pertenece al usuario actual.");
  }

  await prisma.$transaction([
    prisma.photo.updateMany({
      where: { bonsaiId: input.bonsaiId },
      data: { isPrimary: false }
    }),
    prisma.photo.update({
      where: { id: input.photoId },
      data: { isPrimary: true }
    })
  ]);
}

export async function getLatestCareEvents(userId: string, limit = 6) {
  return prisma.careEvent.findMany({
    where: {
      bonsai: {
        userId
      }
    },
    include: {
      bonsai: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      performedAt: "desc"
    },
    take: limit
  });
}

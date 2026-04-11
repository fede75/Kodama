import { CareEventType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const bonsaiListInclude = {
  careEvents: {
    orderBy: { performedAt: "desc" as const },
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
    orderBy: { performedAt: "desc" as const }
  },
  healthIssues: {
    orderBy: { detectedAt: "desc" as const }
  },
  journal: {
    orderBy: { entryDate: "desc" as const }
  },
  photos: {
    orderBy: { takenAt: "desc" as const }
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

export async function createPhoto(input: {
  bonsaiId: string;
  imageUrl: string;
  caption?: string;
  takenAt?: Date;
}) {
  return prisma.photo.create({
    data: {
      bonsaiId: input.bonsaiId,
      imageUrl: input.imageUrl,
      caption: input.caption,
      takenAt: input.takenAt ?? new Date()
    }
  });
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

import { getBonsaiDetail } from "@/lib/bonsais";

export type TimelineItem = {
  id: string;
  kind: "care" | "health" | "journal" | "photo";
  date: Date;
  title: string;
  description?: string | null;
};

export async function getBonsaiTimeline(id: string, userId: string) {
  const bonsai = await getBonsaiDetail(id, userId);

  if (!bonsai) {
    return null;
  }

  const items: TimelineItem[] = [
    ...bonsai.careEvents.map((event) => ({
      id: event.id,
      kind: "care" as const,
      date: event.performedAt,
      title: event.title ?? event.type,
      description: event.notes
    })),
    ...bonsai.healthIssues.map((issue) => ({
      id: issue.id,
      kind: "health" as const,
      date: issue.detectedAt,
      title: issue.title,
      description: issue.description
    })),
    ...bonsai.journal.map((entry) => ({
      id: entry.id,
      kind: "journal" as const,
      date: entry.entryDate,
      title: entry.title ?? "Entrada de bitácora",
      description: entry.content
    })),
    ...bonsai.photos.map((photo) => ({
      id: photo.id,
      kind: "photo" as const,
      date: photo.takenAt,
      title: photo.caption ?? "Foto",
      description: photo.imageUrl
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return { bonsai, items };
}

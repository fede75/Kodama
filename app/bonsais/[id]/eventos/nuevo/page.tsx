import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth-guards";
import { CareEventForm } from "@/components/bonsais/care-event-form";
import { Button } from "@/components/ui/button";
import { getBonsaiDetail } from "@/lib/bonsais";

export const dynamic = "force-dynamic";

export default async function NewCareEventPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireCurrentUser();
  const bonsai = await getBonsaiDetail(id, user.id);

  if (!bonsai) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-paper">
            Añadir evento
          </h1>
        </div>

        <Link href={`/bonsais/${bonsai.id}`}>
          <Button
            variant="secondary"
            className="border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
          >
            Volver
          </Button>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-8 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)]">
        <CareEventForm bonsai={bonsai} />
      </div>
    </div>
  );
}

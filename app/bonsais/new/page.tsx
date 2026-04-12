import Link from "next/link";
import { requireCurrentUser } from "@/lib/auth-guards";
import { BonsaiForm } from "@/components/bonsais/bonsai-form";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/icon";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function NewBonsaiPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  await requireCurrentUser();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-paper">{dict.bonsai.addTitle}</h1>
        </div>

        <Link href="/bonsais">
          <Button
            variant="secondary"
            className="border-white/14 bg-white/[0.03] text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
            aria-label={dict.common.back}
          >
            <AppIcon name="arrow-left" className="h-[1rem] w-[1rem]" />
          </Button>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)] sm:p-8">
        <BonsaiForm locale={locale} />
      </div>
    </div>
  );
}

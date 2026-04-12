import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-bark-100 bg-white/90 p-10 text-center shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
        {dict.notFound.kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl text-bark-900">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 text-bark-700">
        {dict.notFound.description}
      </p>
      <div className="mt-6">
        <Link href="/bonsais">
          <Button>{dict.notFound.cta}</Button>
        </Link>
      </div>
    </div>
  );
}

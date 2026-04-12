import Link from "next/link";
import { FeaturedBonsaiCard } from "@/components/social/featured-bonsai-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";
import { listFeaturedBonsais } from "@/lib/bonsais";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function FeaturedBonsaisPage({
  searchParams
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const currentUser = await getCurrentUser();
  const params = await searchParams;
  const range =
    params?.range === "all"
      ? "all"
      : params?.range === "liked"
        ? "liked"
        : "30d";
  const bonsais = await listFeaturedBonsais({
    range,
    limit: 30,
    currentUserId: currentUser?.id
  });

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="editorial-kicker text-xs">{dict.featuredPage.kicker}</p>
          <h1 className="font-display text-4xl leading-none text-paper sm:text-5xl">
            {dict.featuredPage.title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-paper/50 sm:text-base">
            {dict.featuredPage.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/bonsais-destacados?range=30d">
            <Button variant={range === "30d" ? "primary" : "secondary"}>
              {dict.featuredPage.last30Days}
            </Button>
          </Link>
          <Link href="/bonsais-destacados?range=all">
            <Button variant={range === "all" ? "primary" : "secondary"}>
              {dict.featuredPage.allTime}
            </Button>
          </Link>
          <Link href="/bonsais-destacados?range=liked">
            <Button variant={range === "liked" ? "primary" : "secondary"}>
              {dict.featuredPage.likedByMe}
            </Button>
          </Link>
        </div>
      </section>

      {bonsais.length === 0 ? (
        <div className="rounded-[2rem] surface-soft p-6 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-8">
          {range === "liked"
            ? currentUser
              ? dict.featuredPage.emptyLiked
              : dict.featuredPage.signInForLiked
            : dict.featuredPage.empty}
        </div>
      ) : (
        <section className="grid gap-6">
          {bonsais.map((bonsai, index) => (
            <FeaturedBonsaiCard
              key={bonsai.id}
              bonsai={bonsai}
              rank={index + 1}
              rangeLabel={
                range === "30d"
                  ? dict.featuredPage.range30d
                  : range === "all"
                    ? dict.featuredPage.rangeAll
                    : dict.featuredPage.rangeLiked
              }
              locale={locale}
            />
          ))}
        </section>
      )}
    </div>
  );
}

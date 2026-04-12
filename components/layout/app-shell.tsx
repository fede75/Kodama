import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/auth-guards";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { TopNav } from "@/components/layout/top-nav";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const navItems = user
    ? [
        { href: "/", label: dict.nav.home, icon: "home" as const },
        { href: "/especies", label: dict.nav.species },
        { href: "/colecciones-publicas", label: dict.nav.publicCollections },
        { href: "/bonsais-destacados", label: dict.nav.featuredBonsais },
        { href: "/bonsais", label: dict.nav.myCollection },
        { href: "/ajustes", label: dict.nav.settings, icon: "settings" as const },
        ...(user.role === "ADMIN"
          ? [{ href: "/admin", label: dict.nav.admin, icon: "admin" as const }]
          : [])
      ]
    : [
        { href: "/", label: dict.nav.home, icon: "home" as const },
        { href: "/especies", label: dict.nav.species },
        { href: "/colecciones-publicas", label: dict.nav.publicCollections },
        { href: "/bonsais-destacados", label: dict.nav.featuredBonsais }
      ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
      <header className="sticky top-2 z-40 mb-6 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(8,11,10,0.9),rgba(8,11,10,0.82),rgba(8,11,10,0.72))] px-3 py-3 backdrop-blur-xl sm:top-3 sm:mb-8 sm:rounded-[1.6rem] sm:px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-3 self-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-[linear-gradient(135deg,rgba(118,154,74,0.22),rgba(14,18,17,0.82))] text-base font-semibold text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:h-12 sm:w-12">
              木
            </div>
            <div>
              <p className="font-display text-[clamp(1.7rem,4vw,2.2rem)] leading-none tracking-[0.03em] text-paper">
                Kodama
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <TopNav items={navItems} />
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <LanguageSwitcher locale={locale} />
              {user ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-10 w-10 ring-1 ring-white/8 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.85)]"
                    }
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

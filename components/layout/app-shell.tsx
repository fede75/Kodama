import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/auth-guards";
import { TopNav } from "@/components/layout/top-nav";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const navItems = user
    ? [
        { href: "/", label: "Inicio" },
        { href: "/bonsais-destacados", label: "Bonsáis destacados" },
        { href: "/colecciones-publicas", label: "Colecciones públicas" },
        { href: "/bonsais", label: "Mi colección" },
        { href: "/bonsais/new", label: "Registra bonsái" },
        { href: "/ajustes", label: "Ajustes" },
        ...(user.role === "ADMIN"
          ? [{ href: "/admin", label: "Administración" }]
          : [])
      ]
    : [
        { href: "/", label: "Acceso" },
        { href: "/bonsais-destacados", label: "Bonsáis destacados" },
        { href: "/colecciones-publicas", label: "Colecciones públicas" }
      ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
      <header className="sticky top-2 z-40 mb-6 rounded-[1.4rem] border border-white/5 bg-[linear-gradient(180deg,rgba(8,11,10,0.92),rgba(8,11,10,0.84))] px-4 py-4 shadow-[0_24px_90px_-52px_rgba(0,0,0,0.95)] sm:top-3 sm:mb-8 sm:rounded-[1.7rem] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-3 self-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/8 bg-[linear-gradient(135deg,rgba(118,154,74,0.18),rgba(14,18,17,0.96))] text-base font-semibold text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-12 sm:w-12">
              木
            </div>
            <div>
              <p className="font-display text-[clamp(1.7rem,4vw,2.25rem)] leading-none tracking-[0.02em] text-paper">
                Kodama
              </p>
              <p className="mt-1 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-paper/34">
                Cuaderno vivo de bonsáis
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <TopNav items={navItems} />
            {user ? (
              <div className="self-start lg:self-auto">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-10 w-10 ring-1 ring-white/10 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.9)]"
                    }
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

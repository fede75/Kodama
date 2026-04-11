import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/auth-guards";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const navItems = user
    ? [
        { href: "/", label: "Inicio" },
        { href: "/bonsais", label: "Colección" },
        { href: "/bonsais/new", label: "Registra bonsái" },
        ...(user.role === "ADMIN"
          ? [{ href: "/admin", label: "Administración" }]
          : [])
      ]
    : [{ href: "/", label: "Acceso" }];

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-10 overflow-hidden rounded-[2.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,22,21,0.94),rgba(11,14,13,0.9))] px-6 py-6 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.78)] backdrop-blur md:px-8">
        <div className="relative flex flex-col gap-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-clay-700/20 blur-3xl" />
          <div className="pointer-events-none absolute left-20 top-10 h-24 w-24 rounded-full bg-moss-500/15 blur-3xl" />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-clay-600 via-ink-800 to-black text-xl font-semibold text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]">
                木
              </div>
              <div>
                <p className="font-display text-3xl tracking-[0.04em] text-paper">
                  Kodama
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-paper/82">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-moss-500/40 hover:bg-white/[0.08] hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <div className="rounded-full border border-white/10 bg-white/[0.05] p-1">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-9 w-9"
                      }
                    }}
                  />
                </div>
              ) : null}
            </nav>
          </div>

        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

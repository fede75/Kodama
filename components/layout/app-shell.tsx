import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "@/app/auth-actions";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const navItems = session?.user
    ? [
        { href: "/", label: "Inicio" },
        { href: "/bonsais", label: "Bonsáis" },
        { href: "/bonsais/new", label: "Crear bonsái" },
        ...(session.user.role === "ADMIN"
          ? [{ href: "/admin", label: "Administración" }]
          : [])
      ]
    : [{ href: "/", label: "Acceso" }];

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-10 overflow-hidden rounded-[2.5rem] border border-ink-200/70 bg-paper/85 px-6 py-6 shadow-paper backdrop-blur md:px-8">
        <div className="relative flex flex-col gap-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300/70 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-clay-200/40 blur-3xl" />
          <div className="pointer-events-none absolute left-20 top-10 h-24 w-24 rounded-full bg-moss-200/35 blur-3xl" />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-clay-200 bg-gradient-to-br from-clay-500 via-clay-600 to-ink-700 text-xl font-semibold text-paper shadow-card">
                木
              </div>
              <div>
                <p className="font-display text-3xl tracking-[0.04em] text-ink-900">
                  Kodama
                </p>
                <p className="text-sm uppercase tracking-[0.18em] text-ink-500">
                  Atelier de cuidado y memoria viva
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-ink-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-ink-200 bg-white/50 px-4 py-2 transition hover:border-clay-300 hover:bg-white/80 hover:text-clay-700"
                >
                  {item.label}
                </Link>
              ))}
              {session?.user ? (
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="rounded-full border border-ink-200 bg-white/50 px-4 py-2 transition hover:border-clay-300 hover:bg-white/80 hover:text-clay-700"
                  >
                    Salir
                  </button>
                </form>
              ) : null}
            </nav>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-ink-200/70 pt-4 text-sm text-ink-600">
            <p>
              {session?.user
                ? `Sesión iniciada como ${session.user.name ?? session.user.email}`
                : "Acceso seguro con Google para colección, evolución y cuidados."}
            </p>
            <p className="hidden uppercase tracking-[0.3em] text-clay-600 md:block">
              Madrid Atelier
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

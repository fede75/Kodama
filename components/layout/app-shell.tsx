import Link from "next/link";

const navItems = [
  { href: "/bonsais", label: "Bonsáis" },
  { href: "/bonsais/new", label: "Crear bonsái" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-bark-100/80 bg-white/80 px-6 py-5 shadow-card backdrop-blur">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href="/bonsais" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-moss-500 to-bark-500 text-lg font-semibold text-white">
                K
              </div>
              <div>
                <p className="font-display text-2xl text-bark-900">
                  Kodama
                </p>
                <p className="text-sm text-bark-600">
                  Tu cuaderno vivo para cuidar bonsáis.
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-bark-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-bark-200 bg-bark-50 px-4 py-2 transition hover:border-moss-400 hover:text-moss-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";

export default async function HomePage() {
  const { userId } = await auth();
  const currentUser = userId ? await getCurrentUser() : null;
  const isAuthenticated = Boolean(userId);

  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-[3rem] border border-ink-200/70 bg-paper/90 shadow-paper">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-12 h-48 w-48 rounded-full bg-moss-200/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-clay-200/35 blur-3xl" />

        <div className="grid gap-8 px-7 py-7 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-10">
          <div className="relative z-10 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-clay-700">
                Atelier japonés contemporáneo
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-6xl leading-[0.88] text-ink-950 sm:text-7xl xl:text-[5.6rem]">
                  Accede a un cuaderno de bonsáis tratado como una edición de autor.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink-700">
                  Kodama une fotografía, observación y memoria viva en una
                  experiencia premium. Entra con Google, crea tu archivo personal
                  y sigue cada árbol como si fuera una pieza en evolución.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <SignedIn>
                  <Link href="/bonsais">
                    <Button className="bg-ink-950 px-6 py-3 text-sm tracking-[0.08em] hover:bg-clay-700">
                      Entrar en mi colección
                    </Button>
                  </Link>
                  <Link href="/bonsais/new">
                    <Button
                      variant="secondary"
                      className="border-ink-300 bg-white/70 px-6 py-3 text-sm tracking-[0.08em] hover:border-clay-300 hover:bg-white"
                    >
                      Registrar un bonsái
                    </Button>
                  </Link>
                  {currentUser?.role === "ADMIN" ? (
                    <Link href="/admin">
                      <Button
                        variant="secondary"
                        className="border-ink-300 bg-white/70 px-6 py-3 text-sm tracking-[0.08em] hover:border-clay-300 hover:bg-white"
                      >
                        Administración
                      </Button>
                    </Link>
                  ) : null}
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <span>
                      <Button
                        className="bg-ink-950 px-6 py-3 text-sm tracking-[0.08em] hover:bg-clay-700"
                      >
                        Acceder con Google
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="border-ink-300 bg-white/70 px-6 py-3 text-sm tracking-[0.08em] hover:border-clay-300 hover:bg-white"
                      >
                        Crear cuenta con Google
                      </Button>
                    </span>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-ink-200/70 bg-ink-950 px-6 py-5 text-paper shadow-card">
                <p className="text-xs uppercase tracking-[0.3em] text-paper/55">
                  Login simple
                </p>
                <p className="mt-4 max-w-sm font-display text-3xl leading-tight">
                  Alta instantánea y acceso seguro con Google, sin fricción ni formularios largos.
                </p>
              </div>

              <div className="rounded-[2rem] border border-ink-200/70 bg-white/60 px-6 py-5 shadow-card">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  Multiusuario
                </p>
                <div className="mt-5 grid gap-4">
                  <div>
                    <p className="font-display text-4xl text-ink-900">1</p>
                    <p className="mt-1 text-sm text-ink-600">
                      acceso personal por usuario
                    </p>
                  </div>
                  <div className="border-t border-ink-200/70 pt-4">
                    <p className="text-sm leading-7 text-ink-700">
                      La aplicación separa colección, fotos y actividad por
                      cuenta, con opción de administración para supervisar el sistema.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-[700px]">
            <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-ink-950 via-ink-900 to-clay-900 shadow-paper" />
            <div className="absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_36%),linear-gradient(180deg,_transparent_15%,_rgba(0,0,0,0.35)_100%)]" />

            <div className="absolute left-6 top-6 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-paper/80 backdrop-blur">
              Portada de acceso
            </div>

            <div className="absolute inset-[1.15rem] overflow-hidden rounded-[2.2rem] border border-white/10">
              <img
                src="/images/kodama-hero-fallback.svg"
                alt="Bonsái editorial de acceso"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-20 z-20 rounded-[2rem] border border-ink-200/70 bg-paper/92 p-6 shadow-paper backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-clay-700">
                Inicio de sesión premium
              </p>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-display text-4xl leading-none text-ink-950">
                    Ritmo, archivo y cuidado
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-500">
                    Acceso a tu taller digital
                  </p>
                </div>
                <div className="text-sm leading-7 text-ink-700">
                  <p>
                    Una puerta de entrada con más presencia visual, preparada
                    para autenticación real y experiencia multiusuario.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 right-0 z-20 hidden max-w-[240px] rounded-[1.8rem] border border-white/10 bg-white/10 p-5 text-paper shadow-card backdrop-blur xl:block">
              <p className="text-xs uppercase tracking-[0.26em] text-paper/55">
                Administración
              </p>
              <p className="mt-3 text-sm leading-7 text-paper/90">
                Los usuarios con rol administrador podrán revisar cuentas y gestionar permisos desde el panel interno.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="relative overflow-hidden rounded-[2.6rem] border border-ink-200/70 bg-white/65 p-7 shadow-card">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300/80 to-transparent" />
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            Qué cambia
          </p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-none text-ink-950">
            Kodama pasa de demo individual a producto real de acceso compartido.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-ink-200/70 bg-paper/80 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-clay-700">
                Cuentas
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                Cada usuario entra con Google y ve únicamente su propia colección y actividad.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-ink-200/70 bg-paper/80 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-clay-700">
                Roles
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                El sistema diferencia entre usuario estándar y administrador para proteger la gestión global.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-ink-200/70 bg-paper/80 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-clay-700">
                Administración
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                Un panel interno permite revisar usuarios, roles y la salud general del sistema.
              </p>
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[2.6rem] border border-ink-200/70 bg-ink-950 p-7 text-paper shadow-paper">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_30%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-paper/55">
              Acceso y alta
            </p>
            <p className="mt-4 font-display text-4xl leading-tight">
              Una sola integración, dos recorridos claros: entrar o darse de alta.
            </p>
            <p className="mt-4 text-sm leading-7 text-paper/78">
              Con Google OAuth, la primera autenticación crea la cuenta y las
              siguientes recuperan la sesión. El acceso se siente limpio y natural.
            </p>
            {!isAuthenticated ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <SignInButton mode="modal">
                  <span>
                    <Button className="bg-paper text-ink-950 hover:bg-clay-100">
                      Acceder
                    </Button>
                  </span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <span>
                    <Button
                      variant="secondary"
                      className="border-paper/25 bg-white/10 text-paper hover:border-paper/50 hover:bg-white/15 hover:text-paper"
                    >
                      Darme de alta
                    </Button>
                  </span>
                </SignUpButton>
              </div>
            ) : (
              <Link href="/bonsais" className="mt-8 inline-flex">
                <Button className="bg-paper text-ink-950 hover:bg-clay-100">
                  Ir a la aplicación
                </Button>
              </Link>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

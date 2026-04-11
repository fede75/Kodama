import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import heroImage from "@/img/bonsai-hero.jpg";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";

export default async function HomePage() {
  const { userId } = await auth();
  const currentUser = userId ? await getCurrentUser() : null;
  const isAuthenticated = Boolean(userId);

  return (
    <div className="space-y-14 pb-10">
      <section className="hero-reveal relative overflow-hidden rounded-[3.2rem] border border-ink-200/70 bg-paper shadow-paper">
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_42%)] lg:w-[43%]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[42%] bg-[radial-gradient(circle_at_top_left,rgba(111,149,70,0.14),transparent_44%),linear-gradient(180deg,rgba(248,241,231,0.95),rgba(239,228,214,0.88))]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-l from-black/50 via-black/12 to-transparent lg:w-[64%]" />

        <div className="grid min-h-[760px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hero-reveal-delay relative z-10 flex flex-col justify-between px-7 py-8 sm:px-10 sm:py-10 lg:py-12">
            <div className="space-y-7">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-clay-700">
                Atelier japonés contemporáneo
              </p>

              <div className="space-y-5">
                <h1 className="max-w-xl font-display text-[3.7rem] leading-[0.86] text-ink-950 sm:text-[4.8rem] xl:text-[5.6rem]">
                  La belleza del cuidado, convertida en memoria viva.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-ink-700">
                  Kodama transforma el seguimiento de tus bonsáis en una portada
                  editorial: fotografía, observación, ritmo y archivo en una
                  experiencia sobria, táctil y profundamente visual.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <SignedIn>
                  <Link href="/bonsais">
                    <Button className="bg-ink-950 px-7 py-3 text-sm tracking-[0.12em] shadow-[0_18px_40px_-24px_rgba(26,19,16,0.7)] hover:bg-moss-900">
                      Entrar en mi colección
                    </Button>
                  </Link>
                  <Link href="/bonsais/new">
                    <Button
                      variant="secondary"
                      className="border-ink-300 bg-transparent px-7 py-3 text-sm tracking-[0.12em] hover:border-ink-950 hover:bg-white/70 hover:text-ink-950"
                    >
                      Registrar un bonsái
                    </Button>
                  </Link>
                  {currentUser?.role === "ADMIN" ? (
                    <Link href="/admin">
                      <Button
                        variant="secondary"
                        className="border-ink-300 bg-transparent px-7 py-3 text-sm tracking-[0.12em] hover:border-ink-950 hover:bg-white/70 hover:text-ink-950"
                      >
                        Administración
                      </Button>
                    </Link>
                  ) : null}
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="bg-ink-950 px-7 py-3 text-sm tracking-[0.12em] shadow-[0_18px_40px_-24px_rgba(26,19,16,0.7)] hover:bg-moss-900">
                        Acceder con Google
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="border-ink-300 bg-transparent px-7 py-3 text-sm tracking-[0.12em] hover:border-ink-950 hover:bg-white/70 hover:text-ink-950"
                      >
                        Crear cuenta
                      </Button>
                    </span>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>

            <div className="grid gap-5 border-t border-ink-200/80 pt-7 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  Observación diaria
                </p>
                <p className="mt-3 max-w-xs text-sm leading-7 text-ink-700">
                  Una interfaz concebida para mirar despacio, registrar con criterio
                  y devolver al bonsái el protagonismo emocional del producto.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  Acceso instantáneo
                </p>
                <p className="mt-3 max-w-xs text-sm leading-7 text-ink-700">
                  Alta y acceso con Google, colección privada por usuario y
                  administración interna para escalar el sistema con serenidad.
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-black/72 via-black/24 to-transparent lg:hidden" />
            <Image
              src={heroImage}
              alt="Bonsái protagonista de Kodama"
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.48))]" />
            <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-paper/70 to-transparent lg:block" />

            <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-paper/85 backdrop-blur">
              Portada del atelier
            </div>

            <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-[22rem]">
              <div className="rounded-[2rem] border border-white/12 bg-black/40 px-6 py-5 text-paper shadow-[0_24px_70px_-38px_rgba(0,0,0,0.85)] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.32em] text-paper/55">
                  Cuaderno vivo
                </p>
                <p className="mt-3 font-display text-4xl leading-none">
                  Tiempo, gesto y belleza natural.
                </p>
                <p className="mt-4 text-sm leading-7 text-paper/80">
                  Una home menos de producto genérico y más de portada de autor:
                  clara, densa y con una imagen que sostiene todo el relato visual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="border-t border-ink-300/80 pt-8">
          <p className="text-xs uppercase tracking-[0.32em] text-clay-700">
            Lo que cambia
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.92] text-ink-950">
            La página deja de comportarse como una plantilla y empieza a respirar como una portada.
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="space-y-3 border-l border-ink-200 pl-5">
              <p className="text-xs uppercase tracking-[0.26em] text-ink-500">
                Protagonista
              </p>
              <p className="text-base leading-8 text-ink-700">
                El bonsái toma el centro visual con fotografía real, contraste alto y una masa oscura que da profundidad.
              </p>
            </div>
            <div className="space-y-3 border-l border-ink-200 pl-5">
              <p className="text-xs uppercase tracking-[0.26em] text-ink-500">
                Editorial
              </p>
              <p className="text-base leading-8 text-ink-700">
                Más jerarquía, menos cajas. El texto se comporta como una portada y no como un dashboard de producto genérico.
              </p>
            </div>
            <div className="space-y-3 border-l border-ink-200 pl-5">
              <p className="text-xs uppercase tracking-[0.26em] text-ink-500">
                Material
              </p>
              <p className="text-base leading-8 text-ink-700">
                Papel cálido, tinta oscura y transiciones suaves para dar una sensación más física, más boutique y más cuidada.
              </p>
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[2.4rem] border border-ink-200/70 bg-ink-950 p-8 text-paper shadow-paper">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_34%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.32em] text-paper/55">
              Acceso y alta
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight">
              Entra rápido, pero en un entorno con identidad propia.
            </h2>
            <p className="mt-4 text-sm leading-7 text-paper/80">
              Clerk resuelve el acceso con Google y Kodama mantiene el tono de
              atelier: limpio en la interacción, intenso en la presencia.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="bg-paper px-6 py-3 text-ink-950 hover:bg-clay-100">
                        Acceder
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="border-paper/25 bg-transparent px-6 py-3 text-paper hover:border-paper/60 hover:bg-white/10 hover:text-paper"
                      >
                        Darme de alta
                      </Button>
                    </span>
                  </SignUpButton>
                </>
              ) : (
                <Link href="/bonsais" className="inline-flex">
                  <Button className="bg-paper px-6 py-3 text-ink-950 hover:bg-clay-100">
                    Ir a la aplicación
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

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
      <section className="hero-reveal relative overflow-hidden rounded-[3.2rem] border border-white/8 bg-[#0b0f0e] shadow-[0_36px_90px_-40px_rgba(0,0,0,0.82)]">
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)] lg:w-[43%]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[42%] bg-[radial-gradient(circle_at_top_left,rgba(111,149,70,0.18),transparent_44%),linear-gradient(180deg,rgba(16,22,20,0.96),rgba(10,14,13,0.94))]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-l from-black/58 via-black/18 to-transparent lg:w-[64%]" />

        <div className="grid min-h-[760px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hero-reveal-delay relative z-10 flex flex-col justify-between px-7 py-8 sm:px-10 sm:py-10 lg:py-12">
            <div className="space-y-7">
              <h1 className="max-w-xl font-display text-[3.7rem] leading-[0.86] text-paper sm:text-[4.8rem] xl:text-[5.6rem]">
                Cuidado, tiempo y memoria.
              </h1>

              <div className="flex flex-wrap gap-3">
                <SignedIn>
                  <Link href="/bonsais">
                    <Button className="bg-moss-500 px-7 py-3 text-sm tracking-[0.12em] text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] transition duration-300 hover:bg-moss-400">
                      Entrar en mi colección
                    </Button>
                  </Link>
                  <Link href="/bonsais/new">
                    <Button
                      variant="secondary"
                      className="border-white/14 bg-white/[0.03] px-7 py-3 text-sm tracking-[0.12em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper"
                    >
                      Registrar un bonsái
                    </Button>
                  </Link>
                  {currentUser?.role === "ADMIN" ? (
                    <Link href="/admin">
                      <Button
                        variant="secondary"
                        className="border-white/14 bg-white/[0.03] px-7 py-3 text-sm tracking-[0.12em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper"
                      >
                        Administración
                      </Button>
                    </Link>
                  ) : null}
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="bg-moss-500 px-7 py-3 text-sm tracking-[0.12em] text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] transition duration-300 hover:bg-moss-400">
                        Acceder con Google
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="border-white/14 bg-white/[0.03] px-7 py-3 text-sm tracking-[0.12em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper"
                      >
                        Crear cuenta
                      </Button>
                    </span>
                  </SignUpButton>
                </SignedOut>
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
            <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-[#0d1211] via-[#0d1211]/70 to-transparent lg:block" />

            <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-[22rem]">
              <div className="rounded-[2rem] border border-white/10 bg-black/46 px-6 py-5 text-paper shadow-[0_24px_70px_-38px_rgba(0,0,0,0.85)] backdrop-blur-md">
                <p className="font-display text-4xl leading-none">Kodama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="border-t border-white/10 pt-8">
          <h2 className="max-w-2xl font-display text-4xl leading-[0.96] text-paper sm:text-5xl">
            Menos interfaz. Más bonsái.
          </h2>
        </article>

        <article className="relative overflow-hidden rounded-[2.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(14,18,17,0.98),rgba(8,10,10,0.98))] p-8 text-paper shadow-[0_28px_80px_-42px_rgba(0,0,0,0.82)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />
          <div className="relative">
            <h2 className="font-display text-4xl leading-tight">
              Acceso inmediato.
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="bg-moss-500 px-6 py-3 text-paper hover:bg-moss-400">
                        Acceder
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="border-white/14 bg-white/[0.03] px-6 py-3 text-paper hover:border-white/24 hover:bg-white/[0.08] hover:text-paper"
                      >
                        Darme de alta
                      </Button>
                    </span>
                  </SignUpButton>
                </>
              ) : (
                <Link href="/bonsais" className="inline-flex">
                  <Button className="bg-moss-500 px-6 py-3 text-paper hover:bg-moss-400">
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

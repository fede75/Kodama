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

  return (
    <div className="space-y-10 pb-8 sm:space-y-14 sm:pb-10">
      <section className="hero-reveal relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0b0f0e] shadow-[0_36px_90px_-40px_rgba(0,0,0,0.82)] sm:rounded-[3.2rem]">
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)] lg:w-[43%]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(111,149,70,0.18),transparent_44%),linear-gradient(180deg,rgba(16,22,20,0.96),rgba(10,14,13,0.94))] lg:w-[42%]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-l from-black/58 via-black/18 to-transparent lg:w-[64%]" />

        <div className="grid min-h-[640px] lg:min-h-[760px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 hero-reveal-delay relative z-10 flex flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:order-1 lg:px-10 lg:py-12">
            <div className="space-y-7">
              <h1 className="max-w-xl font-display text-[2.8rem] leading-[0.9] text-paper sm:text-[3.7rem] xl:text-[5.6rem]">
                Cuidado, tiempo y memoria.
              </h1>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SignedIn>
                  <Link href="/colecciones-publicas" className="block sm:inline-flex">
                    <Button
                      variant="secondary"
                      className="w-full border-white/14 bg-white/[0.03] px-6 py-3 text-sm tracking-[0.08em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper sm:w-auto sm:px-7 sm:tracking-[0.12em]"
                    >
                      Colecciones públicas
                    </Button>
                  </Link>
                  <Link href="/bonsais" className="block sm:inline-flex">
                    <Button className="w-full bg-moss-500 px-6 py-3 text-sm tracking-[0.08em] text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] transition duration-300 hover:bg-moss-400 sm:w-auto sm:px-7 sm:tracking-[0.12em]">
                      Entrar en mi colección
                    </Button>
                  </Link>
                  <Link href="/bonsais/new" className="block sm:inline-flex">
                    <Button
                      variant="secondary"
                      className="w-full border-white/14 bg-white/[0.03] px-6 py-3 text-sm tracking-[0.08em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper sm:w-auto sm:px-7 sm:tracking-[0.12em]"
                    >
                      Registrar un bonsái
                    </Button>
                  </Link>
                  {currentUser?.role === "ADMIN" ? (
                    <Link href="/admin" className="block sm:inline-flex">
                      <Button
                        variant="secondary"
                        className="w-full border-white/14 bg-white/[0.03] px-6 py-3 text-sm tracking-[0.08em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper sm:w-auto sm:px-7 sm:tracking-[0.12em]"
                      >
                        Administración
                      </Button>
                    </Link>
                  ) : null}
                </SignedIn>

                <SignedOut>
                  <Link href="/colecciones-publicas" className="block sm:inline-flex">
                    <Button
                      variant="secondary"
                      className="w-full border-white/14 bg-white/[0.03] px-6 py-3 text-sm tracking-[0.08em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper sm:w-auto sm:px-7 sm:tracking-[0.12em]"
                    >
                      Colecciones públicas
                    </Button>
                  </Link>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="w-full bg-moss-500 px-6 py-3 text-sm tracking-[0.08em] text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] transition duration-300 hover:bg-moss-400 sm:w-auto sm:px-7 sm:tracking-[0.12em]">
                        Acceder con Google
                      </Button>
                    </span>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <span>
                      <Button
                        variant="secondary"
                        className="w-full border-white/14 bg-white/[0.03] px-6 py-3 text-sm tracking-[0.08em] text-paper hover:border-white/28 hover:bg-white/[0.08] hover:text-paper sm:w-auto sm:px-7 sm:tracking-[0.12em]"
                      >
                        Crear cuenta
                      </Button>
                    </span>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
          </div>

          <div className="order-1 relative min-h-[300px] sm:min-h-[380px] lg:order-2 lg:min-h-full">
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

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-[22rem]">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/46 px-4 py-4 text-paper shadow-[0_24px_70px_-38px_rgba(0,0,0,0.85)] backdrop-blur-md sm:rounded-[2rem] sm:px-6 sm:py-5">
                <p className="font-display text-3xl leading-none sm:text-4xl">Kodama</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { readdir } from "node:fs/promises";
import path from "node:path";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";
import { listBonsais } from "@/lib/bonsais";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const { userId } = await auth();
  const currentUser = userId ? await getCurrentUser() : null;
  const imageDir = path.join(process.cwd(), "public", "images");
  const heroFiles = (await readdir(imageDir)).filter((file) =>
    /^bonsai-hero.*\.(jpg|jpeg|png|webp)$/i.test(file)
  );
  const heroImage =
    heroFiles.length > 0
      ? `/images/${heroFiles[Math.floor(Math.random() * heroFiles.length)]}`
      : "/images/kodama-hero-fallback.svg";
  const bonsais = currentUser ? await listBonsais(currentUser.id) : [];
  const recentCare = bonsais
    .flatMap((bonsai) =>
      bonsai.careEvents.map((event) => ({
        bonsaiId: bonsai.id,
        bonsaiName: bonsai.name,
        type: event.type,
        performedAt: event.performedAt
      }))
    )
    .sort((a, b) => b.performedAt.getTime() - a.performedAt.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 pb-8 sm:space-y-12 sm:pb-12">
      <section className="hero-reveal relative overflow-hidden rounded-[1.8rem] surface-panel sm:rounded-[2.6rem]">
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(125deg,rgba(255,255,255,0.02),transparent_35%)] lg:w-[42%]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(111,149,70,0.15),transparent_36%),linear-gradient(180deg,rgba(12,16,15,0.95),rgba(8,10,10,0.9))] lg:w-[42%]" />
        <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-l from-black/60 via-black/20 to-transparent lg:w-[66%]" />

        <div className="grid min-h-[auto] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="order-2 hero-reveal-delay relative z-10 flex flex-col justify-between px-5 py-6 sm:px-7 sm:py-7 lg:order-1 lg:px-9 lg:py-10 xl:px-12">
            <div className="max-w-xl space-y-7">
              <p className="editorial-kicker text-xs">Cuaderno digital de bonsáis</p>
              <h1 className="font-display text-[clamp(2.6rem,9vw,5.8rem)] leading-[0.88] text-paper">
                Una colección viva.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-paper/56 sm:text-base sm:leading-8 lg:text-lg">
                Cada bonsái pide tiempo, observación y un cuidado sereno. Kodama te ayuda a acompañar ese proceso y a recordar lo importante en cada etapa del árbol.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SignedIn>
                  <Link href="/bonsais" className="block sm:inline-flex">
                    <Button className="w-full px-6 py-3 sm:w-auto sm:px-7">
                      Mi colección
                    </Button>
                  </Link>
                  <Link href="/colecciones-publicas" className="block sm:inline-flex">
                    <Button variant="secondary" className="w-full px-6 py-3 sm:w-auto sm:px-7">
                      Colecciones públicas
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <span>
                      <Button className="w-full px-6 py-3 sm:w-auto sm:px-7">
                        Acceder
                      </Button>
                    </span>
                  </SignInButton>
                  <Link href="/colecciones-publicas" className="block sm:inline-flex">
                    <Button variant="secondary" className="w-full px-6 py-3 sm:w-auto sm:px-7">
                      Colecciones públicas
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </div>

            <SignedIn>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <Link
                  href="/bonsais"
                  className="group rounded-[1.7rem] surface-soft p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                >
                  <p className="editorial-kicker text-[10px]">Colección</p>
                  <p className="mt-4 font-display text-3xl text-paper">{bonsais.length}</p>
                  <p className="mt-2 text-sm text-paper/52">
                    árboles registrados
                  </p>
                </Link>
                <div className="rounded-[1.7rem] surface-soft p-5">
                  <p className="editorial-kicker text-[10px]">Actividad reciente</p>
                  {recentCare.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {recentCare.map((item) => (
                        <div key={`${item.bonsaiId}-${item.performedAt.toISOString()}`} className="space-y-1">
                          <p className="text-sm text-paper">{item.bonsaiName}</p>
                          <p className="text-xs uppercase tracking-[0.16em] text-paper/38">
                            {CARE_EVENT_LABELS[item.type]} · {formatDate(item.performedAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-paper/46">
                      Sin cuidados registrados todavía.
                    </p>
                  )}
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="mt-10 max-w-sm rounded-[1.7rem] surface-soft p-5">
                <p className="editorial-kicker text-[10px]">Acceso</p>
                <p className="mt-4 text-sm leading-7 text-paper/52">
                  Entra para registrar bonsáis, cuidados, fotos y el historial visual completo de tu colección.
                </p>
                <div className="mt-4">
                  <SignUpButton mode="modal">
                    <span>
                      <Button variant="secondary" className="w-full">
                        Crear cuenta
                      </Button>
                    </span>
                  </SignUpButton>
                </div>
              </div>
            </SignedOut>
          </div>

          <div className="order-1 relative min-h-[280px] sm:min-h-[360px] lg:order-2 lg:min-h-full">
            <Image
              src={heroImage}
              alt="Bonsái protagonista de Kodama"
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.46))]" />
            <div className="absolute inset-y-0 left-0 hidden w-48 bg-gradient-to-r from-[#0a0d0c] via-[#0a0d0c]/72 to-transparent lg:block" />
          </div>
        </div>
      </section>

      <SignedIn>
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Link
            href="/bonsais/new"
            className="group rounded-[2rem] surface-soft p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] sm:p-7"
          >
            <p className="editorial-kicker text-[10px]">Registrar</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="font-display text-[clamp(2rem,5vw,3rem)] text-paper">
                  Nuevo bonsái
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-paper/52">
                  Añade un árbol nuevo y empieza su seguimiento desde la primera imagen.
                </p>
              </div>
              <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/42 sm:inline-flex">
                Abrir
              </span>
            </div>
          </Link>

          <Link
            href="/colecciones-publicas"
            className="group rounded-[2rem] surface-soft p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] sm:p-7"
          >
            <p className="editorial-kicker text-[10px]">Explorar</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="font-display text-[clamp(2rem,5vw,3rem)] text-paper">
                  Otras colecciones
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-paper/52">
                  Descubre cómo otros usuarios documentan la evolución de sus árboles.
                </p>
              </div>
              <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/42 sm:inline-flex">
                Ver
              </span>
            </div>
          </Link>
        </section>
      </SignedIn>
    </div>
  );
}

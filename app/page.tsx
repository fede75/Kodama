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
import { FeaturedBonsaiCard } from "@/components/social/featured-bonsai-card";
import { getCurrentUser } from "@/lib/auth-guards";
import { getTopVotedBonsaiLast30Days, listBonsais } from "@/lib/bonsais";
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
  const [bonsais, topVotedBonsai] = await Promise.all([
    currentUser ? listBonsais(currentUser.id) : Promise.resolve([]),
    getTopVotedBonsaiLast30Days()
  ]);
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
      <section className="hero-reveal relative overflow-hidden rounded-[2.8rem] border border-white/5 bg-[linear-gradient(180deg,rgba(8,11,10,0.94),rgba(7,9,8,0.98))]">
        <div className="absolute left-[-4%] top-[-8%] h-72 w-72 rounded-full bg-moss-700/14 blur-3xl" />
        <div className="absolute right-[-6%] top-[12%] h-72 w-72 rounded-full bg-clay-700/10 blur-3xl" />
        <div className="grid min-h-[auto] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="order-2 hero-reveal-delay relative z-10 flex flex-col justify-between px-5 py-7 sm:px-7 sm:py-8 lg:order-1 lg:px-10 lg:py-12 xl:px-14">
            <div className="max-w-xl space-y-8">
              <p className="editorial-kicker text-xs">Cuaderno digital de bonsáis</p>
              <h1 className="font-display text-[clamp(3.2rem,10vw,6.8rem)] leading-[0.84] text-paper">
                Una colección viva.
              </h1>
              <p className="max-w-lg text-[1rem] leading-8 text-paper/58 sm:text-[1.06rem] lg:text-[1.14rem]">
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
              <div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <Link
                  href="/bonsais"
                  className="group rounded-[1.9rem] border border-white/6 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
                >
                  <p className="editorial-kicker text-[10px]">Colección</p>
                  <p className="mt-4 font-display text-4xl text-paper">{bonsais.length}</p>
                  <p className="mt-2 text-sm leading-7 text-paper/52">
                    árboles registrados
                  </p>
                </Link>
                <div className="rounded-[1.9rem] border border-white/6 bg-black/22 p-5">
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
              <div className="mt-10 max-w-sm rounded-[1.9rem] border border-white/6 bg-white/[0.03] p-5">
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

          <div className="order-1 relative min-h-[320px] sm:min-h-[420px] lg:order-2 lg:min-h-full">
            <Image
              src={heroImage}
              alt="Bonsái protagonista de Kodama"
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover object-[70%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.5))]" />
            <div className="absolute inset-y-0 left-0 hidden w-56 bg-gradient-to-r from-[#070908] via-[#070908]/72 to-transparent lg:block" />
            <div className="absolute bottom-8 right-8 hidden max-w-xs rounded-[1.6rem] bg-black/28 p-5 text-paper/78 backdrop-blur-sm xl:block">
              <p className="metadata-label">Mirar despacio</p>
              <p className="mt-3 text-[1rem] leading-7">
                Cada imagen conserva la forma cambiante del árbol y convierte el seguimiento en memoria visual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SignedIn>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.15fr]">
          <Link
            href="/bonsais/new"
            className="group rounded-[2.2rem] border border-white/6 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05] sm:p-7"
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
            href="/bonsais-destacados"
            className="group rounded-[2.2rem] border border-white/6 bg-black/22 p-6 transition duration-300 hover:-translate-y-1 hover:bg-black/28 sm:p-7"
          >
            <p className="editorial-kicker text-[10px]">Destacados</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="font-display text-[clamp(2rem,5vw,3rem)] text-paper">
                  Bonsáis votados
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-paper/52">
                  Sigue los árboles que más conversación y votos han generado en la comunidad.
                </p>
              </div>
              <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper/42 sm:inline-flex">
                Ver
              </span>
            </div>
          </Link>

          <Link
            href="/colecciones-publicas"
            className="group rounded-[2.2rem] border border-white/6 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05] sm:p-7"
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

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker text-xs">Comunidad</p>
            <h2 className="mt-2 font-display text-4xl text-paper">
              Bonsái del momento
            </h2>
          </div>
          <Link href="/bonsais-destacados" className="block sm:inline-flex">
            <Button variant="secondary" className="w-full sm:w-auto">
              Ver ranking completo
            </Button>
          </Link>
        </div>

        {topVotedBonsai ? (
          <FeaturedBonsaiCard
            bonsai={topVotedBonsai}
            rank={1}
            rangeLabel="Últimos 30 días"
          />
        ) : (
          <div className="rounded-[2rem] surface-soft p-6 text-paper/58 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.95)] sm:p-8">
            Todavía no hay votos suficientes para destacar un bonsái este mes.
          </div>
        )}
      </section>
    </div>
  );
}

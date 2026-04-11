import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLatestCareEvents, listBonsais } from "@/lib/bonsais";
import { getDefaultUser } from "@/lib/default-user";
import { CARE_EVENT_LABELS } from "@/lib/constants";
import { formatDate, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getDefaultUser();
  const [bonsais, latestCare] = await Promise.all([
    listBonsais(user.id),
    getLatestCareEvents(user.id, 4)
  ]);

  const heroBonsai = bonsais.find((bonsai) => bonsai.photos[0]) ?? bonsais[0] ?? null;
  const heroImage = heroBonsai?.photos[0]?.imageUrl ?? "/images/kodama-hero-fallback.svg";
  const featuredBonsais = bonsais.slice(0, 3);
  const bonsaisWithPhotos = bonsais.filter((bonsai) => bonsai.photos[0]).length;
  const totalPhotos = bonsais.reduce((sum, bonsai) => sum + bonsai._count.photos, 0);
  const totalEntries = bonsais.reduce(
    (sum, bonsai) =>
      sum +
      bonsai._count.careEvents +
      bonsai._count.healthIssues +
      bonsai._count.journal +
      bonsai._count.photos,
    0
  );

  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-[3rem] border border-ink-200/70 bg-paper/90 shadow-paper">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-12 h-48 w-48 rounded-full bg-moss-200/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-clay-200/35 blur-3xl" />

        <div className="grid gap-8 px-7 py-7 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-10">
          <div className="relative z-10 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-clay-700">
                Cuaderno digital de bonsáis
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-6xl leading-[0.9] text-ink-950 sm:text-7xl xl:text-[5.4rem]">
                  La memoria viva de cada árbol, tratada como una obra en proceso.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink-700">
                  Kodama convierte el cuidado diario en una experiencia editorial:
                  observación, ritual y evolución visual reunidos en una portada
                  serena, táctil y profundamente personal.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/bonsais">
                  <Button className="bg-ink-950 px-6 py-3 text-sm tracking-[0.08em] hover:bg-clay-700">
                    Entrar en la colección
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
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-ink-200/70 bg-ink-950 px-6 py-5 text-paper shadow-card">
                <p className="text-xs uppercase tracking-[0.3em] text-paper/55">
                  Observación
                </p>
                <p className="mt-4 max-w-sm font-display text-3xl leading-tight">
                  Un espacio para documentar tiempo, gesto y transformación sin ruido visual.
                </p>
              </div>

              <div className="rounded-[2rem] border border-ink-200/70 bg-white/60 px-6 py-5 shadow-card">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  Pulso actual
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-4xl text-ink-900">
                      {bonsais.length}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">
                      árboles en seguimiento
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl text-ink-900">
                      {totalEntries}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">
                      registros acumulados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-[680px]">
            <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-ink-950 via-ink-900 to-clay-900 shadow-paper" />
            <div className="absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_36%),linear-gradient(180deg,_transparent_15%,_rgba(0,0,0,0.28)_100%)]" />

            <div className="absolute left-6 top-6 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-paper/80 backdrop-blur">
              {heroBonsai ? heroBonsai.name : "Kodama Atelier"}
            </div>

            <div className="absolute inset-[1.15rem] overflow-hidden rounded-[2.2rem] border border-white/10">
              <img
                src={heroImage}
                alt={heroBonsai ? `Bonsái ${heroBonsai.name}` : "Imagen editorial de bonsái"}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-20 z-20 rounded-[2rem] border border-ink-200/70 bg-paper/92 p-6 shadow-paper backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-clay-700">
                Portada del día
              </p>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-display text-4xl leading-none text-ink-950">
                    {heroBonsai?.name ?? "Colección en construcción"}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-500">
                    {heroBonsai?.species ?? "Tu próximo árbol protagonista"}
                  </p>
                </div>
                <div className="text-sm leading-7 text-ink-700">
                  {heroBonsai ? (
                    <p>
                      {heroBonsai.location ?? "Ubicación no indicada"} ·{" "}
                      {heroBonsai.style ?? "Estilo por definir"}
                    </p>
                  ) : (
                    <p>Empieza subiendo fotografías para construir una portada con presencia.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 right-0 z-20 hidden max-w-[220px] rounded-[1.8rem] border border-white/10 bg-white/10 p-5 text-paper shadow-card backdrop-blur xl:block">
              <p className="text-xs uppercase tracking-[0.26em] text-paper/55">
                Materia y tiempo
              </p>
              <p className="mt-3 text-sm leading-7 text-paper/90">
                Fotografía protagonista, fondo profundo y notas de taller para que la home se sienta como una portada editorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="relative overflow-hidden rounded-[2.5rem] border border-ink-200/70 bg-white/65 p-7 shadow-card">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-300/80 to-transparent" />
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
              Colección viva
            </p>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-ink-950">
              La colección deja de sentirse como inventario y pasa a leerse como una edición viva.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-ink-700">
              Cada árbol aparece con más presencia, contexto y peso visual.
              La fotografía abre el relato y los metadatos acompañan sin competir
              con la emoción de la pieza.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-ink-200/70 bg-paper/80 p-4">
                <p className="font-display text-4xl text-ink-950">{bonsaisWithPhotos}</p>
                <p className="mt-2 text-sm text-ink-600">con retrato principal</p>
              </div>
              <div className="rounded-[1.6rem] border border-ink-200/70 bg-paper/80 p-4">
                <p className="font-display text-4xl text-ink-950">{totalPhotos}</p>
                <p className="mt-2 text-sm text-ink-600">fotografías archivadas</p>
              </div>
              <div className="rounded-[1.6rem] border border-ink-200/70 bg-paper/80 p-4">
                <p className="font-display text-4xl text-ink-950">{latestCare.length}</p>
                <p className="mt-2 text-sm text-ink-600">cuidados recientes</p>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2.5rem] border border-ink-200/70 bg-ink-950 p-7 text-paper shadow-paper">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_30%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-paper/55">
                Ritual diario
              </p>
              <p className="mt-4 font-display text-4xl leading-tight">
                Cuidado, observación y memoria en una única secuencia visual.
              </p>
              <p className="mt-4 text-sm leading-7 text-paper/78">
                La home ahora funciona como una portada de estudio: impacto
                visual alto, capas más profundas y una lectura más emocional del producto.
              </p>
              <Link href="/bonsais" className="mt-8 inline-flex text-sm uppercase tracking-[0.24em] text-paper/90 transition hover:text-clay-200">
                Ver todos los bonsáis
              </Link>
            </div>
          </article>
        </div>

        <section className="rounded-[2.5rem] border border-ink-200/70 bg-paper/88 p-7 shadow-card">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-clay-700">
                Actividad reciente
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none text-ink-950">
                El taller sigue en marcha
              </h2>
            </div>
            <Link
              href="/bonsais"
              className="text-sm uppercase tracking-[0.22em] text-ink-500 transition hover:text-clay-700"
            >
              Abrir colección
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {latestCare.length > 0 ? (
              latestCare.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/bonsais/${item.bonsai.id}`}
                  className="group flex items-start gap-4 rounded-[1.8rem] border border-ink-200/80 bg-white/55 px-5 py-5 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-clay-200 bg-clay-50 font-display text-2xl text-clay-700">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
                      {formatDateTime(item.performedAt)}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-ink-950">
                      {item.title ?? CARE_EVENT_LABELS[item.type]}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-ink-700">
                      {item.bonsai.name}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[1.8rem] border border-dashed border-ink-200 bg-white/45 px-5 py-8 text-sm leading-7 text-ink-600">
                Aún no hay cuidados recientes. La home está lista para mostrar
                actividad editorial en cuanto registres el primer gesto de cuidado.
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-clay-700">
              Colección destacada
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-ink-950">
              Bonsáis con presencia de portada
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-ink-700">
            Una selección que prioriza escala fotográfica, nombres con más peso y
            metadatos ordenados como una ficha editorial, no como un dashboard.
          </p>
        </div>

        {featuredBonsais.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              href={`/bonsais/${featuredBonsais[0].id}`}
              className="group relative overflow-hidden rounded-[2.8rem] border border-ink-200/70 bg-ink-950 text-paper shadow-paper"
            >
              <div className="absolute inset-0">
                <img
                  src={
                    featuredBonsais[0].photos[0]?.imageUrl ??
                    "/images/kodama-hero-fallback.svg"
                  }
                  alt={featuredBonsais[0].photos[0]?.caption ?? `Bonsái ${featuredBonsais[0].name}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/48 to-transparent" />
              <div className="relative flex min-h-[560px] flex-col justify-end p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-paper/55">
                  Pieza protagonista
                </p>
                <h3 className="mt-4 max-w-xl font-display text-6xl leading-none">
                  {featuredBonsais[0].name}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.22em] text-paper/70">
                  {featuredBonsais[0].species}
                </p>
                <div className="mt-6 flex flex-wrap gap-5 text-sm leading-7 text-paper/85">
                  <p>{featuredBonsais[0].location ?? "Ubicación no indicada"}</p>
                  <p>{featuredBonsais[0].style ?? "Estilo por definir"}</p>
                  <p>{featuredBonsais[0]._count.photos} fotografías</p>
                </div>
              </div>
            </Link>

            <div className="grid gap-6">
              {featuredBonsais.slice(1).map((bonsai) => (
                <Link
                  key={bonsai.id}
                  href={`/bonsais/${bonsai.id}`}
                  className="group grid overflow-hidden rounded-[2.2rem] border border-ink-200/70 bg-paper/88 shadow-card transition hover:-translate-y-1 hover:shadow-paper sm:grid-cols-[0.92fr_1.08fr]"
                >
                  <div className="relative min-h-[280px] overflow-hidden">
                    <img
                      src={bonsai.photos[0]?.imageUrl ?? "/images/kodama-hero-fallback.svg"}
                      alt={bonsai.photos[0]?.caption ?? `Bonsái ${bonsai.name}`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-clay-700">
                        Archivo vivo
                      </p>
                      <h3 className="mt-4 font-display text-4xl leading-none text-ink-950">
                        {bonsai.name}
                      </h3>
                      <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ink-500">
                        {bonsai.species}
                      </p>
                      <p className="mt-5 text-sm leading-7 text-ink-700">
                        {bonsai.location ?? "Ubicación no indicada"} ·{" "}
                        {bonsai.style ?? "Estilo por definir"}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-ink-200/70 pt-4 text-sm text-ink-600">
                      <span>{bonsai._count.photos} fotografías</span>
                      <span>
                        {bonsai.careEvents[0]
                          ? formatDate(bonsai.careEvents[0].performedAt)
                          : "Sin cuidados aún"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {featuredBonsais.length === 1 ? (
                <div className="rounded-[2.2rem] border border-dashed border-ink-200 bg-white/45 p-8 text-sm leading-7 text-ink-600">
                  Registra más bonsáis para que esta portada editorial gane
                  riqueza visual y contraste entre piezas.
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 rounded-[2.8rem] border border-dashed border-ink-200 bg-paper/70 p-8 shadow-card lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-clay-700">
                Primera edición
              </p>
              <h3 className="mt-4 font-display text-5xl leading-none text-ink-950">
                La home ya está lista para mostrar una colección con carácter.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-ink-700">
                Solo falta registrar tu primer bonsái y empezar a subir imágenes
                para que la portada adquiera presencia fotográfica real.
              </p>
              <Link href="/bonsais/new" className="mt-8 inline-flex">
                <Button className="bg-clay-600 hover:bg-clay-700">
                  Crear el primer bonsái
                </Button>
              </Link>
            </div>
            <div className="overflow-hidden rounded-[2.2rem] border border-ink-200/70 bg-ink-950">
              <img
                src="/images/kodama-hero-fallback.svg"
                alt="Ilustración editorial de bonsái"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

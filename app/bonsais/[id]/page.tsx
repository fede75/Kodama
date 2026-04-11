import Link from "next/link";
import { notFound } from "next/navigation";
import { BonsaiTimeline } from "@/components/bonsais/timeline";
import { Button } from "@/components/ui/button";
import { getDefaultUser } from "@/lib/default-user";
import { getBonsaiTimeline } from "@/lib/timeline";
import { formatDate } from "@/lib/utils";

export default async function BonsaiDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getDefaultUser();
  const result = await getBonsaiTimeline(id, user.id);

  if (!result) {
    notFound();
  }

  const { bonsai, items } = result;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] border border-bark-100 bg-white/90 p-8 shadow-card lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Link href="/bonsais">
              <Button variant="secondary">Volver al listado</Button>
            </Link>
            <Link href={`/bonsais/${bonsai.id}/eventos/nuevo`}>
              <Button>Añadir evento</Button>
            </Link>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-700">
              Ficha del bonsái
            </p>
            <h1 className="mt-2 font-display text-4xl text-bark-900">
              {bonsai.name}
            </h1>
            <p className="mt-2 text-lg text-bark-700">{bonsai.species}</p>
          </div>

          {bonsai.notes ? (
            <p className="max-w-2xl text-base leading-7 text-bark-700">
              {bonsai.notes}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 rounded-[1.75rem] bg-bark-900 p-6 text-white">
          <div>
            <p className="text-sm text-bark-200">Estado</p>
            <p className="mt-1 text-lg font-semibold">{bonsai.status}</p>
          </div>
          <div>
            <p className="text-sm text-bark-200">Ubicación</p>
            <p className="mt-1 text-lg font-semibold">
              {bonsai.location ?? "No indicada"}
            </p>
          </div>
          <div>
            <p className="text-sm text-bark-200">Estilo</p>
            <p className="mt-1 text-lg font-semibold">
              {bonsai.style ?? "Sin definir"}
            </p>
          </div>
          <div>
            <p className="text-sm text-bark-200">Adquirido</p>
            <p className="mt-1 text-lg font-semibold">
              {bonsai.acquiredAt ? formatDate(bonsai.acquiredAt) : "Sin fecha"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.35fr_0.8fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-bark-900">
              Bitácora cronológica
            </h2>
            <p className="text-sm text-bark-600">{items.length} entradas</p>
          </div>
          <BonsaiTimeline items={items} />
        </div>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-bark-100 bg-white/90 p-6 shadow-card">
            <h2 className="font-display text-2xl text-bark-900">
              Fotos
            </h2>
            <p className="mt-2 text-sm leading-6 text-bark-700">
              El modelo de datos ya está preparado para guardar fotos de
              evolución. En este MVP se muestran las registradas en base de
              datos y se deja lista la ampliación para subir imágenes locales o
              a almacenamiento externo más adelante.
            </p>
            <div className="mt-4 space-y-3">
              {bonsai.photos.length > 0 ? (
                bonsai.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="rounded-2xl bg-bark-50 px-4 py-3 text-sm text-bark-700"
                  >
                    <p className="font-semibold text-bark-900">
                      {photo.caption ?? "Foto de evolución"}
                    </p>
                    <p className="mt-1 break-all text-xs text-bark-500">
                      {photo.imageUrl}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-bark-200 px-4 py-5 text-sm text-bark-600">
                  Aún no hay fotos registradas.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-bark-100 bg-white/90 p-6 shadow-card">
            <h2 className="font-display text-2xl text-bark-900">
              Incidencias
            </h2>
            <div className="mt-4 space-y-3">
              {bonsai.healthIssues.length > 0 ? (
                bonsai.healthIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900"
                  >
                    <p className="font-semibold">{issue.title}</p>
                    {issue.description ? (
                      <p className="mt-1 text-red-800">{issue.description}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-bark-200 px-4 py-5 text-sm text-bark-600">
                  Sin incidencias registradas.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

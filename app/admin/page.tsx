import { UserRole } from "@prisma/client";
import { updateUserRoleAction } from "@/app/admin/actions";
import { DeleteSpeciesForm } from "@/components/admin/delete-species-form";
import { SpeciesJsonEditor } from "@/components/admin/species-json-editor";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth-guards";
import { getLocale } from "@/lib/i18n-server";
import { prisma } from "@/lib/prisma";
import {
  getSpeciesJsonExampleString,
  getSpeciesForAdmin,
  listSpecies,
  serializeSpeciesToJson
} from "@/lib/species";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams
}: {
  searchParams?: Promise<{ species?: string }>;
}) {
  const admin = await requireAdmin();
  const locale = await getLocale();
  const params = (await searchParams) ?? {};
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          bonsais: true,
          reminders: true
        }
      }
    }
  });
  const species = await listSpecies(locale);
  const selectedSpecies = params.species
    ? await getSpeciesForAdmin(params.species)
    : null;
  const exampleJson = getSpeciesJsonExampleString();
  const editorJson = selectedSpecies
    ? serializeSpeciesToJson(selectedSpecies)
    : exampleJson;

  const adminCount = users.filter((user) => user.role === UserRole.ADMIN).length;

  return (
    <div className="space-y-8">
      <section className="rounded-[2.6rem] border border-ink-200/75 bg-paper/88 p-8 shadow-paper">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clay-700">
          Administración
        </p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-5xl leading-none text-ink-950">
              Gobierno del sistema Kodama
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink-700">
              Supervisa cuentas, revisa permisos y controla el acceso multiusuario
              desde una vista central pensada para administración serena.
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink-200/70 bg-white/60 px-5 py-4 text-sm text-ink-700 shadow-card">
            <p className="text-xs uppercase tracking-[0.26em] text-ink-500">
              Sesión administradora
            </p>
            <p className="mt-2 font-semibold text-ink-950">
              {admin.name ?? admin.email}
            </p>
            <p className="mt-1">{admin.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.8rem] border border-ink-200/70 bg-white/55 p-5 shadow-card">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
              Usuarios totales
            </p>
            <p className="mt-3 font-display text-4xl text-ink-950">
              {users.length}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink-200/70 bg-white/55 p-5 shadow-card">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
              Administradores
            </p>
            <p className="mt-3 font-display text-4xl text-ink-950">
              {adminCount}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink-200/70 bg-white/55 p-5 shadow-card">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
              Usuarios estándar
            </p>
            <p className="mt-3 font-display text-4xl text-ink-950">
              {users.length - adminCount}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink-200/70 bg-white/55 p-5 shadow-card">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-500">
              Especies
            </p>
            <p className="mt-3 font-display text-4xl text-ink-950">
              {species.length}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2.3rem] border border-ink-200/75 bg-paper/88 p-6 shadow-paper sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clay-700">
                Especies
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none text-ink-950">
                Alta y edición por JSON
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-ink-700">
                Pega un JSON completo para crear una especie nueva o actualizar una
                existente por su <span className="font-mono text-[0.95em]">slug</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/admin" className="inline-flex">
                <Button variant="secondary">Nueva especie</Button>
              </a>
              {selectedSpecies ? (
                <a href={`/especies/${selectedSpecies.slug}`} className="inline-flex">
                  <Button variant="secondary">Ver ficha</Button>
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-ink-200/70 bg-white/72 p-4 sm:p-5">
            <SpeciesJsonEditor initialJson={editorJson} exampleJson={exampleJson} />
          </div>
        </article>

        <article className="space-y-4 rounded-[2.3rem] border border-ink-200/75 bg-paper/88 p-6 shadow-paper sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clay-700">
              Ayuda
            </p>
            <h2 className="mt-3 font-display text-3xl leading-none text-ink-950">
              JSON esperado
            </h2>
            <p className="mt-4 text-base leading-8 text-ink-700">
              Usa este ejemplo como referencia para pedírselo a ChatGPT o para editar una
              especie ya existente.
            </p>
          </div>

          <details className="rounded-[1.8rem] border border-ink-200/70 bg-white/72 p-5">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-ink-700">
              Ver ejemplo JSON
            </summary>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[1.4rem] bg-ink-950 px-4 py-4 text-xs leading-6 text-paper">
              {exampleJson}
            </pre>
          </details>

          {selectedSpecies ? (
            <details className="rounded-[1.8rem] border border-ink-200/70 bg-white/72 p-5">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-ink-700">
                JSON actual de {selectedSpecies.slug}
              </summary>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[1.4rem] bg-ink-950 px-4 py-4 text-xs leading-6 text-paper">
                {editorJson}
              </pre>
            </details>
          ) : null}
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl text-ink-950">
            Inventario de especies
          </h2>
          <p className="text-sm uppercase tracking-[0.24em] text-ink-500">
            {species.length} especies
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {species.map((item) => {
            const translation = item.translations[0];
            return (
              <article
                key={item.id}
                className="rounded-[2rem] border border-ink-200/75 bg-paper/85 p-6 shadow-card"
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-display text-3xl leading-none text-ink-950">
                      {translation?.commonName ?? item.slug}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-500">
                      {translation?.scientificName ?? item.slug}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-5 text-sm leading-7 text-ink-700">
                      <p>{item._count.bonsais} bonsáis vinculados</p>
                      <p>{item.slug}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a href={`/admin?species=${item.slug}`} className="inline-flex">
                      <Button variant="secondary">Editar JSON</Button>
                    </a>
                    <a href={`/especies/${item.slug}`} className="inline-flex">
                      <Button variant="secondary">Ver especie</Button>
                    </a>
                    <DeleteSpeciesForm slug={item.slug} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl text-ink-950">
            Cuentas del sistema
          </h2>
          <p className="text-sm uppercase tracking-[0.24em] text-ink-500">
            {users.length} usuarios
          </p>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <article
              key={user.id}
              className="rounded-[2rem] border border-ink-200/75 bg-paper/85 p-6 shadow-card"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-display text-3xl leading-none text-ink-950">
                    {user.name ?? "Usuario sin nombre"}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-500">
                    {user.email}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm leading-7 text-ink-700">
                    <p>Alta: {formatDate(user.createdAt)}</p>
                    <p>{user._count.bonsais} bonsáis</p>
                    <p>{user._count.reminders} recordatorios</p>
                  </div>
                </div>

                <form
                  action={updateUserRoleAction}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <input type="hidden" name="userId" value={user.id} />
                  <select
                    name="role"
                    defaultValue={user.role}
                    className="rounded-full border border-ink-200 bg-white/70 px-4 py-2 text-sm text-ink-900"
                  >
                    <option value={UserRole.USER}>Usuario</option>
                    <option value={UserRole.ADMIN}>Administrador</option>
                  </select>
                  <Button
                    type="submit"
                    className="bg-clay-600 hover:bg-clay-700"
                  >
                    Guardar rol
                  </Button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

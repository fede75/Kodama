import { UserRole } from "@prisma/client";
import { updateUserRoleAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
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

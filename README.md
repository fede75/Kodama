# Kodama

Aplicación web para gestionar una colección de bonsáis con una experiencia editorial premium, autenticación multiusuario y despliegue en Vercel.

## Qué incluye actualmente

- Landing pública de acceso y alta
- Autenticación multiusuario con Clerk
- Listado de bonsáis
- Alta de nuevos bonsáis
- Edición y eliminación de bonsáis
- Vista de detalle por bonsái
- Registro de eventos de cuidado
- Panel de administración de usuarios y roles
- Bitácora cronológica combinando cuidados, incidencias, fotos y notas
- Subida de fotos a Vercel Blob

## Stack

- Vercel para despliegue
- Next.js con App Router
- TypeScript
- Tailwind CSS
- Clerk para autenticación
- Prisma ORM
- PostgreSQL
- Vercel Blob para imágenes

## Estructura principal

```text
.
├── app/
│   ├── actions.ts
│   ├── bonsais/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── bonsais/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── bonsais.ts
│   ├── auth-guards.ts
│   ├── constants.ts
│   ├── prisma.ts
│   ├── timeline.ts
│   └── utils.ts
├── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── package.json
```

## Puesta en marcha local o en Vercel

1. Instala Node.js 20 o superior.
2. Copia variables de entorno:

```bash
cp .env.example .env.local
```

3. Instala dependencias:

```bash
npm install
```

4. Rellena las variables necesarias en `.env.local`:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `ADMIN_EMAILS`
- `BLOB_READ_WRITE_TOKEN`

5. Genera el cliente Prisma y sincroniza la base de datos:

```bash
npm run db:generate
npx prisma db push
```

6. Carga datos de ejemplo:

```bash
npm run db:seed
```

7. Arranca la aplicación:

```bash
npm run dev
```

8. Abre `http://localhost:3000`.

9. Entra con Clerk usando el método de autenticación que hayas activado en tu instancia.

## Despliegue en Vercel

1. Crea una base de datos PostgreSQL desde el Marketplace de Vercel.
2. Configura una aplicación en Clerk y copia las claves.
3. Añade en Vercel estas variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `ADMIN_EMAILS`
- `BLOB_READ_WRITE_TOKEN`

4. Configura el Build Command como:

```bash
npm run vercel-build
```

5. Haz deploy.

En esta versión, Vercel sincroniza el esquema con `prisma db push` durante el build. Los usuarios se crean automáticamente en la base de datos en el primer acceso autenticado desde Clerk, y los correos incluidos en `ADMIN_EMAILS` reciben rol `ADMIN`.

Nota:
`db push` es una solución práctica para este MVP cuando no puedes generar migraciones en local. Si más adelante tienes un entorno local con Node, convendrá pasar a `prisma migrate dev` y `prisma migrate deploy` para llevar historial de cambios del esquema.

## Autenticación y multiusuario

- La autenticación se resuelve con Clerk.
- La aplicación protege `/bonsais` y `/admin` mediante middleware.
- Cada usuario trabaja solo con sus propios bonsáis y actividad.
- El rol `ADMIN` se asigna a los correos incluidos en `ADMIN_EMAILS` o a usuarios promovidos desde el panel interno.
- El panel de administración permite revisar usuarios y actualizar roles.

## Flujo principal

Con la app levantada puedes:

1. Entrar o darte de alta desde `/`
2. Acceder a tu colección en `/bonsais`
3. Crear un bonsái desde `/bonsais/new`
4. Editar o eliminar un bonsái desde su ficha
5. Añadir eventos desde `/bonsais/:id/eventos/nuevo`
6. Subir fotos y revisar la bitácora cronológica
7. Si eres administrador, entrar en `/admin`

## Evolución prevista

- Completar incidencias, recordatorios y bitácora avanzada
- Refinar permisos y experiencia de administración
- Completar formularios para incidencias, bitácora y fotos

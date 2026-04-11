# Kodama

Aplicación web personal para gestionar una colección de bonsáis con Next.js, TypeScript, Tailwind CSS, Prisma y SQLite.

## Qué incluye el MVP

- Listado de bonsáis
- Alta de nuevos bonsáis
- Vista de detalle por bonsái
- Registro de eventos de cuidado
- Bitácora cronológica combinando cuidados, incidencias, fotos y notas
- Usuario de desarrollo preparado con seed
- Modelo de datos listo para evolucionar a multiusuario

## Stack

- Next.js con App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite en local

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
│   ├── constants.ts
│   ├── default-user.ts
│   ├── prisma.ts
│   ├── timeline.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── package.json
```

## Puesta en marcha local

1. Instala Node.js 20 o superior.
2. Copia variables de entorno:

```bash
cp .env.example .env
```

3. Instala dependencias:

```bash
npm install
```

4. Genera el cliente Prisma y crea la base de datos:

```bash
npm run db:generate
npm run db:migrate -- --name init
```

5. Carga el usuario y datos de ejemplo:

```bash
npm run db:seed
```

6. Arranca la aplicación:

```bash
npm run dev
```

7. Abre `http://localhost:3000`.

## Usuario de desarrollo

El seed crea este usuario:

- `dev@kodama.local`

Por ahora no hay autenticación. La app trabaja siempre sobre ese usuario para dejar el modelo preparado para multiusuario sin introducir complejidad innecesaria.

## Flujo del objetivo MVP

Con la app levantada puedes:

1. Entrar en `/bonsais`
2. Crear un bonsái desde `/bonsais/new`
3. Verlo en el listado y abrir su detalle
4. Añadir un evento desde `/bonsais/:id/eventos/nuevo`

## Evolución prevista

- Migrar de SQLite a PostgreSQL cambiando `provider` y `DATABASE_URL`
- Añadir autenticación sin romper el modelo actual
- Incorporar subida real de fotos y recordatorios activos
- Completar formularios para incidencias, bitácora y fotos

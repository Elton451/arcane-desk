# Arcane Desk — AI contributor guide

Tabletop RPG campaign manager built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **PostgreSQL**, and **Auth0**. This document summarizes how the repo is organized, which libraries to use, and the patterns to follow when implementing changes.

---

## Product scope

Users authenticate via Auth0, sync to a local `User` record, and manage **campaigns** scoped to the owner. Each campaign has:

| Domain   | Status in codebase | Route prefix (under campaign) |
| -------- | ------------------ | ----------------------------- |
| Campaign | Implemented        | `/campaigns`, `/campaign/[id]/dashboard` |
| NPC      | Implemented        | `/campaign/[id]/npc`, `.../create`, `.../[npcId]`, `.../edit` |
| Session  | Implemented        | `/campaign/[id]/session`, `.../create`, `.../[sessionId]` |
| Notes / World building | Navbar links only | `/campaign/[id]/notes`, `.../world-building` |

---

## Tech stack

| Layer | Libraries |
| ----- | --------- |
| Framework | Next.js 16, React 19 |
| Auth | `@auth0/nextjs-auth0` (`Auth0Client` in `lib/auth0.ts`) |
| Database | Prisma 7 + `@prisma/adapter-pg` + `pg` |
| Validation | Zod 4 |
| Forms | `react-hook-form` + `@hookform/resolvers/zod` |
| UI | shadcn/ui (Radix Vega style), Tailwind CSS 4, `class-variance-authority`, `clsx`, `tailwind-merge` |
| Icons | `lucide-react` |
| Toasts | `sonner` |
| Rich text | TipTap 3 (`@tiptap/react`, StarterKit, TextStyle) |
| Markdown display | `react-markdown` |
| i18n | JSON dictionaries + `@formatjs/intl-localematcher` + `negotiator` |
| Dates | `date-fns` |
| Testing | Jest 30 + Testing Library + `next/jest` |
| Quality | ESLint (Next config + Prettier), Husky, lint-staged, commitlint (conventional), dependency-cruiser |

---

## Repository layout

```
arcane-desk/
├── app/                    # Next.js App Router (thin pages)
│   ├── [lang]/             # Locale segment + layouts/pages
│   │   ├── (campaign)/campaign/[id]/...
│   │   ├── campaigns/
│   │   └── layout.tsx, globals.css
│   └── api/sync-user/      # User upsert webhook/API
├── features/               # Domain modules (main application logic)
│   ├── campaign/
│   ├── npc/
│   └── session/
├── shared/                 # Cross-cutting UI, i18n, types, API helpers
├── lib/                    # Infra singletons (prisma, auth0, cn util)
├── prisma/                 # Schema, migrations, generated client
└── proxy.ts                # Auth + locale redirect middleware logic
```

### `features/<domain>/` structure

Each feature is self-contained:

```
features/<domain>/
├── actions/          # "use server" functions (default export)
├── schemas/          # Zod schemas + inferred types
├── types/            # Feature-specific TS interfaces
└── components/       # UI (often split: form/, list/, card/)
    └── index.ts      # Public barrel exports (campaign only, so far)
```

**Do not import across features.** dependency-cruiser enforces `cross-feature-import` as an error. Shared code belongs in `shared/` or `lib/`.

### `shared/`

- `components/ui/` — shadcn primitives (`Button`, `Dialog`, `Field`, `Sidebar`, …)
- `components/` — app chrome (`Navbar`, `Paginator`, `TextEditor`, `Loading`, …)
- `i18n/` — dictionaries and `getDictionary`
- `api/models/` — DTOs (`ICampaign`, `IUserDTO`)
- `api/services/` — server helpers (`getUser`)
- `types/` — `Params`, `Dictionary`, `Lang`

### `lib/`

- `prisma.ts` — Prisma client with PG adapter
- `auth0.ts` — `Auth0Client` instance
- `utils.ts` — `cn()` for Tailwind class merging

### `app/`

Keep pages **thin**: resolve `params`, load `dict`, compose feature components. Data fetching and mutations live in `features/*/actions` or server components, not duplicated in `app/`.

---

## Path aliases (`tsconfig.json`)

| Alias | Maps to |
| ----- | ------- |
| `@/*` | project root |
| `@app/*` | `./app/*` |
| `@features/*` | `./features/*` |
| `@lib/*` | `./lib/*` |
| `@shared/*` | `./shared/*` |

Jest uses the same mappings in `jest.config.ts`. Prefer `@/features/...` and `@/shared/...` consistently with existing imports.

---

## Architecture rules

Run `npm run analyze` before large refactors. dependency-cruiser scans `./features`, `./lib`, and `./shared`.

| Rule | Meaning |
| ---- | ------- |
| `cross-feature-import` | **Error** — no `features/foo` → `features/bar` |
| `no-circular` | Warn — break cycles |
| `not-to-dev-dep` | **Error** — production paths must not import devDependencies |
| `not-to-spec` | **Error** — no importing test files from app code |

**Orphan modules** are warned except Next route files (`page`, `layout`, etc.).

When two features need the same logic, extract to `shared/` (or a small helper in `lib/` if it is infrastructure-only).

---

## Routing and i18n

- All user-facing routes live under `app/[lang]/`.
- `Params` (`shared/types/params.type.ts`) includes `lang`, `id`, `npcId` as needed per route.
- **Server components** receive `params: Promise<Params>` (Next 15+ async params pattern) and `await params` before use.
- Dictionaries: `shared/i18n/dictionaries.ts` with locales `en` and `pt-BR`. Types come from `enUS.json` via `Dictionary` / `Lang` in `shared/types/i18n.ts`.
- Load copy in server components: `const dict = await getDictionary(lang)`.
- Pass `dict` into client components as a prop; do not import JSON directly in client bundles unless testing.
- String interpolation: `t(template, params)` from `shared/i18n/interpolate.ts` (e.g. `{name}` placeholders).
- `proxy.ts` handles Auth0 middleware, login redirect, and locale prefixing via `negotiator` + `@formatjs/intl-localematcher`. Locale list there uses `en-US` / `pt-BR`; dictionary keys use `en` / `pt-BR` — align these when adding locales.
- In-app `Link`/`router.push` paths often omit the `[lang]` prefix (e.g. `/campaign/1/npc`); middleware is expected to apply the locale prefix.

---

## Authentication and users

- Server-side session: `await auth0.getSession()` from `@/lib/auth0`.
- DB user lookup: `auth0Id` ↔ `session.user.sub`.
- Prefer `getUser()` (`shared/api/services/getUser.ts`) in server actions when you need the full Prisma `User` and consistent auth errors.
- `app/api/sync-user/route.ts` — `POST` upserts user by `auth0Id` + `email` (Auth0 sync hook).
- **Authorization pattern**: scope queries by `ownerId` (campaigns) or verify `campaign.ownerId === user.id` before mutating NPCs/sessions.

Unauthenticated access should throw or redirect; do not silently return other users’ data.

---

## Data layer (Prisma)

- Schema: `prisma/schema.prisma`
- Client output: `prisma/generated/prisma` (import `@/prisma/generated/prisma/client`)
- Config: `prisma.config.ts`; connection via `DATABASE_URL`
- Singleton: `lib/prisma.ts` uses `PrismaPg` adapter

**Core models:** `User`, `Campaign`, `Npc`, `CampaignSession` (+ Auth.js-style `Account`, `Session`, `VerificationToken`).

After schema changes:

```bash
npx prisma migrate dev
```

Regenerate client if needed per Prisma 7 workflow used in this repo.

---

## Server actions pattern

Files in `features/*/actions/*.ts`:

1. Start with `"use server"`.
2. `default export` async function.
3. Validate input with Zod `safeParse`.
4. Return a **result object**, not bare throws, for expected failures:

```ts
// Success
return { success: true, data: entity };

// Validation
return { success: false, message: "...", error: validation.error };

// Not found / forbidden
return { success: false, message: "..." };
```

5. Auth + ownership checks before writes.
6. Use `prisma` from `@/lib/prisma`; avoid instantiating new clients.

List endpoints may return paginated shapes (see `listCampaign` → `ICampaignResponsePage`).

---

## Forms and client containers

**Split responsibilities:**

| Piece | Role | Directive |
| ----- | ---- | --------- |
| `*Form.tsx` | Presentational form, RHF + Zod resolver | `"use client"` |
| `*CreateForm.tsx` / `*EditForm.tsx` | Calls server action, toast, `router.push` / `refresh` | `"use client"` |
| `schemas/*.ts` | Zod schema + `z.infer` type | shared by client + server |

- Use `useForm` + `zodResolver(Schema)` and shadcn `Field` / `FieldLabel` / `FieldError`.
- TipTap fields: `Controller` + `TextEditor` from `@/shared/components/textEditor/Tiptap`.
- Feedback: `toast()` from `sonner` (Toaster in root layout).
- On success, `router.push(...)` and `router.refresh()` to reconcile server UI.

Schemas are the single source of truth; server actions re-validate with the same Zod schema.

---

## UI and styling

- **shadcn** config: `components.json` — components live in `shared/components/ui/`, style `radix-vega`, CSS variables in `app/[lang]/globals.css`.
- Use `cn()` from `@/lib/utils` for conditional classes.
- Theme: `data-theme="nord"` on `<html>`; CSS imports Tailwind 4, `tw-animate-css`, `shadcn/tailwind.css`, and `shared/assets/themes/`.
- Fonts: `shared/assets/fonts.ts` (Lato + Spectral CSS variables).
- Layout: `SidebarProvider` + `Navbar` in root layout; campaign layout adds campaign-scoped `Navbar` with `campaignId` / `campaignName`.
- Loading lists: `SkeletonBlock` from `shared/components/loading/Loading`.
- Pagination: `shared/components/paginator/Paginator` + server action with `page` / `size`.
- Rich NPC descriptions: stored as HTML/string from TipTap; display with `react-markdown` in `NpcDescription` where appropriate.

Add new shadcn components via the CLI targeting aliases in `components.json` (`ui` → `@/shared/components/ui`).

---

## Adding a new feature domain

1. Create `features/<name>/` with `actions/`, `schemas/`, `types/`, `components/`.
2. Add Prisma models + migration if persistence is needed.
3. Add routes under `app/[lang]/(campaign)/campaign/[id]/<resource>/` (or top-level if global).
4. Add dictionary keys to `enUS.json` and `ptBR.json`; types update automatically via `Dictionary`.
5. Export public components from `components/index.ts` if the feature is consumed from `app/`.
6. Run `npm run analyze` and `npm test`.

Never import another feature folder directly.

---

## Testing

- `npm test` / `npm run test:watch`
- Colocate tests as `*.test.tsx` near components (e.g. `Navbar.test.tsx`).
- Mock `next/navigation` when components use `usePathname` / `useParams`.
- Import dictionaries from JSON in tests; cast to `Dictionary`.

---

## Tooling and git workflow

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (default config) |
| `npm run analyze` | dependency-cruiser on features/lib/shared |
| `npm test` | Jest |

- **Husky** + **lint-staged**: ESLint fix on staged `*.{js,jsx,ts,tsx}`.
- **commitlint**: conventional commits (`commitlint.config.js`).

Do not commit secrets (`.env`, Auth0 secrets, `DATABASE_URL`).

---

## Environment variables

Typical requirements (exact names depend on Auth0 / deployment setup):

- `DATABASE_URL` — PostgreSQL connection string
- Auth0 variables as required by `@auth0/nextjs-auth0` (see Auth0 Next.js SDK docs)

`dotenv` is loaded in `lib/prisma.ts` and `prisma.config.ts`.

---

## Conventions checklist

- **TypeScript strict** — explicit types for public APIs; `z.infer` for form types.
- **Default exports** for actions and many components; named exports for barrels/cards where established.
- **Ownership** — always filter campaigns and nested resources by the authenticated user.
- **i18n** — user-visible strings in JSON dictionaries, not hardcoded in components (except dev placeholders).
- **Client/server boundary** — `"use server"` only in actions/services; `"use client"` on interactive UI; `server-only` on dictionary loader.
- **Imports** — use path aliases; avoid deep relative paths across layers when an alias exists.
- **Scope** — minimal diffs; match existing file naming (`CampaignList`, `NPCForm`, `createNPC`, etc.).
- **No cross-feature imports** — lift shared code to `shared/`.

---

## Reference flows

### Create entity (e.g. NPC)

1. Page (server) → `getDictionary` + render `NPCCreateForm`.
2. `NPCCreateForm` → `createNPC(campaignId, formData)`.
3. Action validates, checks campaign ownership, `prisma.create`.
4. Client toast + navigate to list + `refresh`.

### List with pagination (campaigns)

1. Client `CampaignList` → `useEffect` calls `listCampaign({ page })`.
2. Action returns `{ campaigns, pagination: { page, size, total } }`.
3. UI maps to `CampaignCard` + `Paginator`.

### Auth gate

`proxy.ts` → Auth0 middleware → redirect to `/auth/login` if no session → prepend locale to pathname when missing.

---

## Files to read first

| File | Why |
| ---- | --- |
| `README.md` | Architecture overview |
| `prisma/schema.prisma` | Data model |
| `.dependency-cruiser.js` | Import boundaries |
| `app/[lang]/layout.tsx` | Root shell, auth, i18n |
| `features/campaign/actions/createCampaign.ts` | Canonical server action |
| `features/npc/components/form/NPCCreateForm.tsx` | Canonical client mutation wrapper |
| `features/campaign/components/CampaignForm/CampaignForm.tsx` | Canonical RHF form |
| `components.json` | shadcn setup |
| `proxy.ts` | Auth and locale middleware |

This guide is derived from the current codebase; when patterns diverge in a file, follow the nearest existing feature implementation and keep boundaries consistent.

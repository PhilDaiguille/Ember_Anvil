# AGENTS.md

## Project Overview

**EmberAnvil** — Vue 3 + Vite web application (virtual forge/crafting game). All UI text and most
variable names/comments are in French.

- **Framework**: Vue 3 (Options API — **never** Composition API or `<script setup>`)
- **Build**: Vite 8.x | **Styling**: Tailwind CSS 4.x | **Router**: Vue Router 5.x
- **State**: Pinia 3.x with `pinia-plugin-persistedstate` (configured globally in `src/stores/index.js`)
- **Icons**: `lucide-vue-next` — import per-icon: `import { Hammer } from "lucide-vue-next"`
- **Language**: JavaScript ES modules — no TypeScript, no `.ts` files
- **Deployment**: Vercel (`vercel.json` at root)

---

## Commands

```bash
npm run dev            # Dev server (Vite)
npm run build          # Production build
npm run build:sitemap  # Build + generate sitemap
npm run preview        # Preview production build
npm run lint           # Lint + auto-fix (oxlint)
npm run format         # Format with Prettier (@prettier/plugin-oxc)

# Testing — Vitest + jsdom + @vue/test-utils
npm run test:run       # Single full run (use this to verify changes)
npm test               # Watch mode
npm run test:coverage  # Coverage report

# Run a single test file
npx vitest run src/__tests__/stores/workshop.spec.js
npx vitest run src/__tests__/ui/PageMain.spec.js

# Run tests matching a name pattern
npx vitest run --reporter=verbose -t "should toggle FAQ"
```

**Always run `npm run lint` and `npm run test:run` after any code change.**

---

## Project Structure (Domain-Driven)

```
src/
├── domains/                # blog/ crafting/ inventory/ player/ shop/ wiki/ workshop/
│   └── <domain>/           # components/ + views/ (+ __tests__/ for shop, workshop)
├── stores/                 # one .js per domain + index.js + game.js + migrations.js
├── data/                   # static JS data: tools, materials, recipes, quests, facilities
├── infrastructure/router/  # index.js — routes + beforeEach SEO meta hook
├── shared/
│   ├── layout/             # PageHeader, PageFooter, HomeView, PageMain
│   ├── ui/                 # MainCard (reusable)
│   └── utils/rarity.js     # getRarityClass(), getRarityLabel()
├── assets/style/           # base.css (CSS vars + .rarity-* classes), main.css
└── __tests__/              # mirrors src/: setup.js + data/ + stores/ + ui/
```

---

## Routes

`/` home · `/forge` · `/marche` · `/codex` · `/inventaire` · `/atelier` · `/profil`  
`/changelog` · `/guides/debuter-dans-la-forge` · `/guides/glossaire-forge` · `/guides/meilleurs-jeux-de-forge`

All game routes lazy-load. `/:pathMatch(.*)*` redirects to `/`.
Each route has `meta: { title, description }` — `router.beforeEach` applies them to `document.title` and `<meta name="description">` automatically.

---

## Code Style

### Vue Components (Options API)

Section order: `<template>` → `<script>` → `<style scoped>`. 2-space indent, double quotes.  
`name` must exactly match the filename (PascalCase). Self-close void elements: `<router-view />`.

Options object order: `name` → `components` → `props` → `emits` → `data()` → `computed` → `methods` → lifecycle hooks.  
Access Pinia stores in `computed`: `store() { return useWorkshopStore(); }`.

### Naming Conventions

| Type                  | Convention            | Example                            |
| --------------------- | --------------------- | ---------------------------------- |
| Components / Views    | PascalCase `.vue`     | `ShopCard.vue`, `CraftingView.vue` |
| JS modules / stores   | camelCase `.js`       | `workshop.js`, `rarity.js`         |
| Pinia store ID        | camelCase string      | `defineStore("workshop", …)`       |
| Methods / variables   | camelCase (French OK) | `calculerPrix`, `selectedTool`     |
| CSS custom properties | `--kebab-case`        | `--auburn`, `--sea-green`, `--jet` |

### Imports — Order

1. External libraries (`vue`, `pinia`, `lucide-vue-next`)
2. `@/` internal aliases (stores, utils, data)
3. Relative paths (`./`, `../`)

Lazy-load every route: `const WorkshopView = () => import("@/domains/workshop/views/WorkshopView.vue");`

### Pinia Stores

Options API style — `state` / `getters` / `actions`. One file per domain in `src/stores/`.  
Add `persist: true` (or `{ key, paths }`) to survive page reload. Plugin wired in `src/stores/index.js`.

### CSS / Tailwind

- **Tailwind 4.x** via `@tailwindcss/vite` — `@utility` for custom utilities, `@theme` for tokens
- Use scoped `<style>` for component rules; Tailwind classes for layout/spacing/colors
- **Global CSS vars** (`src/assets/style/base.css`):
  `--jet` (bg) · `--auburn` (accent red) · `--dun` (warm grey) · `--khaki` (muted) · `--viridian` (green) · `--sea-green` (primary/focus)
- **Rarity classes** (global): `.rarity-common` `.rarity-uncommon` `.rarity-rare` `.rarity-epic` `.rarity-legendary`
- **Rarity logic**: always import `getRarityClass` / `getRarityLabel` from `@/shared/utils/rarity.js` — never inline

### SEO / Schema

Blog views (`src/domains/blog/views/`) must include `<PageHeader />` and `<PageFooter />` directly.  
Inject `application/ld+json` in `mounted()` via `document.createElement("script")`.  
Supported types: `FAQPage`, `WebApplication`, `Article`, `BreadcrumbList`.

---

## Testing

Files live in `src/__tests__/` mirroring `src/`, extension `.spec.js`.  
`src/__tests__/setup.js` globally mocks `$router`/`$route` and all `lucide-vue-next` icons.

**Adding a new Lucide icon?** Also add it to the mock object in `src/__tests__/setup.js` or tests throw "No export defined on the mock".

Store tests need: `beforeEach(() => { setActivePinia(createPinia()); });`  
Component tests with `<router-link>` need: `global: { stubs: { RouterLink: { template: "<a><slot /></a>" } } }`

---

## Key Rules

1. **Always Options API** — never `<script setup>`, never Composition API
2. **No TypeScript** — plain `.js` files only
3. **French UI content** — all user-facing text in French; variable names may be French
4. **Rarity logic** — always import from `@/shared/utils/rarity.js`, never duplicate inline
5. **After any change**: run `npm run lint` then `npm run test:run` — both must pass clean
6. **New Lucide icons** — add to the mock list in `src/__tests__/setup.js`
7. **New routes** — add lazy import + route object with `meta.title` and `meta.description`
8. **New stores** — one file per domain in `src/stores/`, Options API style, add `persist: true` if state should survive reload

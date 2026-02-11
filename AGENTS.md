# AGENTS.md

## Project Overview

**EmberAnvil** - A Vue 3 + Vite web application for a virtual forge/crafting experience.

- **Framework**: Vue 3 (Composition API not used - using Options API)
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS 4.x + Custom CSS
- **Router**: Vue Router 5.x
- **Language**: JavaScript (ES modules)

## Build/Lint/Format Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint with auto-fix (uses oxlint)
npm run lint

# Format with Prettier
npm run format
```

## Testing

Vitest is installed but no test files exist yet. To run tests when added:

```bash
# Run all tests
npx vitest

# Run tests in watch mode
npx vitest --watch

# Run a single test file
npx vitest run src/components/__tests__/Component.spec.js

# Run tests with coverage
npx vitest run --coverage
```

Test file naming convention: `*.spec.js` or `*.test.js`
Recommended location: `src/components/__tests__/` or `src/__tests__/`

## Code Style Guidelines

### Imports

- Use ES module syntax (`import/export`)
- Project uses `@` alias for `src/` directory
- Import order: external libs first, then internal modules, then relative imports
- Use double quotes for strings

### Vue Components (Vue 3)

**Template section:**

- Place `<template>` at the top
- Use 2-space indentation
- Use self-closing tags when no content: `<router-view />`
- Bind attributes with `:` shorthand
- Use `@` for event listeners

**Script section (Options API):**

- Use Options API (not Composition API)
- Export default with `name` property matching filename
- Use `data()` returning object for reactive state (Vue auto-wraps in reactivity system)
- Place methods in `methods` object with automatic `this` binding
- Use camelCase for method names
- Use PascalCase for component names
- Lifecycle hooks: `mounted()`, `created()`, `updated()`, `unmounted()`
- Access component instance via `this` in methods and lifecycle hooks

**Example structure:**

```vue
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script>
export default {
  name: "ComponentName",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    console.log(`Initial count: ${this.count}`);
  },
};
</script>
```

**Style section:**

- Use scoped styles when component-specific
- Use CSS custom properties (variables) from base.css
- Follow existing patterns for layout (flexbox, grid)

### Naming Conventions

**Components:**

- PascalCase for single-word: `Home.vue`, `Wiki.vue`
- PascalCase for multi-word: `PageHeader.vue`, `MainCard.vue`, `ShopCard.vue`
- Name property in script must match filename

**Files:**

- Components: PascalCase (e.g., `PageHeader.vue`)
- JavaScript: camelCase (e.g., `index.js`)
- Views: PascalCase, placed in `src/views/`

**Variables/Properties:**

- camelCase for variables, methods, and properties
- Use descriptive French names where appropriate (project uses French content)

### CSS/Tailwind Conventions

**Tailwind CSS 4.x Features:**

- Use Tailwind utility classes for layout and spacing
- Define custom utilities with `@utility` directive instead of `@layer utilities`
- Use `@theme` directive for custom CSS variables and theme tokens
- Leverage CSS custom properties for colors (e.g., `--color-*`)
- Use arbitrary CSS properties with square brackets: `class="[mask-type:luminance]"`
- Access Tailwind's built-in CSS variables: `var(--text-xl)`, `var(--text-xl--line-height)`

**Custom CSS:**

- Custom CSS in `<style>` blocks for complex animations and component-specific styling
- CSS variables defined in `src/assets/style/base.css`:
  - `--jet`: rgb(25, 25, 25) - Background
  - `--auburn`: rgb(133, 50, 51) - Accent/Buttons
  - `--dun`: rgb(161, 152, 130) - Secondary
  - `--viridian`: rgb(50, 93, 68) - Success/Links
  - `--sea-green`: rgb(0, 114, 87) - Primary action

**Examples:**

```css
/* Define custom utility */
@utility content-auto {
  content-visibility: auto;
}

/* Define custom theme color */
@theme {
  --color-regal-blue: #243c5a;
}
```

### Error Handling

- Project has `no-console: off` in ESLint (console allowed)
- `no-unused-vars: warn` (warnings only, not errors)
- Check browser console for Vue warnings during development

### Project Structure

The project follows a **Domain-Driven Design (DDD)** architecture:

```
src/
├── assets/                    # Static assets
│   ├── style/                # Global CSS files (base.css, main.css)
│   └── materials/            # Image assets (backgrounds, icons)
│
├── domains/                   # Business domains (DDD structure)
│   ├── crafting/             # Crafting/forging domain
│   │   ├── components/       # Crafting.vue
│   │   └── views/            # CraftingView.vue
│   ├── inventory/            # Inventory management
│   │   ├── components/       # Inventory.vue
│   │   └── views/            # InventoryView.vue
│   ├── player/               # Player profile & stats
│   │   ├── components/       # Profile.vue
│   │   └── views/            # ProfileView.vue
│   ├── shop/                 # Shop/market domain
│   │   ├── components/       # Shop.vue, ShopCard.vue
│   │   └── views/            # ShopView.vue
│   ├── wiki/                 # Encyclopedia/codex
│   │   ├── components/       # Wiki.vue
│   │   └── views/            # WikiView.vue
│   └── workshop/             # Workshop/tools management
│       ├── components/       # Workshop.vue
│       └── views/            # WorkshopView.vue
│
├── infrastructure/           # Technical infrastructure
│   └── router/              # Vue Router configuration (index.js)
│
├── shared/                   # Shared/common elements
│   ├── layout/              # Layout components (Header, Footer, Home)
│   ├── ui/                  # Reusable UI components (MainCard)
│   └── Material.json        # Shared data (materials definitions)
│
├── App.vue                  # Root component
└── main.js                  # Application entry point
```

### Application Pages & Routes

The application has 7 main pages:

1. **Home** (`/`) - Landing page with hero section and CTA
2. **Forge** (`/forge`) - Main crafting interface where users create items
3. **Marché** (`/marche`) - Shop to buy materials and tools
4. **Codex** (`/codex`) - Wiki/encyclopedia of materials and recipes
5. **Inventaire** (`/inventaire`) - Inventory management for crafted items
6. **Atelier** (`/atelier`) - Workshop with tools upgrades, facilities, quests system
7. **Profil** (`/profil`) - Player profile with stats and achievements

## Domain Features

### Crafting Domain (`/forge`)

Main crafting interface where players forge items:

- **Animated Forge Station**: Visual forge with fire animations
- **Crafting Progress System**: Real-time progress bar (0-100%)
- **Particle Effects**: Dynamic sparks generation during forging
- **Craft Counter**: Tracks number of completed forges
- **Start/Stop Controls**: Button to initiate crafting process
- **Thematic UI**: Medieval forge aesthetic with anvil, hammer icons
- Uses icons: `Swords`, `Hammer`, `Sparkles`, `Flame`

### Shop Domain (`/marche`)

Marketplace for purchasing materials and tools:

- **Material Catalog**: Grid display with ShopCard components
- **Wallet System**: Display of player's écus balance
- **Filter System**: Filter materials by rarity (all, common, rare, legendary)
- **Search Functionality**: Search bar for finding specific materials
- **Material Rarity Indicators**: Visual badges for material rarity
- **Purchase System**: Click-to-buy with price display
- **Premium Theme**: Elegant marketplace design with crown badges
- Uses icons: `Crown`, `Wallet`, `Package`, `Circle`, `Gem`, `Search`, `Shield`

### Wiki Domain (`/codex`)

Encyclopedia of all game content:

- Material database browser
- Recipe reference guide
- Search and filter functionality
- Detailed item information
- Comprehensive material properties display

### Inventory Domain (`/inventaire`)

Player inventory management:

- **Tab System**: Switch between materials and crafted items
- **Materials Inventory**: List of raw materials with quantities
- **Crafted Items Inventory**: Display of forged items with quality ratings
- **Storage Statistics**: Capacity tracking (used/max)
- **Total Value Calculator**: Sum of all inventory items' value
- **Item Details**: Name, quantity, rarity, type, quality, value
- **Visual Organization**: Grid layout with icons per item type
- Uses icons: `Package`, `Coins`, `Hammer`, `FlaskConical`, `Swords`

### Workshop Domain (`/atelier`)

Advanced workshop management system with multiple features:

**Resource Economy:**

- **Écus** (primary currency) - Used for tool upgrades and facility activation
- **Or/Gold** (rare currency) - Required for facility upgrades
- **Experience Points** - Earned by completing quests

**Tools Management:**

- 4 upgradeable tools (Hammer, Anvil, Forge, Bellows)
- Each tool has 10 levels with increasing power
- Progressive upgrade costs
- Visual power indicators and progress bars
- Tool selection system

**Facilities System:**

- 3 facilities: Station de Trempage, Table d'Enchantement, Forge Élémentaire
- Activation/deactivation mechanics with costs
- 5 upgrade levels per facility
- Productivity bonuses when active
- Status indicators with animations

**Synergy System:**

- Tools can synergize with specific facilities
- Visual indicators when synergies are active
- Productivity bonuses from active synergies
- Examples: Marteau Lourd + Station de Trempage

**Workshop Statistics:**

- Global productivity calculation
- Active bonus counter
- Synergy status indicator
- Real-time stat updates

**Quest System:**

- Daily objectives with progression tracking
- Rewards in écus, gold, and experience
- Auto-completion with reward distribution
- Visual progress bars and completion indicators

**Activity History:**

- Recent upgrades log (last 5 actions)
- Timestamps for each action
- Cost tracking
- Differentiated display for tools vs facilities

**Notification System:**

- Toast notifications for all actions
- Success/error/info message types
- Auto-dismiss after 3 seconds
- Animated entrance/exit

**Upgrade Animations:**

- Full-screen overlay during upgrades
- Hammer strike animation
- Sparkle effects
- Progress feedback

### Player Domain (`/profil`)

Player profile and statistics:

- Character information
- Achievement tracking
- Statistics display
- Progress metrics
- Player level and title system

### Important Notes

- Project is in French (content and some variable names)
- Uses vue-router for SPA navigation
- Compression enabled for production (gzip, brotli, zstd)
- PWA manifest configured in index.html
- SEO meta tags and JSON-LD structured data present

## Vue 3 Best Practices

### Reactivity System

- Vue 3 automatically wraps `data()` properties in a reactivity system (Proxy-based)
- Access reactive properties via `this` in methods and lifecycle hooks
- Mutations to data properties trigger automatic re-renders
- Computed properties and watchers work seamlessly with reactive data

### Lifecycle Hooks

Available lifecycle hooks in Options API:

- `created()` - Called after instance is created (no DOM access yet)
- `mounted()` - Called after component is inserted into DOM
- `updated()` - Called after reactive data changes cause re-render
- `unmounted()` - Called when component is removed from DOM
- `beforeCreate()`, `beforeMount()`, `beforeUpdate()`, `beforeUnmount()` - Pre-hooks

### Component Communication

- Props for parent-to-child communication
- Events (`$emit`) for child-to-parent communication
- Provide/Inject for deep hierarchical communication
- Consider Pinia for complex global state management

## Vite 7.x Configuration

### Performance Optimizations

**Server Warmup:**
Pre-transform frequently used modules for faster startup:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    warmup: {
      clientFiles: ["./src/main.js", "./src/components/**/*.vue"],
    },
  },
});
```

**Dependency Optimization:**
Improve cold start times for large projects:

```javascript
export default defineConfig({
  optimizeDeps: {
    holdUntilCrawlEnd: false,
  },
});
```

### Build Optimizations

- **CSS Code Splitting**: Automatically extracts CSS from async chunks
- **Preload Directives**: Auto-generates `<link rel="modulepreload">` for entry chunks
- Compression enabled for production (gzip, brotli, zstd)

### Development Server

- Instant server start with native ESM
- Lightning-fast Hot Module Replacement (HMR)
- Configure port and auto-open in `vite.config.js`

## Vue Router 5.x Features

### Navigation Guards

**Global Guards:**

```javascript
// Global before guard
router.beforeEach(async (to, from) => {
  const isAuthenticated = await checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

// Global after hook (for analytics)
router.afterEach((to, from, failure) => {
  if (!failure) {
    document.title = to.meta.title || "EmberAnvil";
  }
});
```

**In-Component Guards (Options API):**

```javascript
export default {
  beforeRouteEnter(to, from) {
    // Called before route is confirmed
    // No access to `this` yet
  },
  beforeRouteUpdate(to, from) {
    // Called when route changes but component is reused
    // Has access to `this`
  },
  beforeRouteLeave(to, from) {
    // Called when navigating away
    // Has access to `this`
  },
};
```

### Lazy Loading Components

Use dynamic imports for code splitting:

```javascript
const routes = [
  {
    path: "/forge",
    component: () => import("@/domains/crafting/views/CraftingView.vue"),
  },
];
```

### Route Meta Fields

Use `meta` for route-level information:

```javascript
{
  path: '/atelier',
  component: WorkshopView,
  meta: {
    requiresAuth: true,
    title: 'Atelier - EmberAnvil'
  }
}
```

## Modern CSS with Tailwind 4.x

### Built-in CSS Variables

Tailwind 4 exposes utility values as CSS variables:

```css
/* Font sizes with line-heights */
font-size: var(--text-xl); /* 1.25rem */
line-height: var(--text-xl--line-height);

/* Spacing */
padding: var(--spacing-4);
margin: var(--spacing-8);
```

### Custom Utilities

```css
@utility tab-4 {
  tab-size: 4;
}

@utility content-auto {
  content-visibility: auto;
}
```

### Theme Customization

```css
@theme {
  --color-ember: #d97706;
  --color-anvil: #4b5563;
  --font-medieval: "Cinzel", serif;
}
```

### Arbitrary Properties

```html
<div class="[mask-type:luminance] [backdrop-filter:blur(10px)]">
  <!-- Content -->
</div>
```

## Icon Library

The project uses **Lucide Vue Next** for all icons throughout the application:

- Import icons as needed: `import { IconName } from "lucide-vue-next"`
- Common icons in use:
  - Workshop: `Wrench`, `Hammer`, `Anvil`, `Flame`, `Wind`, `Building2`, `ArrowUp`
  - Resources: `Coins`, `Award`, `TrendingUp`
  - Facilities: `Droplet`, `Sparkles`, `Zap`
  - Quest/Status: `Target`, `Clock`, `CheckCircle`
- Icon props: `:size` (number), `:stroke-width` (number), `class` (string)
- Example: `<Hammer :size="32" :stroke-width="2" class="icon-style" />`

## Data Management

- Currently no state management library (Vuex/Pinia)
- Component-level state using Vue Options API `data()`
- Shared data stored in `src/shared/Material.json`
- Future: Consider adding Pinia for global state (resources, player data, etc.)

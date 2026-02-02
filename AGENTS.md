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

### Vue Components

**Template section:**

- Place `<template>` at the top
- Use 2-space indentation
- Use self-closing tags when no content: `<router-view />`
- Bind attributes with `:` shorthand
- Use `@` for event listeners

**Script section:**

- Use Options API (not Composition API)
- Export default with `name` property matching filename
- Use `data()` returning object for reactive state
- Place methods in `methods` object
- Use camelCase for method names
- Use PascalCase for component names

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

- Use Tailwind utility classes for layout and spacing
- Custom CSS in `<style>` blocks for complex animations and component-specific styling
- CSS variables defined in `src/assets/style/base.css`:
  - `--jet`: rgb(25, 25, 25) - Background
  - `--auburn`: rgb(133, 50, 51) - Accent/Buttons
  - `--dun`: rgb(161, 152, 130) - Secondary
  - `--viridian`: rgb(50, 93, 68) - Success/Links
  - `--sea-green`: rgb(0, 114, 87) - Primary action

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

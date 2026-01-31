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

```
src/
├── assets/
│   ├── style/          # Global CSS files
│   └── materials/      # Image assets
├── components/         # Reusable Vue components
├── router/            # Vue Router configuration
│   └── index.js
├── views/             # Page-level components
├── App.vue            # Root component
└── main.js            # Application entry point
```

### ESLint/Prettier Configuration

- ESLint uses Vue 3 essential + Prettier rules
- Prettier uses `@prettier/plugin-oxc` for formatting
- Always run `npm run lint` and `npm run format` before committing
- CI/CD runs lint check on pushes to master branch

### Important Notes

- Project is in French (content and some variable names)
- Uses vue-router for SPA navigation
- Compression enabled for production (gzip, brotli, zstd)
- PWA manifest configured in index.html
- SEO meta tags and JSON-LD structured data present

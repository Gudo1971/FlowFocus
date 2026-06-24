# FocusFlow - Chakra UI v3 Template

A reusable starter for React + TypeScript + Vite + Chakra UI v3 with semantic tokens and a 3-mode color system.

## Features

- Vite + React + TypeScript setup
- Chakra UI v3 system API (`createSystem`)
- Color modes: `system`, `light`, `dark`
- Semantic token structure for light and dark styles
- Starter recipes for `button` and `card`
- ESLint config ready to use
- Template init script for fast project renaming

## Quick Start

```bash
npm install
npm run dev
```

Development server runs on `http://localhost:5174/` by default.

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Type-check and build
npm run typecheck  # TypeScript project check only
npm run lint       # Run ESLint
npm run preview    # Preview production build
npm run init       # Run template initialization wizard
```

## Project Structure

```text
src/
  App.tsx
  main.tsx
  components/
    Header.tsx
    ColorModeButton.tsx
  theme/
    index.ts
    tokens/
      colors.ts
      semantic.ts
      index.ts
    recipes/
      button.ts
      card.ts
      index.ts
```

## Theme Architecture

Theme wiring is centralized in `src/theme/index.ts`:

- `tokens` from `src/theme/tokens/colors.ts`
- `semanticTokens` from `src/theme/tokens/semantic.ts`
- `recipes` from `src/theme/recipes/*`

Use semantic tokens in components instead of hardcoded colors:

- `bg.page`
- `bg.surface`
- `text.primary`
- `text.muted`
- `border.subtle`
- `accent.primary`

## Color Mode Setup

Color mode is powered by `next-themes` in `src/main.tsx`:

- `defaultTheme="system"`
- `enableSystem`
- `attribute="class"`

The button in `src/components/ColorModeButton.tsx` cycles through:

1. `system`
2. `light`
3. `dark`

## Use This As A Template

```bash
git clone <repo-url> my-project
cd my-project
npm run init
npm install
npm run dev
```

The init script updates:

- `package.json` name/description/author
- `index.html` title
- Header brand text in `src/components/Header.tsx`
- README title/branding

## Notes

- Keep one theme entrypoint in `src/theme/index.ts`.
- Prefer semantic tokens for all UI colors.
- Add new reusable styles in `src/theme/recipes`.

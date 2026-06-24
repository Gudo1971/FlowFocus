# Template Guide

Use this repository as a repeatable starter for Chakra UI v3 projects.

## 1. Bootstrap A New Project

```bash
git clone <repo-url> my-new-project
cd my-new-project
npm run init
npm install
npm run dev
```

`npm run init` updates:

- `package.json` (`name`, `description`, `author`)
- `index.html` title
- header branding in `src/components/Header.tsx`
- README branding

## 2. Theme Architecture

Theme setup is centralized in `src/theme/index.ts` and composes three parts:

- `tokens` from `src/theme/tokens/colors.ts`
- `semanticTokens` from `src/theme/tokens/semantic.ts`
- `recipes` from `src/theme/recipes/*.ts`

This keeps the entrypoint stable while allowing modular theme edits.

## 3. Chakra v3 Rules

### Tokens must use `value`

```typescript
export const colors = {
  brand: {
    500: { value: "#0077e6" },
  },
};
```

### Recipes should use `defineRecipe`

```typescript
import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  base: { borderRadius: "md" },
});
```

## 4. Color Modes

Color mode is controlled by `next-themes` in `src/main.tsx`:

- `defaultTheme="system"`
- `enableSystem`
- `attribute="class"`

The mode toggle in `src/components/ColorModeButton.tsx` cycles through:

1. `system`
2. `light`
3. `dark`

## 5. Semantic Tokens In Components

Use semantic token names instead of hardcoded colors:

- `bg.page`
- `bg.surface`
- `text.primary`
- `text.muted`
- `border.subtle`
- `accent.primary`

Example:

```tsx
<Box bg="bg.surface" color="text.primary" borderColor="border.subtle" />
```

## 6. Quality Commands

```bash
npm run typecheck
npm run lint
npm run build
```

## 7. CI

GitHub Actions CI runs on push and pull request and checks:

1. install (`npm ci`)
2. typecheck
3. lint
4. build

## 8. Suggested First Edits

1. Replace branding text in `src/components/Header.tsx`
2. Update `src/theme/tokens/colors.ts` with your palette
3. Extend `src/theme/tokens/semantic.ts` for app-level tokens
4. Add your app modules under `src/components`

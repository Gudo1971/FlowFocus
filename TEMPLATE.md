# 📋 Template Handleiding

Dit project is geschikt als template voor toekomstige Chakra UI + Dark Mode projecten.

## 🚀 Hoe te gebruiken als template

### Stap 1: Clone of kopieer het project

```bash
git clone <repo-url> my-new-project
cd my-new-project
npm install
```

### Stap 2: Hernoem je project

Update deze bestanden met je project-naam:

- **package.json**: `"name": "my-new-project"`
- **index.html**: `<title>My New Project</title>`
- **src/components/Header.tsx**: Vervang "FocusFlow" door je project-naam

### Stap 3: Pas je thema aan

Edit **src/theme/index.ts**:

```typescript
const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          page: { value: { base: "YOUR_COLOR.50", _dark: "YOUR_COLOR.900" } },
          surface: { value: { base: "white", _dark: "YOUR_COLOR.800" } },
        },
        // Add your brand colors
        brand: {
          primary: { value: { base: "purple.500", _dark: "purple.300" } },
          secondary: { value: { base: "pink.500", _dark: "pink.300" } },
        },
      },
    },
  },
});
```

### Stap 4: Voeg je eigen componenten toe

Maak componenten in **src/components/**:

```typescript
// src/components/MyComponent.tsx
import { Box, Text } from "@chakra-ui/react";

export function MyComponent() {
  return (
    <Box bg="bg.surface" color="text.primary" p={4} borderRadius="lg">
      <Text>Dit gebruikt automatisch je semantic tokens!</Text>
    </Box>
  );
}
```

### Stap 5: Start development

```bash
npm run dev
```

## 🎨 Theme Token Reference

### Color Modes

- Light mode: `base` value
- Dark mode: `_dark` value

### Available Semantic Tokens

```typescript
// Backgrounds
bg.page; // Full page background
bg.surface; // Component surfaces

// Text
text.primary; // Main text color
text.muted; // Secondary text color

// Accents
accent.primary; // Brand accent

// Borders
border.subtle; // Subtle border color
```

## 📦 Pre-installed Features

✅ Dark/Light mode (via next-themes)  
✅ Chakra UI v3 (system API)  
✅ TypeScript setup  
✅ ESLint configured  
✅ Vite dev server  
✅ Semantic color tokens

## 🔄 Template Lifecycle

1. **Development**: `npm run dev` → `http://localhost:5174`
2. **Building**: `npm run build` → `dist/`
3. **Linting**: `npm run lint` → Check code quality
4. **Preview**: `npm run preview` → Test production build

## 📝 Key Files to Customize

| File                        | Purpose          | Customize               |
| --------------------------- | ---------------- | ----------------------- |
| `package.json`              | Project metadata | name, version, author   |
| `index.html`                | HTML template    | title, favicon          |
| `src/theme/index.ts`        | Theme config     | colors, tokens, recipes |
| `src/components/Header.tsx` | Main header      | branding, navigation    |
| `README.md`                 | Documentation    | project description     |

## 💡 Best Practices

- Always use **semantic tokens** instead of hardcoded colors
- Keep theme config in **src/theme/** organized
- Use **TypeScript** for component props
- Follow **Chakra UI** component patterns
- Test dark/light mode with ColorModeButton

## 🤔 Common Customizations

### Change Default Color Mode

Edit **src/main.tsx**:

```typescript
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
```

### Add Custom Semantic Token

Edit **src/theme/index.ts**:

```typescript
semanticTokens: {
  colors: {
    myCustom: { value: { base: "blue.500", _dark: "blue.300" } },
  },
}
```

### Use Token in Component

```typescript
<Box color="myCustom">Tekst met custom token</Box>
```

## 🎯 Next Steps

- [ ] Rename project
- [ ] Update theme colors
- [ ] Create your components
- [ ] Add your content
- [ ] Deploy!

---

Happy coding! 🚀

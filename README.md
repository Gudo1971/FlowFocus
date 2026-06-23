# FocusFlow – Chakra UI v3 Template

A production-ready template for React + TypeScript + Vite + Chakra UI v3 with dark/light mode support.

## ✨ Features

- ⚡ **Fast Development** – Vite with HMR
- 🎨 **Dark/Light Mode** – Next-themes + Chakra semantic tokens
- 🎯 **Chakra UI v3** – Modern component library with system API
- 📱 **Responsive Design** – Mobile-first Chakra components
- ✨ **Type-Safe** – Full TypeScript support
- 🧹 **Clean Architecture** – Organized components, theme, and utilities

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5174/`

### Production Build

```bash
npm run build
npm run preview  # Test build locally
```

### Code Quality

```bash
npm run lint     # ESLint check
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Main header with color mode button
│   └── ColorModeButton.tsx     # 3-state theme toggle (system/light/dark)
├── theme/
│   ├── index.ts               # Chakra v3 system config (createSystem)
│   ├── tokens/
│   │   ├── colors.ts          # Color definitions
│   │   ├── semantic.ts        # Semantic tokens (light/dark modes)
│   │   └── index.ts
│   └── recipes/
│       ├── button.ts          # Button recipe
│       ├── card.ts            # Card recipe
│       └── index.ts
├── App.tsx                    # Root component
└── main.tsx                   # React entry point
```

## 🎨 Theme System

### Semantic Tokens

All components use semantic tokens that automatically respond to light/dark mode:

```typescript
// Available tokens
bg.page; // Page background
bg.surface; // Component surface
text.primary; // Main text
text.muted; // Secondary text
accent.primary; // Accent color
border.subtle; // Subtle borders
```

### Adding Custom Tokens

Edit `src/theme/index.ts`:

```typescript
semanticTokens: {
  colors: {
    brand: {
      default: { value: { base: "blue.500", _dark: "blue.300" } },
    },
  },
}
```

## 🌓 Dark/Light Mode

- **ColorModeButton** cycles through: System → Light → Dark
- Uses `next-themes` for persistent storage
- Emojis indicate current mode: 🖥️ 🌞 🌙

## 📦 Dependencies

- **@chakra-ui/react** – Component library
- **next-themes** – Color mode management
- **framer-motion** – Animations
- **react-icons** – Icon library
- **vite** – Build tool

## 🔧 Configuration Files

- `vite.config.ts` – Vite configuration
- `tsconfig.json` – TypeScript configuration
- `eslint.config.js` – ESLint rules
- `index.html` – HTML entry point

## 🎯 Using as a Template

This project is structured as a reusable template:

1. Clone or copy this repository
2. Run `npm install`
3. Replace "FocusFlow" branding in [src/components/Header.tsx](src/components/Header.tsx)
4. Customize `src/theme/index.ts` with your brand colors
5. Add your components in `src/components/`
6. Extend semantic tokens in `src/theme/tokens/semantic.ts`

## 📝 License

Free to use as a template for your projects.

      },
      // other options...
    },

},
])

```

```

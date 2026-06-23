# ⚡ Quick Start – Template Use

## Optie 1: Via Node.js Script (Aanbevolen)

```bash
# 1. Clone template
git clone <repo-url> my-project
cd my-project

# 2. Run template init script
node init-template.mjs

# 3. Follow prompts (project name, description, author)

# 4. Clean up
npm install
rm init-template.mjs TEMPLATE-INIT-README.md QUICK-START.md

# 5. Start coding
npm run dev
```

## Optie 2: Handmatig

```bash
git clone <repo-url> my-project
cd my-project
npm install
```

Then manually edit:
- `package.json` → name, description, author
- `index.html` → title
- `src/components/Header.tsx` → "FocusFlow" → your project name
- `src/theme/index.ts` → brand colors

## Optie 3: GitHub Template Button

1. Go to this repo on GitHub
2. Click **"Use this template"** → **"Create a new repository"**
3. Clone your new repo
4. Run `node init-template.mjs`

---

## 🎨 Customize Theme

Edit **src/theme/index.ts**:

```typescript
const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          page: { value: { base: "purple.50", _dark: "purple.900" } },
          surface: { value: { base: "white", _dark: "purple.800" } },
        },
        text: {
          primary: { value: { base: "purple.900", _dark: "purple.100" } },
        },
        accent: {
          primary: { value: { base: "purple.600", _dark: "purple.400" } },
        },
      },
    },
  },
});
```

## 🚀 Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Check code
npm run preview  # Test build
```

## 📁 File Structure

```
src/
├── components/          # Your components
├── theme/
│   ├── index.ts        # Theme config
│   ├── tokens/
│   │   ├── colors.ts
│   │   └── semantic.ts (light/dark mode)
│   └── recipes/
├── App.tsx
└── main.tsx
```

## 💡 Key Features

✅ Chakra UI v3 with semantic tokens  
✅ Dark/Light mode toggle  
✅ TypeScript support  
✅ ESLint configured  
✅ Ready for production  

---

See **TEMPLATE.md** for detailed customization guide.

# Quick Start

## Option 1: Use The Init Wizard (Recommended)

```bash
git clone <repo-url> my-project
cd my-project
npm run init
npm install
npm run dev
```

The wizard updates project metadata and frontend branding in key files.

## Option 2: Manual Setup

```bash
git clone <repo-url> my-project
cd my-project
npm install
```

Then update:

- `package.json` (`name`)
- `frontend/package.json` (`description`, `author`)
- `frontend/index.html` (`<title>`)
- `frontend/src/components/Header.tsx` (project name)
- `README.md` (project title and summary)

## Run Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Workspace Commands

```bash
npm run dev:frontend
npm run dev:backend
```

## Template Cleanup (Optional)

After initialization, you can remove template-only docs.

For Bash:

```bash
rm QUICK-START.md TEMPLATE.md TEMPLATE-INIT-README.md
```

For PowerShell:

```powershell
Remove-Item QUICK-START.md, TEMPLATE.md, TEMPLATE-INIT-README.md
```

## Next

See `TEMPLATE.md` for the full customization guide.

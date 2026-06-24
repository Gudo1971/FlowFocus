# FocusFlow

FocusFlow is now structured as a small monorepo with a React frontend, an Express backend, and a shared package for cross-cutting types or constants.

## Workspaces

```text
frontend/
  src/
  public/
  package.json
  tsconfig.json

backend/
  src/
  package.json
  tsconfig.json

shared/
  src/
  package.json
  tsconfig.json
```

## Quick Start

```bash
npm install
npm run dev
```

The default root `dev` script starts the frontend. For the backend, use `npm run dev:backend`.

## Scripts

```bash
npm run dev           # Start the frontend workspace
npm run dev:frontend  # Start the frontend explicitly
npm run dev:backend   # Start the Express backend
npm run build         # Build all workspaces that expose a build script
npm run typecheck     # Type-check all workspaces that expose a typecheck script
npm run lint          # Run workspace lint scripts where available
npm run preview       # Preview the frontend production build
npm run init          # Update template/project metadata
```

## Frontend Notes

The existing Vite + React app lives in `frontend/`. Theme wiring remains centered in `frontend/src/theme/index.ts`, and the Chakra UI structure is unchanged apart from the workspace move.

## Backend Notes

The backend starts as a minimal Express server with a `/health` endpoint in `backend/src/server.ts`. It is intended as a clean base for APIs, auth, or persistence.

## Shared Notes

Use `shared/` for types, constants, and utilities you want to keep aligned between the frontend and backend.

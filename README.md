# TypeScript Decorator Playground

A demo monorepo showing legacy TypeScript decorators side-by-side with modern TC39 Stage 3 decorators, wired to a Hono backend and a Svelte frontend.

## Setup

Requires Node.js >= 20.

```bash
nub install
```

## Development

Start both the backend and the frontend dev servers concurrently:

```bash
nub run dev
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Workspace layout

```
packages/
  decorators-legacy/   # experimentalDecorators + reflect-metadata
  decorators-modern/   # TC39 Stage 3 decorators + Symbol.metadata
  backend/             # Hono API consuming both decorator packages
  frontend/            # Svelte + Vite app with ?raw source imports
```

## Testing

```bash
nub run test
```

Each package has its own Vitest suite.

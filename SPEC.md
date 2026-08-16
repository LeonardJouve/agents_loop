# Spec: TypeScript Decorator Playground

**Labels:** `ready-for-agent`

---

## Problem Statement

Developers learning TypeScript decorators struggle to find a single, cohesive resource that demonstrates:
1. How to write decorators for classes, methods, properties, and parameters
2. How to build reusable, generic decorator abstractions (not framework-specific magic)
3. The differences between legacy TypeScript decorators and modern TC39 Stage 3 decorators
4. How to compose decorators into real-world backend patterns (validation, caching, auth, logging)

Existing tutorials are fragmented, framework-specific (NestJS, TypeORM), or only cover one decorator standard. There is no hands-on playground that lets developers see both standards side-by-side, applied to a realistic domain, with interactive API calls showing the decorators in action.

## Solution

Build a **TypeScript Decorator Playground** — a demo web application with:
- A **Hono backend** (powered by `nub` runtime) serving a Library Management API
- **Two discrete decorator packages**: `decorators-legacy` (experimental decorators) and `decorators-modern` (TC39 Stage 3)
- A **Svelte frontend** that displays decorator source code, explains how each works, and makes live API calls to see decorators in action
- **Vitest tests** in each decorator package proving the abstractions work in isolation

The app itself is a teaching tool, not a production system. The educational value is in the code structure, decorator composition, and the ability to compare legacy vs. modern implementations of the same behavior.

---

## User Stories

### Structural / Anatomy
1. As a developer new to decorators, I want to see a dedicated "Decorator Anatomy" page, so that I understand the difference between class, method, property, and parameter decorators.
2. As a developer, I want to see the exact TypeScript signature and metadata keys each decorator type receives, so that I know what arguments I have to work with.
3. As a developer, I want to toggle between legacy and modern decorator syntax on the anatomy page, so that I can compare the two standards at the structural level.

### Reusability & Abstraction
4. As a developer, I want to read about why decorators should be generic (framework-agnostic), so that I learn to write decorators I can reuse across Express, Hono, Fastify, or frontend code.
5. As a developer, I want to see how a thin Hono adapter wraps a generic decorator, so that I understand the adapter pattern and how to bridge generic logic to framework contexts.
6. As a developer, I want to see the source code of each decorator in a syntax-highlighted block, so that I can copy it into my own projects.

### Behavioral Decorators — Legacy
7. As a developer, I want to see a `@Log` decorator that logs method entry, arguments, and exit timing, so that I learn how to intercept method calls.
8. As a developer, I want to see a `@Validate` decorator that validates request payloads against a schema, so that I learn how to intercept and guard method arguments.
9. As a developer, I want to see a `@Cache` decorator that memoizes method results with TTL, so that I learn how to intercept and short-circuit method calls.
10. As a developer, I want to see an `@Authorize` decorator that checks a mock role before allowing access, so that I learn how to intercept and reject unauthorized calls.
11. As a developer, I want to see a `@Retry` decorator that retries failed async calls with exponential backoff, so that I learn how to wrap and retry method execution.
12. As a developer, I want to see a `@RateLimit` decorator that limits call frequency, so that I learn how to intercept and throttle method calls.
13. As a developer, I want to see a `@Transactional` decorator that simulates atomic multi-step operations, so that I learn how to wrap method execution in a unit-of-work pattern.

### Behavioral Decorators — Modern
14. As a developer, I want to see the *same* set of behavioral decorators (`@Log`, `@Validate`, `@Cache`, `@Authorize`, `@Retry`, `@RateLimit`, `@Transactional`) implemented with modern TC39 decorators, so that I can compare the syntax, metadata API, and type signatures between the two standards.
15. As a developer, I want to see side-by-side code blocks showing legacy vs. modern implementation of the same decorator, so that I can migrate my knowledge from one standard to the other.

### Frontend Playground
16. As a developer, I want the frontend to have a "Try it" panel for each decorator family, so that I can send a live API request and see the decorated endpoint's response, headers, and timing.
17. As a developer, I want the request/response inspector to show whether `@Cache` was hit (e.g. `X-Cache: HIT` vs `X-Cache: MISS`), so that I can see the decorator's effect transparently.
18. As a developer, I want the frontend to display a seed dataset (books, authors, loans) so that the API calls return realistic data without me having to set anything up.
19. As a developer, I want a clean, static Svelte UI with no unnecessary animations, so that the focus stays on the code and the API behavior.

### Backend Domain
20. As a developer, I want the backend to be a realistic but minimal Library Management domain (Books, Authors, Loans), so that the decorators feel natural and not artificially tacked onto a "hello world" API.
21. As a developer, I want the backend to use in-memory data with a seed script, so that I can restart the server and always get the same demo state.
22. As a developer, I want to see how multiple decorators compose on a single endpoint (e.g. `@Authorize` + `@Validate` + `@Log` + `@Cache`), so that I learn decorator stacking and ordering.

### Testing
23. As a developer learning from this repo, I want each decorator package to have a Vitest suite, so that I can see how decorated code is tested in isolation (without spinning up an HTTP server).
24. As a developer, I want the backend to have integration tests that hit decorated Hono routes via the test client, so that I can see how to test the composition of decorators with a framework.

### Tooling & DX
25. As a developer cloning this repo, I want to run `nub run dev` and have both backend and frontend start, so that the setup is frictionless.
26. As a developer, I want the monorepo to use npm-style workspaces with `nub install`, so that I don't need pnpm or any extra tooling beyond nub and Node.

---

## Implementation Decisions

### Monorepo Structure
- Root `package.json` with `"workspaces": ["packages/*"]` (npm-style workspaces)
- `nub install` for dependency management; `nub run` for script execution
- `packages/decorators-legacy/` — generic decorators using `experimentalDecorators` + `reflect-metadata`
- `packages/decorators-modern/` — generic decorators using TC39 Stage 3 decorators
- `packages/backend/` — Hono API server consuming both decorator packages
- `packages/frontend/` — Svelte static app consuming decorator source via `?raw` imports

### Backend Runtime
- Backend served by `nub watch src/server.ts` in development
- `nub` (oxc transpiler) handles both decorator standards natively
- No separate build step for backend; TypeScript executed directly
- Hono as the HTTP framework for routing and middleware

### Frontend Build
- Frontend bundled by Vite (Svelte plugin)
- Source code display via Vite `?raw` imports from `../decorators-legacy/src/*.ts` and `../decorators-modern/src/*.ts`
- Live API calls using `fetch()` to the backend origin
- Static single-page application; no server-side rendering needed

### Decorator Architecture
- **Generic core**: Each decorator in `decorators-legacy` and `decorators-modern` is framework-agnostic. It operates on standard class/method/property/parameter targets and uses standard metadata mechanisms.
- **Hono adapter layer**: In `packages/backend`, thin adapter functions or middleware compose the generic decorators with Hono's `Context` object. This demonstrates "reusable abstraction" — the decorators know nothing about HTTP.
- **Example**: `@Cache` in the decorator package accepts a `ttl` and a `keyFn`. The backend adapter passes a `keyFn` that hashes the request path + query. The decorator itself is just a method wrapper.

### Decorator Coverage
**Legacy package** (`experimentalDecorators`):
- Structural: `@classDecorator`, `@methodDecorator`, `@propertyDecorator`, `@parameterDecorator` (anatomy examples)
- Behavioral: `@Log`, `@Validate`, `@Cache`, `@Authorize`, `@Retry`, `@RateLimit`, `@Transactional`

**Modern package** (TC39 Stage 3):
- Structural: equivalents of all four decorator types (modern syntax differs significantly for class and auto-accessor decorators)
- Behavioral: `@log`, `@validate`, `@cache`, `@authorize`, `@retry`, `@rateLimit`, `@transactional`

### Domain Model (Library Management)
- **Book**: id, title, isbn, authorId, publishedYear, available (boolean)
- **Author**: id, name, bio
- **Loan**: id, bookId, borrowerName, checkoutDate, returnDate
- In-memory stores: `Map<string, Book>`, `Map<string, Author>`, `Map<string, Loan>`
- Seed script creates 5 authors, 10 books, 3 loans on server startup

### API Endpoints (decorated examples)
- `GET /books` — `@Cache(60s)` + `@Log`
- `GET /books/:id` — `@Cache(30s)`
- `POST /books` — `@Authorize('admin')` + `@Validate(CreateBookDto)` + `@Log` + `@Transactional`
- `POST /loans` — `@Authorize('librarian')` + `@Validate(CreateLoanDto)` + `@Transactional` + `@Retry(3)`
- `POST /loans/:id/return` — `@Authorize('librarian')` + `@Log` + `@Transactional`
- `GET /authors` — `@RateLimit(10/min)` + `@Log`
- `GET /search` — `@RateLimit(5/min)` + `@Cache(10s)` + `@Retry(2)`

### Persistence
- In-memory only. No SQLite, no JSON file. Resets on restart.
- Seed script runs synchronously before Hono starts listening.

### Testing Strategy
- **Seam S1 — Decorator Core**: Vitest in each decorator package. Tests apply decorators to dummy classes and assert behavior (e.g. `@Cache` returns memoized result on second call; `@Retry` retries exactly N times; `@Log` writes expected strings to a spy logger).
- **Seam S2 — Backend Integration**: Vitest in `packages/backend`. Uses Hono's test client (`app.request()`) to hit decorated routes. Asserts response status, body, headers (e.g. `X-Cache`), and side effects on in-memory store.
- **Seam S3 — Frontend**: Deferred. The frontend is presentational; its value is in displaying code and proxying API calls. No unit tests for Svelte components in initial scope.

### Data Flow & Request Lifecycle
1. Frontend loads and displays static code blocks from `?raw` imports
2. User clicks "Try it" — frontend `fetch()` sends request to backend
3. Backend Hono route receives request
4. Middleware stack (auth, rate limit, validate) runs via decorated controller methods
5. Decorators intercept in order: outermost (`@Log` entry) → `@Authorize` → `@RateLimit` → `@Validate` → `@Cache` check → method body → `@Cache` store → `@Log` exit
6. Response returns to frontend with headers indicating decorator effects
7. Frontend renders response + timing + headers in an inspector panel

---

## Testing Decisions

- **Good tests** assert external behavior, not internal implementation. We do not assert "the decorator modified descriptor.value" — we assert "calling the decorated method twice with the same args returns the same reference without re-executing the body."
- **Decorator packages** tested in isolation with dummy target classes. No Hono, no HTTP.
- **Backend package** tested with Hono's built-in test client. No real network ports needed.
- **Test names** describe behavior, not mechanism: `it('returns cached result on second call')` not `it('wraps descriptor.value').`

---

## Out of Scope

- Database persistence (SQLite, PostgreSQL, etc.)
- Real authentication (JWT, OAuth, sessions) — mock role-based auth only
- Frontend unit/component tests (Playwright, Vitest browser mode)
- Browser-side decorator execution (Svelte components do not use decorators)
- CI/CD pipeline setup
- Docker/containerization
- Production deployment configuration
- OpenAPI/Swagger documentation generation
- WebSocket or real-time features
- Code editor / Monaco integration (users cannot write their own decorators in the UI)

---

## Further Notes

- **nub runtime**: Since `nub` uses oxc for transpilation, both `experimentalDecorators` and modern decorators should work under the same runtime. The `tsconfig.json` in each decorator package will explicitly declare its target standard. The backend may need two entry points or two build configs if mixing both standards in one file is problematic — but since the two packages are discrete, the backend simply imports from whichever package it needs for a given demo endpoint.
- **Metadata libraries**: Legacy decorators use `reflect-metadata`. Modern decorators use the standard `Symbol.metadata` and accessor patterns. The two packages must not share metadata mechanisms.
- **Code display**: The frontend will import `.ts` files as raw strings. Vite's `?raw` import works for files outside the package root if the file is within the workspace. Ensure the frontend Vite config allows serving files from sibling packages.
- **Vertical slice priority**: The first vertical slice should be a single decorator (`@Log`) implemented in both legacy and modern packages, plus the backend endpoint and frontend page. This proves the toolchain (nub, Hono, Svelte, Vite, Vitest) end-to-end before scaling to the full decorator set.

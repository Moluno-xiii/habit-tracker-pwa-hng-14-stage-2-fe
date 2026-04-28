# Habit Tracker — Daily Ledger

An offline capable, installable (`PWA`) habit tracker styled as a hand kept almanac. Built for the HNG Internship 14, Frontend Stage 3 task.

## Project overview

A single-page PWA where each authenticated user keeps their own private list of daily habits, marks them complete each day, and watches a streak grow as long as they keep showing up. There is no remote backend, every user, session, and habit lives in the browser's `localStorage`. The app installs to the home screen, runs in its own window, and survives without a network connection once it has been opened at least once.

### Stack

- **Next.js 16** (App Router) + **React 19** + **React Compiler**
- **Tailwind CSS**
- **TypeScript**
- **Vitest** + **@testing-library/react** for unit and integration tests
- **Playwright** for end-to-end tests
- A **service worker** + **Web App Manifest** for PWA integration

## Setup instructions

Prerequisites: Node 20+ and `pnpm` (the lockfile is `pnpm-lock.yaml`). `npm` and `yarn` will work too (the documented commands use `npm`)

```bash
git clone https://github.com/Moluno-xiii/habit-tracker-pwa-hng-14-stage-2-fe
cd habit-tracker-pwa-hng-14-stage-2-fe
pnpm install
```

For end-to-end tests, install the Playwright browser binary once:

```bash
pnpm exec playwright install chromium
# Linux only, if system libs are missing:
pnpm exec playwright install-deps chromium
```

## Run instructions

### Development

```bash
pnpm dev
```

Visit `http://localhost:3000`. The service worker is intentionally **not** registered in development mode (see `src/components/shared/ServiceWorkerRegistrar.tsx`) so that Next's HMR doesn't fight a stale cache.

### Production build

```bash
pnpm build
pnpm start
```

The service worker registers on `window.load` once the app is served as a production build over HTTP/HTTPS. The browser will then offer to install the app.

## Test instructions

Three independent test surfaces. Each can be run on its own, and `pnpm test` runs all three in order.

```bash
pnpm test:unit         # vitest run --coverage  (tests/unit + integration)
pnpm test:integration  # vitest run             (no coverage report)
pnpm test:e2e          # playwright test        (end to end tests, visible on the browser)
pnpm test              # all of the above, in order
```

End-to-end tests boot a real production build (`pnpm build && pnpm start`) automatically via the `webServer` block in `playwright.config.ts`. The first run will take a minute or two to build. To run a single e2e test by title:

```bash
pnpm exec playwright test -g "offline"
pnpm exec playwright test --headed     # watch the browser
pnpm exec playwright show-report       # open the HTML report after a run
```

## Local persistence structure

All state is stored in the browser's `localStorage` under three string keys (defined in `src/lib/constants.ts`):

| Key                     | Type              | Shape                                                                                     |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `habit-tracker-users`   | `User[]`          | `{ id, email, password, createdAt }`                                                      |
| `habit-tracker-session` | `Session \| null` | `{ userId, email }`                                                                       |
| `habit-tracker-habits`  | `Habit[]`         | `{ id, userId, name, description, frequency: "daily", createdAt, completions: string[] }` |

A few notes on shape and access patterns:

- All values are JSON-serialized through a tiny wrapper (`src/lib/storage.ts`) that doesn't operate on the server (so SSR doesn't crash). Reads return `null` if the key is missing.
- `Habit.completions` is a sorted-on-read **set of `YYYY-MM-DD` strings**. The streak calculation in `src/lib/streak.ts` walks backwards from "today," counting consecutive days that appear in this set. Duplicates are deduplicated via `new Set(...)` before the walk.
- Habit ownership is enforced at the read boundary: `habitService.getAllHabitsByUserId(userId)` filters to one user's records, so two users sharing a browser don't see each other's data.
- There is no encryption. Passwords are stored in cleartext — see "Trade-offs" below.

## How PWA support was implemented

Three pieces working together. None of them are framework magic; everything is hand-written and lives in `public/` or `src/components/shared/`.

### 1. Web App Manifest — `public/manifest.json`

Declares the app's identity to the OS. It includes the required name, short_name, start_url, display mode, theme/background colors, and three icons (an inline-cream maskable SVG plus 192/512 PNGs in `public/icons/`). The manifest is linked from the App Router metadata in `src/app/layout.tsx`.

### 2. Service worker — `public/sw.js`

Three event handlers:

- **`install`** — pre-caches the app shell (`/`, manifest, icons) into a versioned cache (`app-shell-v1`). Each request uses `cache: "reload"` to bypass HTTP caching during install. Failures on individual entries are swallowed so a single missing asset does not break installation.
- **`activate`** — deletes any cache whose name does not match the current version, then claims existing clients so the new SW takes control immediately.
- **`fetch`** — two strategies:
  - **Network-first for navigations** (`request.mode === "navigate"`). On success, the response is mirrored into a runtime cache. On failure, falls back to the cached navigation, then to the cached `/` shell, then to a 503 plain-text response. This is what makes the app render offline without hard-crashing.
  - **Stale-while-revalidate for everything else** (same-origin GETs only). Cached response is returned immediately if present, while the network is fetched in the background to update the cache for next time.

Cross-origin requests, non-GETs, and non-`basic` responses are ignored or skipped on cache writes — by design, to avoid caching opaque responses or POST bodies.

### 3. Service worker registration — `src/components/shared/ServiceWorkerRegistrar.tsx`

A client only component mounted once at the root (`src/app/layout.tsx`). It registers `/sw.js` on `window.load` to avoid blocking initial paint. Registration is gated on `process.env.NODE_ENV === "production"` so that Next.js HMR is never fighting a cached service worker during development.

### Offline behavior in practice

After the first online visit, navigating back while offline will:

1. The browser fires the navigation request, which the SW intercepts.
2. `networkFirstNavigation` fails the `fetch`, falls through to `caches.match`, and serves either the previously visited URL or the `/` shell.
3. The page boots; the React tree mounts; `localStorage` reads succeed; the user sees their dashboard.

This satisfies the brief's "render offline after it has been loaded once" and "do not hard-crash when offline" requirements.

## Trade-offs and limitations

- **Streak resets to 0 once the calendar day changes.** Per PRD, `calculateCurrentStreak` returns `0` if today is not in completions, even when yesterday was marked and today is still in progress. A user reading the dashboard mid-day will see a `0` that arguably should still be a `1`.
- **No remote backend.** Authentication is a `localStorage` shim, not a real auth system. Passwords are stored in plain text; nothing leaves the device. This is appropriate for the assignment's scope but disqualifies the app for any multi-device or shared account use.
- **No password hashing or rate limiting.** The login check is a case-insensitive string compare. In a real product this would sit behind argon2/bcrypt and a backend.
- **`localStorage` ceiling.** The browser caps storage at roughly 5 MB per origin. Habits are tiny, but a long-lived account could in principle approach that limit. There is no compaction, archiving, or quota handling.
- **No background sync.** When offline, habit toggles still write to `localStorage` and display correctly, but there is nothing to sync to a server later because there is no server.
- **Frequency is locked to "daily".** The data model and UI both reserve room for other frequencies, but only "daily" is implemented.

## Test files and the behavior each one verifies

The required test files map to behaviors as follows. Each row pairs the file with the source it covers and the behaviors that fail if the file is removed.

### Unit tests — `tests/unit/` (Vitest, jsdom)

| File                 | Source under test                              | Verifies                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug.test.ts`       | `src/lib/slug.ts` — `getHabitSlug`             | A habit name is lowercased, hyphenated, has outer whitespace trimmed and inner whitespace collapsed, and has non-alphanumeric characters stripped. The slug is what makes habit-card test IDs unique and stable. |
| `validators.test.ts` | `src/lib/validator.ts` — `validateHabitName`   | Empty (or whitespace-only) names are rejected with an error; names over 60 characters are rejected; valid names are returned trimmed and marked valid.                                                           |
| `streaks.test.ts`    | `src/lib/streak.ts` — `calculateCurrentStreak` | Streak is `0` with no completions; `0` if today is not completed; equals N for N consecutive days ending today; ignores duplicate dates; breaks at the first missing calendar day walking backward.              |
| `habits.test.ts`     | `src/lib/habits.ts` — `toggleHabitCompletion`  | Toggling adds a missing date, removes a present one, never mutates the input habit (returns a new object with a new `completions` array), and never produces duplicate completion dates.                         |

### Integration tests — `tests/integration/` (Vitest + @testing-library/react, jsdom)

| File                  | Components / contexts under test                                       | Verifies                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth-flow.test.tsx`  | `SignupForm`, `LoginForm`, `AuthContextProvider`, `authService`        | Submitting the signup form persists a user and a session and redirects to `/dashboard`; signing up with an already-registered email surfaces an inline error and does not redirect; logging in with valid credentials restores a session and redirects; logging in with bad credentials shows an inline error and leaves no session.                                                                                                                               |
| `habit-form.test.tsx` | `HabitForm`, `DashboardPageUI`, `HabitContextProvider`, `habitService` | An empty habit name shows a validation error and does not call `onSubmit`; submitting a valid habit creates it and renders it in the list; editing renames the habit while preserving `id`, `userId`, `createdAt`, `frequency`, and `completions`; deleting requires confirming in the dialog (the card stays until confirmation, then is gone from both DOM and storage); toggling completion adds today's date and updates the streak display from `00` to `01`. |

### End-to-end tests — `tests/e2e/app.spec.ts` (Playwright, Chromium)

A single spec file covering routing, persistence, and PWA behavior across a real browser.

| Test                                                                         | Verifies                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shows the splash screen and redirects unauthenticated users to /login`      | Visiting `/` while logged out lands on `/login` with the login form rendered.                                                                                                             |
| `redirects authenticated users from / to /dashboard`                         | A seeded session at `/` is detected and the user is sent to `/dashboard`.                                                                                                                 |
| `prevents unauthenticated access to /dashboard`                              | `ProtectedRoute` redirects an unauthenticated visit to `/dashboard` back to `/login`.                                                                                                     |
| `signs up a new user and lands on the dashboard`                             | Filling and submitting the signup form creates an account, sets a session, and navigates to `/dashboard`.                                                                                 |
| `logs in an existing user and loads only that user's habits`                 | Two users with one habit each are seeded; logging in as user A shows only A's habit and never B's — proving the per-user filter in `habitService.getAllHabitsByUserId`.                   |
| `creates a habit from the dashboard`                                         | Opening the create modal, filling the name, and saving renders the new habit's card in the list.                                                                                          |
| `completes a habit for today and updates the streak`                         | Streak begins at `00`; clicking the complete button adds today to `completions`; the streak display updates to `01`.                                                                      |
| `persists session and habits after page reload`                              | After a hard `page.reload()`, the session survives and the seeded habit is still rendered.                                                                                                |
| `logs out and redirects to /login`                                           | Confirming the logout dialog clears the session key from `localStorage` and routes to `/login`.                                                                                           |
| `loads the cached app shell when offline after the app has been loaded once` | After one online visit (which registers the service worker and warms the runtime cache), going offline and reloading still renders the app shell. This is the PWA offline-first contract. |

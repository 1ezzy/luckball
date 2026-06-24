# TODO

## Critical

- [ ] **`endWeek` user stat updates are fire-and-forget** (`packages/game-logic/src/end-week.ts` ~line 151)
  - The loop calls `updateUserProfileStats()` without `await`, meaning wins/losses/high scores may not be written to Postgres before the function returns success. Fix: collect all promises and use `Promise.all()` or `Promise.allSettled()`.

- [ ] **`startActiveWeek` has null-safety gaps** (`packages/game-logic/src/start-active-week.ts` lines 48–55)
  - `valkey.get()` can return null, which is passed directly to `JSON.parse()` — instant crash. Also `Object.keys(users).length` is wrong since `hkeys()` returns an array — should be `users.length`.

- [ ] **Widespread unguarded `JSON.parse()`** (across all game-logic files and `apps/frontend/src/lib/server/valkey.ts`)
  - Any corrupted or missing Valkey entry throws an unhandled exception mid-operation. Wrap all `JSON.parse()` calls in try-catch or add null checks before parsing. Affects: `begin-week.ts`, `add-user.ts`, `end-week.ts`, `start-active-week.ts`, `update-scores.ts`, `server/valkey.ts`.

- [ ] **ESPN API responses aren't checked for HTTP errors** (`packages/game-logic/src/api/espn-client.ts`)
  - No `response.ok` check on most fetches. A 500 or 429 from ESPN silently passes bad data into `JSON.parse()` and crashes game logic. Fix: add `if (!response.ok) throw new Error(...)` after each fetch.

- [ ] **Hardcoded `2025` season in ESPN client** (`packages/game-logic/src/api/espn-client.ts` line 48 in `getWeekEvents`)
  - Will break when the 2026 NFL season starts. Fix: derive the season year dynamically from the active week data rather than hardcoding it.

## High

- [ ] **No access control on the admin dashboard**
  - Any authenticated user can trigger `beginWeek`, `endWeek`, `startActiveWeek`, and `updateScores`. There is no check that the logged-in user is actually an admin. Fix: maintain an admin user list (by userId or email) and gate all admin routes/actions behind it.

- [ ] **`.env` file with real credentials may be committed** (`apps/cron-jobs/.env`)
  - Run `git log --all -- apps/cron-jobs/.env` to check if this file is in git history. If so, rotate the database password immediately and remove the file from history with `git filter-repo` or similar. Add `*.env` to `.gitignore`.

- [ ] **Heavy `any` usage in game-logic**
  - `startActiveWeek` and `updateScores` type `valkey` as `any`, and several ESPN event handlers use `any`. These bypass type checking on the most critical code paths. Fix: replace with `ValkeyClient` from `@luckball/valkey-client` and proper interfaces.

## Medium

- [ ] **No input validation on `displayName`** (`apps/frontend/src/routes/(app)/(season)/+page.server.ts`)
  - Only checks that it's non-empty. No length limit, no trimming, no character restrictions. Fix: trim whitespace, enforce a max length (e.g. 30 chars), and validate against allowed characters before writing to Postgres/Valkey.

- [ ] **Race condition on `addUserToWeek`** (`packages/game-logic/src/add-user.ts`)
  - Checks week status and then writes the user in two separate Valkey operations. If `startActiveWeek` fires between those two calls, a user could join a week already in progress. Fix: use a Valkey `MULTI/EXEC` transaction to atomically check-then-write.

- [ ] **Partial failure in `endWeek` user update loop** (`packages/game-logic/src/end-week.ts`)
  - If one user's Postgres update fails mid-loop, some users get their stats updated and others don't, leaving inconsistent state. Fix: use `Promise.allSettled()` and log any failures so they're visible and recoverable.

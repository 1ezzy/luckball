# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Game Overview

Luckball is a weekly NFL pick-em game built around luck rather than skill.

**How it works:**

- Each week, players join a "round" before the first NFL game of the week kicks off.
- When the week starts, all players are randomly split into two equal-sized teams (one team gets the extra player if the count is odd). Each team gets a randomly generated two-word name.
- The app takes one NFL team from each matchup on the week's schedule and randomly assigns it to one of the two luckball teams, giving each team 16 NFL teams matched up against the other team's 16 NFL teams.
- Scores are tracked live as NFL games are played throughout the week.
- When all games for the week are complete, the luckball team whose NFL teams have the highest **combined score** wins, and all players on that team get a win. Tiebreaker: whichever luckball team has the single highest-scoring individual NFL team for the week.
- All players on the winning team get a win recorded to their profile.

**Player stats** (stored in Postgres `user_profile`): total wins, total losses, highest-scoring team name and score of all time.

## Individual Scoring (Baller Boosts)

On top of the team-based win/loss outcome, each player selects personal boosts at the start of the week that produce an individual score. Boosts are selected once per week via a modal shown on first login after the week begins. The selected boosts are stored on the per-user Valkey hash (`boostsSelected` field on the `User` object).

### Baller Boosts — score multipliers applied to one of your luckball team's NFL teams

| Boost          | Effect                                                              |
| -------------- | ------------------------------------------------------------------- |
| Single Team 2x | The chosen NFL team's score is doubled for your individual total    |
| Single Team 3x | The chosen NFL team's score is tripled for your individual total    |
| Single Team 4x | The chosen NFL team's score is quadrupled for your individual total |

### Lucky Picks — prediction-based bonuses

| Boost           | Effect                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Score Steal** | Pick one NFL team from the opposing luckball team — their score is added to your individual total                                                                                                   |
| **Low-baller**  | Predict which NFL team on your luckball team will score the lowest. If correct, that team's score is replaced with the score of your luckball team's best NFL team for your individual total        |
| **Hype Man**    | Predict which NFL team on your luckball team will score the highest. If correct, that team's score is combined with the best NFL team score on the opposing luckball team for your individual total |

Individual scores are calculated at week end using the same final NFL scores that determine the team outcome. Players have a team result (win/loss) and a separate individual score for the week.

## Commands

```bash
# Development
pnpm dev:frontend          # Start frontend (SvelteKit) dev server
pnpm dev:admin             # Start admin dashboard dev server

# Type checking
pnpm --filter luckball-frontend check
pnpm --filter luckball-admin-dashboard check

# Linting & formatting
pnpm lint                  # ESLint across monorepo (0 warnings allowed)
pnpm format                # Prettier write
pnpm fix:all               # Prettier + ESLint fix in one pass

# Cron job commands (run from apps/cron-jobs, requires .env)
pnpm begin-week            # Initialize week data in Valkey (runs Wednesday)
pnpm start-active-week     # Assign players to teams and set week in_progress (runs Thursday)
pnpm end-week              # Tally scores, update Postgres stats (runs Tuesday)
pnpm update-scores         # Pull live NFL scores from ESPN (runs during game windows)
```

## Architecture

This is a pnpm monorepo with three apps and three shared packages.

### Apps

- **`apps/frontend`** — SvelteKit player-facing app. Auth via Better Auth (Discord + Google OAuth), UI built with Tailwind CSS v4, svelte-ux, and layerchart. Deployed with `@sveltejs/adapter-node`.
- **`apps/admin-dashboard`** — SvelteKit admin interface for managing game state.
- **`apps/cron-jobs`** — Node.js process (tsx) that drives the weekly game lifecycle via `node-cron`. Can also be triggered manually with CLI commands via `commander`.

### Packages

- **`@luckball/game-logic`** — All game logic functions: `beginWeek`, `startActiveWeek`, `endWeek`, `updateScores`, `addUserToWeek`, `removeUserFromWeek`. Consumed by both the frontend (form actions) and cron-jobs.
- **`@luckball/drizzle-client`** — Drizzle ORM client + schema (`user`, `session`, `account`, `verification`, `user_profile`). Postgres via `postgres.js`.
- **`@luckball/valkey-client`** — Thin wrapper around `iovalkey` (Redis-compatible). Returns `null` during build time (`NODE_ENV=build`) or when `SKIP_VALKEY=true`.

### Data stores

**Postgres** holds durable user data: auth tables (managed by Better Auth) and `user_profile` (wins/losses/high score/display name).

**Valkey** (Redis-compatible) holds all ephemeral per-week game state. Key structure:

```
game:active-week                      — ActiveWeek JSON (currentWeek, currentWeekText, seasonType); written by beginWeek, no TTL
{seasonType}:week:{weekNum}:data      — WeekData JSON (status, team assignments, scores)
{seasonType}:week:{weekNum}:users     — Hash: userId → User JSON
{seasonType}:week:{weekNum}:matchups  — Matchup[] JSON
espn:active-week                      — Cached ESPN active week (30min TTL, frontend only)
espn:week-events:{seasonType}:{week}  — Cached week events (5min TTL, frontend only)
```

The `User` object stored per-user in the week hash: `{ displayName, joinedAt, teamAssignment }`. Per-user week state lives here — not in Postgres.

### Weekly game lifecycle

1. **Wednesday** — `beginWeek`: Fetches NFL schedule from ESPN, writes `game:active-week` to Valkey, initializes `{week}:data` with `status: "pending"` and `{week}:matchups`.
2. **Pre-Thursday** — Players join via the frontend (`joinWeek` form action → `addUserToWeek`), which adds them to `{week}:users` and upserts their display name in Postgres. Uses `game:active-week` from Valkey — no ESPN call.
3. **Thursday** — `startActiveWeek`: Shuffles players into two teams, assigns NFL teams to each luckball team, sets `status: "in_progress"`. Reads `game:active-week` from Valkey (ESPN fallback).
4. **Thursday–Tuesday** — `updateScores`: Polls ESPN for live scores and updates `matchupScores` in Valkey. Reads `game:active-week` from Valkey (ESPN fallback).
5. **Tuesday** — `endWeek`: Determines winner, sets `status: "ended"`, updates `user_profile` win/loss stats and high scores in Postgres. Reads `game:active-week` from Valkey (ESPN fallback).

### Frontend routing

Route groups in `apps/frontend/src/routes/`:

- `(login)/login` — Unauthenticated login page.
- `(app)/+layout.server.ts` — Auth gate: redirects to `/login` if no session, returns `userId`.
- `(app)/(season)/+layout.server.ts` — Loads all week data (ESPN + Valkey + Postgres) for every season page.
- `(app)/(season)/` — Home page: renders `PreWeek`, `ActiveWeek`, or `PostWeek` layout based on `weekData.status`.
- `(app)/(season)/schedule` and `/records` — Supporting pages.
- `(app)/settings` — User settings.

### Auth

Better Auth handles sessions. The `hooks.server.ts` attaches `event.locals.session` and `event.locals.user` on every request. Session checks in route `load` functions call `auth.api.getSession()` directly — not `event.locals` — for correctness.

### ESPN API

`@luckball/game-logic/src/api/espn-client.ts` uses the ESPN v2 public API (`sports.core.api.espn.com`). A `MockEspnClient` exists for development/testing — it reads fixture data from `src/api/mock-data/`. The environment controls which is used via `createEspnClientForEnv()` (always use this, never the bare `createEspnClient()`). The client uses `p-limit` (concurrency 15) when batch-fetching individual event details.

The active week (`currentWeek`, `seasonType`) is sourced from the `game:active-week` Valkey key written by `beginWeek`. User-facing functions (`addUserToWeek`, `removeUserFromWeek`) read exclusively from Valkey. Cron job functions use Valkey-first with an ESPN fallback via `getActiveWeek(valkey, espnApi)` from `@luckball/game-logic`.

### Types

Key types exported from `@luckball/game-logic`:

- **`WeekStatus`** (enum) — `Pending`, `InProgress`, `Ended`. Always use this instead of raw strings.
- **`Matchup`** — `date` is `string` (ISO format from ESPN), not `Date`.
- **`WeekData`** — `winningTeamScore` and `bestNflTeamScore` are `number`, not `string`.
- **`ActiveWeek`** — `{ currentWeek: number, currentWeekText: string, seasonType: number }`. Shape of `game:active-week` in Valkey.
- **`EspnEvent`** — raw ESPN API event shape returned by `getWeekEvents`.

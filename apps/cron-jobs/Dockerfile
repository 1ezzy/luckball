# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- Builder ----
FROM base AS builder
COPY . .
RUN pnpm install --prod --frozen-lockfile
RUN pnpm --filter luckball-cron-jobs build

# ---- Production ----
FROM base AS production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cron-jobs/dist ./apps/cron-jobs/dist
COPY --from=builder /app/apps/cron-jobs/package.json ./apps/cron-jobs/package.json
COPY --from=builder /app/packages/game-logic/package.json ./packages/game-logic/package.json

WORKDIR /app/apps/cron-jobs
CMD ["pnpm", "start"]
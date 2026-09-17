FROM node:22-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@11.4.0 --activate
WORKDIR /app

FROM base AS build
RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/cron-jobs/package.json apps/cron-jobs/package.json
COPY packages/drizzle-client/package.json packages/drizzle-client/package.json
COPY packages/game-logic/package.json packages/game-logic/package.json
COPY packages/valkey-client/package.json packages/valkey-client/package.json
RUN pnpm install --frozen-lockfile --filter luckball-cron-jobs...
COPY apps/cron-jobs apps/cron-jobs
COPY packages/drizzle-client packages/drizzle-client
COPY packages/game-logic packages/game-logic
COPY packages/valkey-client packages/valkey-client
RUN pnpm prune --prod

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app /app
WORKDIR /app/apps/cron-jobs
CMD ["pnpm", "start"]

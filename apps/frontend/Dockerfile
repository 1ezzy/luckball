FROM node:22-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@11.4.0 --activate
WORKDIR /app

FROM base AS build
RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/drizzle-client/package.json packages/drizzle-client/package.json
COPY packages/game-logic/package.json packages/game-logic/package.json
COPY packages/valkey-client/package.json packages/valkey-client/package.json
RUN pnpm install --frozen-lockfile --filter luckball-frontend...
COPY apps/frontend apps/frontend
COPY packages/drizzle-client packages/drizzle-client
COPY packages/game-logic packages/game-logic
COPY packages/valkey-client packages/valkey-client
RUN pnpm --filter luckball-frontend build
RUN CI=true pnpm prune --prod

FROM base AS runtime
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
COPY --from=build /app /app
WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["sh", "-c", "pnpm db:migrate && node build"]

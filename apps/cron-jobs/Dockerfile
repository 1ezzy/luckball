FROM node:22-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@12.4.2 --activate
WORKDIR /app

FROM base AS build
RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter luckball-cron-jobs deploy --prod /prod/cron-jobs

FROM base AS runtime
COPY --from=build /prod/cron-jobs /app
CMD ["node", "-e", "setInterval(() => {}, 2147483647)"]

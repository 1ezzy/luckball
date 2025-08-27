FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/cron-jobs/package.json ./apps/cron-jobs/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

RUN pnpm install --frozen-lockfile --network-concurrency=1
COPY . .

CMD ["pnpm", "--filter", "luckball-cron-jobs", "start"]
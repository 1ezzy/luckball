FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

COPY apps/frontend/drizzle.config.ts apps/frontend/drizzle.config.ts
COPY apps/frontend/src/lib/db/schema.ts apps/frontend/src/lib/db/schema.ts

RUN pnpm install --frozen-lockfile

COPY apps/frontend/build ./apps/frontend/build

EXPOSE 3000

CMD ["pnpm", "--filter", "luckball-frontend", "start"]
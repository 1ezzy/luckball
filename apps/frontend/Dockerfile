FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/
COPY packages/some-other-package/package.json ./packages/some-other-package/ # Add any other needed package.json files

RUN pnpm install --frozen-lockfile

COPY . .

ENV SKIP_VALKEY=true
ENV SKIP_DRIZZLE=true
RUN pnpm --filter luckball-frontend build
ENV SKIP_VALKEY=
ENV SKIP_DRIZZLE=

EXPOSE 3000

CMD ["pnpm", "--filter", "luckball-frontend", "start"]
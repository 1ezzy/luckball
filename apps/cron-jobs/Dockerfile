# This stage creates the final, lean production image
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm

# Copy manifests for a production-only install
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/cron-jobs/package.json ./apps/cron-jobs/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code for the app and its local dependencies
COPY apps/cron-jobs/src ./apps/cron-jobs/src
COPY packages/drizzle-client/src ./packages/drizzle-client/src
COPY packages/valkey-client/src ./packages/valkey-client/src
COPY packages/game-logic/src ./packages/game-logic/src

CMD ["pnpm", "--filter", "luckball-cron-jobs", "start"]
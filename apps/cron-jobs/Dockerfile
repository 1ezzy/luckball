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

CMD ["pnpm", "--filter", "luckball-cron-jobs", "start"]
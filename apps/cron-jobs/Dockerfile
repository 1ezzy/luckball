# ---- Builder ----
# This stage installs all dependencies and builds the TypeScript code
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

# Copy manifests to leverage Docker cache
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/cron-jobs/package.json ./apps/cron-jobs/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install all dependencies (including dev dependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code and build the app
COPY . .
RUN pnpm --filter luckball-cron-jobs build

# ---- Production ----
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

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy the compiled code from the builder stage
COPY --from=builder /app/apps/cron-jobs/dist ./apps/cron-jobs/dist

# The 'start' script in package.json is 'node dist/index.js'
CMD ["pnpm", "--filter", "luckball-cron-jobs", "start"]
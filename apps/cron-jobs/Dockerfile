FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only the necessary files for dependency installation
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/cron-jobs/package.json ./apps/cron-jobs/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install dependencies
RUN pnpm install --frozen-lockfile
COPY . .

# Start the cron-jobs app
CMD ["pnpm", "--filter", "luckball-cron-jobs", "start"]
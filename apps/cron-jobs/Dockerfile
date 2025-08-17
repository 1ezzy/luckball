FROM node:18-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/

# Copy cron jobs app
COPY apps/cron-jobs/package.json ./apps/cron-jobs/
COPY apps/cron-jobs/ ./apps/cron-jobs/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Production stage
FROM node:18-alpine AS production

WORKDIR /app
RUN npm install -g pnpm

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/cron-jobs/package.json ./apps/cron-jobs/

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy application code
COPY --from=base /app/apps/cron-jobs ./apps/cron-jobs

WORKDIR /app/apps/cron-jobs
CMD ["node", "index.js"]
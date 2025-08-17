FROM node:18-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/

# Copy frontend app
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/frontend/ ./apps/frontend/

# Install dependencies and build
RUN pnpm install --frozen-lockfile
RUN pnpm --filter frontend build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app
RUN npm install -g pnpm

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/frontend/package.json ./apps/frontend/

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=base /app/apps/frontend/build ./apps/frontend/build
COPY --from=base /app/apps/frontend/static ./apps/frontend/static

EXPOSE 3000

WORKDIR /app/apps/frontend
CMD ["node", "-r", "dotenv/config", "build"]
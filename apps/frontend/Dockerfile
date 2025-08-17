# 1. Builder stage: Build the frontend application
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy all package manifests and the workspace file
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install all dependencies (including devDependencies needed for build)
# Using --frozen-lockfile=false to ensure it works without a lock file
RUN pnpm install --filter frontend --frozen-lockfile=false

# Copy the rest of the source code
COPY . .

# Build the frontend application
RUN pnpm --filter frontend build

# 2. Prune dev dependencies
RUN pnpm prune --prod


# 3. Production stage: Create the final, lean image
FROM node:20-alpine AS production
WORKDIR /app

# Copy only the necessary production files from the builder stage
COPY --from=builder /app/apps/frontend/build ./apps/frontend/build
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=builder /app/packages/drizzle-client ./packages/drizzle-client
COPY --from=builder /app/packages/valkey-client ./packages/valkey-client
COPY --from=builder /app/packages/game-logic ./packages/game-logic

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "apps/frontend/build"]
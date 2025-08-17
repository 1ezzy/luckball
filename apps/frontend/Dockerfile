# Base stage for production dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency manifests
COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile=false

# Production image
FROM node:20-alpine AS production
WORKDIR /app

# Copy production dependencies from the base stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=base /app/packages ./packages

# Copy the pre-built application and necessary files
COPY apps/frontend/build ./apps/frontend/build
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY package.json .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "apps/frontend/build"]
# Use a small, secure base image
FROM node:20-alpine
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manifests first
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Now, install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy the pre-built application code
COPY apps/frontend/build ./apps/frontend/build

# Expose the port and set the start command
EXPOSE 3000
CMD ["pnpm", "--filter", "luckball-frontend", "start"]
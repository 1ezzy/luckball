FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only the necessary files for dependency installation
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install dependencies and build the frontend
RUN pnpm install --filter luckball-frontend --frozen-lockfile
COPY . .
RUN pnpm --filter luckball-frontend build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["pnpm", "--filter", "frontend", "start"]
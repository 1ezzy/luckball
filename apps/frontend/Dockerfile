FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy only what's needed for production
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/drizzle-client/package.json ./packages/drizzle-client/
COPY packages/valkey-client/package.json ./packages/valkey-client/
COPY packages/game-logic/package.json ./packages/game-logic/

RUN pnpm install --frozen-lockfile --prod

# Copy the locally built frontend output
COPY apps/frontend/build ./apps/frontend/build

EXPOSE 3000

CMD ["pnpm", "--filter", "luckball-frontend", "start"]
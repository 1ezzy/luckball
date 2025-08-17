FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps ./apps
COPY packages ./packages
COPY tsconfig.json ./

RUN pnpm install --frozen-lockfile

ENV SKIP_VALKEY=true
RUN pnpm --filter luckball-frontend build
ENV SKIP_VALKEY=

EXPOSE 3000

CMD ["pnpm", "--filter", "luckball-frontend", "start"]
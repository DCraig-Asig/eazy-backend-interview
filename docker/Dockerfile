FROM node:18-alpine3.17

WORKDIR /app

ARG EAZY_NPM_TOKEN

ENV PNPM_HOME=/usr/local/bin
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm add -g typescript

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8000

RUN chmod +x ./docker/start.sh
ENTRYPOINT sh docker/start.sh

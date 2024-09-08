FROM node:18-alpine3.17

WORKDIR /app

ARG EAZY_NPM_TOKEN

ENV PNPM_HOME=/usr/local/bin
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm add -g typescript

COPY package.json pnpm-lock.yaml ./

RUN echo @DCraig-Asig:registry=https://npm.pkg.github.com > .npmrc && echo //npm.pkg.github.com/:_authToken=${EAZY_NPM_TOKEN} >> .npmrc

RUN pnpm install

COPY . .

EXPOSE 3000

RUN chmod +x ./docker/scripts/start-local.sh
ENTRYPOINT sh docker/scripts/start-local.sh

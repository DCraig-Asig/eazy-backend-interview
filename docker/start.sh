#!/usr/bin/env sh

cd /app

echo "Compiling app"
pnpm run build

echo "Running migrations"
npx typeorm-ts-node-commonjs migration:run -d src/datasource/migrations.datasource.ts

echo "Running Eazy Backend Interview Service"
pnpm run start:dev

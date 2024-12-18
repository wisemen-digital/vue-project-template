# Command line arguments, such as Node version
ARG NODE_VERSION=lts

#
# --- Stage 1: Build ---
#

FROM node:${NODE_VERSION} AS build
RUN corepack enable

ARG BUILD_COMMIT
ARG BUILD_NUMBER
ARG BUILD_TIMESTAMP

# Install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install --frozen-lockfile

# Copy files
COPY . .

# Build & optimize a bit
RUN pnpm run production

#
# --- Stage 2: Run ---
#

FROM ghcr.io/wisemen-digital/web-base:latest-unsecured AS final

COPY --from=build /app/dist /app/www
COPY --from=build /app/.env.example /etc/import-meta-env/example
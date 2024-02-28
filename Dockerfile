# Command line arguments, such as Node version
ARG NODE_VERSION=20.5

#
# --- Stage 1: Build ---
#

FROM node:${NODE_VERSION} as build

RUN npm install -g pnpm

# Install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install --frozen-lockfile

# Copy files 
COPY . .

# Build & optimize a bit
RUN pnpm run development

#
# --- Stage 2: Run ---
#

FROM appwisebe/vue-base as final

COPY --from=build --chown=nobody /app/dist /usr/share/nginx/html

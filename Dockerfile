# =======================================
FROM node:16-alpine AS deps
# =======================================

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
USER node:0
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# =======================================
FROM node:16-alpine AS builder
# =======================================
USER node:0
ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_SITE_ID
ARG DRUPAL_CLIENT_ID
ARG HOST

ARG DRUPAL_PREVIEW_SECRET
ARG DRUPAL_CLIENT_SECRET

ARG MATOMO_SITE_ID
ARG MATOMO_URL
ARG ELASTICSEARCH_URL

ENV HOST = $HOST
ENV NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL
ENV NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN
ENV DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE
ENV DRUPAL_SITE_ID=$DRUPAL_SITE_ID
ENV DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID

ENV DRUPAL_PREVIEW_SECRET=$DRUPAL_PREVIEW_SECRET
ENV DRUPAL_CLIENT_SECRET=$DRUPAL_CLIENT_SECRET

ENV MATOMO_SITE_ID=$MATOMO_SITE_ID
ENV MATOMO_URL=$MATOMO_URL
ENV ELASTICSEARCH_URL=$ELASTICSEARCH_URL

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules


RUN yarn build
# Prune dev & build deps until we can use Yarn 2 which does it on the next line
RUN rm -rf node_modules
# Install only production runtime deps
RUN yarn install --production --ignore-scripts --prefer-offline

# =======================================
FROM node:16-alpine AS runner
# =======================================

WORKDIR /app
USER node:0
ENV NODE_ENV production

#DEBUG add curl to container for network debugging purposes
RUN apk --no-cache add curl


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# env debug line for debugging environment variables in Azure.
# If you are sure if all env vars are available in both build- and runtime,
# copy .env.production to runner so that runtime can have new env vars from repo if needed
#COPY --from=builder /app/.env.production .env.production


# node process user should be able to write to .next/*
RUN chmod -R a+rwx ./.next


EXPOSE 8080
ENV PORT=8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# We don't use it.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]

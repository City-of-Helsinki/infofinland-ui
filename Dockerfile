
# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
## Build & runtime env variables

ARG TEST
ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_SITE_ID
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_CLIENT_ID

# These must be set from runtime env variables.
# ARG DRUPAL_CLIENT_SECRET
# ARG DRUPAL_PREVIEW_SECRET

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL
ENV NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN
ENV DRUPAL_SITE_ID=$DRUPAL_SITE_ID
ENV DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE
ENV DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID
ENV NEXT_PUBLIC_TEST=$TEST

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NEXT_PUBLIC_TEST=$TEST
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
## Build & runtime env variables
ARG TEST
ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_SITE_ID
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_CLIENT_ID

# These must be set from runtime env variables.
# ARG DRUPAL_CLIENT_SECRET
# ARG DRUPAL_PREVIEW_SECRET

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL
ENV NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN
ENV DRUPAL_SITE_ID=$DRUPAL_SITE_ID
ENV DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE
ENV DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID
ENV NEXT_PUBLIC_TEST=$TEST

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/i18n.js ./i18n.js
# Workaround for next-translate bug in Docker envs
# https://github.com/vinissimus/next-translate/issues/395
COPY --from=builder /app/.next/server/pages ./pages


USER nextjs

EXPOSE 8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]

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
# These should be set from Azure pipeline env variables to Docker build runtime env variables for use in 'yarn build'
# Hardcoded to dev drupal until we figure out how to provide them to build context
# ARG NEXT_PUBLIC_DRUPAL_BASE_URL=https://nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi
# ARG NEXT_IMAGE_DOMAIN=nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi
# ARG DRUPAL_FRONT_PAGE=/
# ARG DRUPAL_SITE_ID=937d29b3-8e64-440a-a9ee-64dfb375ce4d
# ARG DRUPAL_CLIENT_ID=f4558345-2945-45fe-8c58-fd3ac0d5741a

# ARG DRUPAL_PREVIEW_SECRET=1%%eS!z%b*0O5rX!maKqp%5m8xZ52yOU
# ARG DRUPAL_CLIENT_SECRET=0LXZ#%6nz&Px2zA34*8o7nlE3bPW9N%x


ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_SITE_ID
ARG DRUPAL_CLIENT_ID

ARG DRUPAL_PREVIEW_SECRET
ARG DRUPAL_CLIENT_SECRET
ARG TEST

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL
ENV NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN
ENV DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE
ENV DRUPAL_SITE_ID=$DRUPAL_SITE_ID
ENV DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID
ENV DRUPAL_PREVIEW_SECRET=$DRUPAL_PREVIEW_SECRET
ENV DRUPAL_CLIENT_SECRET=$DRUPAL_CLIENT_SECRET
ENV NEXT_TELEMETRY_DISABLED 1
ENV TEST=$TEST
RUN echo 'echo in builder'
RUN echo $DRUPAL_SITE_ID
RUN echo $TEST

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules


RUN yarn build
# Prune dev & build deps until we can use Yarn 2 which does it on the next line a
RUN rm -rf node_modules
# Install only production runtime deps
RUN yarn install --production --ignore-scripts --prefer-offline
# Use Azure env variables

# Production image, copy all the files and run next
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
# node process user should be able to write to .next/*
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
# env debug line for debugging environment variables in Azure.
# If you are sure if all env vars are available in both build- and runtime,
# copy .env.production to runner so that runtime can have new env vars from repo if needed
COPY --from=builder /app/.env.production .env.production

USER nextjs

EXPOSE 8080
ENV PORT=8080
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# We don't use it.
ENV NEXT_TELEMETRY_DISABLED 1
RUN echo 'echo in runner'
RUN echo $DRUPAL_SITE_ID
RUN echo $TEST

CMD ["yarn", "start"]

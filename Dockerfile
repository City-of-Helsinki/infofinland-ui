# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal AS deps
# =======================================

USER root
RUN yum install -y glibc-langpack-en curl --setopt=tsflags=nodocs && \
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum -y install yarn --setopt=tsflags=nodocs && \
    yum clean all
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-20 AS builder
# =======================================
# USER node:0
# Build time variables
ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_SITE_ID
ARG DRUPAL_CLIENT_ID
ARG SITE_HOST

ARG SENTRY_DSN
ARG SENTRY_DSN_PUBLIC
ARG SENTRY_ENVIRONMENT
ARG SENTRY_RELEASE
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_URL
ARG SENTRY_AUTH_TOKEN

ARG DRUPAL_PREVIEW_SECRET
ARG DRUPAL_CLIENT_SECRET
ARG BUILD_ALL
ARG MATOMO_SITE_ID
ARG MATOMO_URL
ARG ELASTICSEARCH_URL
# Must be false in builds always
# Build and runtime variables
ENV CACHE_REPOPULATE 0
ENV BUILD_PHASE 1
ENV BUILD_ALL=$BUILD_ALL
ENV SITE_HOST=$SITE_HOST
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

ENV REACT_AND_SHARE_APIKEY_FI=$REACT_AND_SHARE_APIKEY_FI
ENV REACT_AND_SHARE_APIKEY_EN=$REACT_AND_SHARE_APIKEY_EN
ENV REACT_AND_SHARE_APIKEY_SV=$REACT_AND_SHARE_APIKEY_SV
ENV REACT_AND_SHARE_APIKEY_RU=$REACT_AND_SHARE_APIKEY_RU
ENV REACT_AND_SHARE_APIKEY_ET=$REACT_AND_SHARE_APIKEY_ET
ENV REACT_AND_SHARE_APIKEY_UK=$REACT_AND_SHARE_APIKEY_UK
ENV REACT_AND_SHARE_APIKEY_FR=$REACT_AND_SHARE_APIKEY_FR
ENV REACT_AND_SHARE_APIKEY_ES=$REACT_AND_SHARE_APIKEY_ES
ENV REACT_AND_SHARE_APIKEY_TR=$REACT_AND_SHARE_APIKEY_TR
ENV REACT_AND_SHARE_APIKEY_ZH=$REACT_AND_SHARE_APIKEY_ZH
ENV REACT_AND_SHARE_APIKEY_FA=$REACT_AND_SHARE_APIKEY_FA
ENV REACT_AND_SHARE_APIKEY_AR=$REACT_AND_SHARE_APIKEY_AR

# Sentry variables need to present at build time.
ENV SENTRY_DSN=$SENTRY_DSN
ENV SENTRY_DSN_PUBLIC=$SENTRY_DSN_PUBLIC
ENV SENTRY_ENVIRONMENT=$SENTRY_ENVIRONMENT
ENV SENTRY_RELEASE=$SENTRY_RELEASE
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV SENTRY_URL=$SENTRY_URL
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

RUN yarn build
# Prune dev & build deps until we can use Yarn 2 which does it on the next line
RUN rm -rf node_modules
# Install only production runtime deps
RUN yarn install --production --ignore-scripts --prefer-offline

# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-20 AS runner
# =======================================

WORKDIR /app
# USER node:0
ENV NODE_ENV production
ENV CACHE_REPOPULATE '1'

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/logs ./logs

# env debug line for debugging environment variables in Azure.
# If you are sure if all env vars are available in both build- and runtime,
# copy .env.production to runner so that runtime can have new env vars from repo if needed
#COPY --from=builder /app/.env.production .env.production

# node process user should be able to write to .next/*
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

RUN chmod -R a+rwx ./.next
RUN chmod -R a+rwx ./logs

EXPOSE 8080
ENV PORT=8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# We don't use it.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]

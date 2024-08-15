# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-16 AS deps
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
FROM registry.access.redhat.com/ubi8/nodejs-16 AS builder
# =======================================
# USER node:0
ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_SITE_ID
ARG DRUPAL_CLIENT_ID
ARG SITE_HOST

ARG DRUPAL_PREVIEW_SECRET
ARG DRUPAL_CLIENT_SECRET
ARG BUILD_ALL
ARG MATOMO_SITE_ID
ARG MATOMO_URL
ARG ELASTICSEARCH_URL
# Must be false in builds always
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
FROM registry.access.redhat.com/ubi8/nodejs-16 AS runner
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
USER root
RUN chgrp -R 0 ./next/ && chmod g+w -R ./next/
RUN chgrp -R 0 ./logs/ && chmod g+w -R ./logs/
USER default

EXPOSE 8080
ENV PORT=8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# We don't use it.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]

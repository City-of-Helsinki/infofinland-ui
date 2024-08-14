# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-18 AS deps
# =======================================

USER root

# Install additional dependencies and Yarn in a single RUN command
RUN yum install -y glibc-langpack-en curl && \
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum -y install yarn && \
    yum clean all

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# =======================================
FROM deps AS builder
# =======================================

# Set build arguments and environment variables
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

ENV CACHE_REPOPULATE=0 \
    BUILD_PHASE=1 \
    BUILD_ALL=$BUILD_ALL \
    SITE_HOST=$SITE_HOST \
    NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL \
    NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN \
    DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE \
    DRUPAL_SITE_ID=$DRUPAL_SITE_ID \
    DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID \
    DRUPAL_PREVIEW_SECRET=$DRUPAL_PREVIEW_SECRET \
    DRUPAL_CLIENT_SECRET=$DRUPAL_CLIENT_SECRET \
    MATOMO_SITE_ID=$MATOMO_SITE_ID \
    MATOMO_URL=$MATOMO_URL \
    ELASTICSEARCH_URL=$ELASTICSEARCH_URL \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY . .

# Build the project
RUN yarn build

# Remove dev dependencies and keep only production dependencies
RUN rm -rf node_modules && \
    yarn install --production --ignore-scripts --prefer-offline

# ==========================================
FROM builder AS production
# ==========================================

ARG NEXT_PUBLIC_CAPTCHA_KEY
ARG NEWSLETTER_BASE_URL
ARG NEWSLETTER_APIKEY
ENV NEWSLETTER_BASE_URL=$NEWSLETTER_BASE_URL
ENV NEWSLETTER_APIKEY=$NEWSLETTER_APIKEY

WORKDIR /app

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV production

# Copy necessary files for production
COPY --from=builder /app/next.config.js /app/next-i18next.config.js /app/package.json /app/
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# OpenShift write access to Next cache folder
USER root
RUN chgrp -R 0 /app/.next/server/pages && chmod g+w -R /app/.next/server/pages
USER default

# Expose port
EXPOSE $PORT

# Start Next.js server
CMD ["node", "./server.js"]

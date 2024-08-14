# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-18 AS deps
# =======================================

# Temporarily switch to root user to install packages and set up the environment
USER root

# Install additional dependencies and yarn
RUN yum install -y glibc-langpack-en && yum clean all
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-18 AS builder
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

ENV CACHE_REPOPULATE=0
ENV BUILD_PHASE=1
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
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the project
RUN yarn build

# Remove dev dependencies and keep only production dependencies
RUN rm -rf node_modules
RUN yarn install --production --ignore-scripts --prefer-offline

# =======================================
FROM registry.access.redhat.com/ubi8/nodejs-18 AS runner
# =======================================

RUN yum install -y curl && yum clean all


WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/logs ./logs

RUN chown -R :0 /app && chmod -R g+wx /app
USER nobody:0

EXPOSE 8080
ENV PORT=8080
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]

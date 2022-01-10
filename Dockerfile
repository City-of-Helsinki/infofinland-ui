# =======================================
FROM node:16-alpine AS deps
# =======================================

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock /app/
RUN yarn && yarn cache clean --force
# Copy all files
COPY --chown=appuser:appuser . .


### OLD
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile


# ===================================
FROM node:16-alpine AS staticbuilder
# ===================================
## Build & runtime env variables

ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG DRUPAL_FRONT_PAGE
ARG DRUPAL_SITE_ID
ARG DRUPAL_CLIENT_ID

ARG DRUPAL_PREVIEW_SECRET
ARG DRUPAL_CLIENT_SECRET

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=$NEXT_PUBLIC_DRUPAL_BASE_URL
ENV NEXT_IMAGE_DOMAIN=$NEXT_IMAGE_DOMAIN
ENV DRUPAL_FRONT_PAGE=$DRUPAL_FRONT_PAGE
ENV DRUPAL_SITE_ID=$DRUPAL_SITE_ID
ENV DRUPAL_CLIENT_ID=$DRUPAL_CLIENT_ID
ENV DRUPAL_PREVIEW_SECRET=$DRUPAL_PREVIEW_SECRET
ENV DRUPAL_CLIENT_SECRET=$DRUPAL_CLIENT_SECRET
ENV NEXT_TELEMETRY_DISABLED 1

# Use non-root user
USER appuser

# copy all files
COPY --chown=appuser:appuser . .

# Build application
RUN yarn build

### OLD
# # Prune dev & build deps until we can use Yarn 2 which does it on the next line a
# RUN rm -rf node_modules
# Install only production runtime deps
# RUN yarn install --production --ignore-scripts --prefer-offline
# Use Azure env variables


# ==========================================
FROM node:16-alpine AS runner
# ==========================================

# Use non-root user
USER appuser

# Copy build folder from stage 1
COPY --from=staticbuilder --chown=appuser:appuser /app/.next /app/.next

# Copy next.js config
COPY --chown=appuser:appuser next.config.js /app/
COPY --chown=appuser:appuser next-i18next.config.js /app/

# Copy public package.json and yarn.lock files
COPY --chown=appuser:appuser public package.json yarn.lock /app/

# Install production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean --force

# Copy public folder
COPY --chown=appuser:appuser public /app/public

# Expose port
EXPOSE 8080
ENV PORT=8080

# Start ssr server
CMD ["yarn", "start"]

### OLD
# ENV NODE_ENV production
# # node process user should be able to write to .next/*
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# # env debug line for debugging environment variables in Azure.
# # If you are sure if all env vars are available in both build- and runtime,
# # copy .env.production to runner so that runtime can have new env vars from repo if needed
# COPY --from=builder /app/.env.production .env.production

# USER nextjs

# EXPOSE 8080
# ENV PORT=8080
# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # We don't use it.
# ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["yarn", "start"]

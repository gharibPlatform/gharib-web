FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install sharp

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

RUN if [ -d "/app/.next/standalone" ]; then \
    echo "Found standalone output, copying..."; \
    cp -r /app/.next/standalone/* ./; \
    else \
    echo "No standalone output, using regular .next"; \
    mkdir -p .next && cp -r /app/.next/* ./.next/; \
    fi && \
    chown -R nextjs:nodejs ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD if [ -f "server.js" ]; then node server.js; else npm start;
FROM node:22-alpine AS base

FROM base AS deps
  RUN apk add --no-cache libc6-compat
  WORKDIR /app

  COPY package.json pnpm-lock.yaml ./
  RUN corepack enable pnpm 
  RUN pnpm i --force

FROM base AS builder
  WORKDIR /app
  ARG NEXT_PUBLIC_API_URL_OP
  ENV NEXT_PUBLIC_API_URL_OP=$NEXT_PUBLIC_API_URL_OP
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  RUN corepack enable pnpm
  RUN pnpm run build

FROM base AS runner
  WORKDIR /app
  
  ENV NODE_ENV=production

  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs

  COPY --from=builder /app/public ./public

  RUN mkdir .next
  RUN chown nextjs:nodejs .next

  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

  USER nextjs

  EXPOSE 3000

  ENV PORT=3000

  ENV HOSTNAME="0.0.0.0"
  CMD ["node", "server.js"]
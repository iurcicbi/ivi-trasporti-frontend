# Backend (Express + TypeScript)
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY server ./server
RUN npx tsc -p server/tsconfig.json

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server/dist ./server/dist
COPY create-admin.js ./
RUN mkdir -p /app/server/uploads
EXPOSE 5000
CMD ["node", "server/dist/index.js"]
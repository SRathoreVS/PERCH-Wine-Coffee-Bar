# ── PERCH Backend — Dockerfile ─────────────────────────────────
# Multi-stage build for lean production image

# ── Stage 1: Dependencies ────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ── Stage 2: Production Image ─────────────────────────────────────
FROM node:20-alpine AS runner

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 perch

WORKDIR /app

# Copy deps from stage 1
COPY --from=deps --chown=perch:nodejs /app/node_modules ./node_modules

# Copy app source
COPY --chown=perch:nodejs . .

# Create logs & uploads dirs
RUN mkdir -p src/logs src/uploads && chown -R perch:nodejs src/logs src/uploads

USER perch

EXPOSE 5000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]

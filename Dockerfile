FROM node:lts-alpine AS builder

WORKDIR /app

ADD package*.json ./
RUN npm ci

ADD . .
ENV NODE_ENV=production
ENV RUNTIME_CONFIG=true
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

RUN npm install -g local-web-server dotenv-cli
COPY --from=builder /app/dist ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.build/ ./.build

EXPOSE 8000
CMD [ "npm", "run", "docker" ]
HEALTHCHECK --interval=5s --timeout=1s \
    CMD wget --quiet --tries=1 --spider http://localhost:8000/ || exit 1

FROM node:lts-alpine AS builder

WORKDIR /app

ADD package*.json ./
RUN npm ci

ADD . .
ENV NODE_ENV=production
RUN npm run build

FROM node:lts-alpine

RUN npm install -g local-web-server dotenv-cli
COPY --from=builder /app/dist ./
COPY --from=builder /app/.build/ ./.build

EXPOSE 8000
CMD [ "sh", "-c", "dotenv -e .env.defaults node ./.build/config.js > ./config.js; ws -s index.html" ]

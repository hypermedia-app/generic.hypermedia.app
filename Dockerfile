FROM node:lts-alpine AS builder

WORKDIR /app

ADD package*.json ./
RUN npm ci

ADD . .
ENV NODE_ENV=production
RUN npm run build

FROM node:lts-alpine

RUN npm install -g local-web-server
COPY --from=builder /app/dist ./

USER nobody:nobody

EXPOSE 8000
CMD [ "ws", "-s", "index.html" ]

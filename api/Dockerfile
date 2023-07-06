###################
# BASE IMAGE
###################
FROM node:16.0.0-alpine3.15 AS base


###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM base AS development

WORKDIR /usr

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080


###################
# BUILD FOR PRODUCTION
###################
FROM base AS builder

WORKDIR /usr

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node --from=development /usr/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run server

RUN npm install --prod && npm cache clean --force


###################
# PRODUCTION
###################
FROM base AS production

COPY --chown=node:node --from=builder /usr/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr server.js
# COPY --chown=node:node --from=builder /usr/src/app/.env ./.env
# COPY --chown=node:node --from=builder /usr/src/app/.env.production ./.env.production

EXPOSE 8080

CMD [ "node", "server.js" ]
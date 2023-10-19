FROM node as builder
# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
COPY package*.json ./

RUN npm ci
RUN npm install

COPY . .
#COPY fonts ./fonts

RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder ./usr/src/app ./


EXPOSE 8080
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
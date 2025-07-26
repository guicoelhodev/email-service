FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

ARG PORT

COPY . .

RUN npm run build

ENV PORT=$PORT
EXPOSE 3000

CMD ["node", "build/server.js"]

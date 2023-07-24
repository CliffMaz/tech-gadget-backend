FROM node:latest

WORKDIR /usr/node/server

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
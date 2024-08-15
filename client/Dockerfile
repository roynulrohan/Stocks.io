FROM node:18-alpine

WORKDIR /usr/src/app/client/

COPY package*.json ./

RUN npm install -qy

COPY ./ ./

CMD ["npm", "run", "dev"]
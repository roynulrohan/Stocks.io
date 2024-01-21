# Stage 1 : Build Server

FROM node:18-alpine

WORKDIR /usr/src/app/server/
COPY package*.json ./
RUN npm install -qy
COPY ./ ./

ENV PORT 54321

EXPOSE 54321

CMD ["npm", "start"]
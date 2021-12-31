#  Dockerfile for Node Express Backend

FROM node:16.10-alpine

# Create App Directory
WORKDIR /usr/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 4000

CMD ["npm","start"]
FROM node:12-alpine

WORKDIR /usr/alescoreapi

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 7575

CMD ["yarn", "start"]
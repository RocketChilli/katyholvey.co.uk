FROM node:alpine

WORKDIR /home/node
COPY package*.json ./
RUN npm install

COPY app ./

CMD npm start

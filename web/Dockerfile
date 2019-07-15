FROM node:alpine

WORKDIR /home/node
COPY package*.json ./
RUN npm install

COPY src ./src/
RUN npm run dev

COPY app ./app/
CMD npm start

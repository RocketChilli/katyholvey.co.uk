FROM node:alpine

WORKDIR /home/node
COPY package*.json ./
RUN npm install --prod

COPY ./ ./
RUN npm run build

EXPOSE 80
CMD npm start

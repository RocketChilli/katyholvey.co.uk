FROM node:alpine

WORKDIR /home/node
COPY package*.json ./
RUN npm install --prod

COPY ./ ./
RUN ls -l && npm run build

CMD npm start

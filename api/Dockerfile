FROM node:latest

ENV NODE_ENV production

EXPOSE 8001

WORKDIR /usr/app/src

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm",  "start"]

FROM node:latest as builder

WORKDIR /usr/app/src

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

EXPOSE 3001

WORKDIR /var/www

COPY --from=builder /usr/app/src/build .

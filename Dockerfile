FROM node:latest as builder

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

COPY . .

RUN ./build.sh && \
    npm run build

FROM nginx:latest

EXPOSE 80

COPY ./conf.d /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /var/www

COPY --from=builder /usr/app/src/build .

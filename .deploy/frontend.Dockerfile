FROM node:18-alpine as build-stage
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build:frontend:prod


FROM nginx:latest as production-stage
RUN mkdir /var/app
COPY --from=build-stage /app/build-frontend /var/app
COPY ./.deploy/nginx/frontend.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

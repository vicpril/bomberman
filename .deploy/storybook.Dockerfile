FROM node:18-alpine as build-stage
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn storybook:build


FROM nginx:latest as production-stage
RUN mkdir /var/app
COPY --from=build-stage /app/storybook-static /var/app
COPY ./.deploy/nginx/storybook.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 6006

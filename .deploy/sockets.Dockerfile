FROM node:18-alpine
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build:sockets:prod

EXPOSE 3002

CMD ["yarn", "start:sockets"]

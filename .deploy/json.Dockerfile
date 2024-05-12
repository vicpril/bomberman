FROM node:18-alpine
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build:json:prod

EXPOSE 3001

CMD ["yarn", "start:json"]

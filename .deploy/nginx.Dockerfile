FROM nginx:latest
# FROM hoosin/alpine-nginx-nodejs
COPY .deploy/nginx/nginx.conf /etc/nginx/nginx.conf
FROM nginx:latest
# FROM hoosin/alpine-nginx-nodejs
COPY .deploy/nginx/nginx.local.conf /etc/nginx/nginx.conf
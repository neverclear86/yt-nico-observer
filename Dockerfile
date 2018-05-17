FROM node:slim

RUN mkdir -p /user/local/app

ADD yt-nico-observer /usr/local/app
WORKDIR /usr/local/app
# RUN npm i

ENTRYPOINT npm start

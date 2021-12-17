FROM node:alpine

WORKDIR /usr/src/app
COPY ./server.js .
COPY ./dist ./dist/

CMD ["node", "server"]

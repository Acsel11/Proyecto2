FROM node:latest

COPY server.js /server.js
COPY WWW /WWW

EXPOSE 8888

CMD ["node", "server.js"]


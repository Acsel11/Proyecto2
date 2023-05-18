FROM node:latest

COPY server.js /servidor.js
COPY WWW /WWW

EXPOSE 8888

CMD ["node", "server.js"]


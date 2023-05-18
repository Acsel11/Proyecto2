FROM ubuntu:latest

COPY server.js /servidor
COPY WWW /WWW

EXPOSE 8888

CMD ["node", "server.js"]


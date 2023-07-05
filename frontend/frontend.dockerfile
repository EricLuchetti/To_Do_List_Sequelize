#Configurações do Angular
FROM node:18.12

EXPOSE 4200

WORKDIR /home/frontend/app

RUN apt-get update -y
RUN apt-get install -y build-essential
RUN npm install -g node-gyp
RUN npm install -g @angular/cli

ENTRYPOINT ["/bin/sh", "-c", "npm install && npm start"]
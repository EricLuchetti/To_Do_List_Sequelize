FROM node:18.12

EXPOSE 3000

WORKDIR /home/api/app

RUN apt-get update && apt-get install -y build-essential

ENV TZ=America/Sao_Paulo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENTRYPOINT ["/bin/sh", "-c", "cp env.local .env && npm install && npm run local"]
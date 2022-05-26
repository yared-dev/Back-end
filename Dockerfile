FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR  /usr/src/app

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "start:dev"]
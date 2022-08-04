FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR  /usr/src/app

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

# RUN cd /usr/share/zoneinfo

# RUN cp /usr/share/zoneinfo/America/Lima /etc/localtime

EXPOSE 3000

CMD ["npm","run","start:prod"]

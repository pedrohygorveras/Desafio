FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

RUN npm run migrate

COPY . .

EXPOSE 8686

CMD ["npm", "run", "dev"]

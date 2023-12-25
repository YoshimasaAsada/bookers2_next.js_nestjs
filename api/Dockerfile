FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN yarn global add @nestjs/cli

RUN yarn install


COPY . .

CMD ["npm", "run", "start"]
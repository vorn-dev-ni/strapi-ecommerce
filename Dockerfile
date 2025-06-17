FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --development

COPY . .

RUN yarn build

ENV NODE_ENV=development

CMD ["yarn", "start"]

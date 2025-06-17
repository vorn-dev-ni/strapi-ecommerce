FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=development

# Expose the port your app listens on
EXPOSE 1337

# Start the app
CMD ["npm", "start"]

FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY backend ./backend
COPY types ./types
COPY util ./util

EXPOSE 8080

CMD ["npm", "run", "start_backend"]

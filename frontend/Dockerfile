FROM node:latest

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./frontend/

WORKDIR /app/frontend
RUN npm install

WORKDIR /app

COPY frontend ./frontend
COPY types ./types
COPY util ./util

WORKDIR /app/frontend

EXPOSE 8081

CMD ["npm", "run", "dev", "--", "--host"]

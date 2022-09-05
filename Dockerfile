FROM node:16.15

RUN mkdir -p /home/app/app-backend
COPY . /home/app/app-backend

WORKDIR /home/app/app-backend
RUN npm install
RUN npx tsc
EXPOSE 3001 3002 3003
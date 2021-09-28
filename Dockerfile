# Install dependencies only when needed
FROM node:lts-alpine as builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

EXPOSE 3003

RUN mkdir -p /app/renting

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /app/renting
# Install dependencies only when needed
FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir -p /app/renting
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /app/renting
EXPOSE 3003
# CMD ["nginx", "-g", "daemon off;"]
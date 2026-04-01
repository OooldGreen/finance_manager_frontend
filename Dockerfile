# buide stage
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN CI=false npm run build

# run stage
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
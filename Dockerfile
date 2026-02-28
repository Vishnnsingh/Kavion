FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build-time variables for Vite (optional if .env is already copied in context)
ARG VITE_SERVICE_ID
ARG VITE_PUBLIC_KEY
ENV VITE_SERVICE_ID=$VITE_SERVICE_ID
ENV VITE_PUBLIC_KEY=$VITE_PUBLIC_KEY

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]





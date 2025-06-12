# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Vue + Vite çıktısı "dist" klasörüne gelir, onu kopyalıyoruz:
COPY --from=builder /app/dist /usr/share/nginx/html

# Opsiyonel: Nginx config (yoksa bu satırı sil)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

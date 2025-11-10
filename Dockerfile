# Stage 1: Cài đặt dependencies
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: Build ứng dụng
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Chạy production
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# Chỉ copy những thứ cần thiết cho production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

EXPOSE 50051

# Lệnh chạy ứng dụng
CMD ["node", "dist/main"]
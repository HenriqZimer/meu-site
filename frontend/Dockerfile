# Build stage
FROM node:lts-alpine3.22 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Set API URL for build
ENV FRONTEND_API_URL=http://localhost:5000/api

# Generate static site
RUN npm run generate

# Production stage
FROM nginx:alpine

# Copy static files from builder stage
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
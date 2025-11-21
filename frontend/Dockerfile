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

# Set API URL for build (accepts from docker-compose build args)
ARG FRONTEND_API_URL=
ENV FRONTEND_API_URL=${FRONTEND_API_URL}

# Generate static site
RUN npm run generate

# Production stage
FROM nginx:alpine

# Create nginx user and set up directories with proper permissions
RUN addgroup -g 1000 -S nginx-app && \
    adduser -u 1000 -S nginx-app -G nginx-app && \
    mkdir -p /var/cache/nginx /var/run /var/log/nginx /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R nginx-app:nginx-app /var/cache/nginx /var/run /var/log/nginx /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/run /var/log/nginx /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp /usr/share/nginx/html

# Copy static files from builder stage
COPY --chown=nginx-app:nginx-app --from=builder /app/.output/public /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Switch to non-root user
USER nginx-app

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install --production=false --no-optional && npm cache clean --force

# Copy source code
COPY . .

# Set environment variables
ENV MONGODB_URI=mongodb://portfolio:portfolio123@mongodb:27017/portfolio?authSource=admin

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and lock file
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --no-audit && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000/api', (r) => {process.exit(r.statusCode === 404 ? 0 : 1)})"

# Start application
CMD ["node", "dist/main"]

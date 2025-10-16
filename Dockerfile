# Use Node.js 22 Alpine image
FROM node:22-alpine

# O Alpine usa o gerenciador de pacotes 'apk'.
# Usamos '--no-cache' para evitar aumentar o tamanho final da imagem.
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port (Importante para que o Traefik e o healthcheck acessem internamente)
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
#!/bin/bash

# Script para deploy do portfolio em Docker
# Uso: ./deploy.sh [dev|prod]

set -e

MODE=${1:-prod}

echo "🚀 Iniciando deploy do portfolio em modo: $MODE"

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down 2>/dev/null || true

# Build da imagem
echo "🏗️ Fazendo build da aplicação..."
docker-compose build

if [ "$MODE" = "dev" ]; then
    echo "🔧 Iniciando em modo desenvolvimento..."
    docker-compose --profile dev up portfolio-dev
else
    echo "🚀 Iniciando em modo produção..."
    docker-compose up -d portfolio
    
    echo "✅ Deploy concluído!"
    echo "📱 Aplicação disponível em: http://localhost:3000"
    echo "📊 Para ver os logs: docker-compose logs -f portfolio"
    echo "🛑 Para parar: docker-compose down"
fi
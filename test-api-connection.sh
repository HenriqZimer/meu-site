#!/bin/bash

echo "==================================="
echo "Teste de Conexão Frontend-Backend"
echo "==================================="
echo ""

# Carregar variáveis de ambiente
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Valores padrão
BACKEND_PORT=${BACKEND_PORT:-3001}
FRONTEND_PORT=${FRONTEND_PORT:-3000}
MONGODB_PORT=${MONGODB_PORT:-27017}

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Teste 1: Backend está rodando?
echo -e "${YELLOW}[1] Testando Backend (porta $BACKEND_PORT)...${NC}"
if curl -s http://localhost:$BACKEND_PORT/api/skills > /dev/null; then
    echo -e "${GREEN}✓ Backend está rodando${NC}"
else
    echo -e "${RED}✗ Backend não está acessível${NC}"
    exit 1
fi

# Teste 2: Frontend está rodando?
echo -e "${YELLOW}[2] Testando Frontend (porta $FRONTEND_PORT)...${NC}"
if curl -s http://localhost:$FRONTEND_PORT > /dev/null; then
    echo -e "${GREEN}✓ Frontend está rodando${NC}"
else
    echo -e "${RED}✗ Frontend não está acessível${NC}"
    exit 1
fi

# Teste 3: Endpoints da API
echo -e "${YELLOW}[3] Testando Endpoints da API...${NC}"

endpoints=("skills" "projects" "courses" "certifications")
for endpoint in "${endpoints[@]}"; do
    response=$(curl -s -w "\n%{http_code}" http://localhost:$BACKEND_PORT/api/$endpoint)
    status_code=$(echo "$response" | tail -n1)
    
    if [ "$status_code" = "200" ]; then
        count=$(echo "$response" | head -n-1 | python3 -c "import sys, json; print(len(json.load(sys.stdin)))")
        echo -e "  ${GREEN}✓ /$endpoint - Status: $status_code - Items: $count${NC}"
    else
        echo -e "  ${RED}✗ /$endpoint - Status: $status_code${NC}"
    fi
done

# Teste 4: CORS
echo -e "${YELLOW}[4] Testando CORS...${NC}"
cors_response=$(curl -s -H "Origin: http://localhost:$FRONTEND_PORT" -I http://localhost:$BACKEND_PORT/api/skills | grep -i "access-control-allow-origin")
if [ ! -z "$cors_response" ]; then
    echo -e "${GREEN}✓ CORS configurado corretamente${NC}"
    echo "  $cors_response"
else
    echo -e "${RED}✗ CORS não configurado${NC}"
fi

# Teste 5: Verificar variáveis de ambiente
echo -e "${YELLOW}[5] Verificando variáveis de ambiente...${NC}"
echo -e "${GREEN}✓ Configurações atuais:${NC}"
echo "  BACKEND_PORT=$BACKEND_PORT"
echo "  FRONTEND_PORT=$FRONTEND_PORT"
echo "  MONGODB_PORT=$MONGODB_PORT"
echo "  CORS_ORIGIN=$CORS_ORIGIN"
echo "  NUXT_PUBLIC_API_URL=$NUXT_PUBLIC_API_URL"

if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Arquivo .env encontrado na raiz${NC}"
else
    echo -e "${YELLOW}⚠ Arquivo .env não encontrado na raiz${NC}"
fi

echo ""
echo -e "${GREEN}==================================="
echo "Todos os testes concluídos!"
echo "===================================${NC}"

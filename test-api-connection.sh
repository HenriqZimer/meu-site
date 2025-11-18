#!/bin/bash

echo "==================================="
echo "Teste de Conexão Frontend-Backend"
echo "==================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Teste 1: Backend está rodando?
echo -e "${YELLOW}[1] Testando Backend (porta 3001)...${NC}"
if curl -s http://localhost:3001/api/skills > /dev/null; then
    echo -e "${GREEN}✓ Backend está rodando${NC}"
else
    echo -e "${RED}✗ Backend não está acessível${NC}"
    exit 1
fi

# Teste 2: Frontend está rodando?
echo -e "${YELLOW}[2] Testando Frontend (porta 3000)...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✓ Frontend está rodando${NC}"
else
    echo -e "${RED}✗ Frontend não está acessível${NC}"
    exit 1
fi

# Teste 3: Endpoints da API
echo -e "${YELLOW}[3] Testando Endpoints da API...${NC}"

endpoints=("skills" "projects" "courses" "certifications")
for endpoint in "${endpoints[@]}"; do
    response=$(curl -s -w "\n%{http_code}" http://localhost:3001/api/$endpoint)
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
cors_response=$(curl -s -H "Origin: http://localhost:3000" -I http://localhost:3001/api/skills | grep -i "access-control-allow-origin")
if [ ! -z "$cors_response" ]; then
    echo -e "${GREEN}✓ CORS configurado corretamente${NC}"
    echo "  $cors_response"
else
    echo -e "${RED}✗ CORS não configurado${NC}"
fi

# Teste 5: Verificar variáveis de ambiente
echo -e "${YELLOW}[5] Verificando variáveis de ambiente...${NC}"
if [ -f "/home/henriqzimer/meu-site/frontend/.env" ]; then
    api_url=$(grep NUXT_PUBLIC_API_URL /home/henriqzimer/meu-site/frontend/.env | cut -d'=' -f2)
    echo -e "${GREEN}✓ Frontend .env existe${NC}"
    echo "  NUXT_PUBLIC_API_URL=$api_url"
else
    echo -e "${YELLOW}⚠ Frontend .env não encontrado${NC}"
fi

if [ -f "/home/henriqzimer/meu-site/backend/.env" ]; then
    cors_origin=$(grep CORS_ORIGIN /home/henriqzimer/meu-site/backend/.env | cut -d'=' -f2)
    echo -e "${GREEN}✓ Backend .env existe${NC}"
    echo "  CORS_ORIGIN=$cors_origin"
else
    echo -e "${YELLOW}⚠ Backend .env não encontrado${NC}"
fi

echo ""
echo -e "${GREEN}==================================="
echo "Todos os testes concluídos!"
echo "===================================${NC}"

#!/bin/bash

# Script de limpeza avançado para o projeto Nuxt 3
# Uso: ./scripts/cleanup.sh [opção]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mostrar uso
show_help() {
    echo -e "${BLUE}🧹 Script de Limpeza - Portfolio Nuxt 3${NC}"
    echo ""
    echo "Uso: $0 [opção]"
    echo ""
    echo "Opções:"
    echo "  basic     - Remove .nuxt, .output, cache (padrão)"
    echo "  full      - Remove tudo + node_modules"
    echo "  docker    - Limpa cache do Docker"
    echo "  all       - Executa todas as limpezas"
    echo "  help      - Mostra esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 basic"
    echo "  $0 full"
    echo "  $0 docker"
}

# Função para mostrar tamanho dos diretórios
show_sizes() {
    echo -e "${BLUE}📊 Tamanho atual dos arquivos:${NC}"
    
    for dir in .nuxt .output node_modules dist; do
        if [ -d "$dir" ] || [ -L "$dir" ]; then
            size=$(du -sh "$dir" 2>/dev/null | cut -f1)
            echo -e "  ${YELLOW}$dir${NC}: $size"
        fi
    done
    
    if [ -d "node_modules/.cache" ]; then
        cache_size=$(du -sh node_modules/.cache 2>/dev/null | cut -f1)
        echo -e "  ${YELLOW}node_modules/.cache${NC}: $cache_size"
    fi
    
    echo ""
}

# Limpeza básica
basic_cleanup() {
    echo -e "${GREEN}🧹 Executando limpeza básica...${NC}"
    
    # Remove diretórios de build
    rm -rf .nuxt .output dist
    
    # Remove cache do npm
    if [ -d "node_modules/.cache" ]; then
        rm -rf node_modules/.cache
    fi
    
    # Remove logs
    rm -f npm-debug.log* yarn-debug.log* yarn-error.log*
    
    echo -e "${GREEN}✅ Limpeza básica concluída!${NC}"
}

# Limpeza completa
full_cleanup() {
    echo -e "${YELLOW}⚠️  Executando limpeza completa...${NC}"
    echo -e "${YELLOW}⚠️  Isso removerá node_modules - você precisará executar 'npm install'${NC}"
    
    # Limpeza básica primeiro
    basic_cleanup
    
    # Remove node_modules e lock files
    rm -rf node_modules
    rm -f package-lock.json yarn.lock
    
    echo -e "${GREEN}✅ Limpeza completa concluída!${NC}"
    echo -e "${BLUE}💡 Execute 'npm install' para reinstalar dependências${NC}"
}

# Limpeza do Docker
docker_cleanup() {
    echo -e "${GREEN}🐳 Limpando cache do Docker...${NC}"
    
    if command -v docker &> /dev/null; then
        # Para containers do projeto
        docker compose down --volumes --remove-orphans 2>/dev/null || true
        
        # Limpa cache geral do Docker
        docker system prune -f
        docker volume prune -f
        
        echo -e "${GREEN}✅ Cache do Docker limpo!${NC}"
    else
        echo -e "${RED}❌ Docker não encontrado${NC}"
    fi
}

# Limpeza completa
all_cleanup() {
    echo -e "${BLUE}🚀 Executando limpeza completa do sistema...${NC}"
    
    show_sizes
    docker_cleanup
    full_cleanup
    
    echo -e "${GREEN}🎉 Todas as limpezas concluídas!${NC}"
}

# Main
main() {
    case "${1:-basic}" in
        basic)
            show_sizes
            basic_cleanup
            ;;
        full)
            show_sizes
            full_cleanup
            ;;
        docker)
            docker_cleanup
            ;;
        all)
            all_cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}❌ Opção inválida: $1${NC}"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
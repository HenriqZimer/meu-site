#!/bin/bash

# Script para validar a configuração do projeto antes do deploy
# Executa verificações básicas de integridade

echo "🔍 Validando configuração do projeto..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado"
    exit 1
fi

echo "✅ Node.js $(node --version)"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado"
    exit 1
fi

echo "✅ npm $(npm --version)"

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado"
    exit 1
fi

echo "✅ package.json encontrado"

# Verificar se .env.example existe
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example não encontrado"
    exit 1
fi

echo "✅ .env.example encontrado"

# Verificar se nuxt.config.ts existe
if [ ! -f "nuxt.config.ts" ]; then
    echo "❌ nuxt.config.ts não encontrado"
    exit 1
fi

echo "✅ nuxt.config.ts encontrado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Executar lint
echo "🔍 Executando lint..."
npm run lint

# Testar build
echo "🏗️ Testando build..."
npm run build

echo "🎉 Todas as verificações passaram!"
echo "🚀 Projeto pronto para deploy!"
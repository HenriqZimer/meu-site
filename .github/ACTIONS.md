# Configurações do GitHub Actions para o Portfolio

## 📋 Workflows Disponíveis

### 1. 🚀 Portfolio CI/CD (`ci-cd-portfolio.yml`)
**Workflow principal** para build completo e deploy

- **Triggers**: Push para `main`/`develop`, PRs, execução manual
- **Jobs**:
  - `lint`: Análise de código com ESLint
  - `build`: Build em múltiplas versões Node.js (18, 20, 22)
  - `deploy`: Deploy automático para GitHub Pages (apenas branch `main`)

### 2. ✅ PR Checks (`pr-checks.yml`)  
**Verificações rápidas** para Pull Requests

- **Triggers**: Abertura/atualização de PRs
- **Jobs**: Lint + Build básico para feedback rápido
- **Concorrência**: Cancela execuções anteriores do mesmo PR

## 🔧 Configuração

### Variáveis de Ambiente
O workflow utiliza as variáveis definidas em `.env.example`:

```bash
# Necessárias para build de produção
NODE_ENV=production
NUXT_PUBLIC_SITE_NAME="Seu Nome"
NUXT_PUBLIC_SITE_DESCRIPTION="Sua Descrição"
# ... outras variáveis
```

### Permissões Necessárias
Para deploy no GitHub Pages, configure:

1. **Repository Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Permissions**: Ações têm acesso de escrita

### Secrets (se necessário)
Para integrações externas, adicione secrets:

```bash
# Repository Settings → Secrets and variables → Actions
EMAILJS_SERVICE_ID=seu_service_id
FORMSPREE_ID=seu_formspree_id
GA_ID=seu_google_analytics_id
```

## 🚀 Como Usar

### Push para Main
```bash
git push origin main
# → Executa CI/CD completo + Deploy
```

### Pull Request
```bash
git push origin feature/nova-funcionalidade
# → Executa verificações rápidas
```

### Execução Manual
1. Vá para **Actions** no GitHub
2. Selecione "🚀 Portfolio CI/CD"
3. Clique em "Run workflow"

## 📊 Status e Badges

Adicione badges no README:

```markdown
[![CI/CD](https://github.com/HenriqZimer/meu-site/actions/workflows/ci-cd-portfolio.yml/badge.svg)](https://github.com/HenriqZimer/meu-site/actions/workflows/ci-cd-portfolio.yml)
[![PR Checks](https://github.com/HenriqZimer/meu-site/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/HenriqZimer/meu-site/actions/workflows/pr-checks.yml)
```

## 🔍 Troubleshooting

### Build Falha
- Verifique variáveis de ambiente
- Execute `npm run build` localmente
- Verifique logs detalhados no Actions

### Deploy Falha
- Verifique permissões do GitHub Pages
- Confirme branch `main` como trigger
- Verifique artifacts gerados

### Lint Falha
- Execute `npm run lint:fix` localmente
- Confirme regras do ESLint em `eslint.config.mjs`
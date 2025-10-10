# 🚀 Portfolio Profissional - Landing Page

Landing page responsiva e minimalista para perfil profissional, construída com **Vue 3** e **Nuxt 3**.

## ✨ Características

- 🎨 **Design Minimalista** - Interface limpa com paleta de cores neutras
- 📱 **Totalmente Responsivo** - Adaptável a todos os dispositivos
- ⚡ **Alto Desempenho** - Otimizado para carregamento rápido
- 🔍 **SEO Otimizado** - Meta tags e estrutura otimizada para SEO
- 🎭 **Animações Sutis** - Transições suaves e elegantes
- ♿ **Acessível** - Seguindo as melhores práticas de acessibilidade

## 🛠️ Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Nuxt 3** - Meta-framework para Vue.js
- **Tailwind CSS** (via Nuxt UI) - Framework CSS utilitário
- **TypeScript** - JavaScript com tipos estáticos
- **Nuxt Image** - Otimização automática de imagens
- **Nuxt Content** - Gerenciamento de conteúdo

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento em http://localhost:3000
npm run dev
```

## 🏗️ Produção

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📂 Estrutura do Projeto

```
app/
├── components/          # Componentes Vue reutilizáveis
│   ├── Header.vue      # Cabeçalho com navegação
│   ├── Hero.vue        # Seção hero principal
│   ├── About.vue       # Seção sobre mim
│   ├── Skills.vue      # Seção de habilidades
│   ├── Portfolio.vue   # Galeria de projetos
│   ├── Contact.vue     # Formulário de contato
│   └── Footer.vue      # Rodapé
├── composables/        # Composables Vue
│   └── useScrollAnimation.ts
├── assets/
│   └── css/
│       └── animations.css  # Animações personalizadas
└── app.vue             # Componente raiz

public/                 # Arquivos estáticos
nuxt.config.ts         # Configuração do Nuxt
```

## 🎨 Personalização

### 1. Informações Pessoais

Edite os componentes em `app/components/` para personalizar:

- **Nome e título** em `Header.vue` e `Hero.vue`
- **Biografia** em `About.vue`
- **Habilidades** em `Skills.vue`
- **Projetos** em `Portfolio.vue`
- **Informações de contato** em `Contact.vue` e `Footer.vue`

### 2. Cores

O projeto usa cores neutras do Tailwind CSS. Para alterar:

- `bg-gray-900` - Cor principal (preto)
- `bg-gray-50` - Cor de fundo clara
- `text-gray-600` - Cor de texto secundário

### 3. Fontes

O projeto usa a fonte **Inter** do Google Fonts. Para alterar, edite `nuxt.config.ts`:

```typescript
link: [
  { 
    rel: 'stylesheet', 
    href: 'https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;500;600;700&display=swap' 
  }
]
```

### 4. Adicionar Imagens

1. Adicione suas imagens na pasta `public/images/`
2. Use o componente `NuxtImg` ou `NuxtPicture` para otimização automática

Exemplo:
```vue
<NuxtImg
  src="/images/profile.jpg"
  alt="Foto profissional"
  width="500"
  height="500"
/>
```

### 5. Redes Sociais

Atualize os links das redes sociais em:
- `Hero.vue`
- `Contact.vue`
- `Footer.vue`

## 📧 Configurar Formulário de Contato

O formulário em `Contact.vue` está pronto para integração. Opções:

1. **Formspree** - Serviço de formulários (gratuito)
2. **EmailJS** - Envio de emails via JavaScript
3. **API própria** - Endpoint personalizado

Exemplo com Formspree:
```vue
<form @submit.prevent="handleSubmit" action="https://formspree.io/f/seu-id">
```

## 🔧 Configurações Úteis

### Meta Tags SEO

Edite em `app/app.vue`:

```typescript
useHead({
  title: 'Seu Nome - Seu Título',
  meta: [
    { name: 'description', content: 'Sua descrição' },
    // ... mais meta tags
  ]
})
```

### Analytics

Para adicionar Google Analytics, instale o módulo:

```bash
npm install @nuxtjs/google-analytics
```

## 📱 Responsividade

O site é responsivo por padrão. Breakpoints do Tailwind:

- `sm:` - ≥ 640px
- `md:` - ≥ 768px
- `lg:` - ≥ 1024px
- `xl:` - ≥ 1280px
- `2xl:` - ≥ 1536px

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Arraste a pasta .output/public para Netlify
```

### Servidor próprio

```bash
npm run build
node .output/server/index.mjs
```

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📞 Suporte

Se você tiver alguma dúvida, entre em contato através:
- Email: seu-email@exemplo.com
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-usuario)
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

Feito com ❤️ usando Vue 3 e Nuxt 3

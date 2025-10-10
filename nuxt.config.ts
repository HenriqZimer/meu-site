// https://nuxt.com/docs/api/configuration/nuxt-config
const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  // DevTools habilitado apenas em desenvolvimento
  devtools: { enabled: !isProduction },

  // Configuração das variáveis de ambiente públicas
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      siteFirstName: process.env.NUXT_PUBLIC_SITE_FIRST_NAME,
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      email: process.env.NUXT_PUBLIC_EMAIL,
      phone: process.env.NUXT_PUBLIC_PHONE,
      location: process.env.NUXT_PUBLIC_LOCATION,
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL,
      linkedinUrl: process.env.NUXT_PUBLIC_LINKEDIN_URL,
      formspreeId: process.env.NUXT_PUBLIC_FORMSPREE_ID,
      gaId: process.env.NUXT_PUBLIC_GA_ID,
      heroDescription: process.env.NUXT_PUBLIC_HERO_DESCRIPTION,
      footerDescription: process.env.NUXT_PUBLIC_FOOTER_DESCRIPTION
    }
  },

  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts'
  ],

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            colors: {
              primary: '#2563eb',
              secondary: '#06b6d4',
              accent: '#8b5cf6',
              error: '#ef4444',
              info: '#3b82f6',
              success: '#10b981',
              warning: '#f59e0b',
              background: '#ffffff',
              surface: '#f9fafb',
            },
          },
          dark: {
            colors: {
              primary: '#3b82f6',
              secondary: '#06b6d4',
              accent: '#8b5cf6',
              error: '#ef4444',
              info: '#60a5fa',
              success: '#10b981',
              warning: '#f59e0b',
              background: '#0f172a',
              surface: '#1e293b',
            },
          },
        },
      },
    },
    moduleOptions: {
      styles: true
    }
  },

  css: [
    '~/assets/css/animations.css'
  ],

  app: {
    // Configuração para GitHub Pages
    baseURL: process.env.NITRO_PRESET === 'github-pages' ? '/meu-site/' : '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      link: [
        { 
          rel: 'icon', 
          type: 'image/svg+xml', 
          href: '/favicon.svg' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.googleapis.com' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com', 
          crossorigin: '' 
        },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' 
        }
      ]
    }
  },

  // Otimizações de performance
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true
  },

  // Configuração do servidor de desenvolvimento
  devServer: {
    port: parseInt(process.env.NUXT_PORT || '3000')
  },

  // Configurações condicionais baseadas no ambiente
  ssr: process.env.NODE_ENV === 'production',
  
  // Configurações de build para produção
  nitro: {
    compressPublicAssets: process.env.NODE_ENV === 'production',
    minify: process.env.NODE_ENV === 'production',
    // Configuração para GitHub Pages
    ...(process.env.NITRO_PRESET === 'github-pages' && {
      preset: 'github-pages',
      baseURL: '/meu-site/',
      output: {
        publicDir: '.output/public'
      }
    })
  },

  // Configurações do Nuxt Image
  image: {
    quality: 80,
    format: ['webp', 'jpg', 'png'],
    // Usar provider simples para evitar warning do sharp
    provider: 'ipx'
  }
})
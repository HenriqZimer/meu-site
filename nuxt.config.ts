export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app/',
  
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteName: 'Henrique Pereira Zimermann',
      siteFirstName: 'Henrique',
      siteDescription: 'DevOps & Cloud Engineer',
      siteUrl: 'https://henriqzimer.com.br',
      email: 'contato@henriqzimer.com.br',
      phone: '+55 (47) 99260-6276',
      location: 'Balneário Piçarras - Santa Catarina, Brasil',
      githubUrl: 'https://github.com/henriqzimer',
      linkedinUrl: 'https://linkedin.com/in/henrique-zimermann',
      formspreeId: '',
      gaId: '',
      heroDescription: 'Automatizando infraestruturas e otimizando processos de desenvolvimento. Especialista em CI/CD, containerização e orquestração na nuvem.',
      footerDescription: 'Engenheiro DevOps focado em automação, infraestrutura como código e entrega contínua'
    }
  },

  modules: [
    'vuetify-nuxt-module'
  ],

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            colors: {
              primary: '#3b82f6',
              secondary: '#64748b',
              accent: '#06b6d4',
              error: '#ef4444',
              warning: '#f59e0b',
              info: '#3b82f6',
              success: '#10b981'
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#3b82f6',
              secondary: '#64748b',
              accent: '#06b6d4',
              error: '#ef4444',
              warning: '#f59e0b',
              info: '#3b82f6',
              success: '#10b981',
              background: '#0f172a',
              surface: '#1e293b',
              'surface-bright': '#334155',
              'surface-light': '#475569',
              'surface-variant': '#334155',
              'on-surface-variant': '#cbd5e1'
            }
          }
        }
      }
    }
  },

  css: [
    'assets/css/design-tokens.css',
    'assets/css/critical.css',
    'assets/css/animations.css',
    'assets/css/components.css'
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/base'
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#3b82f6' }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' }
      ]
    }
  }
})
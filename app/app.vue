<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <Header />
    <v-main>
      <Hero />
      <!-- <About />
      <Skills />
      <Portfolio />
      <Certifications /> -->
      <!-- <Contact /> -->
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
// Variáveis de ambiente para SEO
const siteName = useRuntimeConfig().public.siteName
const siteDescription = useRuntimeConfig().public.siteDescription
const siteUrl = useRuntimeConfig().public.siteUrl

// Configuração de SEO e meta tags
useHead({
  title: `${siteName} - ${siteDescription}`,
  meta: [
    { name: 'description', content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.` },
    { name: 'keywords', content: 'devops, desenvolvedor, vue.js, nuxt, react, typescript, web developer, portfolio, kubernetes, docker, aws' },
    { property: 'og:title', content: `${siteName} - ${siteDescription}` },
    { property: 'og:description', content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${siteName} - ${siteDescription}` },
    { name: 'twitter:description', content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.` }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: siteUrl }
  ]
})
</script>

<style>
/* Reset e estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

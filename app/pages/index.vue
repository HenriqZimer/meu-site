<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Skills Section -->
    <Skills />
    
    <!-- Portfolio Section -->
    <Portfolio />
    
    <!-- Certifications Section -->
    <Certifications />
    
    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script setup lang="ts">
// Variáveis de ambiente para SEO
const config = useRuntimeConfig()
const siteName = config.public.siteName || 'Henrique Zimer'
const siteDescription = config.public.siteDescription || 'DevOps Engineer'
const siteUrl = config.public.siteUrl || 'http://localhost:3000'

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
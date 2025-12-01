<template>
  <div class="page-wrapper">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <Hero />

      <!-- About Section -->
      <About />

      <!-- Portfolio Section -->
      <Portfolio />

      <!-- Skills Section -->
      <Skills />

      <!-- Certifications Section -->
      <Certifications />

      <!-- Courses Section -->
      <Courses />

      <!-- Contact Section -->
      <Contact />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Variáveis de ambiente para SEO
const config = useRuntimeConfig();
const siteName = config.public.siteName;
const siteDescription = config.public.siteDescription;
const siteUrl = config.public.siteUrl;

// Configuração de SEO e meta tags
useHead({
  title: `${siteName} - ${siteDescription}`,
  meta: [
    {
      name: "description",
      content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.`,
    },
    {
      name: "keywords",
      content:
        "devops, desenvolvedor, vue.js, nuxt, react, typescript, web developer, portfolio, kubernetes, docker, aws",
    },
    { property: "og:title", content: `${siteName} - ${siteDescription}` },
    {
      property: "og:description",
      content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.`,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${siteName} - ${siteDescription}` },
    {
      name: "twitter:description",
      content: `Portfolio profissional de ${siteName}. ${siteDescription} especializado em criar experiências digitais elegantes e funcionais.`,
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: siteUrl },
  ],
});
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.main-content {
  flex: 1;
  width: 100%;
}

/* Smooth scroll behavior */
:global(html) {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

@media (max-width: 1024px) {
  .section-spacer {
    margin-top: 100px;
  }
  
  :global(html) {
    scroll-padding-top: 64px;
  }
}

@media (max-width: 768px) {
  .section-spacer {
    margin-top: 80px;
  }
}

@media (max-width: 480px) {
  .section-spacer {
    margin-top: 60px;
  }
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Ilustração de erro -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-32 h-32 bg-gray-900 rounded-full mb-6">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-8xl font-bold text-gray-900 mb-4">404</h1>
      </div>

      <!-- Mensagem -->
      <div class="space-y-4 mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Página não encontrada</h2>
        <p class="text-lg text-gray-600 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
      </div>

      <!-- Ações -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/"
          class="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all hover:scale-105 font-medium">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Voltar ao Início
        </NuxtLink>

        <button
          class="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all hover:scale-105 font-medium"
          @click="$router.back()">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      <!-- Links úteis -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">Links úteis:</p>
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <NuxtLink to="/#about" class="text-gray-600 hover:text-gray-900 transition-colors">
            Sobre
          </NuxtLink>
          <NuxtLink to="/#portfolio" class="text-gray-600 hover:text-gray-900 transition-colors">
            Portfólio
          </NuxtLink>
          <NuxtLink to="/#contact" class="text-gray-600 hover:text-gray-900 transition-colors">
            Contato
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Configurar meta tags para página de erro
useHead({
  title: "404 - Página não encontrada",
  meta: [{ name: "robots", content: "noindex" }],
});
</script>

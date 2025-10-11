<template>
  <v-footer class="bg-surface py-8 mt-16">
    <v-container>
      <!-- Seção Principal -->
      <v-row justify="center" align="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h3 class="text-h5 font-weight-bold mb-4">{{ siteName }}</h3>
          <p class="text-body-1 text-medium-emphasis mb-6 max-w-md mx-auto">
            {{ footerDescription }}
          </p>
          
          <!-- Redes Sociais -->
          <div class="d-flex justify-center gap-4 mb-6">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :icon="social.icon"
              :color="social.color"
              variant="text"
              size="large"
              target="_blank"
              class="social-btn"
              :aria-label="`Acessar ${social.name} (abre em nova aba)`"
              rel="noopener"
            />
          </div>
          
          <!-- Links Rápidos -->
          <div class="d-flex justify-center flex-wrap gap-4">
            <v-btn
              v-for="link in quickLinks"
              :key="link.label"
              variant="text"
              size="small"
              class="text-capitalize"
              @click="scrollToSection(link.href)"
            >
              {{ link.label }}
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="border-opacity-25 mb-6"/>

      <!-- Copyright -->
      <v-row align="center">
        <v-col cols="12" md="6" class="text-center text-md-start">
          <p class="text-body-2 text-medium-emphasis mb-0">
            © {{ currentYear }} {{ siteName }}. Todos os direitos reservados.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-end">
          <p class="text-body-2 text-medium-emphasis mb-0 d-flex align-center justify-center justify-md-end gap-1">
            Feito com 
            <v-icon size="16" color="red">mdi-heart</v-icon> 
            usando Vue.js & Vuetify
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Botão Voltar ao Topo -->
    <v-btn
      v-if="showScrollTop"
      icon="mdi-chevron-up"
      color="primary"
      variant="elevated"
      position="fixed"
      location="bottom end"
      class="ma-4"
      size="large"
      @click="scrollToTop"
    />
  </v-footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Variáveis de ambiente
const siteName = useRuntimeConfig().public.siteName
const footerDescription = useRuntimeConfig().public.footerDescription
const email = useRuntimeConfig().public.email
const githubUrl = useRuntimeConfig().public.githubUrl
const linkedinUrl = useRuntimeConfig().public.linkedinUrl
const phoneNumber = useRuntimeConfig().public.phone

const currentYear = new Date().getFullYear()
const showScrollTop = ref(false)

const socialLinks = [
  { name: 'GitHub', icon: 'mdi-github', href: githubUrl, color: 'grey-lighten-1' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', href: linkedinUrl, color: '#0077B5' },
  { name: 'Email', icon: 'mdi-email', href: `mailto:${email}`, color: 'primary' },
  { name: 'WhatsApp', icon: 'mdi-whatsapp', href: `https://wa.me/${phoneNumber.replace(/\D/g, '')}`, color: '#25D366' }
]

const quickLinks = [
  { label: 'Início', href: 'home' },
  { label: 'Sobre', href: 'about' },
  { label: 'Habilidades', href: 'skills' },
  { label: 'Portfólio', href: 'portfolio' },
  { label: 'Certificações', href: 'certifications' },
  { label: 'Contato', href: 'contact' }
]

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px) scale(1.1);
}

.max-w-md {
  max-width: 28rem;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-4 {
  gap: 1rem;
}
</style>

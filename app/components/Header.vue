<template>
  <v-app-bar
    :elevation="scrolled ? 4 : 0"
    :color="scrolled ? 'surface' : 'transparent'"
    flat
    fixed
    class="header-bar"
  >
    <v-container>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn
            text
            size="large"
            class="logo-btn"
            @click="scrollToSection('home')"
          >
            <v-icon start>mdi-home</v-icon>
            <span class="text-h6 font-weight-bold logo-text">Início</span>
          </v-btn>
        </v-col>

        <v-spacer />

        <v-col cols="auto" class="hidden-sm-and-down">
          <v-btn
            v-for="(item, index) in menuItems"
            :key="item.id"
            variant="text"
            class="nav-btn mx-1"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="scrollToSection(item.id)"
          >
            <v-icon start class="nav-icon">{{ item.icon }}</v-icon>
            <span style="text-transform: capitalize;" class="nav-text">{{ item.label.toLowerCase() }}</span>
          </v-btn>
          
          <v-btn
            variant="text"
            class="ml-4 theme-btn"
            @click="toggleTheme"
          >
            <v-icon start class="theme-icon">{{ theme.global.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
            <span style="text-transform: capitalize;" class="theme-text">{{ theme.global.name.value === 'dark' ? 'modo claro' : 'modo escuro' }}</span>
          </v-btn>
        </v-col>

        <v-col cols="auto" class="hidden-md-and-up">
          <v-btn
            icon
            class="mr-2 mobile-theme-btn"
            @click="toggleTheme"
            :aria-label="theme.global.name.value === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'"
          >
            <v-icon class="mobile-theme-icon">{{ theme.global.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
          <v-app-bar-nav-icon 
            class="mobile-nav-icon" 
            @click="drawer = !drawer"
            :aria-label="drawer ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="mobile-drawer"
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="item.id"
        class="drawer-item"
        :style="{ animationDelay: `${index * 0.1}s` }"
        @click="scrollToSection(item.id); drawer = false"
      >
        <template #prepend>
          <v-icon class="drawer-icon">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="drawer-text">{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const scrolled = ref(false)
const drawer = ref(false)
const theme = useTheme()

const menuItems = [
  { id: 'about', label: 'Sobre', icon: 'mdi-account' },
  { id: 'skills', label: 'Habilidades', icon: 'mdi-star' },
  { id: 'portfolio', label: 'Portfólio', icon: 'mdi-briefcase' },
  { id: 'certifications', label: 'Certificações', icon: 'mdi-certificate' },
  { id: 'contact', label: 'Contato', icon: 'mdi-email' }
]

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
  // Salvar preferência no localStorage
  if (import.meta.client) {
    localStorage.setItem('theme', theme.global.name.value)
  }
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

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Restaurar tema salvo do localStorage
  if (import.meta.client) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.global.name.value = savedTheme as 'light' | 'dark'
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Animações de entrada do header */
.header-bar {
  animation: slideDownFade 0.8s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Logo com animação */
.logo-btn {
  transition: all 0.3s ease;
}

.logo-btn:hover {
  transform: scale(1.02);
}

.logo-text {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideInLeft 0.8s ease-out 0.2s both;
}

/* Navegação com animações em cascata */
.nav-btn {
  animation: slideInUp 0.6s ease-out both;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-btn:hover::before {
  left: 100%;
}

.nav-btn:hover {
  transform: translateY(-2px);
  background-color: rgba(59, 130, 246, 0.05);
}

.nav-icon {
  transition: all 0.3s ease;
}

.nav-btn:hover .nav-icon {
  transform: scale(1.1) rotate(5deg);
  color: #3b82f6;
}

.nav-text {
  transition: all 0.3s ease;
}

.nav-btn:hover .nav-text {
  color: #3b82f6;
}

/* Botão de tema com animações */
.theme-btn {
  animation: slideInUp 0.6s ease-out 0.8s both;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  transform: translateY(-2px) rotate(5deg);
}

.theme-icon {
  transition: all 0.3s ease;
}

.theme-btn:hover .theme-icon {
  transform: rotate(180deg) scale(1.2);
  color: #f59e0b;
}

/* Mobile icons */
.mobile-theme-btn, .mobile-nav-icon {
  animation: slideInRight 0.6s ease-out 0.4s both;
  transition: all 0.3s ease;
}

.mobile-theme-btn:hover, .mobile-nav-icon:hover {
  transform: scale(1.1) rotate(10deg);
}

.mobile-theme-icon {
  transition: all 0.3s ease;
}

.mobile-theme-btn:hover .mobile-theme-icon {
  color: #f59e0b;
}

/* Drawer animations */
.mobile-drawer {
  animation: slideInRight 0.4s ease-out;
}

.drawer-item {
  animation: slideInRight 0.4s ease-out both;
  transition: all 0.3s ease;
}

.drawer-item:hover {
  transform: translateX(-5px);
  background-color: rgba(59, 130, 246, 0.1);
}

.drawer-icon {
  transition: all 0.3s ease;
}

.drawer-item:hover .drawer-icon {
  transform: scale(1.1);
  color: #3b82f6;
}

.drawer-text {
  transition: all 0.3s ease;
}

.drawer-item:hover .drawer-text {
  color: #3b82f6;
  font-weight: 500;
}

/* Keyframes */
@keyframes slideDownFade {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsividade */
@media (max-width: 960px) {
  .logo-text {
    animation: slideInUp 0.8s ease-out 0.2s both;
  }
}
</style>

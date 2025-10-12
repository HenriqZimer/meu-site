<template>
  <v-app-bar
    :elevation="scrolled ? 1 : 0"
    :color="scrolled ? 'surface' : 'transparent'"
    flat
    fixed
    class="modern-header"
    :class="{ 'header-scrolled': scrolled }"
    height="72"
  >
    <v-container fluid class="header-container">
      <div class="header-content">
        <!-- Logo/Brand -->
        <div class="brand-section">
          <v-btn
            variant="text"
            class="brand-btn"
            @click="scrollToSection('home')"
            :ripple="false"
          >
            <div class="brand-content">
              <img 
                src="/logo.png" 
                alt="Henrique Zimermann Logo" 
                class="brand-logo-img"
              />
              <div class="brand-info">
                <div class="brand-name">Henrique</div>
                <div class="brand-role">DevOps Engineer</div>
              </div>
            </div>
          </v-btn>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" v-if="!isMobile">
          <div class="nav-items">
            <v-btn
              v-for="item in menuItems"
              :key="item.id"
              variant="text"
              class="nav-item"
              :class="{ 'nav-item--active': activeSection === item.id }"
              @click="scrollToSection(item.id)"
              :ripple="false"
            >
              {{ item.label }}
            </v-btn>
          </div>
          
          <!-- CTA Button -->
          <v-btn
            variant="flat"
            color="primary"
            class="cta-btn"
            @click="scrollToSection('contact')"
            :ripple="false"
          >
            Fale Comigo
          </v-btn>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu" v-if="isMobile">
          <v-btn
            icon
            variant="text"
            class="mobile-menu-btn"
            @click="toggleDrawer"
            :ripple="false"
          >
            <v-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" />
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="mobile-drawer"
    width="320"
  >
    <div class="drawer-content">
      <div class="drawer-header">
        <div class="drawer-brand">
          <div class="drawer-initial">H</div>
          <div class="drawer-info">
            <div class="drawer-name">Henrique Zimermann</div>
            <div class="drawer-role">DevOps & Cloud Engineer</div>
          </div>
        </div>
        <v-btn
          icon
          variant="text"
          @click="drawer = false"
          class="drawer-close"
          :ripple="false"
        >
          <v-icon icon="mdi-close" />
        </v-btn>
      </div>
      
      <div class="drawer-nav">
        <v-btn
          v-for="item in menuItems"
          :key="item.id"
          variant="text"
          class="drawer-nav-item"
          :class="{ 'drawer-nav-item--active': activeSection === item.id }"
          @click="handleDrawerItemClick(item.id)"
          block
          :ripple="false"
        >
          <v-icon :icon="item.icon" start />
          {{ item.label }}
        </v-btn>
        
        <v-btn
          variant="flat"
          color="primary"
          class="drawer-cta"
          @click="handleDrawerItemClick('contact')"
          block
          :ripple="false"
        >
          <v-icon icon="mdi-send" start />
          Fale Comigo
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useResponsive } from '~/composables/useResponsive'

// Types
interface MenuItem {
  id: string
  label: string
  icon: string
}

// Composables
const { isMobile } = useResponsive()

// Reactive state
const scrolled = ref(false)
const drawer = ref(false)
const activeSection = ref('home')

// Menu items configuration
const menuItems: MenuItem[] = [
  { id: 'about', label: 'Sobre', icon: 'mdi-account-circle' },
  { id: 'skills', label: 'Skills', icon: 'mdi-code-tags' },
  { id: 'portfolio', label: 'Projetos', icon: 'mdi-briefcase-variant' },
  { id: 'certifications', label: 'Certificações', icon: 'mdi-certificate' },
  { id: 'contact', label: 'Contato', icon: 'mdi-message-text' }
]

// Navigation methods
const scrollToSection = (id: string) => {
  if (id === 'home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    activeSection.value = 'home'
    return
  }

  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    activeSection.value = id
  }
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const handleDrawerItemClick = (id: string) => {
  scrollToSection(id)
  drawer.value = false
}

// Scroll detection
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  updateActiveSection()
}

const updateActiveSection = () => {
  const sections = ['home', ...menuItems.map(item => item.id)]
  const scrollPosition = window.scrollY + 100
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const sectionId = sections[i]
    if (!sectionId) continue
    const element = document.getElementById(sectionId)
    if (element && element.offsetTop <= scrollPosition) {
      activeSection.value = sectionId
      break
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* === MODERN HEADER === */
.modern-header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid transparent;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.8);
}

.header-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom-color: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

/* === BRAND SECTION === */
.brand-section {
  flex-shrink: 0;
}

.brand-btn {
  padding: 8px 16px !important;
  min-width: auto !important;
  height: auto !important;
  border-radius: 16px !important;
  transition: all 0.3s ease;
}

.brand-btn:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  transform: translateY(-2px);
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo-img {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.3s ease;
  object-fit: contain;
}

.brand-btn:hover .brand-logo-img {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.brand-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.brand-name {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  color: #f1f5f9 !important;
  margin: 0;
  letter-spacing: -0.025em;
}

.brand-role {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  color: #cbd5e1 !important;
  margin: 0;
}

/* === DESKTOP NAVIGATION === */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  position: relative;
  padding: 8px 16px !important;
  min-width: auto !important;
  height: 40px !important;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: #cbd5e1 !important;
  transition: all 0.3s ease;
  border-radius: 12px !important;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-item:hover {
  color: #f1f5f9 !important;
  background: rgba(59, 130, 246, 0.08) !important;
  transform: translateY(-1px);
}

.nav-item:hover::after,
.nav-item--active::after {
  width: 20px;
}

.nav-item--active {
  color: #f1f5f9 !important;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1) !important;
}

.cta-btn {
  padding: 8px 24px !important;
  height: 40px !important;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.025em;
  border-radius: 16px !important;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* === MOBILE MENU === */
.mobile-menu-btn {
  width: 40px !important;
  height: 40px !important;
  color: #cbd5e1 !important;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #f1f5f9 !important;
  transform: scale(1.05);
}

/* === MOBILE DRAWER === */
.mobile-drawer {
  background: rgba(15, 23, 42, 0.98) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(59, 130, 246, 0.1);
}

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  background: rgba(59, 130, 246, 0.05);
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-initial {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.025em;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.drawer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-name {
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.drawer-role {
  font-size: 14px;
  font-weight: 500;
  color: #cbd5e1;
  line-height: 1.2;
}

.drawer-close {
  width: 40px !important;
  height: 40px !important;
  color: #cbd5e1 !important;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.drawer-close:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #f1f5f9 !important;
}

.drawer-nav {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-nav-item {
  justify-content: flex-start !important;
  padding: 16px 20px !important;
  height: 56px !important;
  font-size: 16px;
  font-weight: 500;
  color: #cbd5e1 !important;
  border-radius: 16px !important;
  transition: all 0.3s ease;
  letter-spacing: -0.025em;
}

.drawer-nav-item:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #f1f5f9 !important;
  transform: translateX(4px);
}

.drawer-nav-item--active {
  background: rgba(59, 130, 246, 0.15) !important;
  color: #f1f5f9 !important;
  font-weight: 600;
  border-left: 3px solid #3b82f6;
}

.drawer-cta {
  margin-top: 16px;
  padding: 16px 20px !important;
  height: 56px !important;
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px !important;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  letter-spacing: -0.025em;
  transition: all 0.3s ease;
}

.drawer-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* === RESPONSIVE === */
@media (max-width: 960px) {
  .header-container {
    padding: 0 16px;
  }
  
  .brand-info {
    display: none;
  }
  
  .brand-logo-img {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 12px;
  }
  
  .drawer-header {
    padding: 20px;
  }
  
  .drawer-nav {
    padding: 20px;
  }
}

/* === ANIMATIONS === */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modern-header {
  animation: slideDown 0.6s ease-out;
}

/* === DARK MODE SUPPORT === */
:global(.v-theme--dark) .modern-header {
  background: rgba(15, 23, 42, 0.8);
}

:global(.v-theme--dark) .header-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom-color: rgba(59, 130, 246, 0.2);
}

:global(.v-theme--dark) .brand-name {
  color: #f1f5f9 !important;
}

:global(.v-theme--dark) .brand-role {
  color: #cbd5e1 !important;
}

:global(.v-theme--dark) .nav-item {
  color: #cbd5e1 !important;
}

:global(.v-theme--dark) .nav-item:hover,
:global(.v-theme--dark) .nav-item--active {
  color: #f1f5f9 !important;
}

:global(.v-theme--dark) .mobile-drawer {
  background: rgba(15, 23, 42, 0.98) !important;
  border-left-color: rgba(59, 130, 246, 0.2);
}

:global(.v-theme--dark) .drawer-header {
  border-bottom-color: rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.08);
}

:global(.v-theme--dark) .drawer-name {
  color: #f1f5f9;
}

:global(.v-theme--dark) .drawer-role {
  color: #cbd5e1;
}

:global(.v-theme--dark) .drawer-nav-item {
  color: #cbd5e1 !important;
}

:global(.v-theme--dark) .drawer-nav-item:hover {
  background: rgba(59, 130, 246, 0.15) !important;
  color: #f1f5f9 !important;
}
</style>



<template>
  <v-app-bar
    :elevation="scrolled ? 1 : 0"
    :color="scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'"
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
              <div class="brand-initial">H</div>
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
.modern-header {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid transparent;
  z-index: 1000;
}

.modern-header.header-scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  border-bottom-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

/* Brand Section */
.brand-section {
  flex-shrink: 0;
}

.brand-btn {
  padding: 8px 16px !important;
  min-width: auto !important;
  height: auto !important;
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-initial {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.025em;
}

.brand-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.brand-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.brand-role {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  line-height: 1;
}

/* Desktop Navigation */
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
  color: #475569 !important;
  transition: all 0.2s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-item:hover {
  color: #0f172a !important;
}

.nav-item:hover::after,
.nav-item--active::after {
  width: 20px;
}

.nav-item--active {
  color: #0f172a !important;
  font-weight: 600;
}

.cta-btn {
  padding: 8px 24px !important;
  height: 40px !important;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.025em;
  border-radius: 20px !important;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}

.cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Mobile Menu */
.mobile-menu-btn {
  width: 40px !important;
  height: 40px !important;
  color: #475569 !important;
}

/* Mobile Drawer */
.mobile-drawer {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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
}

.drawer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-name {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.drawer-role {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  line-height: 1.2;
}

.drawer-close {
  width: 40px !important;
  height: 40px !important;
  color: #64748b !important;
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
  color: #475569 !important;
  border-radius: 12px !important;
  transition: all 0.2s ease;
}

.drawer-nav-item:hover {
  background: rgba(59, 130, 246, 0.05) !important;
  color: #0f172a !important;
}

.drawer-nav-item--active {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #3b82f6 !important;
  font-weight: 600;
}

.drawer-cta {
  margin-top: 16px;
  padding: 16px 20px !important;
  height: 56px !important;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* Dark mode support */
:global(.v-theme--dark) .modern-header {
  background: rgba(15, 23, 42, 0.8);
}

:global(.v-theme--dark) .modern-header.header-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:global(.v-theme--dark) .brand-name {
  color: #f1f5f9;
}

:global(.v-theme--dark) .nav-item {
  color: #cbd5e1 !important;
}

:global(.v-theme--dark) .nav-item:hover,
:global(.v-theme--dark) .nav-item--active {
  color: #f1f5f9 !important;
}

:global(.v-theme--dark) .mobile-drawer {
  background: rgba(15, 23, 42, 0.98);
}

:global(.v-theme--dark) .drawer-name {
  color: #f1f5f9;
}

:global(.v-theme--dark) .drawer-nav-item {
  color: #cbd5e1 !important;
}

:global(.v-theme--dark) .drawer-nav-item:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #f1f5f9 !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .header-container {
    padding: 0 16px;
  }
  
  .brand-info {
    display: none;
  }
  
  .brand-initial {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
</style>

<style scoped>
/* === HEADER CONTAINER === */
.header-bar {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid transparent;
  transition: var(--transition-base);
  animation: slideDown var(--transition-slow) ease-out;
  z-index: 1000;
}

.header-bar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: var(--color-gray-200);
  box-shadow: var(--shadow-md);
}

.header-container {
  max-width: var(--container-max-width);
  padding: 0 var(--spacing-container-mobile);
}

.header-row {
  min-height: var(--header-height-mobile);
}

/* === LOGO SECTION === */
.logo-btn {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  transition: var(--transition-base);
  border-radius: var(--border-radius-lg);
  animation: slideInLeft var(--transition-slower) ease-out 200ms both;
}

.logo-btn:hover {
  transform: translateY(-2px) scale(1.02);
  background: var(--color-primary-alpha-10);
}

.logo-icon {
  transition: var(--transition-base);
}

.logo-btn:hover .logo-icon {
  color: var(--color-primary);
  transform: scale(1.1);
}

.logo-icon.animate-bounce {
  animation: bounce 0.8s ease-in-out;
}

.logo-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: var(--font-weight-bold);
  transition: var(--transition-base);
}

/* === NAVIGATION === */
.nav-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-btn {
  position: relative;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
  overflow: hidden;
  animation: slideUp var(--transition-slower) ease-out both;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    var(--color-primary-alpha-20), 
    transparent
  );
  transition: left var(--transition-slower) ease;
}

.nav-btn:hover::before {
  left: 100%;
}

.nav-btn:hover {
  transform: translateY(-2px);
  background: var(--color-primary-alpha-10);
  box-shadow: var(--shadow-md);
}

.nav-btn--active {
  background: var(--color-primary-alpha-20);
  color: var(--color-primary);
}

.nav-btn--active .nav-icon {
  color: var(--color-primary);
}

.nav-icon {
  transition: var(--transition-base);
}

.nav-btn:hover .nav-icon {
  transform: scale(1.1) rotate(5deg);
  color: var(--color-primary);
}

.nav-text {
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.nav-btn:hover .nav-text {
  color: var(--color-primary);
}

/* === THEME TOGGLE === */
.theme-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
  animation: slideUp var(--transition-slower) ease-out both;
}

.theme-btn:hover {
  transform: translateY(-2px);
  background: var(--color-secondary-alpha-10);
}

.theme-icon {
  transition: var(--transition-base);
}

.theme-icon.animate-spin {
  animation: spin 0.5s ease-in-out;
}

.theme-btn:hover .theme-icon {
  transform: rotate(180deg) scale(1.2);
  color: var(--color-secondary);
}

.theme-text {
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.theme-btn:hover .theme-text {
  color: var(--color-secondary);
}

/* === MOBILE ACTIONS === */
.mobile-actions {
  gap: var(--spacing-xs);
}

.mobile-theme-btn,
.mobile-menu-btn {
  width: var(--button-icon-size);
  height: var(--button-icon-size);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
  animation: slideInRight var(--transition-slower) ease-out 400ms both;
}

.mobile-theme-btn:hover,
.mobile-menu-btn:hover {
  transform: scale(1.1) rotate(10deg);
  background: var(--color-primary-alpha-10);
}

.mobile-theme-icon,
.mobile-menu-icon {
  transition: var(--transition-base);
}

.mobile-theme-icon.animate-spin {
  animation: spin 0.5s ease-in-out;
}

.mobile-theme-btn:hover .mobile-theme-icon {
  color: var(--color-secondary);
}

.mobile-menu-btn:hover .mobile-menu-icon {
  color: var(--color-primary);
}

/* === MOBILE DRAWER === */
.mobile-drawer {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  animation: slideInRight var(--transition-base) ease-out;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--color-gray-50);
}

.drawer-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-800);
  margin: 0;
}

.drawer-close {
  width: var(--spacing-3xl);
  height: var(--spacing-3xl);
}

.drawer-list {
  padding: var(--spacing-md) 0;
}

.drawer-item {
  margin: var(--spacing-xs) var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
  animation: slideInRight var(--transition-base) ease-out both;
}

.drawer-item:hover {
  transform: translateX(-5px);
  background: var(--color-primary-alpha-10);
  box-shadow: var(--shadow-sm);
}

.drawer-item--active {
  background: var(--color-primary-alpha-20);
  border-left: 3px solid var(--color-primary);
}

.drawer-icon {
  transition: var(--transition-base);
  margin-right: var(--spacing-md);
}

.drawer-item:hover .drawer-icon,
.drawer-item--active .drawer-icon {
  transform: scale(1.1);
  color: var(--color-primary);
}

.drawer-text {
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.drawer-item:hover .drawer-text,
.drawer-item--active .drawer-text {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

/* === ANIMATIONS === */
@keyframes slideDown {
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

@keyframes slideUp {
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

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* === RESPONSIVE === */
@media (min-width: 600px) {
  .header-container {
    padding: 0 var(--spacing-container-tablet);
  }
  
  .header-row {
    min-height: var(--header-height-tablet);
  }
}

@media (min-width: 960px) {
  .header-container {
    padding: 0 var(--spacing-container-desktop);
  }
  
  .header-row {
    min-height: var(--header-height-desktop);
  }
  
  .nav-btn {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .theme-btn {
    padding: var(--spacing-md) var(--spacing-lg);
  }
}

/* === DARK MODE === */
:global(.v-theme--dark) .header-bar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom-color: var(--color-gray-700);
}

:global(.v-theme--dark) .header-bar.scrolled {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: var(--color-gray-600);
}

:global(.v-theme--dark) .mobile-drawer {
  background: rgba(15, 23, 42, 0.98);
}

:global(.v-theme--dark) .drawer-header {
  background: var(--color-gray-800);
}

:global(.v-theme--dark) .drawer-title {
  color: var(--color-gray-100);
}
</style>

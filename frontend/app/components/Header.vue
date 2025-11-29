<template>
  <v-app-bar flat fixed class="modern-header" :class="{ 'header-scrolled': scrolled }" height="70">
    <v-container fluid class="px-4 px-md-8">
      <v-row align="center" justify="space-between" class="ma-0">
        <!-- Logo/Brand -->
        <v-col cols="auto" class="pa-0">
          <v-btn variant="text" @click="scrollToSection('home')" aria-label="Ir para o topo" class="logo-btn"
            :ripple="false">
            <v-avatar size="40" rounded="lg" class="mr-3">
              <v-img :src="IMAGE_URLS.LOGO" alt="Henrique Zimermann Logo" cover />
            </v-avatar>
            <div>
              <div class="logo-name">Henrique</div>
              <div class="logo-title">DevOps Engineer</div>
            </div>
          </v-btn>
        </v-col>

        <!-- Desktop Navigation -->
        <v-col cols="auto">
          <div class="d-flex align-center ga-2" :class="{ 'nav-visible': mounted }">
            <v-btn v-for="item in menuItems" :key="item.id" variant="text"
              :class="{ 'is-active': activeSection === item.id }" class="nav-link" @click="scrollToSection(item.id)"
              :ripple="false">
              <span>{{ item.label }}</span>
            </v-btn>

            <!-- CTA Button -->
            <v-btn color="primary" variant="flat" class="cta-btn ml-2" @click="scrollToSection('contact')"
              :ripple="false">
              <span>Fale Comigo</span>
              <v-icon icon="mdi-arrow-right" size="18" class="ml-1" />
            </v-btn>
          </div>
        </v-col>

        <!-- Mobile Menu Button -->
        <v-col cols="auto" class="d-md-none pa-0">
          <v-btn icon variant="text" class="mobile-menu-btn" @click="toggleDrawer" :ripple="false">
            <v-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" size="24" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="glass-strong" width="320">
    <div class="d-flex flex-column h-100">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between pa-6 border-b border-opacity-10">
        <div class="d-flex align-center ga-3">
          <v-avatar size="48" rounded="xl" color="primary" class="shadow-primary-sm">
            <span class="text-h6 font-weight-bold">H</span>
          </v-avatar>
          <div class="d-flex flex-column ga-1">
            <span class="text-body-1 font-weight-semibold text-slate-100">Henrique Zimermann</span>
            <span class="text-caption text-slate-400">DevOps & Cloud Engineer</span>
          </div>
        </div>
        <v-btn icon variant="text" size="40" @click="drawer = false" class="text-slate-300 rounded-lg" :ripple="false">
          <v-icon icon="mdi-close" />
        </v-btn>
      </div>

      <!-- Navigation Items -->
      <div class="flex-grow-1 pa-6 d-flex flex-column ga-2">
        <v-btn v-for="item in menuItems" :key="item.id" variant="text"
          :class="{ 'drawer-nav-active': activeSection === item.id }"
          class="justify-start text-capitalize text-slate-300 font-weight-medium px-5 py-4 rounded-xl"
          @click="handleDrawerItemClick(item.id)" block :ripple="false">
          <v-icon :icon="item.icon" start />
          {{ item.label }}
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { MENU_ITEMS, SCROLL_CONFIG, IMAGE_URLS } from "~/constants";
import { useNavigation } from "~/composables/useNavigation";

// Composables
const { isMobile } = useResponsive();
const { scrollToSection, getActiveSection } = useNavigation();

// Reactive state
const scrolled = ref(false);
const drawer = ref(false);
const activeSection = ref("home");
const mounted = ref(false);

// Menu items from constants
const menuItems = MENU_ITEMS;

// Navigation methods
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const handleDrawerItemClick = (id: string) => {
  scrollToSection(id);
  drawer.value = false;
};

// Scroll detection
const handleScroll = () => {
  scrolled.value = window.scrollY > SCROLL_CONFIG.SCROLL_THRESHOLD;
  const sections = ["home", ...menuItems.map((item) => item.id)];
  activeSection.value = getActiveSection(sections);
};

// Lifecycle hooks
onMounted(() => {
  mounted.value = true;
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* === HEADER === */
.modern-header {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-header :deep(.v-toolbar__content) {
  padding: 0;
}

.header-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

/* === BACKGROUND PARTICLES === */
.modern-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.modern-header.header-scrolled::after {
  opacity: 1;
  animation: particleFloat 8s ease-in-out infinite;
}

@keyframes particleFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

/* === LOGO === */
.logo-btn {
  text-transform: none;
  letter-spacing: normal;
  height: auto !important;
  padding: 8px 12px !important;
}

.logo-btn:hover {
  background: rgba(59, 130, 246, 0.08) !important;
}

.logo-name {
  font-size: 0.875rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff 0%, #60a5fa 50%, #06b6d4 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  text-align: left;
  transition: background-position 0.5s ease;
}

.logo-btn:hover .logo-name {
  background-position: 100% 50%;
  animation: gradientShift 2s ease infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.logo-title {
  color: rgb(148, 163, 184) !important;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.logo-btn:hover .logo-title {
  color: rgb(96, 165, 250) !important;
}

/* === NAVIGATION === */
.nav-visible {
  opacity: 1 !important;
  transition: opacity 0.3s ease-in-out;
}

.d-flex.align-center.ga-2:not(.nav-visible) {
  opacity: 0;
}

.nav-link {
  text-transform: none !important;
  letter-spacing: normal !important;
  height: 40px !important;
  padding: 8px 16px !important;
  border-radius: 10px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-width: 80px;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
}

.nav-link span {
  color: rgb(203, 213, 225) !important;
  font-size: 0.9375rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(6, 182, 212, 0.12));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-3px) scale(1.05);
  backdrop-filter: blur(8px);
}

.nav-link:hover::after {
  width: 200px;
  height: 200px;
}

.nav-link:hover span {
  color: rgb(241, 245, 249) !important;
  text-shadow: 0 0 20px rgba(96, 165, 250, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.is-active {
  background: rgba(59, 130, 246, 0.15);
  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.3);
}

.nav-link.is-active span {
  color: rgb(241, 245, 249) !important;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.3);
}

.nav-link.is-active::after {
  content: "";
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6);
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(59, 130, 246, 0.4);
  animation: underlinePulse 2s ease-in-out infinite;
}

/* === CTA BUTTON === */
.cta-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8) !important;
  background-size: 200% 200%;
  text-transform: none !important;
  letter-spacing: normal !important;
  height: 40px !important;
  padding: 8px 24px !important;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.cta-btn:hover::before {
  left: 100%;
}

.cta-btn span {
  color: white !important;
  font-size: 0.9375rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
}

.cta-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  background-position: 100% 50%;
}

.cta-btn .v-icon {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.cta-btn:hover .v-icon {
  transform: translateX(4px);
}

/* === MOBILE MENU === */
.mobile-menu-btn {
  color: rgb(203, 213, 225) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 12px !important;
}

.mobile-menu-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-menu-btn:hover {
  color: rgb(241, 245, 249) !important;
  background: rgba(59, 130, 246, 0.15) !important;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.mobile-menu-btn:hover::before {
  opacity: 1;
}

.mobile-menu-btn .v-icon {
  color: inherit;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.mobile-menu-btn:hover .v-icon {
  transform: rotate(90deg);
}

/* === DRAWER NAVIGATION === */
.v-navigation-drawer {
  background: rgba(15, 23, 42, 0.98) !important;
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.v-navigation-drawer::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  animation: drawerAurora 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes drawerAurora {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.5;
  }

  50% {
    transform: translate(-20%, 20%) rotate(180deg);
    opacity: 0.8;
  }
}

.v-navigation-drawer .v-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.v-navigation-drawer .v-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 70%;
  background: linear-gradient(90deg, #3b82f6, transparent);
  transition: width 0.3s ease;
}

.v-navigation-drawer .v-btn:hover {
  background: rgba(59, 130, 246, 0.08) !important;
  transform: translateX(4px);
}

.v-navigation-drawer .v-btn:hover::before {
  width: 4px;
}

.drawer-nav-active {
  background: rgba(59, 130, 246, 0.2) !important;
  color: rgb(241, 245, 249) !important;
  font-weight: 600 !important;
  border-left: 3px solid #3b82f6 !important;
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1);
  position: relative;
}

.drawer-nav-active::before {
  width: 4px !important;
  background: linear-gradient(90deg, #3b82f6, #06b6d4) !important;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
}

.drawer-nav-active::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  50% {
    opacity: 0.6;
    transform: translateY(-50%) scale(1.2);
  }
}

/* === ANIMATIONS === */
@keyframes underlinePulse {

  0%,
  100% {
    width: 28px;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  }

  50% {
    width: 32px;
    box-shadow: 0 0 16px rgba(59, 130, 246, 0.7);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(0deg);
  }

  100% {
    transform: translateX(100%) rotate(360deg);
  }
}
</style>

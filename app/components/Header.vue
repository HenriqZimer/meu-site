<template>
  <v-app-bar
    flat
    fixed
    class="modern-header"
    :class="{ 'header-scrolled': scrolled }"
    height="70"
  >
    <v-container fluid class="header-container">
      <div class="header-content">
        <!-- Logo/Brand -->
        <div class="brand-section">
          <button
            class="brand-btn"
            @click="scrollToSection('home')"
            aria-label="Ir para o topo"
          >
            <div class="brand-content">
              <div class="brand-logo">
                <img
                  src="/logo.png"
                  alt="Henrique Zimermann Logo"
                  class="brand-logo-img"
                />
              </div>
              <div class="brand-info">
                <div class="brand-name">Henrique</div>
                <div class="brand-role">DevOps Engineer</div>
              </div>
            </div>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" v-if="!isMobile">
          <div class="nav-items">
            <button
              v-for="item in menuItems"
              :key="item.id"
              class="nav-item"
              :class="{ 'nav-item--active': activeSection === item.id }"
              @click="scrollToSection(item.id)"
            >
              {{ item.label }}
            </button>
          </div>

          <!-- CTA Button -->
          <button class="cta-btn" @click="scrollToSection('contact')">
            <span class="cta-text">Fale Comigo</span>
            <v-icon icon="mdi-arrow-right" size="18" class="cta-icon" />
          </button>
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
import { useResponsive } from "~/composables/useResponsive";

// Types
interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

// Composables
const { isMobile } = useResponsive();

// Reactive state
const scrolled = ref(false);
const drawer = ref(false);
const activeSection = ref("home");

// Menu items configuration
const menuItems: MenuItem[] = [
  { id: "about", label: "Sobre", icon: "mdi-account-circle" },
  { id: "portfolio", label: "Projetos", icon: "mdi-briefcase-variant" },
  { id: "skills", label: "Skills", icon: "mdi-brain" },
  { id: "courses", label: "Cursos", icon: "mdi-school" },
  { id: "certifications", label: "Certificações", icon: "mdi-certificate" },
  { id: "contact", label: "Contato", icon: "mdi-message-text" },
];

// Navigation methods
const scrollToSection = (id: string) => {
  if (id === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    activeSection.value = "home";
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    activeSection.value = id;
  }
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const handleDrawerItemClick = (id: string) => {
  scrollToSection(id);
  drawer.value = false;
};

// Scroll detection
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
  updateActiveSection();
};

const updateActiveSection = () => {
  const sections = ["home", ...menuItems.map((item) => item.id)];
  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const sectionId = sections[i];
    if (!sectionId) continue;
    const element = document.getElementById(sectionId);
    if (element && element.offsetTop <= scrollPosition) {
      activeSection.value = sectionId;
      break;
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* === MODERN HEADER === */
.modern-header {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid transparent;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.95) !important;
}

.header-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.brand-logo-img {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  object-fit: contain;
}
/* === BRAND SECTION === */
.brand-section {
  flex-shrink: 0;
}

.brand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.brand-btn:hover {
  background: rgba(59, 130, 246, 0.08);
}

.brand-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

/* .brand-btn:hover .brand-logo {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.5);
} */

.brand-initial {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
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
  color: #f1f5f9;
  margin: 0;
  letter-spacing: -0.02em;
}

.brand-role {
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: #94a3b8;
  margin: 0;
  letter-spacing: -0.01em;
}

/* === DESKTOP NAVIGATION === */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  position: relative;
  padding: 8px 16px;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #cbd5e1;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 24px;
  height: 2px;
  background: #3b82f6;
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.nav-item:hover {
  color: #f1f5f9;
  background: rgba(59, 130, 246, 0.08);
}

.nav-item:hover::after,
.nav-item--active::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-item--active {
  color: #f1f5f9;
  font-weight: 600;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.5);
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.cta-text {
  color: #ffffff;
}

.cta-icon {
  color: #ffffff !important;
  background: transparent !important;
  transition: transform 0.3s ease;
}

.cta-btn:hover .cta-icon {
  transform: translateX(3px);
}

/* === MOBILE MENU === */
.mobile-menu-btn {
  width: 40px !important;
  height: 40px !important;
  color: #cbd5e1 !important;
  border-radius: 10px !important;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #f1f5f9 !important;
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
  color: rgb(241, 245, 249);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.drawer-role {
  font-size: 14px;
  font-weight: 500;
  color: rgb(203, 213, 225);
  line-height: 1.2;
}

.drawer-close {
  width: 40px !important;
  height: 40px !important;
  color: rgb(203, 213, 225) !important;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.drawer-close:hover {
  background: rgba(59, 130, 246, 0.15) !important;
  color: rgb(241, 245, 249) !important;
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
    padding: 0 20px;
  }

  .brand-info {
    display: none;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
  }

  .brand-initial {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 16px;
  }

  .drawer-header {
    padding: 20px;
  }

  .drawer-nav {
    padding: 20px;
  }
}
</style>

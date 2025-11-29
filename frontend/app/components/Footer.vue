<template>
  <footer class="modern-footer pt-12 pb-8">
    <div class="footer-gradient" />
    <v-container class="px-4 px-md-6">
      <!-- Main Content -->
      <v-row class="py-10 py-md-16">
        <!-- Brand Section -->
        <v-col cols="12" md="12" lg="5" class="mb-8 mb-lg-0">
          <div class="d-flex align-center ga-4 mb-6">
            <v-avatar size="48" rounded="lg">
              <v-img :src="IMAGE_URLS.LOGO" alt="Henrique Zimermann Logo" cover />
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold"
                style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
                Henrique Zimermann
              </div>
              <div class="text-caption font-weight-medium" style="color: rgb(148, 163, 184);">
                DevOps & Cloud Engineer
              </div>
            </div>
          </div>
          <p class="text-body-2" style="color: rgb(148, 163, 184); line-height: 1.6; max-width: 320px;">
            Automatizando infraestruturas e otimizando processos de desenvolvimento.
            Especialista em CI/CD, containerização e orquestração na nuvem.
          </p>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="6" sm="4" md="4" lg="2" class="pl-md-4 pl-lg-8">
          <h4 class="text-subtitle-2 font-weight-bold mb-5"
            style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
            Navegação
          </h4>
          <div class="d-flex flex-column ga-3">
            <a v-for="link in quickLinks" :key="link.label" @click="scrollToSection(link.href)"
              class="nav-link text-body-2 text-decoration-none font-weight-medium"
              style="color: rgb(148, 163, 184); cursor: pointer;">
              {{ link.label }}
            </a>
          </div>
        </v-col>

        <v-col cols="6" sm="8" md="8" lg="5" class="pl-md-6 pl-lg-8">
          <v-row>
            <!-- Contact Info -->
            <v-col cols="12" lg="6">
              <h4 class="text-subtitle-2 font-weight-bold mb-5"
                style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
                Contato
              </h4>
              <div class="d-flex flex-column ga-3">
                <a :href="`https://wa.me/${phoneNumber.replace(/\D/g, '')}`"
                  class="contact-item d-flex align-center ga-2 text-body-2 text-decoration-none" target="_blank">
                  <v-icon icon="mdi-phone-outline" size="16" />
                  {{ phoneNumber }}
                </a>
                <div class="contact-item d-flex align-center ga-2 text-body-2">
                  <v-icon icon="mdi-map-marker-outline" size="16" />
                  Santa Catarina, Brasil
                </div>
                <a :href="`mailto:${email}`"
                  class="contact-item d-flex align-center ga-2 text-body-2 text-decoration-none">
                  <v-icon icon="mdi-email-outline" size="16" />
                  {{ email }}
                </a>
              </div>
            </v-col>

            <!-- Social Links -->
            <v-col cols="12" lg="6" class="mt-6 mt-lg-0">
              <h4 class="text-subtitle-2 font-weight-bold mb-5"
                style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
                Conecte-se
              </h4>
              <div class="d-flex flex-wrap ga-3">
                <v-btn v-for="social in socialLinks" :key="social.name" :href="social.href"
                  :aria-label="`Visitar ${social.name}`" icon rounded="circle" class="social-link" width="40"
                  height="40" target="_blank" rel="noopener noreferrer">
                  <v-icon :icon="social.icon" size="20" />
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Bottom Bar -->
      <v-divider class="border-opacity-10 mb-8"></v-divider>
      <div class="d-flex flex-column flex-md-row align-center justify-space-between ga-4">
        <div class="d-flex align-center ga-2 text-body-2" style="color: rgb(148, 163, 184);">
          <span>© {{ currentYear }} Henrique Zimermann</span>
          <span style="color: rgb(100, 116, 139);">•</span>
          <span>Todos os direitos reservados</span>
        </div>
        <div class="d-flex flex-wrap align-center justify-center ga-2 text-body-2" style="color: rgb(148, 163, 184);">
          <span>Desenvolvido com</span>
          <v-icon icon="mdi-heart" size="14" class="heart-icon" />
          <span>usando</span>
          <span class="tech-highlight">Vue.js</span>
          <span>&</span>
          <span class="tech-highlight">Nuxt</span>
        </div>
      </div>
    </v-container>

    <!-- Scroll to Top Button -->
    <v-btn v-if="showScrollTop" @click="scrollToTop" class="scroll-top-btn" icon size="56" elevation="8"
      color="primary">
      <v-icon icon="mdi-arrow-up" size="20" />
    </v-btn>
  </footer>
</template>

<script setup lang="ts">
import { QUICK_LINKS, SCROLL_CONFIG, IMAGE_URLS } from "~/constants";
import { useNavigation } from "~/composables/useNavigation";
import { useSocialLinks } from "~/composables/useSocialLinks";

// Configuration
const config = useRuntimeConfig();
const siteName = config.public.siteName;
const currentYear = new Date().getFullYear();
const showScrollTop = ref(false);

// Composables
const { scrollToSection, scrollToTop, shouldShowScrollTop } = useNavigation();
const { footerSocialLinks, contactInfo } = useSocialLinks();

// Data
const socialLinks = footerSocialLinks;
const quickLinks = QUICK_LINKS;
const email = contactInfo.email;
const phoneNumber = contactInfo.phone;

// Methods
const handleScroll = () => {
  showScrollTop.value = shouldShowScrollTop();
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* === FOOTER === */
.modern-footer {
  position: relative;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
}

.modern-footer::before {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 100%;
  background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08), transparent);
  pointer-events: none;
}

.footer-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
      transparent,
      rgba(59, 130, 246, 0.5),
      rgba(6, 182, 212, 0.5),
      transparent);
  animation: shimmer 3s ease-in-out infinite;
}

/* === BRAND SECTION === */
.modern-footer .v-avatar {
  border: 2px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
}

.modern-footer .v-avatar:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  transform: scale(1.05);
}

/* === HEADINGS === */
.modern-footer h4 {
  position: relative;
  padding-bottom: 8px;
}

.modern-footer h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  border-radius: 2px;
}

/* === NAVIGATION LINKS === */
.nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding-left: 12px;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover {
  color: rgb(96, 165, 250) !important;
  transform: translateX(4px);
}

.nav-link:hover::before {
  width: 6px;
}

/* === CONTACT ITEMS === */
.contact-item {
  color: rgb(203, 213, 225);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding-left: 4px;
}

.contact-item .v-icon {
  transition: all 0.3s ease;
  color: rgba(59, 130, 246, 0.6);
}

.contact-item:hover {
  color: rgb(96, 165, 250) !important;
  transform: translateX(4px);
}

.contact-item:hover .v-icon {
  color: rgb(59, 130, 246);
  transform: scale(1.15);
}

/* === SOCIAL LINKS === */
.social-link {
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: rgb(96, 165, 250) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  min-width: 40px !important;
  min-height: 40px !important;
}

.social-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  background: rgba(59, 130, 246, 0.15) !important;
  color: white !important;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.5);
}

.social-link:hover::before {
  opacity: 1;
}

.social-link .v-icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.social-link:hover .v-icon {
  transform: rotate(5deg) scale(1.1);
}

/* === TECH HIGHLIGHT === */
.tech-highlight {
  color: rgb(96, 165, 250);
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.tech-highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  opacity: 0.5;
}

/* === HEART ICON === */
.heart-icon {
  color: #ef4444;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {

  0%,
  100% {
    transform: scale(1);
  }

  10%,
  30% {
    transform: scale(1.2);
  }

  20%,
  40% {
    transform: scale(1);
  }
}

/* === SCROLL TO TOP BUTTON === */
.scroll-top-btn {
  position: fixed !important;
  bottom: 32px;
  right: 32px;
  z-index: 100;
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow:
    0 8px 24px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 3s ease-in-out infinite;
}

.scroll-top-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 12px 32px rgba(59, 130, 246, 0.6),
    0 0 60px rgba(59, 130, 246, 0.3);
}

.scroll-top-btn:hover::before {
  opacity: 1;
}

.scroll-top-btn:active {
  transform: translateY(-6px) scale(1.02);
}

/* === ANIMATIONS === */
@keyframes shimmer {

  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}

/* === RESPONSIVE === */
@media (max-width: 1280px) {
  .modern-footer .v-col {
    padding-left: 12px !important;
  }
}

@media (max-width: 960px) {
  .modern-footer h4 {
    font-size: 0.875rem;
  }

  .modern-footer .text-body-2 {
    font-size: 0.8125rem;
  }
}

@media (max-width: 600px) {
  .scroll-top-btn {
    bottom: 24px !important;
    right: 24px !important;
    width: 48px !important;
    height: 48px !important;
  }

  .modern-footer h4::after {
    width: 24px;
  }

  .modern-footer .v-col {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .modern-footer .ga-3 {
    gap: 8px !important;
  }
}
</style>

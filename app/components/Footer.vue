<template>
  <footer class="modern-footer">
    <div class="footer-container">
      <!-- Main Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="brand-logo">
            <img 
              src="/logo.png" 
              alt="Henrique Zimermann Logo" 
              class="brand-logo-img"
            />
            <div class="brand-text">
              <div class="brand-name">Henrique Zimermann</div>
              <div class="brand-tagline">DevOps & Cloud Engineer</div>
            </div>
          </div>
          <p class="brand-description">
            Automatizando infraestruturas e otimizando processos de desenvolvimento.
            Especialista em CI/CD, containerização e orquestração na nuvem.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4 class="links-title">Navegação</h4>
          <nav class="links-nav">
            <a
              v-for="link in quickLinks"
              :key="link.label"
              @click="scrollToSection(link.href)"
              class="nav-link"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>

        <!-- Contact Info -->
        <div class="footer-contact">
          <h4 class="contact-title">Contato</h4>
          <div class="contact-info">
            <a :href="`mailto:${email}`" class="contact-item">
              <v-icon icon="mdi-email-outline" size="16" />
              {{ email }}
            </a>
            <a :href="`https://wa.me/${phoneNumber.replace(/\D/g, '')}`" class="contact-item" target="_blank">
              <v-icon icon="mdi-phone-outline" size="16" />
              {{ phoneNumber }}
            </a>
            <div class="contact-item">
              <v-icon icon="mdi-map-marker-outline" size="16" />
              Santa Catarina, Brasil
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="footer-social">
          <h4 class="social-title">Conecte-se</h4>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="`Visitar ${social.name}`"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon :icon="social.icon" class="social-icons" size="20" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="bottom-content">
          <div class="copyright">
            <span>© {{ currentYear }} Henrique Zimermann</span>
            <span class="separator">•</span>
            <span>Todos os direitos reservados</span>
          </div>
          <div class="tech-stack">
            <span>Desenvolvido com</span>
            <v-icon icon="mdi-heart" size="14" class="heart-icon" />
            <span>usando</span>
            <span class="tech-highlight">Vue.js</span>
            <span>&</span>
            <span class="tech-highlight">Nuxt</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <v-btn
      v-if="showScrollTop"
      @click="scrollToTop"
      class="scroll-top-btn"
      :ripple="false"
      fab
      fixed
    >
      <v-icon icon="mdi-arrow-up" size="20" />
    </v-btn>
  </footer>
</template>

<script setup lang="ts">
// Configuration
const config = useRuntimeConfig()
const siteName = config.public.siteName
const email = config.public.email
const githubUrl = config.public.githubUrl
const linkedinUrl = config.public.linkedinUrl
const phoneNumber = config.public.phone

const currentYear = new Date().getFullYear()
const showScrollTop = ref(false)

const socialLinks = [
  { name: 'GitHub', icon: 'mdi-github', href: githubUrl },
  { name: 'LinkedIn', icon: 'mdi-linkedin', href: linkedinUrl },
  { name: 'Email', icon: 'mdi-email-outline', href: `mailto:${email}` }
]

const quickLinks = [
  { label: 'Sobre', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projetos', href: 'portfolio' },
  { label: 'Cursos', href: 'courses' },
  { label: 'Certificações', href: 'certifications' },
  { label: 'Contato', href: 'contact' }
]

// Methods
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
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

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.modern-footer {
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface-variant));
  padding: 60px 0 30px;
  position: relative;
  overflow: hidden;
}

.modern-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding: 80px 0 60px;
}

/* Brand Section */
.footer-brand {
  max-width: 400px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.brand-logo-img {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  letter-spacing: -0.025em;
}

.brand-tagline {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

.brand-description {
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.6;
  margin: 16px 0 0 0;
  max-width: 320px;
}

/* Links Section */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.links-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 4px 0;
  letter-spacing: -0.025em;
}

.links-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-link {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: 500;
}

.nav-link:hover {
  color: rgb(96, 165, 250);
  transform: translateX(4px);
}

/* Contact Section */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(241, 245, 249);
  margin: 0 0 4px 0;
  letter-spacing: -0.025em;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgb(203, 213, 225);
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
}

.contact-item:hover {
  color: rgb(96, 165, 250);
}

/* Social Section */
.footer-social {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.social-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 4px 0;
  letter-spacing: -0.025em;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  color: rgb(96, 165, 250);
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: rgb(59, 130, 246);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.social-icons {
  background: transparent !important;
  background-color: transparent !important;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  padding: 32px 0;
}

.bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgb(148, 163, 184);
  font-weight: 500;
}

.separator {
  color: rgb(100, 116, 139);
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: rgb(148, 163, 184);
  font-weight: 500;
}

.tech-highlight {
  color: rgb(96, 165, 250);
  font-weight: 600;
}

/* Scroll to Top Button */
.scroll-top-btn {
  position: fixed !important;
  bottom: 32px;
  right: 32px;
  width: 56px !important;
  height: 56px !important;
  background: linear-gradient(135deg, #3b82f6, #06b6d4) !important;
  color: white !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
}

.scroll-top-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .footer-content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
  
  .footer-brand {
    grid-column: 1 / -1;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 16px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 60px 0 40px;
  }
  
  .brand-logo {
    flex-direction: row;
    text-align: left;
  }
  
  .brand-logo-img {
    width: 40px;
    height: 40px;
  }
  
  .bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .scroll-top-btn {
    bottom: 24px !important;
    right: 24px !important;
    width: 48px !important;
    height: 48px !important;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 48px 0 32px;
  }
  
  .social-links {
    justify-content: flex-start;
  }
  
  .tech-stack {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

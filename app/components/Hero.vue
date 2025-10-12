<template>
  <section id="home" class="modern-hero">
    <div class="hero-container">
      <div class="hero-content">
        <!-- Text Content -->
        <div class="hero-text">
          <div class="hero-badge">
            <div class="badge-indicator"></div>
            <span>Disponível para projetos</span>
          </div>
          
          <h1 class="hero-title">
            Olá, eu sou o
            <span class="hero-name">Henrique</span>
          </h1>
          
          <h2 class="hero-subtitle">
            DevOps & Cloud Engineer
          </h2>
          
          <p class="hero-description">
            Automatizo infraestruturas e otimizo processos de desenvolvimento.
            Especialista em CI/CD, containerização e orquestração na nuvem.
          </p>

          <div class="hero-actions">
            <v-btn
              variant="flat"
              color="primary"
              size="large"
              class="cta-primary"
              @click="scrollToSection('portfolio')"
              :ripple="false"
            >
              <v-icon icon="mdi-briefcase-variant" start />
              Ver Projetos
            </v-btn>
            
            <v-btn
              variant="outlined"
              color="primary"
              size="large"
              class="cta-secondary"
              @click="scrollToSection('contact')"
              :ripple="false"
            >
              <v-icon icon="mdi-message-text" start />
              Fale Comigo
            </v-btn>
          </div>

          <div class="hero-social">
            <p class="social-label">Conecte-se comigo</p>
            <div class="social-links">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.label"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon :icon="social.icon" size="20" />
              </a>
            </div>
          </div>
        </div>

        <!-- Image Content -->
        <div class="hero-visual">
          <div class="avatar-container">
            <div class="avatar-wrapper">
              <img
                :src="getImageUrl(400, 'webp')"
                :alt="imageAlt"
                class="hero-avatar"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <div class="scroll-text">Role para explorar</div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="hero-background">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Configuration
const config = useRuntimeConfig()
const siteFirstName = config.public.siteFirstName || 'Henrique'
const email = config.public.email
const githubUrl = config.public.githubUrl
const linkedinUrl = config.public.linkedinUrl

const socialLinks = [
  { 
    name: 'github', 
    icon: 'mdi-github', 
    url: githubUrl,
    label: 'Visitar GitHub'
  },
  { 
    name: 'linkedin', 
    icon: 'mdi-linkedin', 
    url: linkedinUrl,
    label: 'Visitar LinkedIn'
  },
  { 
    name: 'email', 
    icon: 'mdi-email-outline', 
    url: `mailto:${email}`,
    label: 'Enviar email'
  }
]

const imageAlt = `Foto profissional de ${siteFirstName}`

// Methods
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

const getImageUrl = (width: number, format: string = 'webp') => {
  return `https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=${width}&f=${format}`
}
</script>

<style scoped>
.modern-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgb(var(--v-theme-background));
}

.hero-container {
  max-width: 1400px;
  width: 100%;
  padding: 120px 24px 60px;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* Text Content */
.hero-text {
  max-width: 540px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 32px;
}

.badge-indicator {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 16px;
  letter-spacing: -0.025em;
}

.hero-name {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-subtitle {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  color: rgb(var(--v-theme-on-background-variant));
  margin-bottom: 24px;
  letter-spacing: -0.025em;
}

.hero-description {
  font-size: 18px;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-bottom: 40px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.cta-primary {
  padding: 12px 32px !important;
  height: 56px !important;
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px !important;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.cta-secondary {
  padding: 12px 32px !important;
  height: 56px !important;
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px !important;
  border-width: 2px !important;
  transition: all 0.3s ease;
}

.cta-secondary:hover {
  transform: translateY(-2px);
  background: rgba(59, 130, 246, 0.05);
}

.hero-social {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.social-label {
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgb(var(--v-theme-surface));
  border: 2px solid rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Visual Content */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  padding: 8px;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

.hero-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #3b82f6, transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

.scroll-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Background Elements */
.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.bg-gradient {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05));
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .hero-text {
    max-width: none;
    order: 2;
  }
  
  .hero-visual {
    order: 1;
  }
  
  .avatar-wrapper {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 100px 16px 40px;
  }
  
  .hero-content {
    gap: 40px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 280px;
  }
  
  .avatar-wrapper {
    width: 300px;
    height: 300px;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-badge {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .avatar-wrapper {
    width: 250px;
    height: 250px;
  }
}
</style>

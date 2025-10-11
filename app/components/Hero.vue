<template>
  <section id="home" aria-label="Seção principal de apresentação">
    <v-container class="fill-height" style="min-height: 100vh; padding-top: 80px;">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <div class="text-center text-md-left">
            <h1 class="text-h2 text-md-h1 font-weight-bold mb-4 hero-title">
              Olá, sou <span class="text-primary hero-name">{{ siteFirstName }}</span>
            </h1>
            <p class="text-h5 text-md-h4 text-grey-darken-1 mb-6 hero-subtitle" role="complementary">
              {{ siteDescription }}
            </p>
            <p class="text-body-1 text-grey-darken-1 mb-8 hero-description">
              {{ heroDescription }}
            </p>

            <nav class="d-flex flex-column flex-sm-row justify-center justify-md-start mb-8 hero-buttons" aria-label="Navegação principal">
              <v-btn
                size="large"
                color="primary"
                class="mb-3 mb-sm-0 me-sm-4 btn-primary"
                @click="scrollToSection('portfolio')"
                aria-label="Visualizar portfólio de projetos"
              >
                Ver Portfólio
              </v-btn>
              <v-btn
                size="large"
                variant="outlined"
                color="primary"
                class="btn-secondary"
                @click="scrollToSection('contact')"
                aria-label="Ir para seção de contato"
              >
                Entre em Contato
              </v-btn>
            </nav>

            <nav class="d-flex gap-4 justify-center justify-md-start flex-wrap hero-social" aria-label="Links para redes sociais">
              <v-btn
                icon
                variant="text"
                :href="githubUrl"
                target="_blank"
                class="social-icon"
                aria-label="Acessar perfil no GitHub (abre em nova aba)"
                rel="noopener"
              >
                <v-icon aria-hidden="true">mdi-github</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                :href="linkedinUrl"
                target="_blank"
                class="social-icon"
                aria-label="Acessar perfil no LinkedIn (abre em nova aba)"
                rel="noopener"
              >
                <v-icon aria-hidden="true">mdi-linkedin</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                :href="`https://wa.me/${phoneNumber.replace(/\D/g, '')}`"
                target="_blank"
                class="social-icon"
                aria-label="Entrar em contato via WhatsApp (abre em nova aba)"
                rel="noopener"
              >
                <v-icon aria-hidden="true">mdi-whatsapp</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                href="https://www.credly.com/users/henrique-zimermann"
                target="_blank"
                class="social-icon"
                aria-label="Visualizar certificações no Credly (abre em nova aba)"
                rel="noopener"
              >
                <v-icon aria-hidden="true">mdi-certificate</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                href="https://notion.so/henrique-zimermann"
                target="_blank"
                class="social-icon"
                aria-label="Acessar página no Notion (abre em nova aba)"
                rel="noopener"
              >
                <v-icon aria-hidden="true">mdi-notebook</v-icon>
              </v-btn>
            </nav>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center align-center hero-image-container">
          <div class="avatar-wrapper">
            <v-avatar size="420" class="elevation-12 hero-avatar">
              <v-img
                src="https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg"
                alt="Foto profissional de Henrique Zimermann, especialista em DevOps"
                cover
                loading="eager"
                sizes="(max-width: 600px) 280px, (max-width: 960px) 320px, 420px"
                srcset="
                  https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=280 280w,
                  https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=320 320w,
                  https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=420 420w,
                  https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=560 560w,
                  https://imagens.henriqzimer.com.br/foto-perfil-profissional.jpg?w=640 640w
                "
              />
            </v-avatar>
            <div class="avatar-ring" aria-hidden="true"/>
            <div class="avatar-glow" aria-hidden="true"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
// Variáveis de ambiente
const siteFirstName = useRuntimeConfig().public.siteFirstName
const siteDescription = useRuntimeConfig().public.siteDescription
const heroDescription = useRuntimeConfig().public.heroDescription
const githubUrl = useRuntimeConfig().public.githubUrl
const linkedinUrl = useRuntimeConfig().public.linkedinUrl
const phoneNumber = useRuntimeConfig().public.phone

const scrollToSection = (id: string) => {
  // Use requestAnimationFrame to avoid forced reflow
  requestAnimationFrame(() => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  })
}
</script>

<style scoped>
/* Animações de entrada */
.hero-title {
  animation: slideInUp 1s ease-out;
}

.hero-name {
  animation: glow 2s ease-in-out infinite alternate;
}

.hero-subtitle {
  animation: slideInUp 1s ease-out 0.2s both;
}

.hero-description {
  animation: slideInUp 1s ease-out 0.4s both;
}

.hero-buttons {
  animation: slideInUp 1s ease-out 0.6s both;
}

.hero-social {
  animation: slideInUp 1s ease-out 0.8s both;
}

.hero-image-container {
  min-height: 500px;
  position: relative;
}

.avatar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-avatar {
  animation: slideInRight 1s ease-out 0.5s both, float 6s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
  position: relative;
}

.hero-avatar:hover {
  transform: scale(1.08) rotate(3deg);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

/* Anel rotativo ao redor do avatar */
.avatar-ring {
  position: absolute;
  width: 450px;
  height: 450px;
  border: 3px solid transparent;
  border-top: 3px solid rgba(59, 130, 246, 0.6);
  border-right: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: rotate 10s linear infinite, slideInRight 1s ease-out 0.7s both;
  z-index: 1;
}

/* Brilho suave atrás do avatar */
.avatar-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite, slideInRight 1s ease-out 0.6s both;
  z-index: 2;
}

/* Animações dos botões */
.btn-primary {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  background-color: rgba(59, 130, 246, 0.1);
}

/* Animações dos ícones sociais */
.social-icon {
  transition: all 0.3s ease;
  position: relative;
}

.social-icon:hover {
  transform: translateY(-3px) scale(1.1);
}

.social-icon:nth-child(1):hover {
  color: #333;
}

.social-icon:nth-child(2):hover {
  color: #0077B5;
}

.social-icon:nth-child(3):hover {
  color: #25D366;
}

.social-icon:nth-child(4):hover {
  color: #FF6B35;
}

.social-icon:nth-child(5):hover {
  color: #000;
}

/* Keyframes para animações */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
  }
}

/* Animação de flutuação suave */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Rotação do anel */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pulsação do brilho */
@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* Efeito de typing para o título */
.hero-title {
  overflow: hidden;
  border-right: 2px solid rgba(59, 130, 246, 0.7);
  white-space: nowrap;
  animation: typing 3s steps(30, end), blink-caret 0.75s step-end 6, fade-caret 0.5s ease-out 4.5s forwards;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: rgba(59, 130, 246, 0.7);
  }
}

@keyframes fade-caret {
  from {
    border-color: rgba(59, 130, 246, 0.7);
  }
  to {
    border-color: transparent;
  }
}

/* Responsividade */
@media (max-width: 960px) {
  .hero-title {
    white-space: normal;
    border-right: none;
    animation: slideInUp 1s ease-out;
  }
  
  .hero-avatar {
    animation: slideInUp 1s ease-out 0.5s both, float 6s ease-in-out infinite;
  }
  
  .avatar-ring {
    width: 370px;
    height: 370px;
    animation: rotate 10s linear infinite, slideInUp 1s ease-out 0.7s both;
  }
  
  .avatar-glow {
    width: 320px;
    height: 320px;
    animation: pulse 4s ease-in-out infinite, slideInUp 1s ease-out 0.6s both;
  }
  
  .hero-image-container {
    min-height: 400px;
    margin-top: 2rem;
  }
}

@media (max-width: 600px) {
  .hero-avatar {
    width: 280px !important;
    height: 280px !important;
  }
  
  .avatar-ring {
    width: 310px;
    height: 310px;
  }
  
  .avatar-glow {
    width: 260px;
    height: 260px;
  }
  
  .hero-image-container {
    min-height: 350px;
  }
}

/* Efeito de parallax sutil no scroll */
@media (prefers-reduced-motion: no-preference) {
  .hero-avatar {
    transform-style: preserve-3d;
  }
}
</style>

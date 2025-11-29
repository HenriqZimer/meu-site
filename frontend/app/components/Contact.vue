<template>
  <Section id="contact" badge="Contato" badge-icon="mdi-email-outline" badge-color="error" title-prefix="Interessado em"
    title-highlight="trabalhar comigo" description="Vamos conversar sobre seu próximo projeto"
    section-class="py-10 py-md-16" container-class="px-4 px-md-6">

    <div class="d-flex justify-center">
      <v-card class="contact-card elevation-3 rounded-xl" max-width="800" data-animate="slide-up" data-delay="200">
        <v-card-text class="pa-8 pa-md-10">
          <!-- Header -->
          <div class="text-center mb-8 pb-6" style="border-bottom: 2px solid rgba(59, 130, 246, 0.1);">
            <h3 class="text-h5 text-md-h4 font-weight-bold mb-3"
              style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
              Entre em Contato
            </h3>
            <p class="text-body-1" style="color: rgb(148, 163, 184);">
              Estou sempre disponível para novos projetos
            </p>
          </div>

          <!-- Contact List -->
          <div class="d-flex flex-column ga-4 mb-8">
            <ContactItem icon="mdi-email" label="Email" :value="email" :href="`mailto:${email}`" :delay="300" />
            <ContactItem icon="mdi-phone" label="Telefone" :value="phone" :href="`tel:${phone}`" :delay="400" />
            <ContactItem icon="mdi-whatsapp" label="WhatsApp" :value="phone" :href="contactInfo.whatsapp" :delay="450"
              external />
            <ContactItem icon="mdi-map-marker" label="Localização" :value="location" :delay="500" />
          </div>

          <!-- Social Section -->
          <div class="pt-7 mt-7" style="border-top: 2px solid rgba(59, 130, 246, 0.1);">
            <h4 class="text-h6 font-weight-bold text-center mb-4"
              style="color: rgb(241, 245, 249); letter-spacing: -0.025em;">
              Redes Sociais
            </h4>
            <div class="d-flex flex-wrap justify-center ga-4">
              <v-btn variant="outlined" color="primary" class="social-btn text-none rounded-lg" :href="githubUrl"
                target="_blank" size="large">
                <v-icon start icon="mdi-github" />
                GitHub
              </v-btn>
              <v-btn variant="outlined" color="primary" class="social-btn text-none rounded-lg" :href="linkedinUrl"
                target="_blank" size="large">
                <v-icon start icon="mdi-linkedin" />
                LinkedIn
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { useSocialLinks } from "~/composables/useSocialLinks";

// Composables
const { contactInfo } = useSocialLinks();

// Variáveis de ambiente
const email = contactInfo.email;
const phone = contactInfo.phone;
const location = contactInfo.location;
const githubUrl = "https://github.com/henriqzimer";
const linkedinUrl = "https://linkedin.com/in/henrique-zimermann";
</script>

<style scoped>
/* === CONTACT CARD === */
.contact-card {
  position: relative;
  background: rgba(30, 41, 59, 0.7) !important;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.3),
      rgba(6, 182, 212, 0.3),
      rgba(168, 85, 247, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.contact-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 24px 48px rgba(59, 130, 246, 0.25),
    0 0 80px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
}

.contact-card:hover::before {
  opacity: 1;
}

.contact-card:hover::after {
  opacity: 1;
  animation: glow 3s ease-in-out infinite;
}

/* === HEADERS === */
.contact-card h3,
.contact-card h4 {
  position: relative;
  z-index: 2;
}

.contact-card h3 {
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-card:hover h3 {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === DIVIDERS === */
.contact-card [style*="border-bottom"],
.contact-card [style*="border-top"] {
  position: relative;
}

.contact-card [style*="border-bottom"]::after,
.contact-card [style*="border-top"]::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent);
  transition: width 0.5s ease;
}

.contact-card [style*="border-bottom"]::after {
  bottom: -2px;
}

.contact-card [style*="border-top"]::after {
  top: -2px;
}

.contact-card:hover [style*="border-bottom"]::after,
.contact-card:hover [style*="border-top"]::after {
  width: 100%;
}

/* === SOCIAL BUTTONS === */
.social-btn {
  font-weight: 600;
  border-width: 2px !important;
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.social-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.6) !important;
}

.social-btn:hover::before {
  opacity: 1;
}

.social-btn:active {
  transform: translateY(-2px) scale(1.02);
}

.social-btn .v-icon {
  transition: transform 0.3s ease;
}

.social-btn:hover .v-icon {
  transform: scale(1.15) rotate(5deg);
}

/* === ANIMATIONS === */
@keyframes glow {

  0%,
  100% {
    opacity: 0;
    transform: rotate(0deg);
  }

  50% {
    opacity: 1;
    transform: rotate(180deg);
  }
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .social-btn {
    flex: 1;
    min-width: 140px;
  }

  .contact-card {
    border-radius: 16px !important;
  }
}
</style>

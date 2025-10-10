<template>
  <section id="certifications" class="py-20">
    <v-container>
      <div class="text-center mb-16">
        <h2 class="text-h2 font-weight-bold mb-6">Certificações</h2>
        <p class="text-h5 text-medium-emphasis animate-fade-up line-height-relaxed" style="animation-delay: 0.1s;">
          Minha jornada de aprendizado contínuo e desenvolvimento profissional
        </p>
        <v-divider class="mx-auto mt-8 animate-scale-width" style="max-width: 200px; animation-delay: 0.2s;"></v-divider>
      </div>

      <v-row class="mb-8">
        <!-- Certificações Obtidas -->
        <v-col cols="12" lg="6" class="animate-fade-right">
          <v-card 
            class="h-100 cert-card animate-scale-up" 
            elevation="4" 
            rounded="xl" 
            style="animation-delay: 0.3s;"
          >
            <v-card-title class="text-h4 text-center bg-success text-white rounded-t-xl pa-6">
              <v-icon left size="x-large" class="me-3">mdi-certificate</v-icon>
              <span class="font-weight-bold">Certificações Obtidas</span>
              <v-chip 
                class="ml-4" 
                color="white" 
                text-color="success" 
                size="small"
                variant="elevated"
              >
                {{ obtainedCertifications.length }}
              </v-chip>
            </v-card-title>
            
            <v-card-text class="pa-8">
              <v-list>
                <v-list-item
                  v-for="(cert, index) in obtainedCertifications"
                  :key="cert.name"
                  :href="cert.link"
                  target="_blank"
                  class="mb-4 rounded-xl cert-item animate-slide-in-left"
                  :style="`animation-delay: ${0.5 + index * 0.1}s;`"
                  hover
                >
                  <template #prepend>
                    <v-avatar v-if="cert.image" size="56" class="me-4 cert-avatar">
                      <v-img :src="cert.image" :alt="cert.name" />
                    </v-avatar>
                    <v-icon v-else :color="cert.color" size="x-large" class="me-4">
                      {{ cert.icon }}
                    </v-icon>
                  </template>
                  
                  <v-list-item-title class="font-weight-bold text-h6 mb-2">
                    {{ cert.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">
                    {{ cert.issuer }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-btn 
                      icon="mdi-open-in-new" 
                      size="small" 
                      variant="outlined" 
                      color="success"
                      class="cert-link-btn"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Certificações Planejadas -->
        <v-col cols="12" lg="6" class="animate-fade-left">
          <v-card 
            class="h-100 cert-card animate-scale-up" 
            elevation="4" 
            rounded="xl" 
            style="animation-delay: 0.4s;"
          >
            <v-card-title class="text-h4 text-center bg-primary text-white rounded-t-xl pa-6">
              <v-icon left size="x-large" class="me-3">mdi-target</v-icon>
              <span class="font-weight-bold">Próximas Metas</span>
              <v-chip 
                class="ml-4" 
                color="white" 
                text-color="primary" 
                size="small"
                variant="elevated"
              >
                {{ plannedCertifications.length }}
              </v-chip>
            </v-card-title>
            
            <v-card-text class="pa-8">
              <v-list>
                <v-list-item
                  v-for="(cert, index) in plannedCertifications"
                  :key="cert.name"
                  :href="cert.link"
                  target="_blank"
                  class="mb-4 rounded-xl cert-item animate-slide-in-right"
                  :style="`animation-delay: ${0.6 + index * 0.05}s;`"
                  hover
                >
                  <template #prepend>
                    <v-avatar v-if="cert.image" size="56" class="me-4 cert-avatar">
                      <v-img :src="cert.image" :alt="cert.name" />
                    </v-avatar>
                    <v-icon v-else :color="cert.color" size="x-large" class="me-4">
                      {{ cert.icon }}
                    </v-icon>
                  </template>
                  
                  <v-list-item-title class="font-weight-bold text-h6 mb-2">
                    {{ cert.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="text-body-1 font-weight-medium">
                    {{ cert.issuer }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-btn 
                      icon="mdi-open-in-new" 
                      size="small" 
                      variant="outlined" 
                      color="primary"
                      class="cert-link-btn"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Estatísticas -->
      <v-row justify="center" class="animate-fade-up" style="animation-delay: 1s;">
        <v-col cols="12" md="8">
          <v-card 
            class="pa-8 text-center stats-overview" 
            elevation="4" 
            rounded="xl"
            variant="tonal"
            color="surface"
          >
            <h3 class="text-h4 font-weight-bold mb-6 text-primary">Progresso de Certificações</h3>
            <v-row>
              <v-col cols="6" md="3">
                <div class="stat-item">
                  <v-icon color="success" size="x-large" class="mb-2">mdi-check-circle</v-icon>
                  <div class="text-h3 font-weight-bold text-success">{{ obtainedCertifications.length }}</div>
                  <div class="text-body-1 text-medium-emphasis">Obtidas</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="stat-item">
                  <v-icon color="primary" size="x-large" class="mb-2">mdi-target</v-icon>
                  <div class="text-h3 font-weight-bold text-primary">{{ plannedCertifications.length }}</div>
                  <div class="text-body-1 text-medium-emphasis">Planejadas</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="stat-item">
                  <v-icon color="info" size="x-large" class="mb-2">mdi-chart-line</v-icon>
                  <div class="text-h3 font-weight-bold text-info">{{ Math.round((obtainedCertifications.length / (obtainedCertifications.length + plannedCertifications.length)) * 100) }}%</div>
                  <div class="text-body-1 text-medium-emphasis">Progresso</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="stat-item">
                  <v-icon color="warning" size="x-large" class="mb-2">mdi-trophy</v-icon>
                  <div class="text-h3 font-weight-bold text-warning">{{ obtainedCertifications.length + plannedCertifications.length }}</div>
                  <div class="text-body-1 text-medium-emphasis">Total</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
// Certificações já obtidas
const obtainedCertifications = [
  {
    name: 'Oracle Cloud Infrastructure - Foundations',
    issuer: 'Oracle',
    icon: 'mdi-oracle',
    color: '#FF9900',
    image: 'https://imagens.henriqzimer.com.br/oci-cloud-infrastructure-.png',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
  },
  {
    name: 'AWS Cloud Practitioner - Foundational',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    image: 'https://imagens.henriqzimer.com.br/aws-cloud-practioner.png',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
  },
  {
    name: 'Google Cloud Engineer - Associate',
    issuer: 'Google Cloud',
    icon: 'mdi-google-cloud',
    color: '#4285F4',
    image: 'https://imagens.henriqzimer.com.br/gcp-cloud-associate.png',
    link: 'https://cloud.google.com/certification/cloud-engineer'
  },
  {
    name: 'GitHub Fundamentals',
    issuer: 'GitHub',
    icon: 'mdi-github',
    color: '#181717',
    image: 'https://imagens.henriqzimer.com.br/github-fundations.png',
    link: 'https://www.github.com/certification/'
  }
]

// Certificações planejadas
const plannedCertifications = [
  {
    name: 'AWS AI Practitioner - Foundational',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    image: 'https://imagens.henriqzimer.com.br/aws-ai-practioner.png',
    link: 'https://aws.amazon.com/certification/certified-ai-practitioner/'
  },
  {
    name: 'AWS Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    image: 'https://imagens.henriqzimer.com.br/aws-solutions-architect-associate.png',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    name: 'AWS Developer - Associate',
    issuer: 'Amazon Web Services',
    icon: 'mdi-aws',
    color: '#FF9900',
    image: 'https://imagens.henriqzimer.com.br/aws-developer-associate.png',
    link: 'https://aws.amazon.com/certification/certified-developer-associate/'
  },
  {
    name: 'Terraform Associate',
    issuer: 'HashiCorp',
    icon: 'mdi-kubernetes',
    color: '#326CE5',
    image: 'https://imagens.henriqzimer.com.br/terraform-associate.png',
    link: 'https://www.cncf.io/certification/cka/'
  },
  {
    name: 'Github Copilot',
    issuer: 'GitHub',
    icon: 'mdi-github',
    color: '#181717',
    image: 'https://imagens.henriqzimer.com.br/github-copilot.png',
    link: 'https://www.github.com/certification/'
  },
  {
    name: 'Azure DevOps Engineer - Associate',
    issuer: 'Microsoft',
    icon: 'mdi-microsoft-azure',
    color: '#0078D4',
    image: 'https://imagens.henriqzimer.com.br/azure-devops.png',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/devops-engineer/'
  },
  {
    name: 'Azure Administrator - Associate',
    issuer: 'Microsoft',
    icon: 'mdi-microsoft-azure',
    color: '#0078D4',
    image: 'https://imagens.henriqzimer.com.br/azure-administrator.png',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/'
  }
]
</script>

<style scoped>
/* Seção Background */
.section-background {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(var(--v-theme-surface), 1) 0%, 
    rgba(var(--v-theme-primary), 0.02) 25%,
    rgba(var(--v-theme-success), 0.02) 75%,
    rgba(var(--v-theme-surface), 1) 100%
  );
}

.section-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(0,0,0,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.4;
  pointer-events: none;
}

/* Animações Principais */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.85) rotateY(15deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px) rotateY(10deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px) rotateY(-10deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

@keyframes scaleWidth {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Classes de Animação */
.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-fade-right {
  animation: fadeRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.animate-fade-left {
  animation: fadeLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  animation-delay: 0.3s;
}

.animate-scale-up {
  animation: scaleUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-scale-width {
  animation: scaleWidth 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: center;
}

/* Componentes Estilizados */

.cert-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.cert-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    rgba(var(--v-theme-primary), 0.1),
    rgba(var(--v-theme-success), 0.1),
    rgba(var(--v-theme-primary), 0.1)
  );
  background-size: 300% 300%;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: gradientShift 3s ease-in-out infinite;
}

.cert-card:hover::before {
  opacity: 0;
}

.cert-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 25px 50px rgba(var(--v-theme-primary), 0.15);
}

.cert-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: transparent !important;
}

.cert-item::before {
  display: none;
}

.cert-item:hover::before {
  display: none;
}

.cert-item:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  transform: translateX(8px) scale(1.01);
  box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.1);
}

.cert-avatar {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cert-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cert-item:hover .cert-avatar {
  transform: scale(1.1) rotate(5deg);
}

.cert-item:hover .cert-avatar::before {
  opacity: 1;
}

.cert-link-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cert-item:hover .cert-link-btn {
  transform: scale(1.2) rotate(15deg);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}

.stats-overview {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.stats-overview:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(var(--v-theme-primary), 0.1);
}

.stat-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
}

.stat-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  transform: translateY(-3px) scale(1.02);
}

.stat-item:hover .v-icon {
  animation: bounce 0.6s ease-in-out;
}

.line-height-relaxed {
  line-height: 1.8;
}

/* Efeitos de Loading */
@keyframes skeleton {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .cert-card:hover,
  .cert-item:hover,
  .stats-overview:hover,
  .stat-item:hover {
    transform: none;
  }
  
  .cert-item:hover .cert-avatar {
    transform: scale(1.05);
  }
}

/* Dark mode adjustments */
.v-theme--dark .section-background::before {
  opacity: 0.2;
}

.v-theme--dark .cert-card {
  background: rgba(var(--v-theme-surface), 0.95);
}

/* Print styles */
@media print {
  .animate-fade-up,
  .animate-fade-right,
  .animate-fade-left,
  .animate-scale-up,
  .animate-slide-in-left,
  .animate-slide-in-right,
  .animate-scale-width {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
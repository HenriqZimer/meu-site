<template>
  <section id="certifications" class="modern-certifications">
    <div class="certifications-container">
      <!-- Header Section -->
      <div class="certifications-header" data-animate="fade-up">
        <span class="section-badge primary-theme" data-animate="fade-in" data-delay="100">
          <v-icon icon="mdi-certificate" start size="16" />
          Certificações
        </span>
        <h2 class="section-title" data-animate="fade-up" data-delay="200">
          Minhas 
          <span class="title-highlight">Certificações</span>
        </h2>
        <p class="section-description" data-animate="fade-up" data-delay="300">
          Desenvolvimento profissional contínuo através de certificações e especializações em tecnologias cloud e DevOps
        </p>
        
        <!-- Statistics Overview -->
        <div class="stats-overview" data-animate="fade-up" data-delay="400">
          <v-row justify="center">
            <v-col 
              v-for="(stat, index) in certificationStats" 
              :key="index"
              cols="6" 
              sm="3"
              class="stat-item"
              :data-animate-delay="index * 100"
            >
              <div class="stat-card">
                <div class="stat-icon-wrapper">
                  <v-icon 
                    :icon="stat.icon" 
                    :color="stat.color"
                    size="32"
                    class="stat-icon"
                  />
                </div>
                <div class="stat-content">
                  <div class="stat-value" :class="`text-${stat.color}`">
                    {{ stat.value }}
                  </div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Progress Bar -->
        <div class="progress-section" data-animate="fade-up" data-delay="500">
          <div class="progress-info">
            <span class="progress-label">Progresso da Jornada</span>
            <span class="progress-percentage">{{ Math.round((obtainedCertifications.length / (obtainedCertifications.length + plannedCertifications.length)) * 100) }}%</span>
          </div>
          <v-progress-linear
            :model-value="(obtainedCertifications.length / (obtainedCertifications.length + plannedCertifications.length)) * 100"
            color="primary"
            bg-color="surface-variant"
            height="8"
            rounded
            class="progress-bar"
          />
        </div>
      </div>

      <!-- Grid responsivo das certificações -->
      <div class="certifications-grid">
        <!-- Certificações Obtidas -->
        <div class="certification-section" data-animate="fade-up" data-delay="600">
          <CertificationCard
            title="Certificações Obtidas"
            icon="mdi-certificate"
            color="success"
            :items="obtainedCertifications"
            :count="obtainedCertifications.length"
            type="obtained"
            :animation-delay="300"
          />
        </div>

        <!-- Certificações Planejadas -->
        <div class="certification-section" data-animate="fade-up" data-delay="700">
          <CertificationCard
            title="Próximas Metas"
            icon="mdi-target"
            color="primary"
            :items="plannedCertifications"
            :count="plannedCertifications.length"
            type="planned"
            :animation-delay="500"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types & Interfaces
interface Certification {
  name: string
  issuer: string
  icon?: string
  color?: string
  image?: string
  link: string
}

interface CertificationStat {
  icon: string
  value: string | number
  label: string
  color: string
}

// Composables
const { isMobile, isTablet, isDesktop, getResponsiveValue } = useResponsive()

// Scroll Animation
const { observeElements } = useScrollAnimation()

onMounted(() => {
  observeElements({
    threshold: 0.1,
    once: true
  })
})

// Responsive layouts
const responsiveClasses = computed(() => ({
  'certification-grid--mobile': isMobile.value,
  'certification-grid--tablet': isTablet.value,
  'certification-grid--desktop': isDesktop.value
}))

const gridLayout = computed(() => ({
  md: getResponsiveValue({ mobile: 12, tablet: 6, desktop: 6 }),
  lg: getResponsiveValue({ mobile: 12, tablet: 6, desktop: 6 })
}))

const statsLayout = computed(() => ({
  md: getResponsiveValue({ mobile: 12, tablet: 10, desktop: 8 }),
  lg: getResponsiveValue({ mobile: 12, tablet: 10, desktop: 8 })
}))

const statsItemLayout = computed(() => ({
  sm: getResponsiveValue({ mobile: 6, tablet: 3, desktop: 3 }),
  md: getResponsiveValue({ mobile: 6, tablet: 3, desktop: 3 })
}))

// Data
const obtainedCertifications: Certification[] = [
  {
    name: 'Oracle Cloud Infrastructure - Foundations',
    issuer: 'Oracle',
    image: 'https://imagens.henriqzimer.com.br/oci-cloud-infrastructure-.png',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=940F36B32BA531E98EE8D9A5C1B99E42EC8B5AFDC558E21B20C31D9FC2E5D9FB',
    color: 'orange'
  },
  // {
  //   name: 'AWS Cloud Practitioner - Foundational',
  //   issuer: 'Amazon Web Services',
  //   image: 'https://imagens.henriqzimer.com.br/aws-cloud-practioner.png',
  //   link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
  //   color: 'orange'
  // },
  // {
  //   name: 'Google Cloud Engineer - Associate',
  //   issuer: 'Google Cloud',
  //   image: 'https://imagens.henriqzimer.com.br/gcp-cloud-associate.png',
  //   link: 'https://cloud.google.com/certification/cloud-engineer',
  //   color: 'blue'
  // },
  // {
  //   name: 'GitHub Fundamentals',
  //   issuer: 'GitHub',
  //   image: 'https://imagens.henriqzimer.com.br/github-fundations.png',
  //   link: 'https://www.github.com/certification/',
  //   color: 'grey-darken-4'
  // }
]

const plannedCertifications: Certification[] = [
  {
    name: 'AWS Cloud Practitioner - Foundational',
    issuer: 'Amazon Web Services',
    image: 'https://imagens.henriqzimer.com.br/aws-cloud-practioner.png',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    color: 'orange'
  },
  {
    name: 'Google Cloud Engineer - Associate',
    issuer: 'Google Cloud',
    image: 'https://imagens.henriqzimer.com.br/gcp-cloud-associate.png',
    link: 'https://cloud.google.com/certification/cloud-engineer',
    color: 'blue'
  },
  {
    name: 'GitHub Fundamentals',
    issuer: 'GitHub',
    image: 'https://imagens.henriqzimer.com.br/github-fundations.png',
    link: 'https://www.github.com/certification/',
    color: 'grey-darken-4'
  },
  {
    name: 'AWS AI Practitioner - Foundational',
    issuer: 'Amazon Web Services',
    image: 'https://imagens.henriqzimer.com.br/aws-ai-practioner.png',
    link: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    color: 'orange'
  },
  {
    name: 'AWS Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    image: 'https://imagens.henriqzimer.com.br/aws-solutions-architect-associate.png',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    color: 'orange'
  },
  {
    name: 'AWS Developer - Associate',
    issuer: 'Amazon Web Services',
    image: 'https://imagens.henriqzimer.com.br/aws-developer-associate.png',
    link: 'https://aws.amazon.com/certification/certified-developer-associate/',
    color: 'orange'
  },
  {
    name: 'Terraform Associate',
    issuer: 'HashiCorp',
    image: 'https://imagens.henriqzimer.com.br/terraform-associate.png',
    link: 'https://www.cncf.io/certification/cka/',
    color: 'purple'
  },
  {
    name: 'GitHub Copilot',
    issuer: 'GitHub',
    image: 'https://imagens.henriqzimer.com.br/github-copilot.png',
    link: 'https://www.github.com/certification/',
    color: 'grey-darken-4'
  },
  {
    name: 'Azure DevOps Engineer - Associate',
    issuer: 'Microsoft',
    image: 'https://imagens.henriqzimer.com.br/azure-devops.png',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/devops-engineer/',
    color: 'blue'
  },
  {
    name: 'Azure Administrator - Associate',
    issuer: 'Microsoft',
    image: 'https://imagens.henriqzimer.com.br/azure-administrator.png',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/',
    color: 'blue'
  }
]

// Computed stats
const certificationStats = computed<CertificationStat[]>(() => [
  {
    icon: 'mdi-check-circle',
    value: obtainedCertifications.length,
    label: 'Obtidas',
    color: 'success'
  },
  {
    icon: 'mdi-target',
    value: plannedCertifications.length,
    label: 'Planejadas',
    color: 'primary'
  },
  {
    icon: 'mdi-chart-line',
    value: `${Math.round((obtainedCertifications.length / (obtainedCertifications.length + plannedCertifications.length)) * 100)}%`,
    label: 'Progresso',
    color: 'info'
  },
  {
    icon: 'mdi-trophy',
    value: obtainedCertifications.length + plannedCertifications.length,
    label: 'Total',
    color: 'warning'
  }
])
</script>

<style>
.modern-certifications {
  padding: 40px;
  background: rgb(var(--v-theme-background));
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.modern-certifications .certifications-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Header Section */
.modern-certifications .certifications-header {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease forwards;
}

.modern-certifications .section-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(59, 130, 246, 0.15) !important;
  color: rgb(96, 165, 250) !important;
  padding: 8px 16px !important;
  border-radius: 24px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: 16px !important;
  border: 1px solid rgba(59, 130, 246, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

.modern-certifications .section-badge .v-icon {
  color: rgb(96, 165, 250) !important;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-certifications .section-badge.primary-theme {
  background: rgba(59, 130, 246, 0.15) !important;
  color: rgb(96, 165, 250) !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
}

.modern-certifications .section-badge.primary-theme .v-icon {
  color: rgb(96, 165, 250) !important;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-certifications .section-description {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

/* Statistics Overview */
.modern-certifications .stats-overview {
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.6s;
}

.modern-certifications .stat-item {
  opacity: 0;
  animation: fadeInScale 0.6s ease forwards;
}

.modern-certifications .stat-item[data-animate-delay="0"] { animation-delay: 0.8s; }
.modern-certifications .stat-item[data-animate-delay="100"] { animation-delay: 0.9s; }
.modern-certifications .stat-item[data-animate-delay="200"] { animation-delay: 1.0s; }
.modern-certifications .stat-item[data-animate-delay="300"] { animation-delay: 1.1s; }

.modern-certifications .stat-card {
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.15);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.modern-certifications .stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgb(59, 130, 246), rgb(96, 165, 250)) !important;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.modern-certifications .stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
  border-color: rgba(96, 165, 250, 0.5);
  background: rgba(var(--v-theme-surface), 0.95);
}

.modern-certifications .stat-card:hover::before {
  transform: scaleX(1);
}

.modern-certifications .stat-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

/* Success color (Obtidas) */
.modern-certifications .stat-item:nth-child(1) .stat-icon-wrapper {
  background: rgba(16, 185, 129, 0.1) !important;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.modern-certifications .stat-item:nth-child(1) .stat-card:hover .stat-icon-wrapper {
  background: rgba(16, 185, 129, 0.2) !important;
  border-color: rgba(16, 185, 129, 0.4);
}

.modern-certifications .stat-item:nth-child(1) .stat-icon {
  color: #10b981 !important;
}

.modern-certifications .stat-item:nth-child(1) .stat-value {
  color: #10b981 !important;
}

/* Primary color (Planejadas) */
.modern-certifications .stat-item:nth-child(2) .stat-icon-wrapper {
  background: rgba(59, 130, 246, 0.1) !important;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.modern-certifications .stat-item:nth-child(2) .stat-card:hover .stat-icon-wrapper {
  background: rgba(59, 130, 246, 0.2) !important;
  border-color: rgba(59, 130, 246, 0.4);
}

.modern-certifications .stat-item:nth-child(2) .stat-icon {
  color: #3b82f6 !important;
}

.modern-certifications .stat-item:nth-child(2) .stat-value {
  color: #3b82f6 !important;
}

/* Info color (Progresso) */
.modern-certifications .stat-item:nth-child(3) .stat-icon-wrapper {
  background: rgba(6, 182, 212, 0.1) !important;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.modern-certifications .stat-item:nth-child(3) .stat-card:hover .stat-icon-wrapper {
  background: rgba(6, 182, 212, 0.2) !important;
  border-color: rgba(6, 182, 212, 0.4);
}

.modern-certifications .stat-item:nth-child(3) .stat-icon {
  color: #06b6d4 !important;
}

.modern-certifications .stat-item:nth-child(3) .stat-value {
  color: #06b6d4 !important;
}

/* Warning color (Total) */
.modern-certifications .stat-item:nth-child(4) .stat-icon-wrapper {
  background: rgba(245, 158, 11, 0.1) !important;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.modern-certifications .stat-item:nth-child(4) .stat-card:hover .stat-icon-wrapper {
  background: rgba(245, 158, 11, 0.2) !important;
  border-color: rgba(245, 158, 11, 0.4);
}

.modern-certifications .stat-item:nth-child(4) .stat-icon {
  color: #f59e0b !important;
}

.modern-certifications .stat-item:nth-child(4) .stat-value {
  color: #f59e0b !important;
}

.modern-certifications .stat-icon {
  transition: all 0.3s ease;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-certifications .stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.modern-certifications .stat-content {
  margin-top: 8px;
}

.modern-certifications .stat-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
  color: rgb(var(--v-theme-on-surface));
}

.modern-certifications .stat-label {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Progress Section */
.modern-certifications .progress-section {
  max-width: 400px;
  margin: 0 auto;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 1.2s;
}

.modern-certifications .progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modern-certifications .progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-certifications .progress-percentage {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(96, 165, 250) !important;
}

.modern-certifications .progress-bar {
  border-radius: 4px;
  overflow: hidden;
}

/* Certifications Grid */
.modern-certifications .certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
  justify-content: center;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.modern-certifications .certification-section {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.modern-certifications .certification-section[data-animate="fade-right"] {
  animation-delay: 0.6s;
}

.modern-certifications .certification-section[data-animate="fade-left"] {
  animation-delay: 0.8s;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .modern-certifications {
    padding: 100px 0 60px;
  }
  
  .certifications-container {
    padding: 0 20px;
  }
  
  .certifications-grid {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .modern-certifications {
    padding: 80px 0 60px;
  }
  
  .certifications-container {
    padding: 0 16px;
  }
  
  .certifications-header {
    margin-bottom: 64px;
  }
  
  .stats-overview {
    margin-bottom: 32px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
  
  .stat-icon-wrapper {
    width: 48px;
    height: 48px;
  }
  
  .progress-section {
    max-width: 300px;
  }
  
  .certifications-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .modern-certifications {
    padding: 60px 0 40px;
  }
  
  .certifications-container {
    padding: 0 16px;
  }
  
  
  .stats-overview {
    margin-bottom: 24px;
  }
  
  .stat-card {
    padding: 12px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .stat-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }
  
  .progress-section {
    max-width: 250px;
  }
  
  .progress-label {
    font-size: 0.75rem;
  }
  
  .progress-percentage {
    font-size: 1.125rem;
  }
}

/* Extra small screens */
@media (max-width: 400px) {
  .certifications-container {
    padding: 0 12px;
  }
  
  .certifications-grid {
    gap: 16px;
  }
  
  .modern-certifications {
    padding: 50px 0 30px;
  }
  
  .progress-section {
    max-width: 200px;
  }
}
</style>
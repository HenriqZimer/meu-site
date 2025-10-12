<template>
  <section id="certifications" class="modern-certifications">
    <div class="certifications-container">
      <!-- Header Section -->
      <div class="certifications-header">
        <span class="section-badge primary-theme">
          <v-icon icon="mdi-certificate" start size="16" />
          Certificações
        </span>
        <h2 class="section-title">
          Minha jornada de
          <span class="title-highlight primary-theme">aprendizado</span>
        </h2>
        <p class="section-description">
          Desenvolvimento profissional contínuo através de certificações e especializações em tecnologias cloud e DevOps
        </p>
        
        <!-- Statistics Overview -->
        <div class="stats-overview">
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
        <div class="progress-section">
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
        <div class="certification-section" data-animate="fade-right">
          <CertificationCard
            title="Certificações Obtidas"
            icon="mdi-certificate"
            color="primary"
            :items="obtainedCertifications"
            :count="obtainedCertifications.length"
            type="obtained"
            :animation-delay="300"
          />
        </div>

        <!-- Certificações Planejadas -->
        <div class="certification-section" data-animate="fade-left">
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
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    color: 'orange'
  },
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
  }
]

const plannedCertifications: Certification[] = [
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
    color: 'primary'
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
  padding: 120px 0 80px;
  background: rgb(var(--v-theme-surface));
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.modern-certifications .certifications-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
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
  background: rgba(59, 130, 246, 0.1) !important;
  color: #3b82f6 !important;
  padding: 8px 16px !important;
  border-radius: 24px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: 16px !important;
  border: 1px solid rgba(59, 130, 246, 0.2) !important;
  backdrop-filter: blur(10px) !important;
}

.modern-certifications .section-badge .v-icon {
  color: #3b82f6 !important;
}

.modern-certifications .section-badge.primary-theme {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #3b82f6 !important;
  border-color: rgba(59, 130, 246, 0.2) !important;
}

.modern-certifications .section-badge.primary-theme .v-icon {
  color: #3b82f6 !important;
}

.modern-certifications .section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.modern-certifications .title-highlight {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
}

.modern-certifications .title-highlight.primary-theme {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
  display: inline-block;
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
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
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
  background: linear-gradient(90deg, #3b82f6, #1d4ed8) !important;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modern-certifications .stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(var(--v-theme-shadow), 0.15);
  border-color: rgba(var(--v-theme-primary), 0.3);
}

.modern-certifications .stat-card:hover::before {
  opacity: 1;
}

.modern-certifications .stat-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(var(--v-theme-primary), 0.1);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.modern-certifications .stat-card:hover .stat-icon-wrapper {
  transform: scale(1.1);
  background: rgba(var(--v-theme-primary), 0.15);
}

.modern-certifications .stat-icon {
  transition: all 0.3s ease;
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
  color: rgb(var(--v-theme-primary)) !important;
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
  
  .certifications-header {
    margin-bottom: 64px;
  }
  
  .section-title {
    font-size: 2.5rem;
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
  
  .section-title {
    font-size: 2rem;
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
</style>
<template>
  <SectionContainer
    id="certifications"
    title="Certificações"
    subtitle="Minha jornada de aprendizado contínuo e desenvolvimento profissional"
    background="surface"
    padding="large"
  >
    <!-- Grid responsivo das certificações -->
    <v-row class="certification-grid" :class="responsiveClasses">
      <!-- Certificações Obtidas -->
      <v-col 
        cols="12" 
        :md="gridLayout.md" 
        :lg="gridLayout.lg"
        class="certification-section"
        data-animate="fade-right"
        data-delay="200"
      >
        <CertificationCard
          title="Certificações Obtidas"
          icon="mdi-certificate"
          color="success"
          :items="obtainedCertifications"
          :count="obtainedCertifications.length"
          type="obtained"
          :animation-delay="300"
        />
      </v-col>

      <!-- Certificações Planejadas -->
      <v-col 
        cols="12" 
        :md="gridLayout.md" 
        :lg="gridLayout.lg"
        class="certification-section"
        data-animate="fade-left"
        data-delay="400"
      >
        <CertificationCard
          title="Próximas Metas"
          icon="mdi-target"
          color="primary"
          :items="plannedCertifications"
          :count="plannedCertifications.length"
          type="planned"
          :animation-delay="500"
        />
      </v-col>
    </v-row>

    <!-- Estatísticas -->
    <template #footer>
      <v-row justify="center" class="mt-8">
        <v-col cols="12" :md="statsLayout.md" :lg="statsLayout.lg">
          <v-card 
            class="stats-overview elevation-8"
            rounded="xl"
            variant="tonal"
            color="surface"
            data-animate="fade-up"
            data-delay="600"
          >
            <v-card-text class="pa-8">
              <div class="text-center mb-6">
                <h3 class="text-h4 font-weight-bold mb-2 text-primary">
                  Progresso de Certificações
                </h3>
                <p class="text-body-1 text-medium-emphasis">
                  Acompanhe minha evolução profissional
                </p>
              </div>
              
              <v-row class="stats-grid">
                <v-col
                  v-for="(stat, index) in certificationStats"
                  :key="stat.label"
                  cols="6"
                  :sm="statsItemLayout.sm"
                  :md="statsItemLayout.md"
                  class="text-center"
                >
                                    <StatCard
                    :value="stat.value"
                    :label="stat.label"
                    :icon="stat.icon"
                    :color="stat.color"
                    stats-style
                    size="medium"
                    :animation-delay="index * 200"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </SectionContainer>
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

<style scoped>
/* Layout Grid System */
.certification-grid {
  gap: 2rem;
}

.certification-section {
  display: flex;
  flex-direction: column;
}

/* Responsive Adjustments */
.certification-grid--mobile {
  gap: 1.5rem;
}

.certification-grid--tablet {
  gap: 1.75rem;
}

.certification-grid--desktop {
  gap: 2rem;
}

/* Stats Overview */
.stats-overview {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface), 1) 0%,
    rgba(var(--v-theme-background), 0.8) 100%
  );
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.stats-overview:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(var(--v-theme-primary), 0.15) !important;
}

.stats-grid {
  gap: 1rem;
}

/* Mobile optimizations */
@media (max-width: 599px) {
  .certification-grid {
    gap: 1rem;
  }
  
  .stats-grid {
    gap: 0.5rem;
  }
}

/* Tablet optimizations */
@media (min-width: 600px) and (max-width: 959px) {
  .certification-grid {
    gap: 1.5rem;
  }
}

/* Desktop optimizations */
@media (min-width: 960px) {
  .certification-grid {
    gap: 2rem;
  }
  
  .stats-overview:hover {
    transform: translateY(-8px);
  }
}

/* Performance optimizations */
.certification-section,
.stats-overview {
  will-change: transform;
  contain: layout style paint;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .stats-overview,
  .certification-section {
    transition: none !important;
  }
  
  .stats-overview:hover {
    transform: none !important;
  }
}
</style>
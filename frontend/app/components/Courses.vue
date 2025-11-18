<template>
  <section id="courses" class="section-modern">
    <div class="section-container">
      <!-- Header Section -->
      <SectionHeader badge="Cursos" icon="mdi-school" title-prefix="Meus" title-highlight="Cursos Concluídos"
        description="Aprendizado contínuo através de cursos e especializações nas melhores plataformas de ensino online"
        theme="primary">
        <!-- Statistics Overview -->
        <!-- Main Content -->
        <div class="about-content">

          <!-- Stats Section -->
          <StatsGrid class="teste" :items="stats" variant="stats" :columns="{ xs: 1, sm: 2, md: 4, lg: 4 }"
            :base-delay="200" :delay-increment="100" custom-class="stats-section" />
        </div>
      </SectionHeader>

      <!-- Expansion Panels por Ano -->
      <div class="courses-timeline" data-animate="fade-up" data-delay="600">
        <v-expansion-panels variant="accordion" class="courses-expansion-panels" color="primary">
          <v-expansion-panel v-for="yearGroup in coursesByYear" :key="yearGroup.year" class="year-panel"
            :class="yearGroup.year === 'Planejados' ? 'year-panel--planned' : 'year-panel--completed'">
            <v-expansion-panel-title class="year-panel-title">
              <template v-slot:default>
                <div class="year-info">
                  <v-icon icon="mdi-calendar" size="24" class="year-icon ma-2" />
                  <span class="year-text">{{ yearGroup.year }}</span>
                </div>
              </template>
              <template v-slot:actions>
                <v-chip color="primary" size="small" variant="flat" class="year-badge">
                  {{ yearGroup.courses.length }} {{ yearGroup.courses.length === 1 ? 'curso' : 'cursos' }}
                </v-chip>
              </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="year-panel-content">
              <div class="courses-list-wrapper">
                <div class="courses-list">
                  <CertificationItem class="ma-4" v-for="(course, index) in yearGroup.courses"
                    :key="`${course.name}-${index}`" :certification="{
                      name: course.name,
                      issuer: course.platform + (course.instructor ? ' • ' + course.instructor : '') + (course.duration ? ' • ' + course.duration : ''),
                      image: course.image,
                      color: course.color,
                      link: course.link
                    }" :index="index" :animation-delay="600 + index * 100" type="planned" />
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MENU_ITEMS, SCROLL_CONFIG } from '~/constants'
import CertificationItem from '~/components/base/CertificationItem.vue'
import type { Stat } from '~/components/base/StatsGrid.vue'

// Types & Interfaces
interface Course {
  name: string
  platform: string
  instructor?: string
  duration?: string
  icon?: string
  color?: string
  image?: string
  link: string
  year?: string
}

interface YearGroup {
  year: string
  courses: Course[]
}

// Store
const coursesStore = useCoursesStore()

// Carregar cursos da API no onMounted
onMounted(async () => {
  await coursesStore.fetchCourses()
  observeElements({
    threshold: 0.1,
    once: true
  })
})

// Computed do store
const allCourses = computed(() => coursesStore.allCourses)
const completedCourses = computed(() => coursesStore.completedCourses)
const totalHours = computed(() => coursesStore.totalHours)
const loading = computed(() => coursesStore.loading)

// Stats dos cursos
const stats = computed<Stat[]>(() => [
  {
    icon: 'mdi-school',
    value: completedCourses.value.length,
    label: 'Cursos Concluídos',
    color: 'primary'
  },
  {
    icon: 'mdi-clock-outline',
    value: `${Math.round(totalHours.value)}h`,
    label: 'Horas de Estudo',
    color: 'success'
  }
])

// Composables
const { isMobile, isTablet, isDesktop, getResponsiveValue } = useResponsive()

// Scroll Animation
const { observeElements } = useScrollAnimation()

// Data - Todos os Cursos (removido - agora vem da API)
/*
const allCourses: Course[] = [
  // 2025
  {
    name: 'Descomplicando Kubernetes',
    platform: 'LINUXtips',
    instructor: 'Jeferson Fernando',
    duration: '30h',
    image: '/linux-tips.png',
    link: 'https://www.credential.net/9e6302ff-381c-40ab-84a2-8134e66d0705#acc.4t9M65TG',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Descomplicando Helm',
    platform: 'LINUXtips',
    instructor: 'Jeferson Fernando',
    duration: '8h',
    image: '/linux-tips.png',
    link: 'https://www.credential.net/e3ce127c-ff2d-481a-809b-c8122a3a019c#acc.7ulCRwUi',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Descomplicando Docker',
    platform: 'LINUXtips',
    instructor: 'Jeferson Fernando',
    duration: '12h',
    image: '/linux-tips.png',
    link: 'https://www.credential.net/c5958e12-4cca-400c-a0a2-10f2334b4666#acc.aInvtZbs/',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Docker Essencials',
    platform: 'LINUXtips',
    instructor: 'Jeferson Fernando',
    duration: '6h',
    image: '/linux-tips.png',
    link: 'https://mycourse.app/chvdwqAVGHUBCqQE7',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Terraform Essencials',
    platform: 'LINUXtips',
    instructor: 'Rafael Gomes',
    duration: '6h',
    image: '/linux-tips.png',
    link: 'https://mycourse.app/Mg0hRASgoL3dL7nUJ',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Kubernetes Essencials',
    platform: 'LINUXtips',
    instructor: 'Jeferson Fernando',
    duration: '6h',
    image: '/linux-tips.png',
    link: 'https://mycourse.app/cbNZ3gsD2CmzKHhOB',
    color: 'blue',
    year: '2025'
  },
  {
    name: "Certificação Amazon AWS Certified Cloud Practitioner CLF-C02",
    platform: "Udemy",
    instructor: "Andre Iacono",
    duration: "16.5h",
    image: '/udemy.png',
    link: "https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/",
    color: "blue",
    year: "2025"
  },
  {
    name: 'Terraform para AWS',
    platform: 'Udemy',
    instructor: 'Mateus Muller',
    duration: '7.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-a8ff0165-c1aa-4f8d-af0a-89651b908caf/',
    color: 'blue',
    year: '2025'
  },
  {
    name: ' Fundamentos de Redes para DevOps',
    platform: 'Udemy',
    instructor: 'Mateus Muller',
    duration: '7h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-81ffb271-0aa4-47b8-b452-699532d2c13a/',
    color: 'blue',
    year: '2025'
  },
  {
    name: 'Docker para Desenvolvedores (com Docker Swarm e Kubernetes)',
    platform: 'Udemy',
    instructor: 'Matheus Battisti, Hora de Codar ',
    duration: '12.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/',
    color: 'blue',
    year: '2025'
  },
  // 2024
  {
    name: "Windows Server 2022 + 2019 + Az-104 + Az-900 + A. Directory",
    platform: "Udemy",
    instructor: "BoraPraNuvem Cursos para CLOUD! Azure, AWS e muito mais!, DICARJ Empresa especializada em cursos de T.I",
    duration: "25 horas",
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-707a98ee-7cb7-4b9f-8057-6fc5b78f75d3/',
    color: 'blue',
    year: "2024"
  },
  {
    name: 'Microsoft Windows Server 2019 [COMPLETO]',
    platform: 'Udemy',
    instructor: 'Denilson Bonatti',
    duration: '12.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-f7d4946d-5b2e-495f-b686-9a6ac091a3fd/',
    color: 'blue',
    year: '2024'
  },
  {
    name: 'Virtualização com VMware',
    platform: 'Udemy',
    instructor: 'Maiki Soares',
    duration: '4.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-f7d4946d-5b2e-495f-b686-9a6ac091a3fd/',
    color: 'blue',
    year: '2024'
  },
  // 2023
  {
    name: 'ProxMox - do Zero ao Profissional + Hyper-V Server 2019',
    platform: 'Udemy',
    instructor: 'DICARJ & BorapraNuvem! Empresa especializada em cursos de T.I',
    duration: '8h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-ab425de7-bf0a-465a-84d1-f3947d3bfeb1/',
    color: 'blue',
    year: '2023'
  },
  {
    name: 'Docker: Ferramenta essencial para Desenvolvedores',
    platform: 'Udemy',
    instructor: 'Leonardo Moura Leitao, Juracy Filho, Cod3r Cursos Online',
    duration: '5.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-a3afaa53-879f-428e-b78e-0a2eabb3ed93/',
    color: 'purple',
    year: '2023'
  },
  {
    name: 'Linux para Desenvolvedores (c/ terminal, Shell, Apache e +)',
    platform: 'Udemy',
    instructor: 'Matheus Battisti, Hora de Codar',
    duration: '7.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-dd044339-c134-4a3a-ad3c-d1ae3e8bb98d/',
    color: 'purple',
    year: '2023'
  },
  {
    name: 'Git e GitHub do básico ao avançado (c/ gist e GitHub Pages)',
    platform: 'Udemy',
    instructor: 'Matheus Battisti, Hora de Codar',
    duration: '8.5h',
    image: '/udemy.png',
    link: 'https://www.udemy.com/certificate/UC-3e4b68f3-3ac9-43b4-a2d1-ff78fd294ed9/',
    color: 'purple',
    year: '2023'
  }
]
*/

// Agrupar cursos por ano (usa getter da store)
const coursesByYear = computed(() => coursesStore.coursesByYear)
</script>

<style>
.v-expansion-panel-text {
  max-height: 500px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

.modern-courses {
  padding: 40px 40px 40px 40px;
  background: rgb(var(--v-theme-background));
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.modern-courses .courses-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Header Section */
.modern-courses .courses-header {
  text-align: center;
  margin-bottom: 80px;
}

.modern-courses .section-title {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.2s;
}

.modern-courses .section-badge {
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

.modern-courses .section-badge .v-icon {
  color: rgb(96, 165, 250) !important;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-courses .section-badge.primary-theme {
  background: rgba(59, 130, 246, 0.15) !important;
  color: rgb(96, 165, 250) !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
}

.modern-courses .section-badge.primary-theme .v-icon {
  color: rgb(96, 165, 250) !important;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-courses .section-description {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

/* Statistics Overview */
.modern-courses .stats-overview {
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.6s;
}

.modern-courses .stat-item {
  opacity: 0;
  animation: fadeInScale 0.6s ease forwards;
}

.modern-courses .stat-item[data-animate-delay="0"] {
  animation-delay: 0.8s;
}

.modern-courses .stat-item[data-animate-delay="100"] {
  animation-delay: 0.9s;
}

.modern-courses .stat-item[data-animate-delay="200"] {
  animation-delay: 1.0s;
}

.modern-courses .stat-item[data-animate-delay="300"] {
  animation-delay: 1.1s;
}

.modern-courses .stat-card {
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

.modern-courses .stat-card::before {
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

.modern-courses .stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
  border-color: rgba(96, 165, 250, 0.5);
  background: rgba(var(--v-theme-surface), 0.95);
}

.modern-courses .stat-card:hover::before {
  transform: scaleX(1);
}

.modern-courses .stat-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

/* Primary color (Total) */
.modern-courses .stat-item:nth-child(1) .stat-icon-wrapper {
  background: rgba(59, 130, 246, 0.1) !important;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.modern-courses .stat-item:nth-child(1) .stat-card:hover .stat-icon-wrapper {
  background: rgba(59, 130, 246, 0.2) !important;
  border-color: rgba(59, 130, 246, 0.4);
}

.modern-courses .stat-item:nth-child(1) .stat-icon {
  color: #3b82f6 !important;
}

.modern-courses .stat-item:nth-child(1) .stat-value {
  color: #3b82f6 !important;
}

/* Success color (Concluídos) */
.modern-courses .stat-item:nth-child(2) .stat-icon-wrapper {
  background: rgba(16, 185, 129, 0.1) !important;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.modern-courses .stat-item:nth-child(2) .stat-card:hover .stat-icon-wrapper {
  background: rgba(16, 185, 129, 0.2) !important;
  border-color: rgba(16, 185, 129, 0.4);
}

.modern-courses .stat-item:nth-child(2) .stat-icon {
  color: #10b981 !important;
}

.modern-courses .stat-item:nth-child(2) .stat-value {
  color: #10b981 !important;
}

/* Info color (Planejados) */
.modern-courses .stat-item:nth-child(3) .stat-icon-wrapper {
  background: rgba(6, 182, 212, 0.1) !important;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.modern-courses .stat-item:nth-child(3) .stat-card:hover .stat-icon-wrapper {
  background: rgba(6, 182, 212, 0.2) !important;
  border-color: rgba(6, 182, 212, 0.4);
}

.modern-courses .stat-item:nth-child(3) .stat-icon {
  color: #06b6d4 !important;
}

.modern-courses .stat-item:nth-child(3) .stat-value {
  color: #06b6d4 !important;
}

/* Warning color (Horas) */
.modern-courses .stat-item:nth-child(4) .stat-icon-wrapper {
  background: rgba(245, 158, 11, 0.1) !important;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.modern-courses .stat-item:nth-child(4) .stat-card:hover .stat-icon-wrapper {
  background: rgba(245, 158, 11, 0.2) !important;
  border-color: rgba(245, 158, 11, 0.4);
}

.modern-courses .stat-item:nth-child(4) .stat-icon {
  color: #f59e0b !important;
}

.modern-courses .stat-item:nth-child(4) .stat-value {
  color: #f59e0b !important;
}

.modern-courses .stat-icon {
  transition: all 0.3s ease;
  background: transparent !important;
  background-color: transparent !important;
}

.modern-courses .stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.modern-courses .stat-content {
  margin-top: 8px;
}

.modern-courses .stat-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
  color: rgb(var(--v-theme-on-surface));
}

.modern-courses .stat-label {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Progress Section */
.modern-courses .progress-section {
  max-width: 400px;
  margin: 0 auto;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 1.2s;
}

.modern-courses .progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modern-courses .progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-courses .progress-percentage {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(96, 165, 250) !important;
}

.modern-courses .progress-bar {
  border-radius: 4px;
  overflow: hidden;
}

/* Courses Timeline */
.modern-courses .courses-timeline {
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.6s;
  display: none;
}

.modern-courses .courses-expansion-panels {
  background: transparent !important;
}

.modern-courses .year-panel {
  background: rgba(var(--v-theme-surface), 0.95) !important;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(59, 130, 246, 0.3) !important;
  border-radius: 16px !important;
  margin-bottom: 20px !important;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Borda azul para todos os painéis */
.modern-courses .year-panel:hover {
  border-color: rgba(59, 130, 246, 0.6) !important;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.modern-courses .year-panel-title {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(96, 165, 250, 0.04)) !important;
  border-bottom: 1px solid rgba(var(--v-theme-outline), 0.08);
  padding: 20px 24px !important;
  min-height: auto !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-courses .year-panel:hover .year-panel-title {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(96, 165, 250, 0.06)) !important;
}

.modern-courses .year-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modern-courses .year-icon {
  color: rgb(96, 165, 250) !important;
  background-color: transparent !important;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-courses .year-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  background: linear-gradient(135deg, rgb(59, 130, 246), rgb(96, 165, 250));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-courses .year-badge {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: 12px;
}

.modern-courses .year-panel:hover .year-badge {
  transform: scale(1.05);
}

.modern-courses .year-panel-content {
  padding: 24px 24px 24px 24px !important;
  background: transparent !important;
}

/* Courses List Wrapper with Scroll - Limited to 4 items */
.modern-courses .courses-list-wrapper {
  max-height: 360px;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgb(59, 130, 246) rgba(var(--v-theme-surface-bright), 0.3);
}

.modern-courses .courses-list-wrapper::-webkit-scrollbar {
  width: 6px;
}

.modern-courses .courses-list-wrapper::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-surface-bright), 0.3);
  border-radius: 3px;
}

.modern-courses .courses-list-wrapper::-webkit-scrollbar-thumb {
  background: rgb(59, 130, 246);
  border-radius: 3px;
}

.modern-courses .courses-list-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgb(37, 99, 235);
}

/* Smooth expansion animation */
.modern-courses .v-expansion-panel-text__wrapper {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.modern-courses .v-expansion-panel__shadow {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Courses List inside Panel */
.modern-courses .courses-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeInContent 0.6s ease forwards;
  padding: 8px 0;
}

.v-expansion-panel-text__wrapper {
  padding: 0px !important;
}

.courses-list {
  padding-bottom: 16px !important;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animations */
/* fadeInUp and fadeInScale moved to /assets/css/components.css */

/* Responsive */
@media (max-width: 1024px) {
  .modern-courses {
    padding: 100px 0 60px;
  }

  .courses-container {
    padding: 0 20px;
  }

  .courses-timeline {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .modern-courses {
    padding: 80px 0 60px;
  }

  .courses-container {
    padding: 0 16px;
  }

  .courses-header {
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

  .courses-timeline {
    padding: 0 8px;
  }

  .year-panel-title {
    padding: 16px !important;
  }

  .year-text {
    font-size: 1.1rem;
  }

  .year-panel-content {
    padding: 16px !important;
  }

  .courses-list {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .modern-courses {
    padding: 60px 0 40px;
  }

  .courses-container {
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
  .courses-container {
    padding: 0 12px;
  }

  .modern-courses {
    padding: 50px 0 30px;
  }

  .progress-section {
    max-width: 200px;
  }

  .year-panel {
    margin-bottom: 16px !important;
  }
}
</style>

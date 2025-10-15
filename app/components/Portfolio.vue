<template>
  <section id="portfolio" class="modern-portfolio">
    <div class="portfolio-container">
      <!-- Header Section -->
      <div class="portfolio-header">
        <span class="section-badge">
          <v-icon icon="mdi-briefcase" start size="16" />
          Portfólio
        </span>
        <h2 class="section-title">
          Meus
          <span class="title-highlight">projetos</span>
        </h2>
        <p class="section-description">
          Alguns dos meus trabalhos recentes e soluções desenvolvidas
        </p>
      </div>

      <!-- Filtros -->
      <div class="portfolio-filters">
        <div class="filter-chips">
          <v-chip
            v-for="(filter, index) in filters"
            :key="filter.value"
            :class="{ 'filter-chip--active': selectedFilter === filter.value }"
            class="filter-chip"
            :color="selectedFilter === filter.value ? 'primary' : 'default'"
            :variant="selectedFilter === filter.value ? 'elevated' : 'outlined'"
            size="large"
            @click="setFilter(filter.value)"
          >
            <v-icon start size="18">{{ filter.icon }}</v-icon>
            {{ filter.label }}
            <v-badge 
              v-if="filter.count > 0" 
              :content="filter.count" 
              :color="selectedFilter === filter.value ? 'white' : 'primary'"
              inline
              class="ml-2"
            />
          </v-chip>
        </div>
      </div>

      <!-- Carrossel de Projetos -->
      <div class="portfolio-content">
        <div v-if="filteredProjects.length > 0" class="carousel-container">
          <!-- Botão Anterior -->
          <button 
            class="carousel-nav carousel-nav--prev"
            :disabled="currentPage === 0"
            @click="previousPage"
            aria-label="Projetos anteriores"
          >
            <v-icon icon="mdi-chevron-left" size="32" />
          </button>

          <!-- Carrossel -->
          <div class="carousel-wrapper">
            <div 
              class="carousel-track"
              :style="{ transform: `translateX(-${currentPage * 100}%)` }"
            >
              <div
                v-for="(page, pageIndex) in paginatedProjects"
                :key="pageIndex"
                class="carousel-page"
              >
                <div class="carousel-grid">
                  <div
                    v-for="(project, index) in page"
                    :key="project.id"
                    class="carousel-item"
                  >
                    <ProjectCard
                      :title="project.title"
                      :description="project.description"
                      :image="project.image"
                      :technologies="project.technologies"
                      :demo-url="project.demoUrl"
                      :github-url="project.githubUrl"
                      :featured="project.featured"
                      :status="project.status"
                      size="medium"
                      :lazy="pageIndex > 0"
                      class="project-card"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botão Próximo -->
          <button 
            class="carousel-nav carousel-nav--next"
            :disabled="currentPage === totalPages - 1"
            @click="nextPage"
            aria-label="Próximos projetos"
          >
            <v-icon icon="mdi-chevron-right" size="32" />
          </button>
        </div>

        <!-- Indicadores de Página -->
        <div v-if="totalPages > 1" class="carousel-indicators">
          <button
            v-for="(page, index) in totalPages"
            :key="index"
            class="indicator"
            :class="{ 'indicator--active': currentPage === index }"
            @click="goToPage(index)"
            :aria-label="`Ir para página ${index + 1}`"
          >
          </button>
          <span class="page-counter">{{ currentPage + 1 }} / {{ totalPages }}</span>
        </div>
      
        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="empty-state">
          <v-icon size="64" color="grey-lighten-1" class="empty-icon">mdi-folder-open-outline</v-icon>
          <h3 class="empty-title">Nenhum projeto encontrado</h3>
          <p class="empty-description">Tente selecionar uma categoria diferente</p>
        </div>
      </div>

      <!-- Technologies Section -->
      <!-- <div class="technologies-section">
        <div class="technologies-header">
          <div class="tech-badge">
            <v-icon icon="mdi-cog" start size="14" />
            Stack Tecnológico
          </div>
          <h3 class="technologies-title">
            Outras <span class="tech-highlight">tecnologias</span> que utilizo
          </h3>
          <p class="technologies-subtitle">
            Ferramentas e frameworks que complementam meu arsenal de desenvolvimento
          </p>
        </div>
        
        <div class="technologies-grid">
          <div 
            v-for="(tech, index) in otherTechnologies" 
            :key="tech.name"
            class="tech-card"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="tech-card-inner">
              <div class="tech-icon-wrapper">
                <v-icon 
                  :icon="tech.icon" 
                  :color="tech.color"
                  size="32"
                  class="tech-icon"
                />
              </div>
              <div class="tech-content">
                <h4 class="tech-name">{{ tech.name }}</h4>
                <p class="tech-description">{{ tech.description }}</p>
                <div class="tech-level">
                  <span class="tech-level-label">Nível:</span>
                  <div class="tech-level-bar">
                    <div 
                      class="tech-level-fill" 
                      :style="{ 
                        width: `${tech.level}%`,
                        background: tech.color 
                      }"
                    ></div>
                  </div>
                  <span class="tech-level-value">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Call to Action -->
      <!-- <div class="portfolio-cta">
        <div class="cta-card">
          <div class="cta-content">
            <h3 class="cta-title">
              <v-icon color="white" size="32" class="cta-icon">mdi-rocket-launch</v-icon>
              Interessado em trabalhar comigo?
            </h3>
            <p class="cta-description">
              Tenho experiência em criar soluções inovadoras e estou sempre aberto a novos desafios.
            </p>
            <div class="cta-actions">
              <v-btn
                color="primary"
                size="large"
                variant="elevated"
                class="cta-button"
                @click="scrollToContact"
              >
                <v-icon start>mdi-email</v-icon>
                Email
              </v-btn>
              <v-btn
                color="secondary"
                size="large"
                variant="outlined"
                class="cta-button"
                href="https://github.com/HenriqZimer"
                target="_blank"
              >
                <v-icon start>mdi-github</v-icon>
                Ver no GitHub
              </v-btn>
              <v-btn
                color="info"
                size="large"
                variant="tonal"
                class="cta-button"
                href="https://linkedin.com/in/henriquezimer"
                target="_blank"
              >
                <v-icon start>mdi-linkedin</v-icon>
                LinkedIn
              </v-btn>
            </div>
          </div>
        </div> 
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Types
interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  demoUrl: string
  githubUrl: string
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'planning'
}

interface Filter {
  value: string
  label: string
  icon: string
  count: number
}

// Reactive state
const selectedFilter = ref('all')

// Projects data
const projects: Project[] = [
  {
    id: 1,
    title: 'Docker Swarm com NFS e Cloudflare',
    description: 'Repositório com configuração de um cluster Docker Swarm para deploy de aplicações web escaláveis com integração NFS e CDN Cloudflare.',
    image: 'https://via.placeholder.com/400x220/1976d2/ffffff?text=Docker+Swarm',
    category: 'containerization',
    technologies: ['Docker', 'Docker Swarm', 'Cloudflare', 'NFS', 'DevOps'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/docker-swarm',
    featured: true,
    status: 'completed'
  },
  {
    id: 2,
    title: 'EKS com Terraform',
    description: 'Implementação completa de um cluster EKS na AWS utilizando Terraform para infraestrutura como código, incluindo configurações de rede e segurança.',
    image: 'https://via.placeholder.com/400x220/ff9800/ffffff?text=EKS+Terraform',
    category: 'infrastructure',
    technologies: ['EKS', 'Terraform', 'AWS', 'Kubernetes', 'IaC'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/comunidadedevops-terraform',
    featured: true,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Assinatura de Email Automática para Outlook',
    description: 'Script PowerShell automatizado para geração e deploy de assinaturas de email corporativas no Microsoft Outlook, integrado com Active Directory.',
    image: 'https://via.placeholder.com/400x220/4caf50/ffffff?text=Outlook+Script',
    category: 'automation',
    technologies: ['PowerShell', 'HTML', 'Active Directory', 'Exchange'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/AutomatedOutlookSignature',
    featured: false,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Portfolio Pessoal Moderno',
    description: 'Site pessoal desenvolvido com Vue 3, Nuxt 3 e Vuetify, focado em performance, acessibilidade e design responsivo.',
    image: 'https://via.placeholder.com/400x220/9c27b0/ffffff?text=Portfolio+Vue',
    category: 'frontend',
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Vuetify', 'CSS'],
    demoUrl: 'https://henriquezimer.dev',
    githubUrl: 'https://github.com/HenriqZimer/meu-site',
    featured: true,
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Portfolio Pessoal Moderno',
    description: 'Site pessoal desenvolvido com Vue 3, Nuxt 3 e Vuetify, focado em performance, acessibilidade e design responsivo.',
    image: 'https://via.placeholder.com/400x220/9c27b0/ffffff?text=Portfolio+Vue',
    category: 'frontend',
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Vuetify', 'CSS'],
    demoUrl: 'https://henriquezimer.dev',
    githubUrl: 'https://github.com/HenriqZimer/meu-site',
    featured: true,
    status: 'in-progress'
  },
  {
    id: 6,
    title: 'Portfolio Pessoal Moderno',
    description: 'Site pessoal desenvolvido com Vue 3, Nuxt 3 e Vuetify, focado em performance, acessibilidade e design responsivo.',
    image: 'https://via.placeholder.com/400x220/9c27b0/ffffff?text=Portfolio+Vue',
    category: 'frontend',
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Vuetify', 'CSS'],
    demoUrl: 'https://henriquezimer.dev',
    githubUrl: 'https://github.com/HenriqZimer/meu-site',
    featured: true,
    status: 'in-progress'
  }
]

// Other Technologies Data
const otherTechnologies = [
  {
    name: 'Docker',
    description: 'Containerização e deployment',
    icon: 'mdi-docker',
    color: '#0db7ed',
    level: 85
  },
  {
    name: 'PostgreSQL',
    description: 'Banco de dados relacional',
    icon: 'mdi-database',
    color: '#336791',
    level: 80
  },
  {
    name: 'MongoDB',
    description: 'Banco de dados NoSQL',
    icon: 'mdi-leaf',
    color: '#47A248',
    level: 75
  },
  {
    name: 'Git',
    description: 'Controle de versão',
    icon: 'mdi-git',
    color: '#F05032',
    level: 90
  },
  {
    name: 'AWS',
    description: 'Serviços de nuvem',
    icon: 'mdi-aws',
    color: '#FF9900',
    level: 70
  },
  {
    name: 'Figma',
    description: 'Design e prototipação',
    icon: 'mdi-figma',
    color: '#F24E1E',
    level: 85
  }
]

// Computed filters with counts
const filters = computed<Filter[]>(() => [
  {
    value: 'all',
    label: 'Todos',
    icon: 'mdi-view-grid',
    count: projects.length
  },
  {
    value: 'containerization',
    label: 'Containerização',
    icon: 'mdi-docker',
    count: projects.filter(p => p.category === 'containerization').length
  },
  {
    value: 'infrastructure',
    label: 'Infraestrutura',
    icon: 'mdi-server',
    count: projects.filter(p => p.category === 'infrastructure').length
  },
  {
    value: 'automation',
    label: 'Automação',
    icon: 'mdi-cog',
    count: projects.filter(p => p.category === 'automation').length
  },
  {
    value: 'frontend',
    label: 'Frontend',
    icon: 'mdi-monitor',
    count: projects.filter(p => p.category === 'frontend').length
  }
])

// Computed filtered projects
const filteredProjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return projects.sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }
  return projects
    .filter(project => project.category === selectedFilter.value)
    .sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
})

// Carousel state
const currentPage = ref(0)
const itemsPerPage = ref(3)

// Update items per page based on window width
if (typeof window !== 'undefined') {
  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      itemsPerPage.value = 1
    } else if (window.innerWidth <= 1024) {
      itemsPerPage.value = 2
    } else {
      itemsPerPage.value = 3
    }
  }
  
  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)
}

// Computed carousel
const paginatedProjects = computed(() => {
  const projects = filteredProjects.value
  const pages = []
  
  for (let i = 0; i < projects.length; i += itemsPerPage.value) {
    pages.push(projects.slice(i, i + itemsPerPage.value))
  }
  
  return pages
})

const totalPages = computed(() => paginatedProjects.value.length)

// Carousel methods
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Reset page when filter changes
watch(selectedFilter, () => {
  currentPage.value = 0
})

// Keyboard navigation
if (typeof window !== 'undefined') {
  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previousPage()
    } else if (event.key === 'ArrowRight') {
      nextPage()
    }
  }
  
  window.addEventListener('keydown', handleKeyboard)
}

// Methods
const setFilter = (value: string) => {
  selectedFilter.value = value
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.modern-portfolio {
  padding: 40px 40px 0px 40px;
  background: rgb(var(--v-theme-background));
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Header Section */
/* Header usa classes globais: .section-badge, .section-title, .title-highlight, .section-description */
.portfolio-header {
  text-align: center;
  margin-bottom: 32px;
}

/* Filtros */
.portfolio-filters {
  margin-bottom: 48px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.filter-chip {
  transition: all 0.3s ease;
  border-radius: 12px !important;
  border: 2px solid white !important;
}

.filter-chip .v-icon {
  background: transparent !important;
  background-color: transparent !important;
}

.filter-chip:hover {
  transform: translateY(-2px);
}

.filter-chip--active {
  transform: scale(1.05);
  border-color: rgb(241, 245, 249) !important;
}

/* Badge customization for active filter */
.filter-chip--active .v-badge__badge {
  background-color: rgb(168, 85, 247) !important;
  color: white !important;
}

/* Portfolio Content */
.portfolio-content {
  position: relative;
}

/* Carousel Container */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
  padding: 0;
}

/* Carousel Navigation */
.carousel-nav {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
  color: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-nav .v-icon {
  background: transparent !important;
  background-color: transparent !important;
}

.carousel-nav:hover:not(:disabled) {
  background: rgb(var(--v-theme-primary));
  color: white;
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Carousel Wrapper */
.carousel-wrapper {
  flex: 1;
  overflow-x: hidden;
  overflow-y: visible;
  position: relative;
  padding: 30px 0;
  margin: -30px 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  width: 100%;
}

.carousel-page {
  flex: 0 0 100%;
  min-width: 0;
  padding: 0;
}

.carousel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0;
}

/* Carousel Indicators */
.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(var(--v-theme-outline), 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background: rgba(59, 130, 246, 0.5);
  transform: scale(1.2);
}

.indicator--active {
  width: 24px;
  border-radius: 4px;
  background: rgb(var(--v-theme-primary));
}

.page-counter {
  margin-left: 8px;
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.empty-icon {
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: rgb(var(--v-theme-on-surface));
}

.empty-description {
  font-size: 1rem;
  opacity: 0.8;
}

/* Technologies Section */
.technologies-section {
  margin: 80px 0;
  animation: fadeInUp 0.8s ease forwards;
}

.technologies-header {
  text-align: center;
  margin-bottom: 48px;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgb(96, 165, 250);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  animation: fadeInUp 0.6s ease forwards;
}

.technologies-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgb(241, 245, 249);
  margin: 16px 0;
  line-height: 1.2;
  animation: fadeInUp 0.8s ease forwards;
}

.tech-highlight {
  background: linear-gradient(135deg, rgb(96, 165, 250), rgb(59, 130, 246));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.technologies-subtitle {
  font-size: 1.125rem;
  color: rgb(203, 213, 225);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: fadeInUp 1s ease forwards;
}

.technologies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.tech-card {
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

.tech-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
}

.tech-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tech-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.tech-card:hover .tech-icon-wrapper {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.15);
}

.tech-icon {
  transition: all 0.3s ease;
}

.tech-content {
  flex: 1;
}

.tech-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 8px;
}

.tech-description {
  color: rgba(var(--v-theme-on-background), 0.7);
  line-height: 1.5;
  margin-bottom: 16px;
}

.tech-level {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.tech-level-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-background), 0.8);
  min-width: 40px;
}

.tech-level-bar {
  flex: 1;
  height: 6px;
  background: rgba(var(--v-theme-outline), 0.2);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.tech-level-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease 0.5s;
  position: relative;
}

.tech-level-fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  animation: shimmer 2s infinite;
}

.tech-level-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-background), 0.9);
  min-width: 35px;
  text-align: right;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Call to Action */
.portfolio-cta {
  margin-top: 80px;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

.cta-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.05) 0%,
    transparent 50%,
    rgba(var(--v-theme-secondary), 0.05) 100%
  );
  pointer-events: none;
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(var(--v-theme-primary), 0.2);
}

.cta-content {
  text-align: center;
  padding: 48px 32px;
  position: relative;
  z-index: 2;
}

.cta-icon {
  animation: pulse-gentle 3s ease-in-out infinite;
  color: white !important;
}

@keyframes pulse-gentle {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
}

.cta-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-icon {
  animation: pulse-gentle 3s ease-in-out infinite;
  color: white !important;
}

.cta-description {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.cta-button {
  border-radius: 12px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
  padding: 12px 24px !important;
  flex: 1;
  min-width: 160px;
  max-width: 200px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(var(--v-theme-primary), 0.3);
}

/* Animations definidas em assets/css/components.css */

/* Responsive */
@media (max-width: 1024px) {
  .modern-portfolio {
    padding: 0;
  }
  
  .portfolio-container {
    padding: 0 20px;
  }
  
  .portfolio-header {
    margin-bottom: 24px;
  }
  
  .portfolio-filters {
    margin-bottom: 40px;
  }
  
  .carousel-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .carousel-nav {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 768px) {
  .modern-portfolio {
    padding: 0;
  }
  
  .portfolio-header {
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .filter-chips {
    gap: 8px;
    justify-content: center;
  }
  
  .portfolio-filters {
    margin-bottom: 32px;
  }
  
  .carousel-container {
    gap: 8px;
  }
  
  .carousel-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .carousel-nav {
    width: 36px;
    height: 36px;
  }
  
  .cta-content {
    padding: 32px 20px;
  }
  
  .cta-title {
    font-size: 1.8rem !important;
    flex-direction: column;
    gap: 8px;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .modern-portfolio {
    padding: 0;
  }
  
  .portfolio-container {
    padding: 0 16px;
  }
  
  .portfolio-header {
    margin-bottom: 16px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .filter-chips {
    justify-content: center;
    gap: 6px;
  }
  
  .portfolio-filters {
    margin-bottom: 24px;
  }
  
  .carousel-container {
    gap: 4px;
  }
  
  .carousel-nav {
    width: 32px;
    height: 32px;
  }
  
  .cta-content {
    padding: 24px 16px;
  }
  
  .cta-title {
    font-size: 1.6rem !important;
    flex-direction: column;
    gap: 8px;
  }
}

/* Portfolio animations */
.portfolio-item {
  opacity: 0;
  animation-fill-mode: forwards;
}

/* Animation fadeInUp definida em assets/css/components.css */

/* Filter transition effect */
.portfolio-grid {
  transition: all 0.3s ease;
  min-height: 400px;
}

.portfolio-content {
  position: relative;
}
</style>
<template>
  <SectionContainer
    id="portfolio"
    title="Portfólio"
    subtitle="Alguns dos meus trabalhos recentes"
    padding="large"
  >
    <!-- Filtros -->
    <div class="portfolio-filters">
      <div class="filters-header">
        <h3 class="filters-title">Filtrar por categoria</h3>
        <p class="filters-subtitle">Explore diferentes tipos de projetos</p>
      </div>
      
      <div class="filter-chips">
        <v-chip
          v-for="(filter, index) in filters"
          :key="filter.value"
          :class="{ 'filter-chip--active': selectedFilter === filter.value }"
          class="filter-chip"
          :color="selectedFilter === filter.value ? 'primary' : 'default'"
          :variant="selectedFilter === filter.value ? 'elevated' : 'outlined'"
          size="large"
          :style="{ animationDelay: `${300 + index * 100}ms` }"
          @click="setFilter(filter.value)"
        >
          <v-icon start size="18">{{ filter.icon }}</v-icon>
          {{ filter.label }}
          <v-badge 
            v-if="filter.count > 0" 
            :content="filter.count" 
            color="secondary" 
            inline
            class="ml-2"
          />
        </v-chip>
      </div>
    </div>

    <!-- Grid de Projetos -->
    <div class="portfolio-content">
      <transition-group name="portfolio-list" tag="div" class="portfolio-grid">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="portfolio-item"
          :style="{ animationDelay: `${600 + index * 150}ms` }"
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
            :lazy="index > 2"
            class="project-card"
          />
        </div>
      </transition-group>
      
      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <v-icon size="64" color="grey-lighten-1" class="empty-icon">mdi-folder-open-outline</v-icon>
        <h3 class="empty-title">Nenhum projeto encontrado</h3>
        <p class="empty-description">Tente selecionar uma categoria diferente</p>
      </div>
    </div>

    <!-- Call to Action -->
    <template #footer>
      <div class="portfolio-cta">
        <v-card class="cta-card" elevation="0" rounded="xl">
          <div class="cta-content">
            <v-icon color="primary" size="48" class="cta-icon">mdi-rocket-launch</v-icon>
            <h3 class="cta-title">Interessado em trabalhar comigo?</h3>
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
                Entre em Contato
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
            </div>
          </div>
        </v-card>
      </div>
    </template>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
})

// Methods
const setFilter = (filter: string) => {
  selectedFilter.value = filter
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
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
</script>

<style scoped>
/* === PORTFOLIO FILTERS === */
.portfolio-filters {
  margin-bottom: var(--spacing-4xl);
  animation: slideUp var(--transition-slower) ease-out 200ms both;
}

.filters-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.filters-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-sans);
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-sm);
}

.filters-subtitle {
  font-size: var(--text-lg);
  font-family: var(--font-family-sans);
  color: var(--color-gray-600);
  margin: 0;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
}

.filter-chip {
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
  border-radius: var(--border-radius-lg);
  animation: bounceIn var(--transition-slower) ease-out both;
  cursor: pointer;
}

.filter-chip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.filter-chip--active {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.05);
  box-shadow: var(--shadow-colored);
}

/* === PORTFOLIO CONTENT === */
.portfolio-content {
  min-height: 500px;
  position: relative;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  width: 100%;
}

.portfolio-item {
  animation: slideInScale var(--transition-slower) ease-out both;
}

.project-card {
  height: 100%;
  transition: var(--transition-base);
}

.project-card:hover {
  transform: translateY(-4px);
}

/* === TRANSITION ANIMATIONS === */
.portfolio-list-enter-active,
.portfolio-list-leave-active {
  transition: all var(--transition-base);
}

.portfolio-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.portfolio-list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.portfolio-list-move {
  transition: transform var(--transition-base);
}

/* === EMPTY STATE === */
.empty-state {
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-xl);
  animation: slideUp var(--transition-slower) ease-out;
}

.empty-icon {
  margin-bottom: var(--spacing-lg);
  opacity: 0.6;
}

.empty-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-sans);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
}

.empty-description {
  font-size: var(--text-lg);
  font-family: var(--font-family-sans);
  color: var(--color-gray-500);
  margin: 0;
}

/* === CALL TO ACTION === */
.portfolio-cta {
  margin-top: var(--spacing-5xl);
  animation: slideUp var(--transition-slower) ease-out 800ms both;
}

.cta-card {
  background: linear-gradient(135deg, var(--color-primary-alpha-10), var(--color-secondary-alpha-10));
  border: 1px solid var(--color-primary-alpha-20);
  padding: var(--spacing-4xl);
  transition: var(--transition-base);
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-alpha-30);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-icon {
  margin-bottom: var(--spacing-lg);
  animation: float 3s ease-in-out infinite;
}

.cta-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-sans);
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-lg);
}

.cta-description {
  font-size: var(--text-lg);
  font-family: var(--font-family-sans);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-2xl);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-lg);
}

.cta-button {
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.cta-button:hover {
  transform: translateY(-2px);
}

/* === ANIMATIONS === */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInScale {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-5px);
  }
  70% {
    opacity: 1;
    transform: scale(0.95) translateY(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .filter-chips {
    gap: var(--spacing-sm);
  }
  
  .filter-chip:hover {
    transform: none;
  }
  
  .cta-card {
    padding: var(--spacing-2xl);
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 961px) and (max-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1201px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* === DARK MODE === */
:global(.v-theme--dark) .filters-title {
  color: var(--color-gray-100);
}

:global(.v-theme--dark) .filters-subtitle {
  color: var(--color-gray-400);
}

:global(.v-theme--dark) .empty-title {
  color: var(--color-gray-400);
}

:global(.v-theme--dark) .empty-description {
  color: var(--color-gray-500);
}

:global(.v-theme--dark) .cta-card {
  background: linear-gradient(135deg, var(--color-gray-800), var(--color-gray-900));
  border-color: var(--color-gray-700);
}

:global(.v-theme--dark) .cta-card:hover {
  border-color: var(--color-primary-alpha-50);
}

:global(.v-theme--dark) .cta-title {
  color: var(--color-gray-100);
}

:global(.v-theme--dark) .cta-description {
  color: var(--color-gray-400);
}
</style>
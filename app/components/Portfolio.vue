<template>
  <section id="portfolio">
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4 animate-fade-up">Portfólio</h2>
          <div class="text-h6 text-medium-emphasis mb-8 animate-fade-up" style="animation-delay: 0.1s;">
            Alguns dos meus trabalhos recentes
            <v-divider class="mx-auto mt-8 animate-scale-width" style="max-width: 200px; animation-delay: 0.2s;"></v-divider>
          </div>

          <v-chip-group v-model="selectedFilter" class="justify-center animate-fade-up" style="animation-delay: 0.2s;">
            <v-chip
              v-for="(filter, index) in filters"
              :key="filter"
              :value="filter"
              filter
              variant="outlined"
              color="primary"
              size="large"
              class="ma-2 animate-bounce-in"
              :style="`animation-delay: ${0.3 + index * 0.1}s;`"
            >
              {{ filter }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          cols="12"
          md="6"
          lg="4"
          class="animate-scale-up"
          :style="`animation-delay: ${0.6 + index * 0.15}s;`"
        >
          <v-card 
            elevation="4" 
            class="h-100 d-flex flex-column project-card" 
            rounded="xl"
            hover
          >
            <div class="image-container">
              <v-img
                :src="project.image"
                height="220"
                cover
                class="text-white"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-gradient-primary">
                    <v-icon size="80" color="white" class="pulse-icon">mdi-code-braces</v-icon>
                  </div>
                </template>
                <div class="overlay">
                  <v-btn
                    icon
                    size="large"
                    color="white"
                    class="overlay-btn me-3"
                    :href="project.demoUrl"
                    target="_blank"
                    :aria-label="`Acessar documentação do projeto ${project.title}`"
                    rel="noopener"
                  >
                    <v-icon aria-hidden="true">mdi-book-open-page-variant</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    size="large"
                    color="white"
                    class="overlay-btn"
                    :href="project.githubUrl"
                    target="_blank"
                    :aria-label="`Acessar código do projeto ${project.title} no GitHub`"
                    rel="noopener"
                  >
                    <v-icon aria-hidden="true">mdi-github</v-icon>
                  </v-btn>
                </div>
              </v-img>
            </div>

            <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
              {{ project.title }}
            </v-card-title>

            <v-card-text class="flex-grow-1 pa-4">
              <p class="text-body-2 text-medium-emphasis mb-4 line-height-relaxed">
                {{ project.description }}
              </p>

              <div class="d-flex flex-wrap justify-center gap-2 mb-3">
                <v-chip
                  v-for="(tech, techIndex) in project.technologies"
                  :key="tech"
                  size="small"
                  color="primary"
                  variant="tonal"
                  class="ma-1 tech-chip animate-slide-in"
                  :style="`animation-delay: ${1 + techIndex * 0.05}s;`"
                >
                  {{ tech }}
                </v-chip>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0 justify-center">
              <v-btn
                variant="elevated"
                color="primary"
                :href="project.demoUrl"
                target="_blank"
                prepend-icon="mdi-open-in-new"
                class="me-2 action-btn"
                size="small"
              >
                LINK DA DOCUMENTAÇÃO
              </v-btn>
              <v-btn
                variant="outlined"
                color="primary"
                :href="project.githubUrl"
                target="_blank"
                prepend-icon="mdi-github"
                class="action-btn"
                size="small"
              >
                Código
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filters = ['Todos', 'Containerização', 'Infraestrutura como Código', 'Assinatura Email']
const selectedFilter = ref('Todos')

const projects = [
  {
    id: 1,
    title: 'Docker Swarm com NFS e Cloudflare',
    description: 'Repositório com configuração de um cluster Docker Swarm para deploy de aplicações web escaláveis.',
    image: '',
    category: 'Containerização',
    technologies: ['Docker', 'Docker Swarm', 'Cloudflare', 'NFS'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/docker-swarm'
  },
  {
    id: 2,
    title: 'EKS com Terraform',
    description: 'Repositório com configuração de um cluster EKS na AWS utilizando Terraform para infraestrutura como código.',
    image: '',
    category: 'Infraestrutura como Código',
    technologies: ['EKS', 'Terraform', 'AWS'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/comunidadedevops-terraform'
  },
  {
    id: 3,
    title: 'Assinatura de Email Automática para Outlook',
    description: 'Repositório com script para geração automática de assinaturas de email para Microsoft Outlook.',
    image: '',
    category: 'Assinatura Email',
    technologies: ['PowerShell', 'HTML', 'Active Directory'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/HenriqZimer/AutomatedOutlookSignature'
  },
//   {
//     id: 4,
//     title: 'Fitness Mobile App',
//     description: 'Aplicativo mobile para acompanhamento de treinos e nutrição.',
//     image: '',
//     category: 'Mobile',
//     technologies: ['React Native', 'Redux', 'Node.js'],
//     demoUrl: 'https://demo.example.com',
//     githubUrl: 'https://github.com/usuario/projeto'
//   },
//   {
//     id: 5,
//     title: 'Blog Platform',
//     description: 'Plataforma de blog com CMS personalizado e otimização SEO.',
//     image: '',
//     category: 'Web App',
//     technologies: ['Next.js', 'GraphQL', 'PostgreSQL'],
//     demoUrl: 'https://demo.example.com',
//     githubUrl: 'https://github.com/usuario/projeto'
//   },
//   {
//     id: 6,
//     title: 'Restaurant Landing',
//     description: 'Landing page elegante para restaurante com sistema de reservas.',
//     image: '',
//     category: 'Landing Page',
//     technologies: ['Vue.js', 'Tailwind', 'Supabase'],
//     demoUrl: 'https://demo.example.com',
//     githubUrl: 'https://github.com/usuario/projeto'
//   }
]

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'Todos') {
    return projects
  }
  return projects.filter(project => project.category === selectedFilter.value)
})
</script>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-scale-up {
  animation: scaleUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out forwards;
  opacity: 0;
}

.pulse-icon {
  animation: pulse 2s ease-in-out infinite;
}

.project-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .overlay {
  opacity: 1;
}

.overlay-btn {
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.project-card:hover .overlay-btn {
  transform: scale(1);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.tech-chip {
  transition: all 0.3s ease;
}

.tech-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.action-btn {
  transition: all 0.3s ease;
  text-transform: none;
  font-weight: 600;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.line-height-relaxed {
  line-height: 1.6;
}

.v-chip-group .v-chip {
  transition: all 0.3s ease;
}

.v-chip-group .v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}

.v-chip-group .v-chip--selected {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  transform: scale(1.05);
}

/* Responsividade */
@media (max-width: 960px) {
  .project-card:hover {
    transform: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  }
}

/* Smooth scroll behavior para filtros */
.v-chip-group {
  scroll-behavior: smooth;
}
</style>

<template>
  <section id="portfolio">
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">Portfólio</h2>
          <div class="text-h6 text-grey-darken-1 mb-8">
            Alguns dos meus trabalhos recentes
          </div>

          <v-chip-group v-model="selectedFilter" class="justify-center">
            <v-chip
              v-for="filter in filters"
              :key="filter"
              :value="filter"
              filter
              variant="outlined"
              color="primary"
            >
              {{ filter }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="project in filteredProjects"
          :key="project.id"
        >
          <v-card elevation="2" class="h-100 d-flex flex-column">
            <v-img
              :src="project.image"
              height="200"
              cover
              class="text-white"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
                  <v-icon size="64" color="grey">mdi-image</v-icon>
                </div>
              </template>
            </v-img>

            <v-card-title>{{ project.title }}</v-card-title>

            <v-card-text class="flex-grow-1">
              <p class="text-body-2 text-grey-darken-1 mb-4">
                {{ project.description }}
              </p>

              <div class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="tech in project.technologies"
                  :key="tech"
                  size="small"
                  color="primary"
                  variant="outlined"
                >
                  {{ tech }}
                </v-chip>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                variant="text"
                color="primary"
                :href="project.demoUrl"
                target="_blank"
                prepend-icon="mdi-open-in-new"
              >
                Demo
              </v-btn>
              <v-btn
                variant="text"
                color="primary"
                :href="project.githubUrl"
                target="_blank"
                prepend-icon="mdi-github"
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

const filters = ['Todos', 'Web App', 'Mobile', 'Landing Page', 'E-commerce']
const selectedFilter = ref('Todos')

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com painel administrativo e sistema de pagamentos integrado.',
    image: '',
    category: 'E-commerce',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real.',
    image: '',
    category: 'Web App',
    technologies: ['React', 'TypeScript', 'Firebase'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Site portfólio responsivo e moderno para um designer gráfico.',
    image: '',
    category: 'Landing Page',
    technologies: ['Nuxt.js', 'Vuetify', 'CSS'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  },
  {
    id: 4,
    title: 'Fitness Mobile App',
    description: 'Aplicativo mobile para acompanhamento de treinos e nutrição.',
    image: '',
    category: 'Mobile',
    technologies: ['React Native', 'Redux', 'Node.js'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'Plataforma de blog com CMS personalizado e otimização SEO.',
    image: '',
    category: 'Web App',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  },
  {
    id: 6,
    title: 'Restaurant Landing',
    description: 'Landing page elegante para restaurante com sistema de reservas.',
    image: '',
    category: 'Landing Page',
    technologies: ['Vue.js', 'Tailwind', 'Supabase'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/projeto'
  }
]

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'Todos') {
    return projects
  }
  return projects.filter(project => project.category === selectedFilter.value)
})
</script>

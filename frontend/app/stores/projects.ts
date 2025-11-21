import { defineStore } from 'pinia'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  demoUrl: string
  githubUrl: string
}

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    loading: false,
    error: null as string | null,
    lastFetch: null as number | null
  }),

  getters: {
    allProjects: (state) => state.projects,
    projectsByCategory: (state) => (category: string) => 
      state.projects.filter(p => p.category === category),
    projectsCount: (state) => state.projects.length,
    isLoaded: (state) => state.projects.length > 0,
    needsRefresh: (state) => {
      if (!state.lastFetch) return true
      const fiveMinutes = 5 * 60 * 1000
      return Date.now() - state.lastFetch > fiveMinutes
    }
  },

  actions: {
    async fetchProjects() {
      // Evita requisições desnecessárias
      if (this.isLoaded && !this.needsRefresh) {
        console.log('[Projects Store] Usando cache')
        return this.projects
      }

      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const apiUrl = config.public.apiUrl
        const fullUrl = `${apiUrl}/projects`
        console.log('[Projects Store] Fetching from:', fullUrl)
        
        const data = await $fetch<Project[]>(fullUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        // console.log('[Projects Store] Dados recebidos:', data.length, 'items')
        this.projects = data
        this.lastFetch = Date.now()
        return data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro ao carregar projetos'
        console.error('Erro ao carregar projetos:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    clearCache() {
      this.projects = []
      this.lastFetch = null
    }
  }
})

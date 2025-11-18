<template>
  <div style="padding: 20px; background: #1e293b; color: white; min-height: 100vh;">
    <h1>🧪 Teste das Stores do Pinia</h1>
    
    <div style="margin: 20px 0;">
      <h2>Skills Store</h2>
      <p>Loading: {{ skillsStore.loading }}</p>
      <p>Error: {{ skillsStore.error }}</p>
      <p>Total: {{ skillsStore.skillsCount }}</p>
      <button @click="skillsStore.fetchSkills()" style="padding: 10px; margin: 10px 0;">
        Carregar Skills
      </button>
      <pre style="background: #0f172a; padding: 10px; overflow: auto;">{{ skillsStore.allSkills }}</pre>
    </div>

    <div style="margin: 20px 0;">
      <h2>Projects Store</h2>
      <p>Loading: {{ projectsStore.loading }}</p>
      <p>Error: {{ projectsStore.error }}</p>
      <p>Total: {{ projectsStore.projectsCount }}</p>
      <button @click="projectsStore.fetchProjects()" style="padding: 10px; margin: 10px 0;">
        Carregar Projects
      </button>
      <pre style="background: #0f172a; padding: 10px; overflow: auto;">{{ projectsStore.allProjects }}</pre>
    </div>

    <div style="margin: 20px 0;">
      <h2>Courses Store</h2>
      <p>Loading: {{ coursesStore.loading }}</p>
      <p>Error: {{ coursesStore.error }}</p>
      <p>Total: {{ coursesStore.coursesCount }}</p>
      <button @click="coursesStore.fetchCourses()" style="padding: 10px; margin: 10px 0;">
        Carregar Courses
      </button>
      <pre style="background: #0f172a; padding: 10px; overflow: auto;">{{ coursesStore.allCourses }}</pre>
    </div>

    <div style="margin: 20px 0;">
      <h2>Certifications Store</h2>
      <p>Loading: {{ certificationsStore.loading }}</p>
      <p>Error: {{ certificationsStore.error }}</p>
      <p>Total: {{ certificationsStore.certificationsCount }}</p>
      <button @click="certificationsStore.fetchCertifications()" style="padding: 10px; margin: 10px 0;">
        Carregar Certifications
      </button>
      <pre style="background: #0f172a; padding: 10px; overflow: auto;">{{ certificationsStore.allCertifications }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const skillsStore = useSkillsStore()
const projectsStore = useProjectsStore()
const coursesStore = useCoursesStore()
const certificationsStore = useCertificationsStore()

// Auto-load on mount
onMounted(async () => {
  console.log('🚀 Iniciando carregamento das stores...')
  
  try {
    await Promise.all([
      skillsStore.fetchSkills(),
      projectsStore.fetchProjects(),
      coursesStore.fetchCourses(),
      certificationsStore.fetchCertifications()
    ])
    console.log('✅ Todas as stores carregadas!')
  } catch (error) {
    console.error('❌ Erro ao carregar stores:', error)
  }
})
</script>

<template>
  <section id="skills" class="modern-skills">
    <div class="skills-container">
      <!-- Header Section -->
      <div class="skills-header">
        <span class="section-badge">
          <v-icon icon="mdi-brain" start size="16" />
          Habilidades
        </span>
        <h2 class="section-title">
          Tecnologias e
          <span class="title-highlight">expertise</span>
        </h2>
        <p class="section-description">
          Ferramentas e linguagens que utilizo para criar soluções robustas
        </p>
      </div>

      <!-- Skills Categories -->
      <div class="skills-grid">
        <div 
          v-for="(category, index) in skillCategories" 
          :key="category.name"
          class="skill-category"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="category-header">
            <div class="category-icon">
              <v-icon :icon="category.icon" :color="category.color" size="24" />
            </div>
            <h3 class="category-title">{{ category.name }}</h3>
          </div>
          
          <div class="skills-list">
            <div 
              v-for="skill in category.skills" 
              :key="skill.name"
              class="skill-item"
            >
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div 
                  class="skill-progress"
                  :style="{ 
                    width: `${skill.level}%`,
                    backgroundColor: `rgb(var(--v-theme-${category.color}))`
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Section -->
      <div class="learning-section">
        <div class="learning-header">
          <h3 class="learning-title">Estudos Atuais</h3>
          <p class="learning-subtitle">Sempre em evolução</p>
        </div>
        
        <div class="learning-grid">
          <div 
            v-for="(item, index) in learningItems"
            :key="item.name"
            class="learning-card"
            :style="{ animationDelay: `${600 + index * 100}ms` }"
          >
            <div class="learning-content">
              <div class="learning-info">
                <div class="learning-icon">
                  <v-icon :icon="item.icon" :color="item.color" size="20" />
                </div>
                <div class="learning-text">
                  <h4 class="learning-name">{{ item.name }}</h4>
                  <p class="learning-description">{{ item.description }}</p>
                </div>
              </div>
              <div class="learning-progress">
                <div class="progress-circle">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#e5e7eb"
                      stroke-width="3"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      :stroke="`rgb(var(--v-theme-${item.color}))`"
                      stroke-width="3"
                      stroke-linecap="round"
                      :stroke-dasharray="`${2 * Math.PI * 20}`"
                      :stroke-dashoffset="`${2 * Math.PI * 20 * (1 - item.progress / 100)}`"
                      transform="rotate(-90 24 24)"
                    />
                  </svg>
                  <span class="progress-text">{{ item.progress }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technologies Section -->
      <div class="technologies-section">
        <div class="technologies-header">
          <div class="tech-badge">
            <v-icon icon="mdi-cog" start size="14" />
            Stack Tecnológico
          </div>
          <h3 class="technologies-title">
            Outras <span class="tech-highlight">tecnologias</span>
          </h3>
          <p class="technologies-subtitle">
            Ferramentas e frameworks que complementam meu arsenal de desenvolvimento
          </p>
        </div>
        
        <div class="tech-grid">
          <div 
            v-for="(tech, index) in otherTechs"
            :key="tech.name"
            class="tech-card"
            :style="{ animationDelay: `${1000 + index * 50}ms` }"
          >
            <div class="tech-card-inner">
              <div class="tech-icon-wrapper">
                <v-icon 
                  :icon="tech.icon" 
                  :color="tech.color"
                  size="24"
                  class="tech-icon"
                />
              </div>
              <div class="tech-content">
                <span class="tech-name">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Types
interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  name: string
  icon: string
  color: string
  skills: Skill[]
}

interface LearningItem {
  name: string
  description: string
  progress: number
  icon: string
  color: string
}

interface TechItem {
  name: string
  icon: string
  color: string
}

// Skill Categories Data - Atualizadas para refletir o foco em DevOps/Cloud
const skillCategories: SkillCategory[] = [
  {
    name: 'Cloud & DevOps',
    icon: 'mdi-cloud',
    color: 'primary',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Git/GitHub', level: 90 },
      { name: 'Linux', level: 80 },
      { name: 'CI/CD', level: 75 }
    ]
  },
  {
    name: 'Infraestrutura',
    icon: 'mdi-server',
    color: 'primary',
    skills: [
      { name: 'Virtualização', level: 88 },
      { name: 'Redes', level: 82 },
      { name: 'Microsoft Tools', level: 85 },
      { name: 'Monitoramento', level: 70 }
    ]
  },
  {
    name: 'Desenvolvimento',
    icon: 'mdi-code-tags',
    color: 'info',
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Bash/Shell', level: 80 },
      { name: 'YAML/JSON', level: 85 },
      { name: 'APIs REST', level: 70 }
    ]
  }
]

// Current Learning Items
const learningItems: LearningItem[] = [
  {
    name: 'Kubernetes',
    description: 'Orquestração de containers',
    progress: 65,
    icon: 'mdi-kubernetes',
    color: 'primary'
  },
  {
    name: 'Terraform',
    description: 'Infrastructure as Code',
    progress: 50,
    icon: 'mdi-terraform',
    color: 'warning'
  },
  {
    name: 'Azure DevOps',
    description: 'Plataforma DevOps Microsoft',
    progress: 70,
    icon: 'mdi-microsoft-azure-devops',
    color: 'info'
  },
  {
    name: 'Ansible',
    description: 'Automação e configuração',
    progress: 40,
    icon: 'mdi-ansible',
    color: 'error'
  },
  {
    name: 'Azure DevOps',
    description: 'Plataforma DevOps Microsoft',
    progress: 70,
    icon: 'mdi-microsoft-azure-devops',
    color: 'info'
  },
  {
    name: 'Ansible',
    description: 'Automação e configuração',
    progress: 40,
    icon: 'mdi-ansible',
    color: 'error'
  }
]

// Other Technologies
const otherTechs: TechItem[] = [
  { name: 'AWS', icon: 'mdi-aws', color: 'warning' },
  { name: 'Azure', icon: 'mdi-microsoft-azure', color: 'info' },
  { name: 'Jenkins', icon: 'mdi-pipe', color: 'primary' },
  { name: 'Prometheus', icon: 'mdi-chart-line', color: 'error' },
  { name: 'Grafana', icon: 'mdi-chart-box', color: 'warning' },
  { name: 'ELK Stack', icon: 'mdi-database-search', color: 'primary' },
  { name: 'Nginx', icon: 'mdi-web', color: 'primary' },
  { name: 'MySQL', icon: 'mdi-database', color: 'info' },
  { name: 'PostgreSQL', icon: 'mdi-elephant', color: 'info' },
  { name: 'Redis', icon: 'mdi-memory', color: 'error' },
  { name: 'VMware', icon: 'mdi-server-network', color: 'primary' },
  { name: 'Active Directory', icon: 'mdi-account-network', color: 'info' }
]
</script>

<style scoped>
.modern-skills {
  padding: 0px 0 10px;
  background: rgb(var(--v-theme-background));
  min-height: 100vh;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Header Section */
.skills-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 24px;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.title-highlight {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-description {
  font-size: 18px;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.skill-category {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: slideInUp 0.6s ease forwards;
}

.skill-category:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category-icon {
  width: 52px;
  height: 52px;
  background: rgb(var(--v-theme-surface-bright));
  border: 2px solid rgb(var(--v-theme-surface-light));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.skill-category:hover .category-icon {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.category-title {
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  letter-spacing: -0.025em;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface-variant));
}

.skill-level {
  font-size: 12px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.skill-bar {
  height: 6px;
  background: rgb(var(--v-theme-surface-bright));
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
  background: #3b82f6;
}

/* Learning Section */
.learning-section {
  margin-bottom: 80px;
}

.learning-header {
  text-align: center;
  margin-bottom: 48px;
}

.learning-title {
  font-size: 32px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 8px;
  letter-spacing: -0.025em;
}

.learning-subtitle {
  font-size: 16px;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.learning-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: slideInUp 0.6s ease forwards;
}

.learning-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.learning-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.learning-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.learning-icon {
  width: 40px;
  height: 40px;
  background: rgb(var(--v-theme-surface-bright));
  border: 1px solid rgb(var(--v-theme-surface-light));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.learning-text {
  flex: 1;
  min-width: 0;
}

.learning-name {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
  line-height: 1.2;
}

.learning-description {
  font-size: 13px;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
  line-height: 1.3;
}

.learning-progress {
  flex-shrink: 0;
}

.progress-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-text {
  position: absolute;
  font-size: 11px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

/* Technologies Section */
.technologies-section {
  margin: 80px 0;
  animation: slideInUp 0.8s ease forwards;
}

.technologies-header {
  text-align: center;
  margin-bottom: 48px;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  animation: slideInUp 0.6s ease forwards;
}

.technologies-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  margin: 16px 0;
  line-height: 1.2;
  animation: slideInUp 0.8s ease forwards;
}

.tech-highlight {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.technologies-subtitle {
  font-size: 1.125rem;
  color: rgba(var(--v-theme-on-background), 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: slideInUp 1s ease forwards;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.tech-card {
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
  cursor: pointer;
}

.tech-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
}

.tech-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  text-align: center;
  height: 100%;
}

.tech-icon-wrapper {
  width: 56px;
  height: 56px;
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
  display: flex;
  align-items: center;
}

.tech-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  text-align: center;
  line-height: 1.3;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-skills {
    padding: 0px 0 40px;
  }
  
  .skills-container {
    padding: 0 16px;
  }
  
  .skills-header {
    margin-bottom: 60px;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
  
  .skill-category {
    padding: 24px;
  }
  
  .learning-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .learning-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .learning-info {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .technologies-section {
    margin: 60px 0;
  }
  
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
  
  .tech-card-inner {
    padding: 20px 12px;
  }
  
  .tech-icon-wrapper {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
  }
}

@media (max-width: 480px) {
  .modern-skills {
    padding: 0px 0 20px;
  }
  
  .skill-category {
    padding: 20px;
  }
  
  .learning-card {
    padding: 20px;
  }
  
  .technologies-section {
    margin: 40px 0;
  }
  
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .tech-card-inner {
    padding: 16px 8px;
  }
  
  .tech-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }
  
  .tech-name {
    font-size: 0.85rem;
  }
}
</style>
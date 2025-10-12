<template>
  <section id="about" class="modern-about">
    <div class="about-container">
      <!-- Header Section -->
      <div class="about-header">
        <span class="section-badge">
          <v-icon icon="mdi-account-circle" start size="16" />
          Sobre Mim
        </span>
        <h2 class="section-title">
          Conhecendo minha
          <span class="title-highlight">jornada</span>
        </h2>
        <p class="section-description">
          Uma trajetória em constante evolução no mundo da tecnologia
        </p>
      </div>

      <!-- Main Content -->
      <div class="about-content">
        <!-- Story Grid -->
        <div class="story-grid">
          <!-- Past -->
          <div class="story-card past">
            <div class="story-icon">
              <v-icon icon="mdi-history" color="primary" size="24" />
            </div>
            <h3 class="story-title">Minha História</h3>
            <p class="story-text">
              Mais de 6 anos de experiência em atendimento ao público, onde desenvolvi habilidades essenciais como paciência, resolução de problemas e comunicação efetiva.
            </p>
          </div>

          <!-- Present -->
          <div class="story-card present">
            <div class="story-icon">
              <v-icon icon="mdi-cogs" color="success" size="24" />
            </div>
            <h3 class="story-title">Presente</h3>
            <p class="story-text">
              Atualmente focado em infraestrutura de TI, trabalhando com redes, ferramentas Microsoft, virtualização e automação. Apaixonado por soluções práticas.
            </p>
          </div>

          <!-- Future -->
          <div class="story-card future">
            <div class="story-icon">
              <v-icon icon="mdi-rocket-launch" color="warning" size="24" />
            </div>
            <h3 class="story-title">Futuro</h3>
            <p class="story-text">
              Estudando DevOps intensivamente, explorando containers, automação e cloud computing para criar soluções mais inteligentes e eficientes.
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item" v-for="(stat, index) in stats" :key="stat.label">
              <div class="stat-icon">
                <v-icon :icon="stat.icon" :color="stat.color" size="20" />
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="values-section">
          <h3 class="values-title">Meus Valores</h3>
          <div class="values-grid">
            <div 
              v-for="(value, index) in values" 
              :key="value"
              class="value-item"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <v-icon :icon="getValueIcon(value)" size="18" />
              <span>{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { 
    value: '6+', 
    label: 'Anos de Experiência',
    icon: 'mdi-briefcase-outline',
    color: 'primary'
  },
  { 
    value: '50+', 
    label: 'Projetos Realizados',
    icon: 'mdi-rocket-launch-outline',
    color: 'success'
  },
  { 
    value: '3+', 
    label: 'Anos de Estudo',
    icon: 'mdi-school-outline',
    color: 'info'
  },
  { 
    value: '100%', 
    label: 'Comprometimento',
    icon: 'mdi-heart-outline',
    color: 'error'
  }
]

const values = [
  'Estudo Contínuo',
  'Qualidade',
  'Inovação',
  'Colaboração',
  'Performance',
  'Comprometimento'
]

const getValueIcon = (value: string) => {
  const iconMap: Record<string, string> = {
    'Estudo Contínuo': 'mdi-book-open-variant',
    'Qualidade': 'mdi-star',
    'Inovação': 'mdi-lightbulb-outline',
    'Colaboração': 'mdi-account-group',
    'Performance': 'mdi-speedometer',
    'Comprometimento': 'mdi-handshake'
  }
  return iconMap[value] || 'mdi-check'
}
</script>

<style scoped>
.modern-about {
  padding: 120px 0 80px;
  background: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Header Section */
.about-header {
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
  color: #0f172a;
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
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Content Section */
.about-content {
  display: grid;
  gap: 60px;
}

/* Story Grid */
.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
}

.story-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.story-card:hover::before {
  transform: scaleX(1);
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.story-icon {
  width: 56px;
  height: 56px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.story-card:hover .story-icon {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.story-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
}

.story-text {
  font-size: 16px;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

/* Stats Section */
.stats-section {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(59, 130, 246, 0.05);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

/* Values Section */
.values-section {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
}

.values-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: -0.025em;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  transition: all 0.3s ease;
  opacity: 0;
  animation: slideInUp 0.6s ease forwards;
}

.value-item:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
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
  .modern-about {
    padding: 80px 0 60px;
  }
  
  .about-container {
    padding: 0 16px;
  }
  
  .about-header {
    margin-bottom: 60px;
  }
  
  .story-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  
  .story-card {
    padding: 24px;
  }
  
  .stats-section,
  .values-section {
    padding: 24px;
    margin-bottom: 40px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 16px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .story-card {
    padding: 20px;
  }
  
  .stats-section,
  .values-section {
    padding: 20px;
  }
}
</style>
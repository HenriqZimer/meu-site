<template>
  <section id="about" class="section-background">
    <v-container class="py-20">
      <v-row justify="center" class="mb-16">
        <v-col cols="12" class="text-center">
          <h2 class="text-h2 font-weight-bold mb-6 animate-fade-up" style="animation-delay: 0s;">Sobre Mim</h2>
          <div class="text-h5 text-grey-darken-1 animate-fade-up line-height-relaxed" style="animation-delay: 0.1s;">
            Conhecendo um pouco mais da minha jornada
            <v-divider class="mx-auto mt-8 animate-scale-width" style="max-width: 200px; animation-delay: 0.2s;"></v-divider>
          </div>
        </v-col>
      </v-row>

      <v-row class="align-items-stretch">
        <v-col cols="12" lg="6" class="animate-fade-right">
          <v-card 
            class="h-100 pa-8 story-card" 
            elevation="0"
            variant="outlined"
            rounded="xl"
          >
            <div class="text-body-1 text-grey-darken-1 story-content">
              <div class="mb-6 animate-typewriter" style="animation-delay: 0.4s;">
                <v-icon color="primary" size="large" class="me-3 float-start">mdi-account-heart</v-icon>
                <p class="text-h6 font-weight-medium mb-4 text-primary">
                  Minha História
                </p>
                <p class="mb-4 line-height-relaxed">
                  Olá! Que bom ter a oportunidade de me apresentar. Meu nome é Henrique e sou um profissional de tecnologia com mais de 6 anos de experiência em atendimento ao público, onde aprimorei habilidades essenciais como paciência, autoconfiança e a arte de resolver problemas.
                </p>
              </div>
              
              <div class="mb-6 animate-typewriter" style="animation-delay: 0.6s;">
                <v-icon color="success" size="large" class="me-3 float-start">mdi-cog</v-icon>
                <p class="text-h6 font-weight-medium mb-4 text-success">
                  Presente
                </p>
                <p class="mb-4 line-height-relaxed">
                  Atualmente, minha jornada é na área de infraestrutura de TI, onde lido com redes, ferramentas Microsoft, virtualização e automação. Adoro a parte prática de dar suporte e ver as coisas funcionando.
                </p>
              </div>

              <div class="animate-typewriter" style="animation-delay: 0.8s;">
                <v-icon color="warning" size="large" class="me-3 float-start">mdi-rocket-launch</v-icon>
                <p class="text-h6 font-weight-medium mb-4 text-warning">
                  Futuro
                </p>
                <p class="line-height-relaxed">
                  Além disso, estou me dedicando a estudar DevOps. Estou animado para explorar mais sobre orquestração de containers, automação e cloud computing, pois acredito que essas tecnologias são o futuro para criar soluções mais inteligentes e eficientes.
                </p>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="6" class="animate-fade-left">
          <!-- Estatísticas -->
          <v-row class="mb-6">
            <v-col v-for="(stat, index) in stats" :key="stat.label" cols="6">
              <v-card 
                class="pa-6 text-center stats-card animate-scale-up" 
                elevation="0"
                rounded="xl"
                :style="`animation-delay: ${0.2 + index * 0.1}s;`"
                hover
                variant="outlined"
                :color="stat.color"
              >
                <v-icon :color="stat.color" size="x-large" class="mb-3 pulse-icon">{{ stat.icon }}</v-icon>
                <div class="text-h2 font-weight-bold mb-2 counter-number" :class="`text-${stat.color}`">
                  {{ stat.value }}
                </div>
                <div class="text-body-1 font-weight-medium">
                  {{ stat.label }}
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Valores -->
          <v-card 
            class="pa-8 values-card animate-fade-up" 
            elevation="0"
            rounded="xl"
            style="animation-delay: 0.6s;"
            variant="outlined"
          >
            <div class="text-center mb-6">
              <v-icon color="primary" size="x-large" class="mb-3">mdi-heart</v-icon>
              <h3 class="text-h4 font-weight-bold">Meus Valores</h3>
              <p class="text-grey-darken-1 mt-2">Princípios que guiam minha jornada</p>
            </div>
            
            <div class="d-flex flex-wrap justify-center gap-3">
              <v-chip
                v-for="(value, index) in values"
                :key="value"
                class="ma-1 value-chip animate-bounce-in"
                :color="getChipColor(index)"
                variant="elevated"
                size="large"
                :style="`animation-delay: ${0.7 + index * 0.05}s;`"
              >
                <v-icon start :icon="getValueIcon(value)"></v-icon>
                {{ value }}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { 
    value: '+2', 
    label: 'Anos de Experiência',
    icon: 'mdi-clock-outline',
    color: 'primary'
  },
  { 
    value: '+5', 
    label: 'Projetos Concluídos',
    icon: 'mdi-check-circle-outline',
    color: 'success'
  },
  { 
    value: '+3', 
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
  'Estudo',
  'Qualidade',
  'Inovação',
  'Colaboração',
  'Aprendizado Contínuo',
  'Performance',
  'Comprometimento'
]

const getChipColor = (index: number) => {
  const colors = ['primary', 'success', 'info', 'warning', 'error', 'secondary', 'primary']
  return colors[index % colors.length]
}

const getValueIcon = (value: string) => {
  const iconMap: Record<string, string> = {
    'Estudo': 'mdi-book-open-variant',
    'Qualidade': 'mdi-star',
    'Inovação': 'mdi-lightbulb-outline',
    'Colaboração': 'mdi-account-group',
    'Aprendizado Contínuo': 'mdi-trending-up',
    'Performance': 'mdi-speedometer',
    'Comprometimento': 'mdi-handshake'
  }
  return iconMap[value] || 'mdi-check'
}
</script>

<style scoped>
/* Seção Background */
.section-background {
  position: relative;
}

.section-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="rgba(0,0,0,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

/* Animações Principais */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.8) rotateY(20deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes typewriter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes counterAnimation {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Classes de Animação */
.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-fade-right {
  animation: fadeRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.animate-fade-left {
  animation: fadeLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  animation-delay: 0.3s;
}

.animate-scale-up {
  animation: scaleUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.animate-typewriter {
  animation: typewriter 0.8s ease-out forwards;
  opacity: 0;
}

/* Componentes Estilizados */
.gradient-text {
  background: linear-gradient(135deg, 
    rgb(var(--v-theme-primary)) 0%, 
    rgb(var(--v-theme-secondary)) 50%,
    rgb(var(--v-theme-primary)) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}

.story-card {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(var(--v-theme-primary), 0.1);
}

.story-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    rgba(var(--v-theme-primary), 0.3),
    rgba(var(--v-theme-secondary), 0.3),
    rgba(var(--v-theme-primary), 0.3)
  );
  background-size: 300% 300%;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: gradientShift 3s ease-in-out infinite;
}

.story-card:hover::before {
  opacity: 1;
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(var(--v-theme-primary), 0.15);
}

.story-content {
  position: relative;
  z-index: 1;
}

.stats-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.stats-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  transition: left 0.6s ease;
}

.stats-card:hover::before {
  left: 100%;
}

.counter-number {
  animation: counterAnimation 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: inherit;
}

.pulse-icon {
  animation: pulse 2s ease-in-out infinite;
}

.values-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(10px);
  border: none !important;
}

.values-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(var(--v-theme-primary), 0.1);
}

.value-chip {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.value-chip:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.line-height-relaxed {
  line-height: 1.8;
}

.float-start {
  float: left;
  margin-top: 0.25rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .story-card:hover,
  .stats-card:hover,
  .values-card:hover {
    transform: none;
  }
  
  .value-chip:hover {
    transform: scale(1.02);
  }
}

/* Dark mode adjustments */
.v-theme--dark .story-card {
  background: rgba(var(--v-theme-surface), 0.9);
}

.v-theme--dark .section-background::before {
  opacity: 0.1;
}

.v-theme--dark .values-card {
  background: rgba(var(--v-theme-surface), 0.9);
}

/* Print styles */
@media print {
  .animate-fade-up,
  .animate-fade-right,
  .animate-fade-left,
  .animate-scale-up,
  .animate-bounce-in,
  .animate-typewriter {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>

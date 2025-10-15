<template>
  <section id="about" class="modern-about">
    <div class="about-container">
      <!-- Header Section -->
      <div class="about-header" data-animate="fade-up">
        <span class="section-badge" data-animate="fade-in" data-delay="100">
          <v-icon icon="mdi-account-circle" start size="16" />
          Sobre Mim
        </span>
        <h2 class="section-title" data-animate="fade-up" data-delay="200">
          Conhecendo minha
          <span class="title-highlight">jornada</span>
        </h2>
        <p class="section-description" data-animate="fade-up" data-delay="300">
          Uma trajetória em constante evolução no mundo da tecnologia
        </p>
      </div>

      <!-- Main Content -->
      <div class="about-content">
        <!-- Story Grid -->
        <div class="story-grid">
          <!-- Past -->
          <div class="story-card past" data-animate="fade-up" data-delay="400">
            <div class="story-icon">
              <v-icon icon="mdi-history" />
            </div>
            <h3 class="story-title">Minha História</h3>
            <p class="story-text">
              Mais de 6 anos de experiência em atendimento ao público, onde
              desenvolvi habilidades essenciais como paciência, resolução de
              problemas e comunicação efetiva.
            </p>
          </div>

          <!-- Present -->
          <div
            class="story-card present"
            data-animate="fade-up"
            data-delay="500"
          >
            <div class="story-icon">
              <v-icon icon="mdi-cogs" />
            </div>
            <h3 class="story-title">Presente</h3>
            <p class="story-text">
              Atualmente focado em infraestrutura de TI, trabalhando com redes,
              ferramentas Microsoft, virtualização e automação. Apaixonado por
              soluções práticas.
            </p>
          </div>

          <!-- Future -->
          <div
            class="story-card future"
            data-animate="fade-up"
            data-delay="600"
          >
            <div class="story-icon">
              <v-icon icon="mdi-rocket-launch" />
            </div>
            <h3 class="story-title">Futuro</h3>
            <p class="story-text">
              Estudando DevOps intensivamente, explorando containers, automação
              e cloud computing para criar soluções mais inteligentes e
              eficientes.
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="stats-section">
          <div class="stats-grid">
            <div
              class="stat-item"
              v-for="(stat, index) in stats"
              :key="stat.label"
            >
              <div class="stat-icon">
                <v-icon :icon="stat.icon" />
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <!-- <div class="values-section">
          <div class="values-header">
            <div class="values-badge">
              <v-icon icon="mdi-heart" start size="14" />
              Valores
            </div>
            <h3 class="values-title">Princípios que <span class="values-highlight">me guiam</span></h3>
            <p class="values-subtitle">Cada projeto é uma oportunidade de aplicar valores sólidos e entregar excelência</p>
          </div>
          <div class="values-grid">
            <div 
              v-for="(value, index) in valuesData" 
              :key="value.title"
              class="value-card"
              :style="{ animationDelay: `${index * 150}ms` }"
            >
              <div class="value-card-inner">
                <div class="value-icon-wrapper">
                  <div class="value-icon" :style="{ background: value.gradient }">
                    <v-icon :icon="value.icon" />
                  </div>
                  <div class="value-glow" :style="{ background: value.gradient }"></div>
                </div>
                <div class="value-content">
                  <h4 class="value-title">{{ value.title }}</h4>
                  <p class="value-description">{{ value.description }}</p>
                </div>
                <div class="value-border" :style="{ background: value.gradient }"></div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Scroll Animation
const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements({
    threshold: 0.15,
    once: true,
  });
});

const stats = [
  {
    value: "3+",
    label: "Anos de Experiência",
    icon: "mdi-briefcase-outline",
    color: "primary",
  },
  {
    value: "5+",
    label: "Projetos Realizados",
    icon: "mdi-rocket-launch-outline",
    color: "primary",
  },
  {
    value: "3+",
    label: "Anos de Estudo",
    icon: "mdi-school-outline",
    color: "info",
  },
  {
    value: "100%",
    label: "Comprometimento",
    icon: "mdi-heart-outline",
    color: "error",
  },
];

const values = [
  "Estudo Contínuo",
  "Qualidade",
  "Inovação",
  "Colaboração",
  "Performance",
  "Comprometimento",
];

const valuesData = [
  {
    title: "Estudo Contínuo",
    description:
      "Sempre em busca de novos conhecimentos e tecnologias para me manter atualizado",
    icon: "mdi-school",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  },
  {
    title: "Qualidade",
    description:
      "Compromisso com a excelência em cada linha de código e processo implementado",
    icon: "mdi-shield-check",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  },
  {
    title: "Inovação",
    description:
      "Busco soluções criativas e modernas para resolver problemas complexos",
    icon: "mdi-rocket-launch",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
  },
  {
    title: "Colaboração",
    description:
      "Trabalho em equipe e comunicação efetiva são fundamentais para o sucesso",
    icon: "mdi-account-group",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #3730a3 100%)",
  },
  {
    title: "Performance",
    description:
      "Otimização e eficiência são prioridades em todas as soluções que desenvolvo",
    icon: "mdi-lightning-bolt",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #4338ca 100%)",
  },
  {
    title: "Comprometimento",
    description:
      "Dedicação total para entregar resultados que superem as expectativas",
    icon: "mdi-target",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #312e81 100%)",
  },
];

const getValueIcon = (value: string) => {
  const iconMap: Record<string, string> = {
    "Estudo Contínuo": "mdi-school",
    Qualidade: "mdi-shield-check",
    Inovação: "mdi-rocket-launch",
    Colaboração: "mdi-account-group",
    Performance: "mdi-lightning-bolt",
    Comprometimento: "mdi-target",
  };
  return iconMap[value] || "mdi-circle";
};

const getValueColor = (index: number) => {
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];
  return colors[index % colors.length];
};
</script>

<style scoped>
.modern-about {
  padding: 40px;
  background: rgb(var(--v-theme-background));
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
/* Header usa classes globais: .section-badge, .section-title, .title-highlight, .section-description */
.about-header {
  text-align: center;
  margin-bottom: 80px;
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
  justify-content: center;
}

.story-card {
  background: rgb(var(--v-theme-surface));
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgb(var(--v-theme-surface-bright));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
  content: "";
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
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
  border-color: rgb(96, 165, 250);
}

.story-icon {
  width: 56px;
  height: 56px;
  background: transparent !important;
  background-color: transparent !important;
  border: 2px solid;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.story-card:hover .story-icon {
  background: transparent !important;
  background-color: transparent !important;
  transform: scale(1.1);
}

/* Story Icons - Cores individuais */
.story-card.past .story-icon {
  border-color: rgb(139, 92, 246);
}

.story-card.past .story-icon .v-icon {
  color: rgb(139, 92, 246) !important;
}

.story-card.present .story-icon {
  border-color: rgb(59, 130, 246);
}

.story-card.present .story-icon .v-icon {
  color: rgb(59, 130, 246) !important;
}

.story-card.future .story-icon {
  border-color: rgb(34, 211, 238);
}

.story-card.future .story-icon .v-icon {
  color: rgb(34, 211, 238) !important;
}

.story-icon .v-icon {
  font-size: 28px !important;
  background: transparent !important;
  background-color: transparent !important;
}

.story-icon .v-icon::before,
.story-icon .v-icon::after {
  background: transparent !important;
  background-color: transparent !important;
}

.story-title {
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  letter-spacing: -0.025em;
}

.story-text {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

/* Stats Section */
.stats-section {
  background: rgb(var(--v-theme-surface));
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgb(var(--v-theme-surface-bright));
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  justify-content: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(59, 130, 246, 0.05) !important;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon {
  background: rgba(59, 130, 246, 0.1) !important;
  border-color: rgba(59, 130, 246, 0.4);
}

.stat-icon .v-icon {
  font-size: 24px !important;
  background: transparent !important;
  background-color: transparent !important;
  color: rgb(96, 165, 250) !important;
}

.stat-icon .v-icon::before,
.stat-icon .v-icon::after {
  background: transparent !important;
  background-color: transparent !important;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
}

/* Values Section */
.values-section {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.03),
    rgba(16, 185, 129, 0.03)
  );
  padding: 60px 48px;
  border-radius: 32px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  overflow: hidden;
}

.values-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(59, 130, 246, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(16, 185, 129, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.values-header {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.values-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(59, 130, 246, 0.15);
  color: rgb(96, 165, 250);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.values-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgb(241, 245, 249);
  margin-bottom: 12px;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.values-highlight {
  background: linear-gradient(135deg, rgb(96, 165, 250), rgb(16, 185, 129));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.values-subtitle {
  font-size: 1.1rem;
  color: rgb(203, 213, 225);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  justify-content: center;
}

.value-card {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  transition: transform 0.4s ease;
}

.value-card:hover {
  transform: translateY(-8px);
}

.value-card-inner {
  background: rgba(var(--v-theme-surface), 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 20px;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.value-card:hover .value-card-inner {
  background: rgba(var(--v-theme-surface), 1);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
}

.value-icon-wrapper {
  position: relative;
  margin-bottom: 20px;
  align-self: flex-start;
}

.value-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  color: rgb(96, 165, 250);
}

.value-card:hover .value-icon {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.2);
}

.value-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.value-card:hover .value-glow {
  opacity: 0.6;
}

.value-content {
  flex: 1;
  text-align: left;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
  letter-spacing: -0.025em;
}

.value-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

.value-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.value-card:hover .value-border {
  opacity: 1;
}

/* Dark mode support */
:global(.v-theme--dark) .values-section {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.05),
    rgba(16, 185, 129, 0.05)
  );
  border-color: rgba(59, 130, 246, 0.2);
}

:global(.v-theme--dark) .value-card-inner {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(71, 85, 105, 0.3);
}

:global(.v-theme--dark) .value-card:hover .value-card-inner {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(59, 130, 246, 0.4);
}

.value-card:hover .value-icon {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.1);
}

.value-text {
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

/* Animations definidas em assets/css/components.css */

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .story-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    justify-content: center;
  }
}

/* Medium tablets */
@media (max-width: 960px) and (min-width: 769px) {
  .story-grid {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
  }
}

/* Small tablets - 2+1 fix */
@media (max-width: 900px) and (min-width: 769px) {
  .story-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    justify-content: center;
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
    padding: 32px 24px;
    margin-bottom: 40px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    justify-content: center;
  }

  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 16px;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    justify-content: center;
  }

  .value-card {
    padding: 20px 12px;
    min-height: 90px;
  }

  .value-icon {
    width: 40px;
    height: 40px;
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
    padding: 24px 16px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .value-card {
    padding: 16px 12px;
    min-height: 80px;
  }
}

/* Value color variations */
.value-icon--color-0 {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.value-icon--color-1 {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.value-icon--color-2 {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.value-icon--color-3 {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.value-icon--color-4 {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.value-icon--color-5 {
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
}
</style>

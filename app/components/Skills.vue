<template>
  <section id="skills" class="modern-skills">
    <div class="skills-container">
      <!-- Header Section -->
      <div class="skills-header">
        <!-- <span class="section-badge">
          <v-icon icon="mdi-brain" start size="16" />
          Tecnologias
        </span> -->
        <h2 class="section-title">
          Minha Stack
          <span class="title-highlight">Tecnológica</span>
        </h2>
        <p class="section-description">
          Ferramentas e tecnologias que domino e estou estudando
        </p>
      </div>

      <!-- Tech Carousel -->
      <div class="tech-carousel-container">
        <div class="tech-carousel-wrapper">
          <div class="tech-carousel-track">
            <!-- First set -->
            <div
              v-for="tech in technologies"
              :key="tech.name"
              class="tech-card"
            >
              <div class="tech-card-content">
                <div 
                  class="tech-icon-container"
                  :data-icon="tech.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')"
                >
                  <v-icon :icon="tech.icon" />
                </div>
                <div class="tech-details">
                  <h3 class="tech-name">{{ tech.name }}</h3>
                  <p class="tech-category">{{ tech.category }}</p>
                </div>
              </div>
            </div>
            <!-- Duplicate for seamless loop -->
            <div
              v-for="tech in technologies"
              :key="`duplicate-${tech.name}`"
              class="tech-card"
              aria-hidden="true"
            >
              <div class="tech-card-content">
                <div 
                  class="tech-icon-container"
                  :data-icon="tech.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')"
                >
                  <v-icon :icon="tech.icon" />
                </div>
                <div class="tech-details">
                  <h3 class="tech-name">{{ tech.name }}</h3>
                  <p class="tech-category">{{ tech.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types
interface Technology {
  name: string
  category: string
  icon: string
  color: string
  bgColor: string
  status?: string
}

// Data
const technologies: Technology[] = [
  // Infraestrutura & Cloud
  { name: 'Kubernetes', category: 'Orquestração', icon: 'mdi-kubernetes', color: '#326CE5', bgColor: '#e3f2fd' },
  { name: 'Docker', category: 'Containerização', icon: 'mdi-docker', color: '#2496ED', bgColor: '#e3f2fd' },
  { name: 'Terraform', category: 'IaC', icon: 'mdi-terraform', color: '#7B42BC', bgColor: '#f3e5f5' },
  { name: 'AWS', category: 'Cloud Provider', icon: 'mdi-aws', color: '#FF9900', bgColor: '#fff3e0' },
  { name: 'Helm', category: 'Package Manager', icon: 'mdi-ship-wheel', color: '#0F1689', bgColor: '#e8eaf6' },
  { name: 'Ansible', category: 'Automação', icon: 'mdi-ansible', color: '#EE0000', bgColor: '#ffebee' },
  
  // Desenvolvimento
  { name: 'Python', category: 'Linguagem', icon: 'mdi-language-python', color: '#3776AB', bgColor: '#e3f2fd' },
  { name: 'Node.js', category: 'Runtime', icon: 'mdi-nodejs', color: '#339933', bgColor: '#e8f5e9' },
  { name: 'Go', category: 'Linguagem', icon: 'mdi-language-go', color: '#00ADD8', bgColor: '#e0f7fa' },
  { name: 'TypeScript', category: 'Linguagem', icon: 'mdi-language-typescript', color: '#3178C6', bgColor: '#e3f2fd' },
  { name: 'Rust', category: 'Linguagem', icon: 'mdi-cog', color: '#CE422B', bgColor: '#ffebee' },
  
  // DevOps & CI/CD
  { name: 'GitLab CI', category: 'CI/CD', icon: 'mdi-gitlab', color: '#FC6D26', bgColor: '#fff3e0' },
  { name: 'GitHub Actions', category: 'CI/CD', icon: 'mdi-github', color: '#2088FF', bgColor: '#e3f2fd' },
  { name: 'ArgoCD', category: 'GitOps', icon: 'mdi-git', color: '#EF7B4D', bgColor: '#fff3e0' },
  { name: 'Jenkins', category: 'CI/CD', icon: 'mdi-pipe', color: '#D24939', bgColor: '#ffebee' },
  
  // Observabilidade
  { name: 'Prometheus', category: 'Monitoring', icon: 'mdi-chart-line', color: '#E6522C', bgColor: '#ffebee' },
  { name: 'Grafana', category: 'Visualização', icon: 'mdi-chart-box', color: '#F46800', bgColor: '#fff3e0' },
  { name: 'ELK Stack', category: 'Logs', icon: 'mdi-math-log', color: '#005571', bgColor: '#e0f2f1' },
  { name: 'Datadog', category: 'APM', icon: 'mdi-dog', color: '#632CA6', bgColor: '#f3e5f5' },
  { name: 'OpenTelemetry', category: 'Observabilidade', icon: 'mdi-chart-box', color: '#F5A800', bgColor: '#fff3e0' },
  
  // Databases & Messaging
  { name: 'PostgreSQL', category: 'Database', icon: 'mdi-database', color: '#336791', bgColor: '#e3f2fd' },
  { name: 'Redis', category: 'Cache', icon: 'mdi-memory', color: '#DC382D', bgColor: '#ffebee' },
  { name: 'RabbitMQ', category: 'Message Broker', icon: 'mdi-rabbit', color: '#FF6600', bgColor: '#fff3e0' },
  { name: 'Kafka', category: 'Event Streaming', icon: 'mdi-message-processing', color: '#231F20', bgColor: '#f5f5f5' },
  
  // Security & Networking
  { name: 'Vault', category: 'Secrets Management', icon: 'mdi-shield-key', color: '#FFD814', bgColor: '#fffde7' },
  { name: 'Consul', category: 'Service Mesh', icon: 'mdi-server-network', color: '#E03875', bgColor: '#fce4ec' },
  { name: 'Cilium', category: 'Network Security', icon: 'mdi-security-network', color: '#F8C517', bgColor: '#fffde7' },
  { name: 'eBPF', category: 'Kernel Technology', icon: 'mdi-memory', color: '#F7931E', bgColor: '#fff3e0' },
  
  // Tools & Others
  { name: 'Git', category: 'Version Control', icon: 'mdi-git', color: '#F05032', bgColor: '#ffebee' },
  { name: 'Linux', category: 'Operating System', icon: 'mdi-linux', color: '#FCC624', bgColor: '#fffde7' },
  { name: 'WebAssembly', category: 'Web Technology', icon: 'mdi-web', color: '#654FF0', bgColor: '#ede7f6' }
]
</script>

<style scoped>
.modern-skills {
  padding: 10px;
  background: rgb(var(--v-theme-background));
  min-height: 40vh;
  display: flex;
  align-items: center;
}

.skills-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Header Section */
/* Header usa classes globais: .section-badge, .section-title, .title-highlight, .section-description */
.skills-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 0 24px;
  animation: fadeInUp 0.8s ease forwards;
}

/* Carousel Container */
.tech-carousel-container {
  position: relative;
  padding: 0;
  margin-bottom: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.tech-carousel-wrapper {
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  position: relative;
  padding: 40px 0;
  margin: -40px 0;
}

.tech-carousel-track {
  display: inline-flex;
  gap: 24px;
  animation: scroll 120s linear infinite;
  will-change: transform;
  flex-wrap: nowrap;
}

.tech-carousel-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 12px));
  }
}

/* Technology Card */
.tech-card {
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.15);
  border-radius: 16px;
  width: 200px;
  min-width: 200px;
  flex: 0 0 200px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgb(96, 165, 250);
  transform: scaleX(1);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card:hover::before {
  transform: scaleX(1);
  height: 4px;
}

.tech-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
  border-color: rgba(96, 165, 250, 0.5);
  background: rgba(var(--v-theme-surface), 0.95);
}

.tech-card-content {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  height: 100%;
}

/* Technology Icon */
.tech-icon-container {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent !important;
  background-color: transparent !important;
  border: none;
}

.tech-card:hover .tech-icon-container {
  transform: scale(1.15);
}

.tech-icon-container .v-icon {
  /* Cor específica para cada tecnologia definida abaixo */
  font-size: 40px;
  transition: all 0.3s ease;
  background: transparent !important;
  background-color: transparent !important;
}

.tech-icon-container .v-icon::before,
.tech-icon-container .v-icon::after {
  background: transparent !important;
  background-color: transparent !important;
}

/* Technology Details */
.tech-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.tech-name {
  font-size: 16px;
  font-weight: 700;
  color: rgb(241, 245, 249);
  letter-spacing: -0.025em;
  margin: 0;
  line-height: 1.2;
}

.tech-category {
  font-size: 12px;
  font-weight: 500;
  color: rgb(148, 163, 184);
  margin: 0;
  line-height: 1.3;
  opacity: 0.9;
}

/* Animations - fadeInUp definida em assets/css/components.css */

/* Responsive Design */
@media (max-width: 1200px) {
  .tech-carousel-track {
    gap: 20px;
  }
  
  .tech-card {
    width: 180px;
    min-width: 180px;
    flex: 0 0 180px;
  }
  
  .tech-icon-container {
    width: 56px;
    height: 56px;
  }
  
  .tech-icon-container .v-icon {
    font-size: 28px !important;
  }
  
  .tech-card-content {
    padding: 20px 12px;
  }
}

@media (max-width: 1024px) {
  .modern-skills {
    padding: 0;
  }
  
  .skills-container {
    padding: 0 20px;
  }
  
  .tech-carousel-container {
    padding: 0;
  }
  
  .tech-carousel-track {
    gap: 16px;
    animation: scroll 100s linear infinite;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 8px));
    }
  }
  
  .tech-card {
    width: 160px;
    min-width: 160px;
    flex: 0 0 160px;
  }
  
  .tech-name {
    font-size: 14px;
  }
  
  .tech-category {
    font-size: 11px;
  }
}

@media (max-width: 768px) {
  .modern-skills {
    padding: 0;
  }
  
  .skills-container {
    padding: 0 16px;
    max-width: 100%;
  }
  
  .skills-header {
    margin-bottom: 24px;
  }
  
  .tech-carousel-container {
    padding: 0;
  }
  
  .tech-carousel-track {
    gap: 12px;
    animation: scroll 80s linear infinite;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 6px));
    }
  }
  
  .tech-card {
    width: 140px;
    min-width: 140px;
    flex: 0 0 140px;
  }
  
  .tech-icon-container {
    width: 52px;
    height: 52px;
  }
  
  .tech-icon-container .v-icon {
    font-size: 26px !important;
  }
  
  .tech-card-content {
    padding: 18px 12px;
    gap: 10px;
  }
  
  .tech-name {
    font-size: 13px;
  }
  
  .tech-category {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .modern-skills {
    padding: 0;
  }
  
  .skills-container {
    padding: 0 16px;
  }
  
  .skills-header {
    margin-bottom: 20px;
  }
  
  .tech-carousel-container {
    padding: 0;
  }
  
  .tech-carousel-track {
    gap: 10px;
    animation: scroll 70s linear infinite;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 5px));
    }
  }
  
  .tech-card {
    width: 120px;
    min-width: 120px;
    flex: 0 0 120px;
  }
  
  .tech-icon-container {
    width: 48px;
    height: 48px;
  }
  
  .tech-icon-container .v-icon {
    font-size: 24px !important;
  }
  
  .tech-card-content {
    padding: 16px 10px;
    gap: 8px;
  }
  
  .tech-name {
    font-size: 12px;
  }
  
  .tech-category {
    font-size: 9px;
  }
}

/* Cores específicas das bordas superiores por tecnologia - CORES OFICIAIS */
.tech-card:has([data-icon="docker"])::before { background: rgb(41, 148, 229) !important; }
.tech-card:has([data-icon="kubernetes"])::before { background: rgb(51, 113, 227) !important; }
.tech-card:has([data-icon="terraform"])::before { background: rgb(124, 77, 255) !important; }
.tech-card:has([data-icon="ansible"])::before { background: rgb(238, 0, 0) !important; }
.tech-card:has([data-icon="jenkins"])::before { background: rgb(213, 66, 49) !important; }
.tech-card:has([data-icon="github-actions"])::before { background: rgb(42, 129, 246) !important; }
.tech-card:has([data-icon="argocd"])::before { background: rgb(239, 111, 54) !important; }
.tech-card:has([data-icon="gitlab-ci"])::before { background: rgb(252, 109, 38) !important; }
.tech-card:has([data-icon="prometheus"])::before { background: rgb(230, 86, 37) !important; }
.tech-card:has([data-icon="grafana"])::before { background: rgb(242, 125, 53) !important; }
.tech-card:has([data-icon="elk-stack"])::before { background: rgb(0, 169, 152) !important; }
.tech-card:has([data-icon="jaeger"])::before { background: rgb(96, 214, 229) !important; }
.tech-card:has([data-icon="aws"])::before { background: rgb(255, 153, 0) !important; }
.tech-card:has([data-icon="azure"])::before { background: rgb(0, 120, 212) !important; }
.tech-card:has([data-icon="gcp"])::before { background: rgb(234, 67, 53) !important; }
.tech-card:has([data-icon="digitalocean"])::before { background: rgb(0, 127, 255) !important; }
.tech-card:has([data-icon="python"])::before { background: rgb(55, 118, 171) !important; }
.tech-card:has([data-icon="go"])::before { background: rgb(0, 173, 216) !important; }
.tech-card:has([data-icon="javascript"])::before { background: rgb(247, 223, 30) !important; }
.tech-card:has([data-icon="typescript"])::before { background: rgb(49, 120, 198) !important; }
.tech-card:has([data-icon="bash"])::before { background: rgb(76, 175, 80) !important; }
.tech-card:has([data-icon="powershell"])::before { background: rgb(1, 114, 182) !important; }
.tech-card:has([data-icon="vue"])::before { background: rgb(65, 184, 131) !important; }
.tech-card:has([data-icon="react"])::before { background: rgb(97, 218, 251) !important; }
.tech-card:has([data-icon="nuxt"])::before { background: rgb(0, 220, 130) !important; }
.tech-card:has([data-icon="nodejs"])::before { background: rgb(104, 160, 99) !important; }
.tech-card:has([data-icon="postgresql"])::before { background: rgb(51, 103, 145) !important; }
.tech-card:has([data-icon="mysql"])::before { background: rgb(0, 117, 143) !important; }
.tech-card:has([data-icon="mongodb"])::before { background: rgb(71, 162, 72) !important; }
.tech-card:has([data-icon="redis"])::before { background: rgb(220, 61, 50) !important; }
.tech-card:has([data-icon="rabbitmq"])::before { background: rgb(255, 102, 0) !important; }
.tech-card:has([data-icon="kafka"])::before { background: rgb(200, 200, 200) !important; }
.tech-card:has([data-icon="nginx"])::before { background: rgb(0, 150, 57) !important; }
.tech-card:has([data-icon="traefik"])::before { background: rgb(36, 182, 239) !important; }
.tech-card:has([data-icon="istio"])::before { background: rgb(70, 132, 217) !important; }
.tech-card:has([data-icon="envoy"])::before { background: rgb(172, 71, 189) !important; }
.tech-card:has([data-icon="helm"])::before { background: rgb(12, 192, 224) !important; }
.tech-card:has([data-icon="flux"])::before { background: rgb(52, 140, 212) !important; }
.tech-card:has([data-icon="kustomize"])::before { background: rgb(90, 90, 207) !important; }
.tech-card:has([data-icon="linkerd"])::before { background: rgb(46, 180, 67) !important; }
.tech-card:has([data-icon="consul"])::before { background: rgb(224, 56, 117) !important; }
.tech-card:has([data-icon="cilium"])::before { background: rgb(248, 197, 23) !important; }
.tech-card:has([data-icon="ebpf"])::before { background: rgb(247, 147, 30) !important; }
.tech-card:has([data-icon="git"])::before { background: rgb(240, 80, 50) !important; }
.tech-card:has([data-icon="linux"])::before { background: rgb(255, 192, 0) !important; }
.tech-card:has([data-icon="webassembly"])::before { background: rgb(101, 79, 240) !important; }

/* Cores dos ícones - mesma cor da borda superior (CORES OFICIAIS) */
[data-icon="docker"] .v-icon { color: rgb(41, 148, 229) !important; }
[data-icon="kubernetes"] .v-icon { color: rgb(51, 113, 227) !important; }
[data-icon="terraform"] .v-icon { color: rgb(124, 77, 255) !important; }
[data-icon="ansible"] .v-icon { color: rgb(238, 0, 0) !important; }
[data-icon="jenkins"] .v-icon { color: rgb(213, 66, 49) !important; }
[data-icon="github-actions"] .v-icon { color: rgb(42, 129, 246) !important; }
[data-icon="argocd"] .v-icon { color: rgb(239, 111, 54) !important; }
[data-icon="gitlab-ci"] .v-icon { color: rgb(252, 109, 38) !important; }
[data-icon="prometheus"] .v-icon { color: rgb(230, 86, 37) !important; }
[data-icon="grafana"] .v-icon { color: rgb(242, 125, 53) !important; }
[data-icon="elk-stack"] .v-icon { color: rgb(0, 169, 152) !important; }
[data-icon="jaeger"] .v-icon { color: rgb(96, 214, 229) !important; }
[data-icon="aws"] .v-icon { color: rgb(255, 153, 0) !important; }
[data-icon="azure"] .v-icon { color: rgb(0, 120, 212) !important; }
[data-icon="gcp"] .v-icon { color: rgb(234, 67, 53) !important; }
[data-icon="digitalocean"] .v-icon { color: rgb(0, 127, 255) !important; }
[data-icon="python"] .v-icon { color: rgb(55, 118, 171) !important; }
[data-icon="go"] .v-icon { color: rgb(0, 173, 216) !important; }
[data-icon="javascript"] .v-icon { color: rgb(247, 223, 30) !important; }
[data-icon="typescript"] .v-icon { color: rgb(49, 120, 198) !important; }
[data-icon="bash"] .v-icon { color: rgb(76, 175, 80) !important; }
[data-icon="powershell"] .v-icon { color: rgb(33, 150, 243) !important; }
[data-icon="vue"] .v-icon { color: rgb(104, 184, 104) !important; }
[data-icon="react"] .v-icon { color: rgb(77, 199, 237) !important; }
[data-icon="nuxt"] .v-icon { color: rgb(104, 184, 104) !important; }
[data-icon="nodejs"] .v-icon { color: rgb(104, 184, 104) !important; }
[data-icon="postgresql"] .v-icon { color: rgb(51, 103, 145) !important; }
[data-icon="mysql"] .v-icon { color: rgb(0, 117, 143) !important; }
[data-icon="mongodb"] .v-icon { color: rgb(71, 162, 72) !important; }
[data-icon="redis"] .v-icon { color: rgb(211, 57, 50) !important; }
[data-icon="rabbitmq"] .v-icon { color: rgb(255, 102, 0) !important; }
[data-icon="kafka"] .v-icon { color: rgb(150, 150, 150) !important; }
[data-icon="nginx"] .v-icon { color: rgb(0, 150, 57) !important; }
[data-icon="traefik"] .v-icon { color: rgb(36, 182, 239) !important; }
[data-icon="istio"] .v-icon { color: rgb(70, 132, 217) !important; }
[data-icon="envoy"] .v-icon { color: rgb(172, 71, 189) !important; }
[data-icon="helm"] .v-icon { color: rgb(89, 132, 169) !important; }
[data-icon="flux"] .v-icon { color: rgb(52, 140, 212) !important; }
[data-icon="kustomize"] .v-icon { color: rgb(90, 90, 207) !important; }
[data-icon="linkerd"] .v-icon { color: rgb(46, 180, 67) !important; }
[data-icon="consul"] .v-icon { color: rgb(224, 56, 117) !important; }
[data-icon="cilium"] .v-icon { color: rgb(248, 197, 23) !important; }
[data-icon="ebpf"] .v-icon { color: rgb(247, 147, 30) !important; }
[data-icon="git"] .v-icon { color: rgb(240, 80, 50) !important; }
[data-icon="linux"] .v-icon { color: rgb(252, 198, 36) !important; }
[data-icon="webassembly"] .v-icon { color: rgb(101, 79, 240) !important; }
</style>
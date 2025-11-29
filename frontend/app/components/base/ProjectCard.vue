<template>
  <v-card class="project-card-modern" :style="cardStyles" elevation="8" rounded="xl">
    <!-- Featured Badge -->
    <v-chip v-if="featured" class="featured-badge" variant="flat" size="small">
      <v-icon icon="mdi-star" start size="14" />
      Destaque
    </v-chip>

    <!-- Status Badge -->
    <v-chip v-if="status !== 'completed'" class="status-badge" :class="`status-${status}`" variant="flat"
      size="x-small">
      <v-icon :icon="getStatusIcon(status)" start size="12" />
      {{ getStatusLabel(status) }}
    </v-chip>

    <!-- Project Image -->
    <div v-if="image || $slots.image" class="project-image-wrapper">
      <v-img :src="image" :alt="imageAlt" height="220" cover :lazy-src="lazy ? image : undefined"
        class="project-image" />

      <!-- Gradient Overlay -->
      <div class="image-gradient" />

      <!-- Hover Overlay -->
      <div class="hover-overlay">
        <div class="overlay-content">
          <v-btn v-if="demoUrl" icon variant="elevated" color="primary" size="large" :href="demoUrl" target="_blank"
            class="action-btn">
            <v-icon icon="mdi-open-in-new" />
          </v-btn>
          <v-btn v-if="githubUrl" icon variant="elevated" color="white" size="large" :href="githubUrl" target="_blank"
            class="action-btn">
            <v-icon icon="mdi-github" />
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Project Content -->
    <v-card-text class="project-content pa-5">
      <!-- Title -->
      <h3 class="project-title text-h6 font-weight-bold mb-2 text-truncate-2">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="project-description text-body-2 mb-3 flex-grow-1 text-truncate-3">
        {{ description }}
      </p>

      <!-- Tech Stack -->
      <div v-if="technologies && technologies.length" class="tech-stack">
        <v-chip v-for="tech in technologies.slice(0, 5)" :key="tech" size="small" variant="flat" class="tech-tag">
          {{ tech }}
        </v-chip>
        <v-chip v-if="technologies.length > 5" size="small" variant="outlined" class="tech-more">
          +{{ technologies.length - 5 }}
        </v-chip>
      </div>
    </v-card-text>

    <!-- Card Glow Effect -->
    <div class="card-glow" />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  lazy?: boolean;
  animationDelay?: number;
  featured?: boolean;
  status?: "completed" | "in-progress" | "planning";
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  image: "",
  imageAlt: "",
  technologies: () => [],
  demoUrl: "",
  githubUrl: "",
  lazy: true,
  animationDelay: 0,
  featured: false,
  status: "completed",
});

// Helper methods
const getStatusIcon = (status: string) => {
  const icons = {
    completed: "mdi-check-circle",
    "in-progress": "mdi-clock-outline",
    planning: "mdi-lightbulb-outline",
  };
  return icons[status as keyof typeof icons] || "mdi-help-circle";
};

const getStatusLabel = (status: string) => {
  const labels = {
    completed: "Concluído",
    "in-progress": "Em progresso",
    planning: "Planejado",
  };
  return labels[status as keyof typeof labels] || "Desconhecido";
};

// Computed properties
const cardStyles = computed(() => ({
  "--animation-delay": `${props.animationDelay}ms`,
}));
</script>

<style scoped>
/* === PROJECT CARD === */
.project-card-modern {
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--animation-delay);
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 460px;
  display: flex;
  flex-direction: column;
}

.project-card-modern .project-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.2),
      rgba(6, 182, 212, 0.2),
      rgba(168, 85, 247, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px rgba(59, 130, 246, 0.25),
    0 0 80px rgba(59, 130, 246, 0.15) !important;
  border-color: rgba(59, 130, 246, 0.4);
}

.project-card:hover::before {
  opacity: 1;
}

/* === CARD GLOW === */
.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.project-card:hover .card-glow {
  opacity: 1;
  animation: glow 3s ease-in-out infinite;
}

/* === FEATURED BADGE === */
.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 3;
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  backdrop-filter: blur(8px);
  animation: pulse 2s ease-in-out infinite;
}

/* === STATUS BADGE === */
.status-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.status-badge.completed {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9)) !important;
  color: white !important;
}

.status-badge.in-progress {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9)) !important;
  color: white !important;
}

.status-badge.planning {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.9)) !important;
  color: white !important;
}

/* === IMAGE WRAPPER === */
.project-image-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.08));
}

.project-img {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.92;
  filter: brightness(0.95);
}

.project-card:hover .project-img {
  transform: scale(1.08);
  opacity: 1;
  filter: brightness(1);
}

/* === IMAGE GRADIENT === */
.image-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent);
  opacity: 0.7;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover .image-gradient {
  opacity: 0.5;
}

/* === HOVER OVERLAY === */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.96);
  backdrop-filter: blur(12px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.project-card:hover .hover-overlay {
  opacity: 1;
}

.overlay-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(59, 130, 246, 0.3) !important;
}

.overlay-btn:hover {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.6) !important;
}

.overlay-btn:active {
  transform: scale(1.05) rotate(2deg);
}

/* === CONTENT === */
.project-card :deep(.v-card-text) {
  background: rgba(15, 23, 42, 0.3);
}

.project-title {
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.project-card:hover .project-title {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-description {
  color: #cbd5e1;
  line-height: 1.6;
}

/* === TECH STACK === */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tech-chip {
  background: rgba(59, 130, 246, 0.12) !important;
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #93c5fd !important;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-chip:hover {
  background: rgba(59, 130, 246, 0.2) !important;
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

/* === TEXT TRUNCATE === */
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}

/* === ANIMATIONS === */
@keyframes glow {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
  }
}

/* === RESPONSIVE === */
@media (max-width: 960px) {
  .project-card-modern {
    height: 420px;
  }

  .project-image-wrapper {
    height: 180px;
  }

  .featured-badge,
  .status-badge {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}

@media (max-width: 600px) {
  .project-card-modern {
    height: 400px;
  }

  .project-image-wrapper {
    height: 160px;
  }

  .featured-badge,
  .status-badge {
    top: 12px;
  }

  .featured-badge {
    left: 12px;
  }

  .status-badge {
    right: 12px;
  }

  .overlay-btn {
    width: 48px !important;
    height: 48px !important;
  }

  .hover-overlay {
    gap: 12px;
  }

  .project-card :deep(.v-card-text) {
    padding: 20px !important;
  }
}
</style>

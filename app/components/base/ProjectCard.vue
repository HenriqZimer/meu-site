<template>
  <div class="modern-project-card" :style="cardStyles">
    <!-- Project Image -->
    <div v-if="image || $slots.image" class="project-image">
      <div class="image-wrapper">
        <img
          class="project-img"
          :src="image"
          :alt="imageAlt"
          :loading="lazy ? 'lazy' : 'eager'"
        />

        <!-- Hover Overlay com Botões -->
        <div class="hover-overlay">
          <div class="overlay-buttons">
            <v-btn
              v-if="demoUrl"
              icon
              variant="elevated"
              color="primary"
              size="x-large"
              class="overlay-btn--demo"
              :href="demoUrl"
              target="_blank"
            >
              <v-icon icon="mdi-open-in-new" size="24" />
            </v-btn>
            <v-btn
              v-if="githubUrl"
              icon
              variant="elevated"
              size="x-large"
              class="overlay-btn--github"
              :href="githubUrl"
              target="_blank"
            >
              <v-icon icon="mdi-github" size="24" />
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Content -->
    <div class="project-content">
      <!-- Project Title -->
      <h3 class="project-title">{{ title }}</h3>

      <!-- Project Description -->
      <p class="project-description">{{ description }}</p>

      <!-- Technologies -->
      <div
        v-if="technologies && technologies.length"
        class="project-technologies"
      >
        <span
          v-for="tech in technologies.slice(0, 4)"
          :key="tech"
          class="tech-chip"
        >
          {{ tech }}
        </span>
        <span v-if="technologies.length > 4" class="tech-more">
          +{{ technologies.length - 4 }}
        </span>
      </div>
    </div>
  </div>
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
/* Card usa classes globais */
.modern-project-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.modern-project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Project Image - reduzido de 200px para 140px */
.project-image {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.05),
    rgba(6, 182, 212, 0.05)
  );
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  opacity: 0.9;
}

.modern-project-card:hover .project-img {
  transform: scale(1.05);
  opacity: 1;
}

/* Badges Overlay - compacto no canto superior direito */
.badges-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
  z-index: 3;
}

.featured-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 193, 7, 0.95);
  color: white;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
}

.status-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.status-badge--completed {
  background: rgba(76, 175, 80, 0.95);
  color: white;
}

.status-badge--in-progress {
  background: rgba(255, 152, 0, 0.95);
  color: white;
}

.status-badge--planning {
  background: rgba(33, 150, 243, 0.95);
  color: white;
}

/* Hover Overlay */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  padding: 20px;
}

.modern-project-card:hover .hover-overlay {
  opacity: 1;
}

.overlay-buttons {
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transform: translateY(10px);
  transition: transform 0.3s ease 0.1s;
}

.modern-project-card:hover .overlay-buttons {
  transform: translateY(0);
}

.overlay-btn {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;
}

.overlay-btn .v-icon {
  background: transparent !important;
  background-color: transparent !important;
}

.overlay-btn--demo:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5) !important;
}

.overlay-btn--github:hover {
  transform: scale(1.15);
}

/* Project Content - padding aumentado */
.project-content {
  padding: 16px 18px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Project Title - tamanho reduzido */
.project-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6rem;
  margin-bottom: 10px;
}

/* Project Description - compacto */
.project-description {
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.4;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3.6rem;
  margin-bottom: 12px;
  flex: 1;
}

/* Technologies - mais compacto */
.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 24px;
  margin-top: auto;
}

.tech-chip {
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgba(var(--v-theme-primary), 0.3);
}
/* Cores variadas para os badges de tecnologia */
/* .tech-chip:nth-child(1) { background: rgba(72, 169, 255, 0.15); color: rgb(72, 169, 255); border: 1px solid rgba(72, 169, 255, 0.3); }
.tech-chip:nth-child(2) { background: rgba(104, 184, 104, 0.15); color: rgb(104, 184, 104); border: 1px solid rgba(104, 184, 104, 0.3); }
.tech-chip:nth-child(3) { background: rgba(140, 91, 212, 0.15); color: rgb(140, 91, 212); border: 1px solid rgba(140, 91, 212, 0.3); }
.tech-chip:nth-child(4) { background: rgba(255, 169, 77, 0.15); color: rgb(255, 169, 77); border: 1px solid rgba(255, 169, 77, 0.3); }
.tech-chip:nth-child(5) { background: rgba(77, 199, 237, 0.15); color: rgb(77, 199, 237); border: 1px solid rgba(77, 199, 237, 0.3); } */

.tech-more {
  padding: 3px 7px;
  color: rgb(var(--v-theme-on-surface-variant));
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
}

/* fadeInUp animation available in /assets/css/components.css */

/* Responsive */
@media (max-width: 768px) {
  .modern-project-card {
    min-height: 340px;
  }

  .project-image {
    height: 120px;
  }

  .project-content {
    padding: 14px 16px 14px;
  }

  .project-title {
    font-size: 0.95rem;
    height: 2.4rem;
    margin-bottom: 8px;
  }

  .project-description {
    font-size: 0.8rem;
    height: 3.4rem;
    margin-bottom: 10px;
  }

  .overlay-buttons {
    gap: 16px;
  }

  .overlay-btn {
    width: 56px !important;
    height: 56px !important;
  }

  .overlay-btn .v-icon {
    font-size: 20px !important;
  }
}
</style>

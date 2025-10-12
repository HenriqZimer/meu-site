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
        
        <!-- Status Badge -->
        <div v-if="status" class="status-badge" :class="`status-badge--${status}`">
          <v-icon :icon="getStatusIcon(status)" size="12" />
          <span>{{ getStatusLabel(status) }}</span>
        </div>
        
        <!-- Tech Overlay -->
        <div v-if="technologies && technologies.length" class="tech-overlay">
          <div class="tech-tags">
            <span 
              v-for="tech in technologies.slice(0, 3)"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
            <span v-if="technologies.length > 3" class="tech-more">
              +{{ technologies.length - 3 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Content -->
    <div class="project-content">
      <!-- Featured Badge -->
      <div v-if="featured" class="featured-badge">
        <v-icon icon="mdi-star" size="12" />
        <span>Destaque</span>
      </div>

      <!-- Project Title -->
      <h3 class="project-title">{{ title }}</h3>
      
      <!-- Project Description -->
      <p class="project-description">{{ description }}</p>
      
      <!-- Technologies -->
      <div v-if="technologies && technologies.length" class="project-technologies">
        <span 
          v-for="tech in technologies"
          :key="tech"
          class="tech-chip"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Project Footer -->
      <div class="project-footer">
        <div class="project-links">
          <v-btn
            v-if="demoUrl"
            variant="tonal"
            color="primary"
            size="small"
            class="project-btn"
            :href="demoUrl"
            target="_blank"
          >
            <v-icon start icon="mdi-open-in-new" />
            Demo
          </v-btn>
          <v-btn
            v-if="githubUrl"
            variant="outlined"
            color="primary"
            size="small"
            class="project-btn"
            :href="githubUrl"
            target="_blank"
          >
            <v-icon start icon="mdi-github" />
            Código
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  technologies?: string[]
  demoUrl?: string
  githubUrl?: string
  lazy?: boolean
  animationDelay?: number
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'planning'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  image: '',
  imageAlt: '',
  technologies: () => [],
  demoUrl: '',
  githubUrl: '',
  lazy: true,
  animationDelay: 0,
  featured: false,
  status: 'completed'
})

// Helper methods
const getStatusIcon = (status: string) => {
  const icons = {
    'completed': 'mdi-check-circle',
    'in-progress': 'mdi-clock-outline',
    'planning': 'mdi-lightbulb-outline'
  }
  return icons[status as keyof typeof icons] || 'mdi-help-circle'
}

const getStatusLabel = (status: string) => {
  const labels = {
    'completed': 'Concluído',
    'in-progress': 'Em progresso',
    'planning': 'Planejado'
  }
  return labels[status as keyof typeof labels] || 'Desconhecido'
}

// Computed properties
const cardStyles = computed(() => ({
  '--animation-delay': `${props.animationDelay}ms`
}))
</script>

<style scoped>
.modern-project-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.modern-project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Project Image */
.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
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
}

.modern-project-card:hover .project-img {
  transform: scale(1.05);
}

/* Status Badge */
.status-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  z-index: 2;
}

.status-badge--completed {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.status-badge--in-progress {
  background: rgba(255, 152, 0, 0.9);
  color: white;
}

.status-badge--planning {
  background: rgba(63, 81, 181, 0.9);
  color: white;
}

/* Tech Overlay */
.tech-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 12px 12px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.modern-project-card:hover .tech-overlay {
  transform: translateY(0);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  padding: 2px 6px;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.tech-more {
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

/* Project Content */
.project-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Featured Badge */
.featured-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(255, 193, 7, 0.1);
  color: #ff9800;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
  width: fit-content;
  border: 1px solid rgba(255, 193, 7, 0.2);
}

/* Project Title */
.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
  line-height: 1.3;
}

/* Project Description */
.project-description {
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
  font-size: 0.9rem;
}

/* Technologies */
.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.tech-chip {
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* Project Footer */
.project-footer {
  margin-top: auto;
}

.project-links {
  display: flex;
  gap: 8px;
}

.project-btn {
  border-radius: 8px !important;
  font-size: 0.8rem !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .project-image {
    height: 160px;
  }
  
  .project-content {
    padding: 16px;
  }
  
  .project-title {
    font-size: 1.1rem;
  }
  
  .project-description {
    font-size: 0.85rem;
  }
}
</style>
<template>
  <div class="modern-badge-card" :class="cardClasses">
    <!-- Badge Image -->
    <div class="badge-image-container">
      <img :src="image" :alt="name" class="badge-image" :loading="lazy ? 'lazy' : 'eager'" />

      <!-- Hover Overlay -->
      <div class="hover-overlay">
        <div class="overlay-buttons">
          <v-btn icon variant="elevated" color="primary" size="x-large" class="overlay-btn" :href="link" target="_blank"
            rel="noopener noreferrer">
            <v-icon icon="mdi-open-in-new" size="24" />
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Badge Info -->
    <div class="badge-info">
      <h4 class="badge-name">{{ name }}</h4>
      <p class="badge-issuer">{{ issuer }}</p>

      <!-- Badge Meta -->
      <div v-if="date || skills" class="badge-meta">
        <span v-if="date" class="badge-date">
          <v-icon icon="mdi-calendar" size="14" />
          {{ date }}
        </span>
        <span v-if="skills" class="badge-skills">
          <v-icon icon="mdi-tag-multiple" size="14" />
          {{ skills }} skills
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  issuer: string
  image: string
  link: string
  date?: string
  skills?: number
  variant?: 'default' | 'compact' | 'large'
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  lazy: true,
  date: '',
  skills: 0
})

const cardClasses = computed(() => [
  `badge-card--${props.variant}`
])
</script>

<style scoped>
.modern-badge-card {
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-surface-bright));
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  height: 100%;
  min-height: 200px;
  max-width: 300px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  opacity: 1;
  transform-style: preserve-3d;
  will-change: transform;
}

.modern-badge-card[data-animate="flip-in"] {
  opacity: 0;
  transform: perspective(1000px) rotateY(-90deg) scale(0.8);
  transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-badge-card[data-animate="flip-in"].is-visible {
  opacity: 1;
  transform: perspective(1000px) rotateY(0deg) scale(1);
}

.modern-badge-card:hover {
  box-shadow: 0 16px 32px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
}

.modern-badge-card.is-visible {
  animation: breatheBadge 4s ease-in-out infinite 0.5s;
}

@keyframes breatheBadge {

  0%,
  100% {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  50% {
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.15);
  }
}

/* Badge Image Container */
.badge-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05));
}

.badge-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.9;
  filter: brightness(0.95);
}

.modern-badge-card:hover .badge-image {
  transform: scale(1.1) rotate(3deg);
  opacity: 1;
  filter: brightness(1.1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
}

/* Hover Overlay - mesmo estilo do Portfolio */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  padding: 20px;
}

.modern-badge-card:hover .hover-overlay {
  opacity: 1;
  animation: overlayPulse 2s ease-in-out infinite;
}

@keyframes overlayPulse {

  0%,
  100% {
    background: rgba(15, 23, 42, 0.75);
  }

  50% {
    background: rgba(15, 23, 42, 0.85);
  }
}

.overlay-buttons {
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transform: translateY(20px) scale(0.9);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
}

.modern-badge-card:hover .overlay-buttons {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.overlay-btn {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4) !important;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  position: relative;
}

.overlay-btn::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: ripple 2s ease-out infinite;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.overlay-btn:hover {
  transform: scale(1.2) rotate(10deg);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.6), 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
}

.overlay-btn:hover::before {
  opacity: 1;
}

/* Badge Info */
.badge-info {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  text-align: center;
  align-items: center;
}

.badge-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
  width: 100%;
  min-height: 3rem;
}

.badge-issuer {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--v-theme-primary));
  margin: 0;
  opacity: 0.9;
  text-align: center;
}

/* Badge Meta */
.badge-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  justify-content: center;
}

.badge-date,
.badge-skills {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
  opacity: 0.8;
}

/* Variants */
.badge-card--compact .badge-info {
  padding: 14px 16px;
}

.badge-card--compact .badge-name {
  font-size: 0.95rem;
}

.badge-card--large .badge-info {
  padding: 20px 22px;
}

.badge-card--large .badge-name {
  font-size: 1.15rem;
}

/* Responsivo */
@media (max-width: 599px) {
  .badge-image-container {
    height: 180px;
  }

  .badge-info {
    padding: 14px 16px;
  }

  .badge-name {
    font-size: 0.95rem;
  }

  .badge-issuer {
    font-size: 0.8125rem;
  }
}
</style>

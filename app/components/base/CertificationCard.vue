<template>
  <div 
    class="modern-certification-card"
    :class="cardClasses"
    :style="cardStyles"
  >
    <!-- Header do Card -->
    <div 
      class="certification-header"
      :class="headerClasses"
    >
      <div class="header-content">
        <v-icon 
          :icon="icon" 
          size="large" 
          class="header-icon"
        />
        <div class="header-text">
          <span class="header-title">{{ title }}</span>
          <v-chip 
            class="count-badge" 
            color="white" 
            :text-color="color"
            size="small"
            variant="elevated"
          >
            {{ count }}
          </v-chip>
        </div>
      </div>
      <div class="header-decoration"></div>
    </div>
    
    <!-- Content -->
    <div 
      class="certification-content"
      :style="contentStyles"
    >
      <div 
        class="certifications-list"
        role="list" 
        :aria-label="`Lista de certificações ${type === 'obtained' ? 'obtidas' : 'planejadas'}`"
      >
        <CertificationItem
          v-for="(item, index) in items"
          :key="`${item.name}-${index}`"
          :certification="item"
          :index="index"
          :animation-delay="animationDelay + 400 + index * 100"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types
interface Certification {
  name: string
  issuer: string
  icon?: string
  color?: string
  image?: string
  link: string
}

// Props
interface Props {
  title: string
  icon: string
  color: string
  items: Certification[]
  count: number
  type: 'obtained' | 'planned'
  animationDelay?: number
  elevation?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: 0,
  elevation: 8
})

// Composables
const { isMobile, isTablet, getResponsiveValue } = useResponsive()

// Computed classes and styles
const cardClasses = computed(() => [
  `certification-card--${props.type}`,
  {
    'certification-card--mobile': isMobile.value,
    'certification-card--tablet': isTablet.value
  }
])

const headerClasses = computed(() => [
  `certification-header--${props.color}`
])

const cardStyles = computed(() => ({
  '--header-color': `var(--v-theme-${props.color})`,
  '--animation-delay': `${props.animationDelay}ms`
}))

const contentStyles = computed(() => {
  const maxHeight = getResponsiveValue({
    mobile: '350px',
    tablet: '400px',
    desktop: '450px'
  })
  
  return {
    maxHeight,
    overflowY: 'auto' as const
  }
})
</script>

<style scoped>
.modern-certification-card {
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

.modern-certification-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(var(--header-color), 0.3);
}

/* Header */
.certification-header {
  position: relative;
  color: white;
  padding: 24px;
  background: linear-gradient(
    135deg, 
    rgb(var(--header-color)) 0%, 
    color-mix(in srgb, rgb(var(--header-color)) 80%, black 20%) 100%
  );
}

.certification-header--primary {
  --header-color: var(--v-theme-primary);
}

.certification-header--success {
  --header-color: var(--v-theme-primary);
}

.certification-header--warning {
  --header-color: var(--v-theme-warning);
}

.certification-header--info {
  --header-color: var(--v-theme-info);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.header-icon {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.header-text {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
}

.count-badge {
  backdrop-filter: blur(10px);
  font-weight: 600;
}

.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.modern-certification-card:hover .header-decoration {
  transform: translateX(100%);
}

/* Content */
.certification-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--header-color), 0.3) transparent;
}

.certification-content::-webkit-scrollbar {
  width: 6px;
}

.certification-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.certification-content::-webkit-scrollbar-thumb {
  background-color: rgba(var(--header-color), 0.3);
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.certification-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--header-color), 0.5);
}

/* List */
.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

@keyframes pulse-gentle {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
}

/* Responsive */
@media (max-width: 768px) {
  .certification-header {
    padding: 20px 16px;
  }
  
  .header-content {
    gap: 12px;
  }
  
  .header-title {
    font-size: 1.1rem;
  }
  
  .certification-content {
    padding: 16px;
  }
  
  .certifications-list {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    gap: 8px;
  }
  
  .header-text {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .modern-certification-card,
  .header-decoration,
  .header-icon {
    animation: none !important;
    transition: none !important;
  }
  
  .modern-certification-card:hover {
    transform: none !important;
  }
}

/* Dark mode adjustments */
.v-theme--dark .modern-certification-card {
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(20px);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .modern-certification-card {
    border: 2px solid rgb(var(--header-color));
  }
}
</style>
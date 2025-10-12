<template>
  <v-card 
    :class="cardClasses"
    :elevation="elevation"
    rounded="xl"
    :style="cardStyles"
    data-animate="scale-up"
    :data-delay="animationDelay"
  >
    <!-- Header do Card -->
    <v-card-title 
      :class="headerClasses"
      class="text-center pa-6"
    >
      <div class="d-flex align-center justify-center">
        <v-icon 
          :icon="icon" 
          size="x-large" 
          class="me-3 header-icon"
        />
        <div>
          <span class="font-weight-bold text-h5">{{ title }}</span>
          <v-chip 
            class="ml-4" 
            color="white" 
            :text-color="color"
            size="small"
            variant="elevated"
            data-animate="pulse"
            :data-delay="animationDelay + 200"
          >
            {{ count }}
          </v-chip>
        </div>
      </div>
    </v-card-title>
    
    <!-- Content com scroll -->
    <v-card-text 
      :class="contentClasses"
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
    </v-card-text>
  </v-card>
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
  'certification-card',
  'h-100',
  'd-flex',
  'flex-column',
  `certification-card--${props.type}`,
  {
    'certification-card--mobile': isMobile.value,
    'certification-card--tablet': isTablet.value
  }
])

const headerClasses = computed(() => [
  'certification-header',
  'text-white',
  'rounded-t-xl',
  `bg-${props.color}`
])

const contentClasses = computed(() => [
  'certification-content',
  'flex-grow-1',
  getResponsiveValue({
    mobile: 'pa-4',
    tablet: 'pa-6', 
    desktop: 'pa-8'
  })
])

const cardStyles = computed(() => ({
  '--header-color': `rgb(var(--v-theme-${props.color}))`,
  '--animation-delay': `${props.animationDelay}ms`
}))

const contentStyles = computed(() => {
  const maxHeight = getResponsiveValue({
    mobile: '350px',
    tablet: '400px',
    desktop: '450px'
  })
  
  const minHeight = getResponsiveValue({
    mobile: '350px',
    tablet: '400px',
    desktop: '450px'
  })
  
  return {
    maxHeight,
    minHeight,
    overflowY: 'auto' as const,
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `rgba(var(--v-theme-${props.color}), 0.3) transparent`
  }
})
</script>

<style scoped>
/* Card Base */
.certification-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.certification-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(var(--v-theme-primary), 0.1),
    transparent
  );
  z-index: -1;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certification-card:hover::before {
  opacity: 1;
}

.certification-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
}

/* Header */
.certification-header {
  background: linear-gradient(
    135deg, 
    var(--header-color) 0%, 
    color-mix(in srgb, var(--header-color) 80%, black 20%) 100%
  );
  position: relative;
  overflow: hidden;
}

.certification-header::before {
  content: '';
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

.certification-card:hover .certification-header::before {
  transform: translateX(100%);
}

.header-icon {
  animation: pulse-gentle 3s ease-in-out infinite;
}

@keyframes pulse-gentle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Content */
.certification-content {
  position: relative;
}

/* Custom Scrollbar */
.certification-content::-webkit-scrollbar {
  width: 6px;
}

.certification-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.certification-content::-webkit-scrollbar-thumb {
  background-color: rgba(var(--v-theme-primary), 0.3);
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.certification-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--v-theme-primary), 0.5);
}

/* List */
.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Responsive Adjustments */
.certification-card--mobile {
  margin-bottom: 1rem;
}

.certification-card--mobile .certifications-list {
  gap: 0.5rem;
}

.certification-card--tablet .certifications-list {
  gap: 0.625rem;
}

/* Performance optimizations */
.certification-card {
  will-change: transform;
  contain: layout style paint;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .certification-card,
  .certification-header,
  .header-icon {
    animation: none !important;
    transition: none !important;
  }
  
  .certification-card:hover {
    transform: none !important;
  }
}

/* Dark mode adjustments */
.v-theme--dark .certification-card {
  background: rgba(var(--v-theme-surface), 0.95);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .certification-card {
    border: 2px solid var(--header-color);
  }
}
</style>
<template>
  <article 
    :class="itemClasses"
    :style="itemStyles"
    data-animate="slide-in-up"
    :data-delay="animationDelay"
    role="listitem"
  >
    <v-list-item
      :href="certification.link"
      target="_blank"
      hover
      :aria-label="`Acessar ${type === 'obtained' ? 'certificação' : 'informações da certificação'} ${certification.name} da ${certification.issuer}`"
      rel="noopener noreferrer"
      class="pa-0"
      :ripple="!isMobile"
    >
      <!-- Avatar/Icon -->
      <template #prepend>
        <div class="certification-avatar">
          <v-avatar 
            v-if="certification.image" 
            :size="avatarSize"
            class="me-4"
          >
            <v-img 
              :src="certification.image" 
              :alt="`Logo da certificação ${certification.name}`"
              :loading="index > 2 ? 'lazy' : 'eager'"
              transition="fade-transition"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-icon 
                    :color="certification.color || 'primary'" 
                    size="large"
                  >
                    mdi-certificate
                  </v-icon>
                </div>
              </template>
            </v-img>
          </v-avatar>
          
          <v-icon 
            v-else
            :color="certification.color || 'primary'" 
            :size="iconSize"
            class="me-4"
          >
            {{ certification.icon || 'mdi-certificate' }}
          </v-icon>
        </div>
      </template>
      
      <!-- Content -->
      <div class="certification-content">
        <v-list-item-title :class="titleClasses">
          {{ certification.name }}
        </v-list-item-title>
        
        <v-list-item-subtitle :class="subtitleClasses">
          {{ certification.issuer }}
        </v-list-item-subtitle>
      </div>

      <!-- Action Button -->
      <template #append>
        <v-btn 
          :icon="actionIcon"
          :size="buttonSize"
          variant="outlined" 
          :color="type === 'obtained' ? 'success' : 'primary'"
          class="certification-action-btn"
          :aria-label="`Abrir ${type === 'obtained' ? 'certificação' : 'informações da certificação'} ${certification.name} em nova aba`"
          tabindex="-1"
        />
      </template>
    </v-list-item>
  </article>
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
  certification: Certification
  index: number
  animationDelay: number
  type: 'obtained' | 'planned'
}

const props = defineProps<Props>()

// Composables
const { isMobile, isTablet, getResponsiveValue } = useResponsive()

// Computed properties
const itemClasses = computed(() => [
  'certification-item',
  'rounded-xl',
  {
    'certification-item--mobile': isMobile.value,
    'certification-item--tablet': isTablet.value,
    'certification-item--obtained': props.type === 'obtained',
    'certification-item--planned': props.type === 'planned'
  }
])

const itemStyles = computed(() => ({
  '--animation-delay': `${props.animationDelay}ms`,
  '--item-border-color': `rgba(var(--v-theme-${props.type === 'obtained' ? 'success' : 'primary'}), 0.2)`
}))

const titleClasses = computed(() => [
  'font-weight-bold',
  'mb-2',
  getResponsiveValue({
    mobile: 'text-body-1',
    tablet: 'text-h6',
    desktop: 'text-h6'
  })
])

const subtitleClasses = computed(() => [
  'font-weight-medium',
  getResponsiveValue({
    mobile: 'text-body-2',
    tablet: 'text-body-1',
    desktop: 'text-body-1'
  })
])

const avatarSize = computed(() => 
  getResponsiveValue({
    mobile: 48,
    tablet: 56,
    desktop: 56
  })
)

const iconSize = computed(() =>
  getResponsiveValue({
    mobile: 'large',
    tablet: 'x-large',
    desktop: 'x-large'
  })
)

const buttonSize = computed(() =>
  getResponsiveValue({
    mobile: 'small',
    tablet: 'default',
    desktop: 'default'
  })
)

const actionIcon = computed(() => 
  props.type === 'obtained' ? 'mdi-open-in-new' : 'mdi-information-outline'
)
</script>

<style scoped>
/* Item Base */
.certification-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
}

.certification-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--v-theme-primary), 0.02),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certification-item:hover::before {
  opacity: 1;
}

.certification-item:hover {
  border-color: var(--item-border-color);
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.1);
}

/* Avatar */
.certification-avatar {
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.certification-item:hover .certification-avatar {
  transform: scale(1.1) rotate(3deg);
}

.v-avatar {
  position: relative;
  overflow: hidden;
}

.v-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.certification-item:hover .v-avatar::before {
  opacity: 1;
}

/* Content */
.certification-content {
  flex-grow: 1;
  min-width: 0; /* Prevent text overflow */
}

/* Action Button */
.certification-action-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}

.certification-item:hover .certification-action-btn {
  transform: scale(1.2) rotate(15deg);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}

/* Type-specific styles */
.certification-item--obtained:hover {
  border-color: rgba(var(--v-theme-success), 0.3);
  box-shadow: 0 8px 25px rgba(var(--v-theme-success), 0.1);
}

.certification-item--planned:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.1);
}

/* Responsive adjustments */
.certification-item--mobile {
  padding: 0.5rem;
}

.certification-item--mobile:hover {
  transform: translateX(4px) scale(1.01);
}

.certification-item--tablet {
  padding: 0.75rem;
}

.certification-item--tablet:hover {
  transform: translateX(6px) scale(1.015);
}

/* Focus states for accessibility */
.v-list-item:focus-visible {
  outline: 2px solid var(--v-theme-primary);
  outline-offset: 2px;
}

/* Performance optimizations */
.certification-item {
  will-change: transform;
  contain: layout style paint;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .certification-item,
  .certification-avatar,
  .certification-action-btn {
    transition: none !important;
  }
  
  .certification-item:hover {
    transform: none !important;
  }
  
  .certification-item:hover .certification-avatar,
  .certification-item:hover .certification-action-btn {
    transform: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .certification-item {
    border: 1px solid currentColor;
  }
  
  .certification-item:hover {
    background: rgba(var(--v-theme-primary), 0.1);
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .certification-item:hover {
    transform: none;
    box-shadow: none;
  }
  
  .certification-item:hover .certification-avatar,
  .certification-item:hover .certification-action-btn {
    transform: none;
  }
  
  .certification-action-btn {
    opacity: 1;
  }
}

/* Print styles */
@media print {
  .certification-item {
    border: 1px solid #ccc;
    break-inside: avoid;
  }
  
  .certification-action-btn {
    display: none;
  }
}
</style>
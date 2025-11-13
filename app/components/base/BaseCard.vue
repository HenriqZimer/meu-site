<template>
  <div
    class="modern-base-card"
    :class="cardClasses"
    :style="cardStyles"
  >
    <!-- Header do Card -->
    <div class="card-header" :class="headerClasses">
      <div class="header-content">
        <div v-if="image" class="header-image-wrapper">
          <v-img
            :src="image"
            :alt="title"
            class="header-image"
            width="48"
            height="48"
            cover
          />
        </div>
        <v-icon v-else :icon="icon" size="large" class="header-icon" />
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
    <div class="card-content" :style="contentStyles">
      <div
        class="items-list"
        role="list"
        :aria-label="ariaLabel"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props
interface Props {
  title: string;
  icon?: string;
  image?: string;
  color: string;
  count: number;
  type?: string;
  animationDelay?: number;
  elevation?: number | string;
  maxHeight?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  animationDelay: 0,
  elevation: 8,
  type: 'default',
  maxHeight: '450px',
  ariaLabel: 'Lista de itens',
  icon: 'mdi-view-grid'
});

// Composables
const { isMobile, isTablet, getResponsiveValue } = useResponsive();

// Computed classes and styles
const cardClasses = computed(() => [
  `base-card--${props.type}`,
  {
    "base-card--mobile": isMobile.value,
    "base-card--tablet": isTablet.value,
  },
]);

const headerClasses = computed(() => [`card-header--${props.color}`]);

const cardStyles = computed(() => ({
  "--header-color": `var(--v-theme-${props.color})`,
  "--animation-delay": `${props.animationDelay}ms`,
}));

const contentStyles = computed(() => {
  const maxHeight = props.maxHeight || getResponsiveValue({
    mobile: "350px",
    tablet: "400px",
    desktop: "450px",
  });

  return {
    maxHeight,
    overflowY: "auto" as const,
  };
});
</script>

<style scoped>
.modern-base-card {
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

.modern-base-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(var(--header-color), 0.3);
}

/* Header */
.card-header {
  position: relative;
  color: white;
  padding: 24px;
  background: linear-gradient(
    135deg,
    rgb(var(--header-color)) 0%,
    color-mix(in srgb, rgb(var(--header-color)) 80%, black 20%) 100%
  );
}

.card-header--primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
}

.card-header--success {
  background: linear-gradient(135deg, #10b981, #059669) !important;
}

.card-header--warning {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
}

.card-header--info {
  background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
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
  background: transparent !important;
  background-color: transparent !important;
}

.header-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px;
  animation: pulse-gentle 3s ease-in-out infinite;
  flex-shrink: 0;
}

.header-image {
  border-radius: 6px;
  object-fit: contain;
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

.modern-base-card:hover .header-decoration {
  transform: translateX(100%);
}

/* Content */
.card-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--header-color), 0.3) transparent;
}

.card-content::-webkit-scrollbar {
  width: 6px;
}

.card-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.card-content::-webkit-scrollbar-thumb {
  background-color: rgba(var(--header-color), 0.3);
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.card-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--header-color), 0.5);
}

/* List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Animations available in /assets/css/components.css */

/* Responsive */
@media (max-width: 768px) {
  .card-header {
    padding: 20px 16px;
  }

  .header-content {
    gap: 12px;
  }

  .header-title {
    font-size: 1.1rem;
  }

  .header-image-wrapper {
    width: 42px;
    height: 42px;
  }

  .card-content {
    padding: 16px;
  }

  .items-list {
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

  .header-image-wrapper {
    width: 40px;
    height: 40px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .modern-base-card,
  .header-decoration,
  .header-icon {
    animation: none !important;
    transition: none !important;
  }

  .modern-base-card:hover {
    transform: none !important;
  }
}

/* Dark mode adjustments */
.v-theme--dark .modern-base-card {
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(20px);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .modern-base-card {
    border: 2px solid rgb(var(--header-color));
  }
}
</style>

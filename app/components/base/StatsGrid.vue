<template>
  <div :class="containerClasses" data-animate="fade-up" :data-delay="baseDelay">
    <v-row justify="center">
      <v-col v-for="(stat, index) in stats" :key="index" :cols="layout.cols" :sm="layout.sm" class="stat-item"
        :data-animate-delay="index * delayIncrement">
        <div class="stat-card">
          <div class="stat-icon-wrapper">
            <v-icon :icon="stat.icon" :color="stat.color" :size="iconSize" class="stat-icon" />
          </div>
          <div class="stat-content">
            <div class="stat-value" :class="`text-${stat.color}`">
              {{ stat.value }}
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GRID_LAYOUTS, ANIMATION_DELAYS } from "~/constants";

export interface Stat {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

interface Props {
  stats: Stat[];
  layout?: { cols: number; sm: number };
  iconSize?: string | number;
  baseDelay?: number;
  delayIncrement?: number;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  layout: () => GRID_LAYOUTS.STATS,
  iconSize: 32,
  baseDelay: ANIMATION_DELAYS.CONTENT,
  delayIncrement: 100,
  customClass: "",
});

const containerClasses = computed(() => [
  "stats-overview",
  props.customClass,
]);
</script>

<style scoped>
.stats-overview {
  margin: 32px 0;
}

.stat-card {
  background: rgba(var(--v-theme-surface), 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.stat-icon {
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 599px) {
  .stat-card {
    padding: 16px;
    gap: 12px;
  }

  .stat-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .stat-value {
    font-size: 24px;
  }

  .stat-label {
    font-size: 12px;
  }
}
</style>

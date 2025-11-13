<template>
  <div class="progress-section" data-animate="fade-up" :data-delay="delay">
    <div class="progress-info">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-percentage">{{ Math.round(percentage) }}%</span>
    </div>
    <v-progress-linear
      :model-value="percentage"
      :color="color"
      bg-color="surface-variant"
      height="8"
      rounded
      class="progress-bar"
    />
  </div>
</template>

<script setup lang="ts">
import { ANIMATION_DELAYS } from "~/constants";

interface Props {
  percentage: number;
  label?: string;
  color?: string;
  delay?: number;
}

withDefaults(defineProps<Props>(), {
  label: "Progresso",
  color: "primary",
  delay: ANIMATION_DELAYS.STATS,
});
</script>

<style scoped>
.progress-section {
  margin: 32px 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.progress-percentage {
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.progress-bar {
  border-radius: 8px;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 599px) {
  .progress-info {
    margin-bottom: 8px;
  }

  .progress-label {
    font-size: 12px;
  }

  .progress-percentage {
    font-size: 14px;
  }
}
</style>

<template>
  <div :class="['story-card', variant]" data-animate="fade-up" :data-delay="delay">
    <div class="story-icon">
      <v-icon :icon="icon" />
    </div>
    <h3 class="story-title">{{ title }}</h3>
    <p class="story-text">
      <slot>{{ description }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon: string
  variant: 'past' | 'present' | 'future'
  delay?: number
}

withDefaults(defineProps<Props>(), {
  description: '',
  delay: 400
})
</script>

<style scoped>
.story-card {
  background: rgb(var(--v-theme-surface));
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgb(var(--v-theme-surface-bright));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.story-card:hover::before {
  transform: scaleX(1);
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
  border-color: rgb(96, 165, 250);
}

.story-icon {
  width: 56px;
  height: 56px;
  background: transparent !important;
  background-color: transparent !important;
  border: 2px solid;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.story-card:hover .story-icon {
  background: transparent !important;
  background-color: transparent !important;
  transform: scale(1.1);
}

/* Story Icons - Cores individuais */
.story-card.past .story-icon {
  border-color: rgb(139, 92, 246);
}

.story-card.past .story-icon .v-icon {
  color: rgb(139, 92, 246) !important;
}

.story-card.present .story-icon {
  border-color: rgb(59, 130, 246);
}

.story-card.present .story-icon .v-icon {
  color: rgb(59, 130, 246) !important;
}

.story-card.future .story-icon {
  border-color: rgb(34, 211, 238);
}

.story-card.future .story-icon .v-icon {
  color: rgb(34, 211, 238) !important;
}

.story-icon .v-icon {
  font-size: 28px !important;
  background: transparent !important;
  background-color: transparent !important;
}

.story-icon .v-icon::before,
.story-icon .v-icon::after {
  background: transparent !important;
  background-color: transparent !important;
}

.story-title {
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  letter-spacing: -0.025em;
}

.story-text {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}
</style>

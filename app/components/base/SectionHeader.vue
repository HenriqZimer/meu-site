<template>
  <div :class="headerClasses" data-animate="fade-up">
    <!-- Badge -->
    <span
      v-if="badge"
      :class="badgeClasses"
      data-animate="fade-in"
      :data-delay="animationDelays.badge"
    >
      <v-icon v-if="icon" :icon="icon" start size="16" />
      {{ badge }}
    </span>

    <!-- Title -->
    <h2
      class="section-title"
      data-animate="fade-up"
      :data-delay="animationDelays.title"
    >
      <slot name="title">
        {{ titlePrefix }}
        <span class="title-highlight">{{ titleHighlight }}</span>
      </slot>
    </h2>

    <!-- Description -->
    <p
      v-if="description || $slots.description"
      class="section-description"
      data-animate="fade-up"
      :data-delay="animationDelays.description"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Slot para conteúdo adicional (ex: stats, progress bar) -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ANIMATION_DELAYS } from "~/constants";

interface Props {
  badge?: string;
  icon?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  theme?: "default" | "primary";
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  badge: "",
  icon: "",
  titlePrefix: "",
  titleHighlight: "",
  description: "",
  centered: true,
  theme: "default",
  customClass: "",
});

const headerClasses = computed(() => [
  props.centered ? "section-header" : "section-header-left",
  props.customClass,
]);

const badgeClasses = computed(() => [
  "section-badge",
  props.theme === "primary" ? "primary-theme" : "",
]);

const animationDelays = {
  badge: ANIMATION_DELAYS.BADGE,
  title: ANIMATION_DELAYS.TITLE,
  description: ANIMATION_DELAYS.DESCRIPTION,
};
</script>

<style scoped>
/* Usa classes CSS globais definidas em design-tokens.css e components.css */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-header-left {
  text-align: left;
  margin-bottom: 48px;
}
</style>

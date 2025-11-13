<template>
  <div class="modern-badges-section">
    <!-- Header com título e contador -->
    <div class="badges-header" v-if="showHeader">
      <div class="header-content">
        <h3 class="badges-title">
          <v-icon :icon="icon" :color="color" class="title-icon" />
          {{ title }}
        </h3>
        <v-chip :color="color" variant="elevated" size="small" class="badges-count">
          {{ badges.length }} {{ badges.length === 1 ? 'certificação' : 'certificações' }}
        </v-chip>
      </div>
      <p v-if="description" class="badges-description">{{ description }}</p>
    </div>

    <!-- Grid de Badges -->
    <div class="badges-grid" :class="gridClasses">
      <div
        v-for="(badge, index) in badges"
        :key="badge.id || index"
        class="badge-item"
        data-animate="fade-up"
        :data-delay="animationDelay + index * 100"
        :style="{ '--animation-delay': `${animationDelay + index * 100}ms` }"
      >
        <CredlyBadge
          :name="badge.name"
          :issuer="badge.issuer"
          :image="badge.image"
          :link="badge.link"
          :date="badge.date"
          :skills="badge.skills"
          :variant="badgeVariant"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Badge {
  id?: string
  name: string
  issuer: string
  image: string
  link: string
  date?: string
  skills?: number
}

interface Props {
  badges: Badge[]
  title?: string
  description?: string
  icon?: string
  color?: string
  columns?: number
  showHeader?: boolean
  badgeVariant?: 'default' | 'compact' | 'large'
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Certificações',
  description: '',
  icon: 'mdi-certificate',
  color: 'primary',
  columns: 4,
  showHeader: true,
  badgeVariant: 'default',
  animationDelay: 0
})

const gridClasses = computed(() => [
  `grid-cols-${props.columns}`
])
</script>

<style scoped>
.modern-badges-section {
  width: 100%;
}

.badges-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}

.badges-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.title-icon {
  font-size: 1.75rem;
}

.badges-count {
  font-weight: 600;
  font-size: 0.875rem;
}

.badges-description {
  font-size: 0.9375rem;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
}

/* Grid Layout */
.badges-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: stretch;
}

/* Grid Columns */
.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-5 {
  grid-template-columns: repeat(5, 1fr);
}

.badge-item {
  flex: 0 0 auto;
  width: 100%;
  max-width: 340px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--animation-delay);
}

/* fadeInUp animation available in /assets/css/components.css */

/* Responsivo */
@media (max-width: 1264px) {
  .badges-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 960px) {
  .badges-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px;
  }
  
  .badges-header {
    margin-bottom: 28px;
  }

  .badges-title {
    font-size: 1.375rem;
  }

  .badges-description {
    font-size: 0.875rem;
  }
}

@media (max-width: 599px) {
  .badges-grid {
    grid-template-columns: 1fr !important;
    gap: 12px;
  }

  .badges-header {
    margin-bottom: 24px;
  }
  
  .badges-title {
    font-size: 1.25rem;
  }

  .title-icon {
    font-size: 1.5rem;
  }

  .badges-description {
    font-size: 0.8125rem;
  }
}
</style>

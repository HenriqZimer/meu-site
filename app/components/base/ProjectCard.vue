<template>
  <v-card 
    :class="cardClasses"
    :elevation="elevation"
    :rounded="rounded"
    :style="cardStyles"
    data-animate="scale-up"
    :data-delay="animationDelay"
  >
    <!-- Imagem do projeto -->
    <div v-if="image || $slots.image" class="image-container">
      <slot name="image">
        <picture v-if="image">
          <source 
            :srcset="getImageSrc('webp')" 
            type="image/webp"
            :media="getMediaQuery()"
          >
          <source 
            :srcset="getImageSrc('webp', true)" 
            type="image/webp"
            :media="getMobileMediaQuery()"
          >
          <v-img
            :src="getImageSrc('webp')"
            :height="imageHeight"
            cover
            class="text-white"
            :alt="imageAlt"
            :loading="lazy ? 'lazy' : 'eager'"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-gradient-primary">
                <v-icon size="80" color="white" class="animate-pulse">{{ placeholderIcon }}</v-icon>
              </div>
            </template>

            <!-- Overlay com ações -->
            <div v-if="showOverlay" class="overlay">
              <slot name="overlay">
                <div class="d-flex gap-6">
                  <v-btn
                    v-if="demoUrl"
                    icon
                    size="large"
                    color="white"
                    class="overlay-btn"
                    :href="demoUrl"
                    target="_blank"
                    :aria-label="`Acessar demo do projeto ${title}`"
                    rel="noopener"
                  >
                    <v-icon>{{ demoIcon }}</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="githubUrl"
                    icon
                    size="large"
                    color="white"
                    class="overlay-btn"
                    :href="githubUrl"
                    target="_blank"
                    :aria-label="`Acessar código do projeto ${title} no GitHub`"
                    rel="noopener"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </div>
              </slot>
            </div>
          </v-img>
        </picture>
      </slot>
    </div>

    <!-- Conteúdo do card -->
    <div :class="contentClasses">
      <!-- Título -->
      <v-card-title v-if="title" :class="titleClasses">
        {{ title }}
      </v-card-title>

      <!-- Descrição -->
      <v-card-text v-if="description" :class="descriptionClasses">
        <p class="mb-4">
          {{ description }}
        </p>

        <!-- Tags/Tecnologias -->
        <div v-if="technologies.length > 0 || $slots.technologies" class="technologies-container">
          <slot name="technologies">
            <div class="d-flex flex-wrap justify-center gap-2">
              <v-chip
                v-for="(tech, index) in technologies"
                :key="tech"
                :size="chipSize"
                :color="chipColor"
                :variant="chipVariant"
                class="tech-chip"
                :class="chipClasses"
                :style="`animation-delay: ${1 + index * 0.05}s;`"
              >
                {{ tech }}
              </v-chip>
            </div>
          </slot>
        </div>
      </v-card-text>

      <!-- Slot para conteúdo customizado -->
      <div v-if="$slots.default" class="custom-content">
        <slot />
      </div>

      <!-- Actions (botões) -->
      <v-card-actions v-if="$slots.actions" :class="actionsClasses">
        <slot name="actions" />
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  image?: string
  imageHeight?: string | number
  imageAlt?: string
  technologies?: string[]
  demoUrl?: string
  githubUrl?: string
  elevation?: number | string
  rounded?: boolean | string
  hover?: boolean
  showOverlay?: boolean
  lazy?: boolean
  animationDelay?: number
  size?: 'small' | 'medium' | 'large'
  chipColor?: string
  chipVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  placeholderIcon?: string
  demoIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  image: '',
  imageHeight: 220,
  imageAlt: '',
  technologies: () => [],
  demoUrl: '',
  githubUrl: '',
  elevation: 4,
  rounded: 'xl',
  hover: true,
  showOverlay: true,
  lazy: true,
  animationDelay: 0,
  size: 'medium',
  chipColor: 'primary',
  chipVariant: 'tonal',
  placeholderIcon: 'mdi-code-braces',
  demoIcon: 'mdi-book-open-page-variant'
})

const { getResponsiveClasses, isMobile } = useResponsive()

// Classes do card
const cardClasses = computed(() => {
  const classes = ['project-card', 'h-100', 'd-flex', 'flex-column']
  
  if (props.hover) {
    classes.push('project-card--hover')
  }
  
  classes.push(`project-card--${props.size}`)
  
  return classes.join(' ')
})

// Estilos do card
const cardStyles = computed(() => ({}))

// Configurações de imagem responsiva
const getImageSrc = (format: string = 'webp', mobile: boolean = false) => {
  if (!props.image) return ''
  
  const width = mobile ? 300 : 400
  return `${props.image}?w=${width}&f=${format}`
}

const getMediaQuery = () => '(min-width: 600px)'
const getMobileMediaQuery = () => '(max-width: 599px)'

// Classes do conteúdo
const contentClasses = computed(() => {
  return 'flex-grow-1 d-flex flex-column'
})

// Classes do título
const titleClasses = computed(() => {
  const sizeMap = {
    small: 'text-h6 font-weight-bold pa-3 pb-1',
    medium: 'text-h6 font-weight-bold pa-4 pb-2',
    large: 'text-h5 font-weight-bold pa-5 pb-2'
  }
  
  return sizeMap[props.size]
})

// Classes da descrição
const descriptionClasses = computed(() => {
  const sizeMap = {
    small: 'flex-grow-1 pa-3 pt-1',
    medium: 'flex-grow-1 pa-4 pt-2',
    large: 'flex-grow-1 pa-5 pt-2'
  }
  
  return sizeMap[props.size]
})

// Configurações do chip
const chipSize = computed(() => {
  const sizeMap = {
    small: 'x-small',
    medium: 'small',
    large: 'default'
  }
  
  return sizeMap[props.size]
})

const chipClasses = computed(() => {
  return 'ma-1 animate-fade-up'
})

// Classes das ações
const actionsClasses = computed(() => {
  const sizeMap = {
    small: 'pa-3 pt-0',
    medium: 'pa-4 pt-0',
    large: 'pa-5 pt-0'
  }
  
  return sizeMap[props.size]
})
</script>

<style scoped>
.project-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.project-card--hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.project-card--small {
  max-width: 280px;
}

.project-card--medium {
  max-width: 350px;
}

.project-card--large {
  max-width: 400px;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.project-card--hover:hover .overlay {
  opacity: 1;
}

.overlay-btn {
  transform: scale(0.8);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9) !important;
  color: rgb(var(--v-theme-primary)) !important;
  backdrop-filter: blur(10px);
}

.project-card--hover:hover .overlay-btn {
  transform: scale(1);
}

.overlay-btn:hover {
  transform: scale(1.1) !important;
  background: rgba(255, 255, 255, 1) !important;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.tech-chip {
  transition: all 0.3s ease;
}

.tech-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.technologies-container {
  margin-top: auto;
}

.custom-content {
  flex-grow: 1;
}

/* Responsividade */
@media (max-width: 960px) {
  .project-card--hover:hover {
    transform: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  }
  
  .project-card--small,
  .project-card--medium,
  .project-card--large {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .tech-chip:hover {
    transform: none;
  }
}
</style>
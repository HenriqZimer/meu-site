<template>
  <v-card
    :class="cardClasses"
    :elevation="elevation"
    :rounded="rounded"
    :color="color"
    :style="cardStyles"
    data-animate="scale-up"
    :data-delay="animationDelay"
  >
    <div :class="contentClasses">
      <!-- Ícone -->
      <v-icon
        v-if="icon"
        :color="iconColor"
        :size="iconSize"
        :class="iconClasses"
      >
        {{ icon }}
      </v-icon>

      <!-- Valor principal -->
      <div :class="valueClasses" :data-target="value" ref="valueElement">
        {{ displayValue }}
      </div>

      <!-- Label/Descrição -->
      <div v-if="label" :class="labelClasses">
        {{ label }}
      </div>

      <!-- Conteúdo customizado -->
      <div v-if="$slots.default" class="mt-3">
        <slot />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  icon?: string;
  value: string | number;
  label?: string;
  color?: string;
  variant?: "elevated" | "flat" | "tonal" | "outlined" | "text" | "plain";
  size?: "small" | "medium" | "large";
  elevation?: number | string;
  rounded?: boolean | string;
  hover?: boolean;
  animationDelay?: number;
  animated?: boolean;
  statsStyle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "",
  label: "",
  color: "surface",
  variant: "flat",
  elevation: 6,
  rounded: "lg",
  animated: true,
  animationDelay: 0,
  size: "medium",
  hover: true,
  statsStyle: false,
});

const { getResponsiveClasses, isMobile } = useResponsive();
const { animateCounter } = useCounterAnimation();

const valueElement = ref<HTMLElement>();
const displayValue = ref(props.value.toString());
const hasAnimated = ref(false);

// Classes do card
const cardClasses = computed(() => {
  const classes = ["stat-card", "text-center", "h-100"];

  // Size
  classes.push(`stat-card--${props.size}`);

  // Stats style
  if (props.statsStyle) {
    classes.push("stat-card--stats");
  }

  // Hover
  if (props.hover) {
    classes.push("stat-card--hover");
  }

  return classes.join(" ");
});

// Estilos do card
const cardStyles = computed(() => ({
  minHeight: "130px",
}));

// Classes do conteúdo
const contentClasses = computed(() => {
  return getResponsiveClasses({
    xs: "pa-4 d-flex flex-column align-center justify-center h-100",
    sm: "pa-5 d-flex flex-column align-center justify-center h-100",
    md: "pa-6 d-flex flex-column align-center justify-center h-100",
    default: "pa-4 d-flex flex-column align-center justify-center h-100",
  });
});

// Configuração do ícone
const iconSize = computed(() => {
  const sizeMap = {
    small: isMobile.value ? 32 : 36,
    medium: isMobile.value ? 36 : 40,
    large: isMobile.value ? 40 : 48,
  };
  return sizeMap[props.size];
});

const iconColor = computed(() => {
  return props.color === "primary" ? "white" : "white";
});

const iconClasses = computed(() => {
  const classes = ["stat-icon", "mb-3"];
  return classes.join(" ");
});

// Configuração do valor
const valueClasses = computed(() => {
  const sizeClassMap = {
    small: getResponsiveClasses({
      xs: "text-h5 font-weight-bold mb-2",
      md: "text-h4 font-weight-bold mb-2",
      default: "text-h5 font-weight-bold mb-2",
    }),
    medium: getResponsiveClasses({
      xs: "text-h4 font-weight-bold mb-2",
      md: "text-h3 font-weight-bold mb-2",
      default: "text-h4 font-weight-bold mb-2",
    }),
    large: getResponsiveClasses({
      xs: "text-h3 font-weight-bold mb-2",
      md: "text-h2 font-weight-bold mb-2",
      default: "text-h3 font-weight-bold mb-2",
    }),
  };

  const classes = [sizeClassMap[props.size], "stat-value"];

  // Cor do texto baseada no fundo
  if (props.color === "primary") {
    classes.push("text-white");
  } else {
    classes.push("text-white");
  }

  return classes.join(" ");
});

// Configuração do label
const labelClasses = computed(() => {
  const classes = ["stat-label", "text-center"];

  // Tamanho responsivo
  classes.push(
    getResponsiveClasses({
      xs: "text-caption",
      sm: "text-body-2",
      default: "text-caption",
    })
  );

  // Cor do texto
  if (props.color === "primary") {
    classes.push("text-white");
  } else {
    classes.push("text-white");
  }

  return classes.join(" ");
});

// Animação do contador
const animateValue = () => {
  if (!props.animated || hasAnimated.value || !valueElement.value) return;

  const numericValue = parseInt(props.value.toString().replace(/\D/g, "")) || 0;
  const suffix = props.value.toString().replace(/\d/g, "");

  if (numericValue > 0) {
    displayValue.value = "0" + suffix;
    animateCounter(valueElement.value, numericValue, 1500, suffix);
    hasAnimated.value = true;
  }
};

// Observer para ativar animação quando visível
onMounted(() => {
  if (props.animated) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.value) {
            setTimeout(animateValue, props.animationDelay);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (valueElement.value) {
      observer.observe(valueElement.value);
    }
  }
});
</script>

<style scoped>
.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card--hover:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
}

.stat-card--small {
  min-height: 100px;
}

.stat-card--medium {
  min-height: 130px;
}

.stat-card--large {
  min-height: 160px;
}

.stat-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.stat-card--hover:hover .stat-icon {
  transform: scale(1.2);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.stat-value {
  font-family: "Inter", sans-serif !important;
  font-weight: 800 !important;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.stat-card--hover:hover .stat-value {
  transform: scale(1.1);
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
}

.stat-label {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* Variant: Stats */
.stat-card--stats {
  background: rgba(var(--v-theme-surface), 0.8);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  backdrop-filter: blur(10px);
}

.stat-card--stats:hover {
  background: rgba(var(--v-theme-surface), 0.9);
  border-color: rgba(var(--v-theme-primary), 0.2);
  transform: translateY(-4px) scale(1.02);
}

.stat-card--stats .stat-icon {
  transition: all 0.3s ease;
}

.stat-card--stats:hover .stat-icon {
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .stat-card--hover:hover {
    transform: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
  }
}
</style>

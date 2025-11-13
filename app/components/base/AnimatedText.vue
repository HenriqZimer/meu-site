<template>
  <component :is="tag" :class="textClasses" data-animate="fade-up" :data-delay="delay">
    <span v-if="animated" ref="textElement" :class="animatedContentClasses">
      {{ displayText }}
    </span>
    <template v-else>
      <slot>{{ text }}</slot>
    </template>
  </component>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  tag?: string;
  animated?: boolean;
  animationType?: "fade" | "typewriter" | "slide";
  delay?: number;
  duration?: number;
  size?:
  | "caption"
  | "body-2"
  | "body-1"
  | "h6"
  | "h5"
  | "h4"
  | "h3"
  | "h2"
  | "h1";
  weight?: "light" | "regular" | "medium" | "bold";
  color?: string;
  align?: "left" | "center" | "right";
  responsive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  tag: "p",
  animated: true,
  animationType: "fade",
  delay: 0,
  duration: 800,
  size: "body-1",
  weight: "regular",
  color: "",
  align: "left",
  responsive: true,
});

const { getResponsiveClasses, isMobile } = useResponsive();

const textElement = ref<HTMLElement>();
const displayText = ref("");
const isVisible = ref(false);

// Classes do texto
const textClasses = computed(() => {
  const classes = [];

  // Tamanho responsivo
  if (props.responsive) {
    const responsiveSizes = {
      h1: getResponsiveClasses({
        xs: "text-h4",
        sm: "text-h3",
        md: "text-h2",
        lg: "text-h1",
        default: "text-h4",
      }),
      h2: getResponsiveClasses({
        xs: "text-h5",
        sm: "text-h4",
        md: "text-h3",
        lg: "text-h2",
        default: "text-h5",
      }),
      h3: getResponsiveClasses({
        xs: "text-h6",
        sm: "text-h5",
        md: "text-h4",
        lg: "text-h3",
        default: "text-h6",
      }),
      h4: getResponsiveClasses({
        xs: "text-body-1",
        sm: "text-h6",
        md: "text-h5",
        lg: "text-h4",
        default: "text-body-1",
      }),
      h5: getResponsiveClasses({
        xs: "text-body-1",
        sm: "text-body-1",
        md: "text-h6",
        lg: "text-h5",
        default: "text-body-1",
      }),
      h6: getResponsiveClasses({
        xs: "text-body-2",
        sm: "text-body-1",
        md: "text-h6",
        default: "text-body-2",
      }),
    };

    classes.push(
      responsiveSizes[props.size as keyof typeof responsiveSizes] ||
      `text-${props.size}`
    );
  } else {
    classes.push(`text-${props.size}`);
  }

  // Peso da fonte
  const weightMap = {
    light: "font-weight-light",
    regular: "font-weight-regular",
    medium: "font-weight-medium",
    bold: "font-weight-bold",
  };
  classes.push(weightMap[props.weight]);

  // Alinhamento
  classes.push(`text-${props.align}`);

  // Cor
  if (props.color) {
    classes.push(`text-${props.color}`);
  }

  return classes.join(" ");
});

// Classes do conteúdo animado
const animatedContentClasses = computed(() => {
  const classes = ["animated-text"];

  if (props.animationType === "fade") {
    classes.push("fade-content");
  } else if (props.animationType === "slide") {
    classes.push("slide-content");
  }

  if (isVisible.value) {
    classes.push("visible");
  }

  return classes.join(" ");
});

// Animação de fade-in
const animateFade = () => {
  if (!textElement.value) return;

  setTimeout(() => {
    displayText.value = props.text;
    isVisible.value = true;
  }, props.delay);
};

// Animação typewriter
const animateTypewriter = () => {
  if (!textElement.value || !props.text) return;

  setTimeout(() => {
    let i = 0;
    const text = props.text;

    const typeChar = () => {
      if (i < text.length) {
        displayText.value = text.slice(0, i + 1);
        i++;

        let delay = 50;
        if (text[i - 1] === "." || text[i - 1] === "!" || text[i - 1] === "?") {
          delay = 800;
        } else if (text[i - 1] === "," || text[i - 1] === ";") {
          delay = 400;
        } else if (text[i - 1] === " ") {
          delay = 100;
        }

        setTimeout(typeChar, delay);
      } else {
        isVisible.value = true;
      }
    };

    typeChar();
  }, props.delay);
};

// Animação de slide
const animateSlide = () => {
  if (!textElement.value) return;

  setTimeout(() => {
    displayText.value = props.text;
    isVisible.value = true;
  }, props.delay);
};

// Inicializar animação
const initAnimation = () => {
  if (!props.animated) {
    displayText.value = props.text;
    isVisible.value = true;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (props.animationType) {
            case "fade":
              animateFade();
              break;
            case "typewriter":
              animateTypewriter();
              break;
            case "slide":
              animateSlide();
              break;
          }
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  if (textElement.value) {
    observer.observe(textElement.value);
  }
};

onMounted(() => {
  nextTick(() => {
    initAnimation();
  });
});

// Watchers para mudanças de props
watch(
  () => props.text,
  (newText) => {
    if (!props.animated) {
      displayText.value = newText;
    }
  }
);
</script>

<style scoped>
.animated-text {
  font-family: "Inter", sans-serif !important;
  line-height: 1.7;
}

.fade-content {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.slide-content {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-content.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Responsividade */
@media (max-width: 600px) {
  .animated-text {
    line-height: 1.5;
  }
}
</style>

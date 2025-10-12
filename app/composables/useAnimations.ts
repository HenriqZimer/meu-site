/**
 * Sistema de Animações Unificado
 * Composable centralizado para todas as animações do site
 */

import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Types
export interface AnimationConfig {
  delay?: number
  duration?: number
  ease?: string
  threshold?: number
  rootMargin?: string
}

export type AnimationType = 
  | 'fade-in' | 'fade-out'
  | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
  | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
  | 'scale-up' | 'scale-down'
  | 'rotate-in' | 'rotate-out'
  | 'bounce-in' | 'bounce-out'
  | 'flip-x' | 'flip-y'
  | 'zoom-in' | 'zoom-out'
  | 'pulse' | 'heartbeat'

// Configurações padrão
const DEFAULT_CONFIG: Required<AnimationConfig> = {
  delay: 0,
  duration: 600,
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  threshold: 0.1,
  rootMargin: '50px'
}

// Performance optimizations
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const GPU_ACCELERATION_CLASS = 'gpu-accelerated'

export const useAnimations = () => {
  // Estado
  const animatedElements = ref<Set<Element>>(new Set())
  const isReducedMotion = ref(false)
  let observer: IntersectionObserver | null = null
  let mediaQuery: MediaQueryList | null = null

  // Detectar preferência de movimento reduzido
  const checkReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
      isReducedMotion.value = mediaQuery.matches
      
      const handleChange = (e: MediaQueryListEvent) => {
        isReducedMotion.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery?.removeEventListener('change', handleChange)
    }
    return () => {}
  }

  // Aplicar otimizações de GPU
  const applyGPUOptimization = (element: HTMLElement) => {
    element.classList.add(GPU_ACCELERATION_CLASS)
    element.style.willChange = 'transform, opacity'
  }

  // Remover otimizações de GPU após animação
  const removeGPUOptimization = (element: HTMLElement) => {
    element.classList.remove(GPU_ACCELERATION_CLASS)
    element.style.willChange = 'auto'
  }

  // Criar observer para scroll animations
  const createScrollObserver = (config: AnimationConfig) => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.value.has(entry.target)) {
          const element = entry.target as HTMLElement
          triggerAnimation(element)
          animatedElements.value.add(element)
        }
      })
    }, {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    })
  }

  // Disparar animação
  const triggerAnimation = (element: HTMLElement) => {
    const delay = parseInt(element.dataset.delay || '0')
    const duration = parseInt(element.dataset.duration || DEFAULT_CONFIG.duration.toString())
    const animationType = element.dataset.animate || 'fade-in'

    // Aplicar otimizações de performance
    applyGPUOptimization(element)

    // Aplicar animação após delay
    setTimeout(() => {
      if (isReducedMotion.value) {
        // Para movimento reduzido, apenas mostrar sem animação
        element.classList.add('animation-complete')
        removeGPUOptimization(element)
      } else {
        element.classList.add('animate-visible', `animate-${animationType}`)
        
        // Remover otimizações após animação completar
        setTimeout(() => {
          removeGPUOptimization(element)
        }, duration + 100)
      }
    }, delay)
  }

  // Inicializar sistema de animações
  const initializeAnimationSystem = () => {
    observer = createScrollObserver(DEFAULT_CONFIG)
    
    // Observar todos os elementos com data-animate
    const animatableElements = document.querySelectorAll('[data-animate]')
    animatableElements.forEach((el) => {
      const element = el as HTMLElement
      
      // Adicionar classes iniciais
      element.classList.add('animate-initial')
      
      // Observar para scroll animations
      if (observer) {
        observer.observe(element)
      }
    })
  }

  // Animação manual (sem scroll trigger)
  const animate = (
    element: HTMLElement | string,
    animationType: AnimationType,
    config: AnimationConfig = {}
  ) => {
    const el = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element

    if (!el) return

    const finalConfig = { ...DEFAULT_CONFIG, ...config }
    
    // Aplicar configurações
    el.dataset.animate = animationType
    el.dataset.delay = finalConfig.delay.toString()
    el.dataset.duration = finalConfig.duration.toString()
    
    // Aplicar classes
    el.classList.add('animate-initial')
    
    // Disparar animação
    setTimeout(() => triggerAnimation(el), 0)
  }

  // Animação de contador
  const animateCounter = (
    element: HTMLElement | string,
    targetValue: number,
    config: AnimationConfig & { suffix?: string; prefix?: string } = {}
  ) => {
    const el = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element

    if (!el) return

    const { duration = 2000, suffix = '', prefix = '' } = config
    const startValue = 0
    const increment = targetValue / (duration / 16) // 60fps
    let currentValue = startValue

    const updateCounter = () => {
      currentValue += increment
      if (currentValue < targetValue) {
        el.textContent = prefix + Math.ceil(currentValue) + suffix
        requestAnimationFrame(updateCounter)
      } else {
        el.textContent = prefix + targetValue + suffix
      }
    }

    updateCounter()
  }

  // Animação de texto typewriter
  const animateTypewriter = (
    element: HTMLElement | string,
    text: string,
    config: AnimationConfig & { cursor?: boolean } = {}
  ) => {
    const el = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element

    if (!el) return

    const { delay = 0, duration = 50, cursor = true } = config
    let index = 0

    el.textContent = ''
    if (cursor) el.classList.add('typewriter-cursor')

    const typeCharacter = () => {
      if (index < text.length) {
        el.textContent += text.charAt(index)
        index++
        setTimeout(typeCharacter, duration)
      } else if (cursor) {
        setTimeout(() => {
          el.classList.remove('typewriter-cursor')
        }, 1000)
      }
    }

    setTimeout(typeCharacter, delay)
  }

  // Animação de morphing entre elementos
  const morphElements = (
    fromElement: HTMLElement,
    toElement: HTMLElement,
    config: AnimationConfig = {}
  ) => {
    const { duration = 600, ease = 'ease-in-out' } = config

    // FLIP technique
    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()

    const deltaX = fromRect.left - toRect.left
    const deltaY = fromRect.top - toRect.top
    const deltaW = fromRect.width / toRect.width
    const deltaH = fromRect.height / toRect.height

    // Aplicar transformação inicial
    toElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
    toElement.style.opacity = '0'

    // Animar para estado final
    requestAnimationFrame(() => {
      toElement.style.transition = `transform ${duration}ms ${ease}, opacity ${duration}ms ${ease}`
      toElement.style.transform = 'translate(0, 0) scale(1, 1)'
      toElement.style.opacity = '1'

      // Limpar estilos após animação
      setTimeout(() => {
        toElement.style.transform = ''
        toElement.style.transition = ''
        toElement.style.opacity = ''
      }, duration)
    })
  }

  // Utility para pause/resume animações
  const pauseAnimations = () => {
    document.documentElement.style.setProperty('--animation-play-state', 'paused')
  }

  const resumeAnimations = () => {
    document.documentElement.style.setProperty('--animation-play-state', 'running')
  }

  // Cleanup
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    
    // Limpar elementos observados
    animatedElements.value.clear()
  }

  // Lifecycle
  onMounted(() => {
    const cleanupReducedMotion = checkReducedMotion()
    
    nextTick(() => {
      initializeAnimationSystem()
    })

    onUnmounted(() => {
      cleanup()
      cleanupReducedMotion()
    })
  })

  return {
    // Estado
    isReducedMotion,
    animatedElements,
    
    // Métodos principais
    animate,
    animateCounter,
    animateTypewriter,
    morphElements,
    
    // Controle
    pauseAnimations,
    resumeAnimations,
    
    // Re-inicialização (útil para SPA)
    initializeAnimationSystem,
    cleanup
  }
}

// Export de utilitários standalone
export { DEFAULT_CONFIG, GPU_ACCELERATION_CLASS }
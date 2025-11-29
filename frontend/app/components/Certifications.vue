<template>
  <Section id="certifications" badge="Certificações" badge-icon="mdi-certificate" badge-color="warning"
    title-prefix="Minhas" title-highlight="Certificações"
    description="Desenvolvimento profissional contínuo através de certificações e especializações em tecnologias cloud e DevOps"
    section-class="py-10 py-md-16" container-class="px-4 px-md-6" :no-header="false">

    <!-- Badges -->
    <div class="certifications-content">
      <CredlyBadgeGrid :badges="credlyBadges" :show-header="false" :columns="responsiveColumns" :animation-delay="600"
        :enable-scroll-animation="true" />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Stat } from '~/components/base/StatsGrid.vue'

// Types & Interfaces
interface Badge {
  name: string
  issuer: string
  image: string
  link: string
  date?: string
  skills?: number
}

interface Certification {
  name: string
  issuer: string
  icon?: string
  color?: string
  image?: string
  link: string
}

// Store
const certificationsStore = useCertificationsStore()

// Composables
const { isMobile, isTablet, isDesktop, getResponsiveValue } = useResponsive()

// Scroll Animation
const { observeElements } = useScrollAnimation()

onMounted(async () => {
  observeElements({
    threshold: 0.1,
    once: true
  })

  // Carregar certificações da API
  await certificationsStore.fetchCertifications()

  // Animações de scroll para os badges
  setTimeout(() => {
    const animateBadgesOnScroll = () => {
      const badges = document.querySelectorAll('.modern-badge-card')

      badges.forEach((badge, index) => {
        const element = badge as HTMLElement
        element.setAttribute('data-animate', 'flip-in')
        element.setAttribute('data-delay', String(index * 100))
      })

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const delay = element.getAttribute('data-delay')

            setTimeout(() => {
              element.classList.add('is-visible')
            }, delay ? parseInt(delay) : 0)

            observer.unobserve(element)
          }
        })
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      })

      badges.forEach(badge => observer.observe(badge))
    }

    animateBadgesOnScroll()

    // Adicionar efeito parallax 3D nos badges
    setTimeout(() => {
      const badges = document.querySelectorAll('.modern-badge-card')

      badges.forEach(badge => {
        badge.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent
          const element = badge as HTMLElement
          const rect = element.getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left
          const y = mouseEvent.clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateXVal = ((y - centerY) / centerY) * -8
          const rotateYVal = ((x - centerX) / centerX) * 8

          element.style.transform = 'perspective(1000px) rotateX(' + rotateXVal + 'deg) rotateY(' + rotateYVal + 'deg) translateY(-8px) scale(1.03)'
        })

        badge.addEventListener('mouseleave', () => {
          (badge as HTMLElement).style.transform = ''
        })
      })
    }, 1500)
  }, 500)
})

// Computed do store
const credlyBadges = computed(() => certificationsStore.allCertifications)
const loading = computed(() => certificationsStore.loading)

// Responsive columns
const responsiveColumns = computed(() => {
  if (isMobile.value) return 1
  if (isTablet.value) return 2
  return 4
})

// Computed stats
const certificationStats = computed<Stat[]>(() => [
  {
    icon: 'mdi-certificate',
    value: certificationsStore.certificationsCount,
    label: 'Certificações',
    color: 'success'
  }
])
</script>

<style scoped>
/* === CERTIFICATIONS CONTENT === */
.certifications-content {
  width: 100%;
  margin: 0 auto;
}

/* All other styles inherited from Section component and CredlyBadgeGrid */
</style>
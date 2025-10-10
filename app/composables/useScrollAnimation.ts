export const useScrollAnimation = () => {
  const observeElements = () => {
    if (import.meta.client) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in')
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      // Observar todos os elementos com a classe 'animate-on-scroll'
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))

      return observer
    }
  }

  return {
    observeElements
  }
}

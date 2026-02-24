<script setup lang="ts">
// Global scroll reveal initialization
onMounted(() => {
  if (typeof window === 'undefined') return

  const initReveal = () => {
    const selectors = [
      '.reveal',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
      '.reveal-fade',
      '.stagger-children'
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    )

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el)
      })
    })
  }

  // Wait for page to be fully rendered
  nextTick(() => {
    setTimeout(initReveal, 100)
  })
})
</script>

<template>
  <NuxtPage />
</template>

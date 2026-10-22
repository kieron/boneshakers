<script setup lang="ts">
// Opening sequence: see docs/design-spec.md. The head script in nuxt.config.ts sets
// html[data-intro] before first paint on a fresh load; this covers arriving here by
// client-side navigation and ends (or skips) the sequence.
const INTRO_MS = { play: 2800, fade: 300 } as const

let endTimer: ReturnType<typeof setTimeout> | undefined

const endIntro = () => {
  clearTimeout(endTimer)
  delete document.documentElement.dataset.intro
  window.removeEventListener('keydown', endIntro)
  window.removeEventListener('pointerdown', endIntro)
}

onMounted(() => {
  const html = document.documentElement
  if (!html.dataset.intro && !sessionStorage.getItem('bs-intro')) {
    sessionStorage.setItem('bs-intro', '1')
    html.dataset.intro = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'fade' : 'play'
  }
  const mode = html.dataset.intro as keyof typeof INTRO_MS | undefined
  if (!mode) return
  endTimer = setTimeout(endIntro, INTRO_MS[mode] ?? 0)
  window.addEventListener('keydown', endIntro)
  window.addEventListener('pointerdown', endIntro)
})

onBeforeUnmount(endIntro)

useHead({ title: 'Boneshakers Tattoo Studio' })
</script>

<template>
  <section class="home">
    <h1 class="sr-only">Boneshakers tattoo and piercing studio</h1>
    <div class="home-skull swatches">
      <div class="roll">
        <div class="wobble">
          <SkullLogo track blink interactive title="Boneshakers skull. Click it." />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 5rem);
  min-height: calc(100svh - 5rem);
  display: grid;
  place-items: center;
  padding: 5rem var(--gutter) 0;
}

.home-skull {
  width: min(36vh, 70vw);
}

.roll,
.wobble {
  transform-origin: 50% 55%;
}

/* Opening sequence */
html[data-intro='play'] .roll {
  animation: roll-in 1400ms cubic-bezier(0.3, 0.7, 0.4, 1) 400ms both;
}

html[data-intro='play'] .wobble {
  animation: settle 600ms var(--ease-wobble) 1800ms both;
}

html[data-intro='play'] .home-skull :deep(.jaw) {
  animation: chatter 150ms steps(2) 1800ms 4;
}

html[data-intro='play'] .home-skull::before,
html[data-intro='play'] .home-skull::after {
  animation: swatch-pop 500ms var(--ease-wobble) 1500ms both;
}

html[data-intro='fade'] .home-skull {
  animation: fade-in 300ms ease-out both;
}

@keyframes roll-in {
  0% { transform: translateX(calc(-50vw - 100%)) rotate(-720deg); }
  72% { transform: translateX(0) rotate(-6deg); }
  84% { transform: translateX(0) translateY(-28px) rotate(-3deg); }
  100% { transform: translateX(0) translateY(0) rotate(0); }
}

@keyframes settle {
  0% { transform: rotate(0); }
  25% { transform: rotate(9deg); }
  50% { transform: rotate(-6deg); }
  75% { transform: rotate(3deg); }
  100% { transform: rotate(0); }
}

@keyframes chatter {
  50% { transform: rotate(6deg); }
}

@keyframes swatch-pop {
  from { transform: scale(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
}
</style>

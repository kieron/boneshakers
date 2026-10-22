<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

watch(() => route.fullPath, () => (open.value = false))

watch(open, (value) => {
  if (import.meta.client) document.documentElement.style.overflow = value ? 'hidden' : ''
})

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled && !open }">
    <NuxtLink to="/" class="wordmark" aria-label="Boneshakers, home">
      <img src="/skull-logo.svg" alt="" width="36" height="40" />
      <span>Boneshakers</span>
    </NuxtLink>

    <nav class="menu" aria-label="Main">
      <ul>
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="menu-link"
            :class="{ 'is-active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            <span class="sr-only">{{ item.label }}</span>
            <span aria-hidden="true" class="jitter">
              <span v-for="(letter, i) in item.label.split('')" :key="i" :style="{ '--i': i }">{{ letter === ' ' ? ' ' : letter }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      @click="open = !open"
    >
      {{ open ? 'Close' : 'Menu' }}
    </button>

    <div v-show="open" id="mobile-menu" class="mobile-menu">
      <ul>
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            :class="{ 'is-active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem var(--gutter);
  font-family: var(--font-display);
  font-size: clamp(22px, 2.3vw, 30px);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  pointer-events: none;
  transition: background-color 200ms ease, box-shadow 200ms ease, padding 200ms ease;
}

.site-header.is-scrolled {
  background: var(--navy);
  box-shadow: 0 4px 0 var(--slate);
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}

.site-header > * {
  pointer-events: auto;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.15em;
  letter-spacing: 0.1em;
}

.wordmark img {
  display: block;
  width: 1.45em;
  height: auto;
  transition: transform 300ms var(--ease-wobble);
}

.wordmark:hover img {
  transform: rotate(-12deg) scale(1.08);
}

.menu ul {
  display: flex;
  gap: clamp(1.25rem, 2.6vw, 2.5rem);
  list-style: none;
}

.menu-link {
  position: relative;
  display: inline-block;
  padding: 0.25rem 0;
}

.menu-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 5px;
  border-radius: 3px;
  background: var(--slate);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 150ms var(--ease-out);
}

.menu-link:hover::after {
  background: var(--sage);
  transform: scaleX(1);
}

.menu-link.is-active::after {
  background: var(--slate);
  transform: scaleX(1);
}

.jitter span {
  display: inline-block;
}

.menu-link:hover .jitter span {
  animation: jitter 300ms steps(3) infinite;
  animation-delay: calc(var(--i) * -70ms);
}

@keyframes jitter {
  0% { transform: translate(0, 0); }
  33% { transform: translate(1px, -2px) rotate(-3deg); }
  66% { transform: translate(-1px, 1px) rotate(2deg); }
  100% { transform: translate(0, 0); }
}

.menu-toggle {
  display: none;
  background: none;
  border: 0;
  color: var(--bone);
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
  padding: 0.25rem 0;
  position: relative;
  z-index: 2;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: var(--slate);
  display: grid;
  place-items: center;
}

.mobile-menu ul {
  list-style: none;
  text-align: center;
  display: grid;
  gap: 1.25rem;
}

.mobile-menu a {
  font-family: var(--font-display);
  font-size: 3rem;
  letter-spacing: 0.02em;
  line-height: 1;
  padding: 0 0.25rem;
}

.mobile-menu a.is-active {
  background: var(--navy);
}

@media (max-width: 920px) {
  .menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .wordmark {
    position: relative;
    z-index: 2;
  }
}

@media (min-width: 921px) {
  .mobile-menu {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-link:hover .jitter span {
    animation: none;
  }

  .menu-link::after,
  .site-header {
    transition: none;
  }

  .wordmark:hover img {
    transform: none;
  }

  .menu-link:hover {
    color: var(--sage-text);
  }
}
</style>

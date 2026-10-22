<script setup lang="ts">
const route = useRoute()
const open = ref(false)

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

watch(() => route.fullPath, () => (open.value = false))

watch(open, (value) => {
  if (import.meta.client) document.documentElement.style.overflow = value ? 'hidden' : ''
})

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="site-header">
    <NuxtLink to="/" class="wordmark" aria-label="Boneshakers, home">Boneshakers</NuxtLink>

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
  padding: 1.5rem var(--gutter);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  pointer-events: none;
}

.site-header > * {
  pointer-events: auto;
}

.wordmark {
  font-weight: 700;
  letter-spacing: 0.25em;
}

.menu ul {
  display: flex;
  gap: 1.75rem;
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
  bottom: -2px;
  height: 3px;
  background: var(--slate);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 150ms var(--ease-out);
}

.menu-link.is-active::after {
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
  33% { transform: translate(1px, -2px); }
  66% { transform: translate(-1px, 1px); }
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

@media (max-width: 760px) {
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

@media (min-width: 761px) {
  .mobile-menu {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-link:hover .jitter span {
    animation: none;
  }

  .menu-link::after {
    transition: none;
  }

  .menu-link:hover {
    color: var(--sage-text);
  }
}
</style>

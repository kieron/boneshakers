<script setup lang="ts">
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <nav :class="{ scrolled, 'menu-open': mobileMenuOpen }">
    <div class="nav-inner">
      <a href="#" class="logo">
        <span class="logo-text">Bone</span>
        <span class="logo-accent">shakers</span>
      </a>

      <ul class="nav-links" :class="{ active: mobileMenuOpen }">
        <li><a href="#shop" @click="closeMenu">Shop</a></li>
        <li><a href="#tattoos" @click="closeMenu">Tattoos</a></li>
        <li><a href="#piercings" @click="closeMenu">Piercings</a></li>
        <li><a href="#services" @click="closeMenu">Services</a></li>
        <li><a href="#about" @click="closeMenu">About</a></li>
        <li><a href="#faq" @click="closeMenu">FAQ</a></li>
        <li><a href="#contact" @click="closeMenu" class="nav-cta">Contact</a></li>
      </ul>

      <button
        class="mobile-menu-btn"
        :class="{ active: mobileMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 var(--space-md);
  transition: background 0.4s var(--ease-out-expo), padding 0.4s var(--ease-out-expo);
}

nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--black);
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
  pointer-events: none;
}

nav.scrolled::before {
  opacity: 0.95;
}

nav.scrolled {
  backdrop-filter: blur(10px);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 0;
  position: relative;
  z-index: 1;
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s var(--ease-out-expo);
}

nav.scrolled .nav-inner {
  border-bottom-color: var(--border);
}

.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  display: flex;
  gap: 0;
  text-decoration: none;
}

.logo-text {
  color: var(--text);
}

.logo-accent {
  color: var(--accent);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-md);
  align-items: center;
}

.nav-links a {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s var(--ease-out-expo);
}

.nav-links a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease-out-expo);
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-cta {
  color: var(--accent) !important;
  border: 1px solid var(--accent);
  padding: 0.5rem 1rem !important;
  transition: background 0.3s var(--ease-out-expo), color 0.3s var(--ease-out-expo) !important;
}

.nav-cta::before {
  display: none;
}

.nav-cta:hover {
  background: var(--accent);
  color: var(--black) !important;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 40px;
  height: 40px;
  position: relative;
}

.mobile-menu-btn span {
  width: 20px;
  height: 1px;
  background: var(--text);
  transition: transform 0.3s var(--ease-out-expo), opacity 0.3s var(--ease-out-expo);
  position: absolute;
}

.mobile-menu-btn span:first-child {
  transform: translateY(-4px);
}

.mobile-menu-btn span:last-child {
  transform: translateY(4px);
}

.mobile-menu-btn.active span:first-child {
  transform: translateY(0) rotate(45deg);
}

.mobile-menu-btn.active span:last-child {
  transform: translateY(0) rotate(-45deg);
}

@media (max-width: 968px) {
  nav {
    padding: 0 var(--space-sm);
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: calc(-1 * var(--space-sm));
    right: calc(-1 * var(--space-sm));
    background: var(--dark);
    flex-direction: column;
    padding: var(--space-md);
    gap: 0;
    border-top: 1px solid var(--border);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    width: 100%;
    border-bottom: 1px solid var(--border);
  }

  .nav-links li:last-child {
    border-bottom: none;
    margin-top: var(--space-sm);
  }

  .nav-links a {
    display: block;
    padding: var(--space-sm) 0;
    font-size: 0.8rem;
  }

  .nav-cta {
    text-align: center;
    border: 1px solid var(--accent) !important;
    padding: var(--space-sm) !important;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>

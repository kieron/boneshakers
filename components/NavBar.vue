<script setup lang="ts">
const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav>
    <div class="container">
      <a href="#" class="logo">BONE<span>SHAKERS</span></a>
      <ul class="nav-links" :class="{ active: mobileMenuOpen }">
        <li><a href="#shop" @click="closeMenu">Shop</a></li>
        <li><a href="#tattoos" @click="closeMenu">Tattoos</a></li>
        <li><a href="#piercings" @click="closeMenu">Piercings</a></li>
        <li><a href="#services" @click="closeMenu">Services</a></li>
        <li><a href="#about" @click="closeMenu">About</a></li>
        <li><a href="#faq" @click="closeMenu">FAQ</a></li>
        <li><a href="#contact" @click="closeMenu">Contact</a></li>
      </ul>
      <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Toggle menu">
        <span></span>
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
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid var(--border);
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.logo {
  font-family: 'Oswald', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 3px;
}

.logo span {
  color: var(--accent);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  color: var(--text);
  font-family: 'Oswald', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 2px;
  background: var(--text);
  transition: 0.3s;
}

@media (max-width: 968px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--dark);
    flex-direction: column;
    padding: 20px;
    gap: 15px;
  }

  .nav-links.active {
    display: flex;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>

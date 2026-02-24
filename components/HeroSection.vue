<script setup lang="ts">
const heroLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    heroLoaded.value = true
  }, 100)
})
</script>

<template>
  <section class="hero" :class="{ loaded: heroLoaded }">
    <div class="hero-bg"></div>
    <div class="hero-grain"></div>

    <!-- Decorative lines -->
    <div class="hero-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <div class="hero-content">
      <div class="hero-badge">Est. 2024</div>

      <div class="skull-logo">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="45" rx="35" ry="40"/>
          <ellipse cx="35" cy="40" rx="10" ry="12" fill="var(--black)"/>
          <ellipse cx="65" cy="40" rx="10" ry="12" fill="var(--black)"/>
          <ellipse cx="50" cy="55" rx="5" ry="8" fill="var(--black)"/>
          <rect x="38" y="75" width="5" height="12" rx="1"/>
          <rect x="47" y="75" width="5" height="12" rx="1"/>
          <rect x="56" y="75" width="5" height="12" rx="1"/>
        </svg>
      </div>

      <h1>
        <span class="title-line">Bone</span>
        <span class="title-line">Shakers</span>
      </h1>

      <div class="hero-tagline">
        <span class="tagline-dash"></span>
        <p>Tattoo & Piercing Studio</p>
        <span class="tagline-dash"></span>
      </div>

      <a href="#contact" class="btn">
        <span>Book a Consultation</span>
      </a>
    </div>

    <div class="scroll-indicator">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&h=1080&fit=crop');
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) contrast(1.1);
  transform: scale(1.1);
  transition: transform 1.5s var(--ease-out-expo);
}

.hero.loaded .hero-bg {
  transform: scale(1);
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.4) 0%, rgba(8, 8, 8, 0.8) 100%),
    radial-gradient(ellipse at 50% 30%, transparent 0%, var(--black) 70%);
}

.hero-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
}

/* Decorative animated lines */
.hero-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.line {
  position: absolute;
  background: var(--accent);
  opacity: 0.1;
}

.line-1 {
  width: 1px;
  height: 200px;
  left: 15%;
  top: -200px;
  animation: lineDown 3s var(--ease-out-expo) infinite;
  animation-delay: 0s;
}

.line-2 {
  width: 1px;
  height: 150px;
  right: 20%;
  top: -150px;
  animation: lineDown 3s var(--ease-out-expo) infinite;
  animation-delay: 1s;
}

.line-3 {
  width: 1px;
  height: 180px;
  left: 40%;
  top: -180px;
  animation: lineDown 3s var(--ease-out-expo) infinite;
  animation-delay: 2s;
}

@keyframes lineDown {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.15;
  }
  90% {
    opacity: 0.15;
  }
  100% {
    transform: translateY(calc(100vh + 200px));
    opacity: 0;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo);
  transition-delay: 0.3s;
}

.hero.loaded .hero-content {
  opacity: 1;
  transform: translateY(0);
}

.hero-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: var(--space-md);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  transition-delay: 0.5s;
}

.hero.loaded .hero-badge {
  opacity: 1;
  transform: translateY(0);
}

.skull-logo {
  width: 140px;
  height: 140px;
  margin: 0 auto var(--space-md);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  transition-delay: 0.6s;
}

.hero.loaded .skull-logo {
  opacity: 1;
  transform: scale(1);
}

.skull-logo::before {
  content: '';
  position: absolute;
  inset: -10px;
  border: 1px solid var(--accent);
  opacity: 0.3;
  animation: skullPulse 3s ease-in-out infinite;
}

.skull-logo::after {
  content: '';
  position: absolute;
  inset: -25px;
  border: 1px solid var(--accent);
  opacity: 0.1;
  animation: skullPulse 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes skullPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.2;
  }
}

.skull-logo svg {
  width: 90px;
  height: 90px;
  fill: var(--accent);
  filter: drop-shadow(0 0 30px var(--accent-glow));
}

.hero h1 {
  font-size: clamp(4rem, 15vw, 10rem);
  line-height: 0.85;
  margin-bottom: var(--space-md);
  display: flex;
  flex-direction: column;
}

.title-line {
  display: block;
  overflow: hidden;
}

.title-line:nth-child(1) {
  color: var(--text);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  transition-delay: 0.7s;
}

.title-line:nth-child(2) {
  color: var(--accent);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  transition-delay: 0.85s;
}

.hero.loaded .title-line {
  opacity: 1;
  transform: translateY(0);
}

.hero-tagline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  opacity: 0;
  transition: opacity 0.8s var(--ease-out-expo);
  transition-delay: 1s;
}

.hero.loaded .hero-tagline {
  opacity: 1;
}

.tagline-dash {
  width: 30px;
  height: 1px;
  background: var(--text-muted);
}

.hero-tagline p {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.hero .btn {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo), color 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo);
  transition-delay: 1.1s;
}

.hero.loaded .btn {
  opacity: 1;
  transform: translateY(0);
}

.scroll-indicator {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeInUp 0.8s var(--ease-out-expo) forwards;
  animation-delay: 1.5s;
}

.scroll-indicator span {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--accent), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.6);
    opacity: 0.5;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 968px) {
  .hero h1 {
    font-size: 4rem;
  }

  .skull-logo {
    width: 120px;
    height: 120px;
  }

  .skull-logo svg {
    width: 70px;
    height: 70px;
  }

  .line-1, .line-3 {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 3rem;
  }

  .skull-logo {
    width: 100px;
    height: 100px;
  }

  .skull-logo svg {
    width: 60px;
    height: 60px;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>

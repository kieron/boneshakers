<script setup lang="ts">
const services = [
  {
    title: 'Laser Removal',
    description: 'Professional laser tattoo removal. Whether you want complete removal or a fade for cover-up work.',
    icon: 'M12 3v18m-9-9h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364'
  },
  {
    title: 'Art Commissions',
    description: 'Our artists are available for custom artwork, prints, and commissions outside of tattooing.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'Cosmetic Tattooing',
    description: 'Enhance your natural beauty with cosmetic tattooing including eyebrows, lip liner, and beauty spots.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  }
]
</script>

<template>
  <section id="services">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">What We Do</p>
        <h2>Other Services</h2>
        <div class="divider"></div>
        <p>Beyond tattoos and piercings</p>
      </div>

      <div class="services-grid reveal stagger-children">
        <article v-for="service in services" :key="service.title" class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path :d="service.icon" />
            </svg>
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
          <span class="service-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
#services {
  background:
    radial-gradient(ellipse at 80% 20%, var(--accent-dim) 0%, transparent 40%),
    var(--black);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.service-card {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-lg);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  transition:
    border-color 0.4s var(--ease-out-expo),
    transform 0.4s var(--ease-out-expo);
  cursor: pointer;
}

.service-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

.service-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.4s var(--ease-out-expo);
}

.service-card:hover::before {
  width: 100%;
}

.service-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.service-icon svg {
  width: 32px;
  height: 32px;
}

.service-content {
  flex: 1;
}

.service-content h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
  color: var(--text);
}

.service-content p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
}

.service-arrow {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-subtle);
  transition: color 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo);
}

.service-arrow svg {
  width: 20px;
  height: 20px;
}

.service-card:hover .service-arrow {
  color: var(--accent);
  transform: translateX(4px);
}

@media (max-width: 968px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .service-card {
    flex-direction: row;
    align-items: center;
    padding: var(--space-md);
  }

  .service-content h3 {
    font-size: 1.2rem;
  }

  .service-arrow {
    display: none;
  }
}
</style>

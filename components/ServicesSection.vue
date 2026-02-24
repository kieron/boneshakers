<template>
  <section id="services">
    <div class="container">
      <div class="section-header">
        <h2>Other Services</h2>
        <div class="divider"></div>
        <p>Beyond tattoos and piercings, we offer a range of additional services</p>
      </div>
      <div class="services-grid">
        <div v-for="service in services" :key="service.title" class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="service.icon"></svg>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Laser Removal',
    description: 'Professional laser tattoo removal services. Whether you want a complete removal or fade for a cover-up, we can help.',
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
  },
  {
    title: 'Art Commissions',
    description: 'Our talented artists are available for custom artwork, prints, and commissions outside of tattooing.',
    icon: '<path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z"/>'
  },
  {
    title: 'Cosmetic Tattooing',
    description: 'Enhance your natural beauty with cosmetic tattooing including eyebrows, lip liner, and beauty spots.',
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
  }
]
</script>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: var(--dark);
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
  border: 2px solid transparent;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
}

.service-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background: var(--darker);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon svg {
  width: 40px;
  height: 40px;
  fill: var(--accent);
}

.service-card h3 {
  margin-bottom: 15px;
}

.service-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 968px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>

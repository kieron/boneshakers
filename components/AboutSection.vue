<script setup lang="ts">
</script>

<template>
  <section id="about">
    <div class="container">
      <div class="about-layout">
        <div class="about-content reveal-left">
          <p class="section-label">Who We Are</p>
          <h2>Our Story</h2>
          <div class="divider-left"></div>

          <div class="about-text">
            <p>Boneshakers Tattoo Studio has been serving the community with exceptional tattoo artistry and professional piercing services.</p>
            <p>Our team of dedicated artists brings years of combined experience and a passion for creating unique, meaningful body art. We pride ourselves on maintaining the highest standards of hygiene and using only premium quality inks and equipment.</p>
            <p>Every client receives personalized attention, whether it's your first tattoo or you're adding to your collection.</p>
          </div>

          <div class="about-stats">
            <div class="stat">
              <span class="stat-number">10+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">5K+</span>
              <span class="stat-label">Happy Clients</span>
            </div>
            <div class="stat">
              <span class="stat-number">4</span>
              <span class="stat-label">Resident Artists</span>
            </div>
          </div>
        </div>

        <div class="about-visual reveal-right">
          <div class="image-stack">
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&h=400&fit=crop"
              alt="Tattoo Studio"
              class="stack-image stack-1"
            />
            <div class="stack-accent"></div>
          </div>
        </div>
      </div>

      <div class="location-bar reveal">
        <div class="location-item">
          <span class="location-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <div class="location-text">
            <span class="location-label">Location</span>
            <span class="location-value">123 High Street, Your Town, AB1 2CD</span>
          </div>
        </div>

        <div class="location-divider"></div>

        <div class="location-item">
          <span class="location-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div class="location-text">
            <span class="location-label">Hours</span>
            <span class="location-value">Mon - Sat: 10am - 6pm</span>
          </div>
        </div>

        <div class="location-divider"></div>

        <div class="location-item">
          <span class="location-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          <div class="location-text">
            <span class="location-label">Contact</span>
            <span class="location-value">01onal 123 456</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about {
  background: var(--darker);
  overflow: hidden;
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: center;
  margin-bottom: var(--space-xl);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.about-content h2 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: var(--space-sm);
  color: var(--text);
}

.divider-left {
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: var(--space-md);
}

.about-text {
  margin-bottom: var(--space-lg);
}

.about-text p {
  color: var(--text-muted);
  margin-bottom: var(--space-sm);
  line-height: 1.8;
}

.about-text p:last-child {
  margin-bottom: 0;
}

.about-stats {
  display: flex;
  gap: var(--space-lg);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.about-visual {
  position: relative;
}

.image-stack {
  position: relative;
}

.stack-image {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(20%);
}

.stack-accent {
  position: absolute;
  top: var(--space-md);
  right: calc(-1 * var(--space-md));
  bottom: calc(-1 * var(--space-md));
  left: var(--space-md);
  border: 1px solid var(--accent);
  z-index: -1;
}

.location-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-md) var(--space-lg);
}

.location-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.location-icon {
  width: 24px;
  height: 24px;
  color: var(--accent);
}

.location-icon svg {
  width: 100%;
  height: 100%;
}

.location-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.location-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.location-value {
  font-size: 0.85rem;
  color: var(--text);
}

.location-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

@media (max-width: 968px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .about-visual {
    order: -1;
  }

  .stack-accent {
    display: none;
  }

  .location-bar {
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md);
  }

  .location-divider {
    width: 100%;
    height: 1px;
  }

  .location-item {
    width: 100%;
  }

  .about-stats {
    gap: var(--space-md);
  }
}
</style>

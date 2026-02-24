<script setup lang="ts">
const priceList = [
  { name: 'Earlobe', price: 'From £25' },
  { name: 'Helix / Cartilage', price: 'From £30' },
  { name: 'Tragus / Conch', price: 'From £35' },
  { name: 'Daith / Rook', price: 'From £35' },
  { name: 'Industrial', price: 'From £45' },
  { name: 'Nostril', price: 'From £30' },
  { name: 'Septum', price: 'From £35' },
  { name: 'Lip / Labret', price: 'From £35' },
  { name: 'Tongue', price: 'From £40' },
  { name: 'Navel', price: 'From £35' },
  { name: 'Nipple (single)', price: 'From £40' }
]

const features = [
  'Implant-grade titanium jewellery only',
  'Single-use sterile equipment',
  'Aftercare guidance included',
  'Wide range of jewellery styles',
  'Downsizing appointments included'
]
</script>

<template>
  <section id="piercings" class="corner-accents">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">Body Art</p>
        <h2>Piercings</h2>
        <div class="divider"></div>
        <p>Professional body piercing with only the highest quality titanium jewellery</p>
      </div>

      <div class="piercings-layout">
        <div class="piercings-left reveal-left">
          <div class="piercer-card">
            <div class="piercer-image-wrapper">
              <img
                class="piercer-image"
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop&crop=face"
                alt="Lisa"
              />
            </div>
            <div class="piercer-info">
              <h3>Lisa</h3>
              <p class="piercer-role">Lead Piercer</p>
              <p class="piercer-bio">Our experienced piercer with years of expertise in all types of body piercings.</p>
              <div class="social-links">
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="features-card">
            <h4>Why Choose Us</h4>
            <ul>
              <li v-for="feature in features" :key="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {{ feature }}
              </li>
            </ul>
            <a href="#shop" class="btn">Shop Jewellery</a>
          </div>
        </div>

        <div class="price-list reveal-right">
          <div class="price-header">
            <h3>Price List</h3>
            <span class="price-note">All prices include titanium jewellery</span>
          </div>
          <div class="price-items">
            <div v-for="(item, index) in priceList" :key="item.name" class="price-item">
              <span class="price-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="price-name">{{ item.name }}</span>
              <span class="price-dots"></span>
              <span class="price-value">{{ item.price }}</span>
            </div>
          </div>
          <p class="upgrade-note">Premium jewellery upgrades available</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#piercings {
  background:
    radial-gradient(ellipse at 100% 0%, var(--accent-dim) 0%, transparent 50%),
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

.piercings-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.piercings-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.piercer-card {
  background: var(--dark);
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: 160px 1fr;
  overflow: hidden;
}

.piercer-image-wrapper {
  position: relative;
  overflow: hidden;
}

.piercer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
}

.piercer-info {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.piercer-info h3 {
  font-size: 1.5rem;
  color: var(--text);
}

.piercer-role {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.piercer-bio {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-top: var(--space-xs);
  flex: 1;
}

.features-card {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-md);
}

.features-card h4 {
  font-size: 1.2rem;
  margin-bottom: var(--space-md);
  color: var(--text);
}

.features-card ul {
  list-style: none;
  margin-bottom: var(--space-md);
}

.features-card li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.features-card li svg {
  width: 16px;
  height: 16px;
  color: var(--accent);
  flex-shrink: 0;
}

.price-list {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-lg);
}

.price-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border);
}

.price-header h3 {
  font-size: 1.5rem;
  color: var(--accent);
}

.price-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.price-items {
  display: flex;
  flex-direction: column;
}

.price-item {
  display: flex;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  gap: var(--space-sm);
}

.price-item:last-child {
  border-bottom: none;
}

.price-index {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.9rem;
  color: var(--text-subtle);
  min-width: 24px;
}

.price-name {
  color: var(--text);
  font-size: 0.9rem;
}

.price-dots {
  flex: 1;
  border-bottom: 1px dotted var(--border);
  margin: 0 var(--space-xs);
  transform: translateY(-4px);
}

.price-value {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 700;
}

.upgrade-note {
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
}

@media (max-width: 968px) {
  .piercings-layout {
    grid-template-columns: 1fr;
  }

  .piercer-card {
    grid-template-columns: 1fr;
  }

  .piercer-image-wrapper {
    height: 200px;
  }
}
</style>

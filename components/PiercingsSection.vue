<template>
  <section id="piercings">
    <div class="container">
      <div class="section-header">
        <h2>Piercings</h2>
        <div class="divider"></div>
        <p>Professional body piercing services using only the highest quality titanium jewellery</p>
      </div>
      <div class="piercings-content">
        <div>
          <div class="piercer-profile">
            <img class="piercer-image" src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop&crop=face" alt="Lisa" />
            <h3>Lisa</h3>
            <p class="piercer-bio">Our experienced piercer with years of expertise in all types of body piercings.</p>
            <div class="social-links centered">
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
          <div class="piercing-details">
            <h4>Why Choose Us</h4>
            <ul>
              <li>Implant-grade titanium jewellery only</li>
              <li>Single-use sterile equipment</li>
              <li>Aftercare guidance included</li>
              <li>Wide range of jewellery styles available</li>
              <li>Downsizing appointments included</li>
            </ul>
            <p class="shop-link">
              <a href="#shop" class="btn btn-outline small">Shop Jewellery</a>
            </p>
          </div>
        </div>
        <div class="price-list">
          <h3>Price List</h3>
          <div v-for="item in priceList" :key="item.name" class="price-item">
            <span>{{ item.name }}</span>
            <span>{{ item.price }}</span>
          </div>
          <p class="price-note">* All prices include titanium jewellery. Premium jewellery options available.</p>
        </div>
      </div>
    </div>
  </section>
</template>

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
</script>

<style scoped>
#piercings {
  background:
    radial-gradient(ellipse at 100% 0%, rgba(201, 162, 39, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(201, 162, 39, 0.02) 0%, transparent 50%),
    var(--darker);
}

.piercings-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.piercer-profile {
  background: var(--dark);
  border-radius: 10px;
  padding: 40px;
  text-align: center;
}

.piercer-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 25px;
  border: 3px solid var(--accent);
  object-fit: cover;
}

.piercer-bio {
  color: var(--text-muted);
  margin-bottom: 20px;
}

.centered {
  justify-content: center;
}

.price-list {
  background: var(--dark);
  border-radius: 10px;
  padding: 40px;
}

.price-list h3 {
  margin-bottom: 25px;
  color: var(--accent);
}

.price-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
}

.price-item:last-of-type {
  border-bottom: none;
}

.price-item span:last-child {
  color: var(--accent);
  font-weight: 600;
}

.price-note {
  margin-top: 20px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.piercing-details {
  margin-top: 40px;
  padding: 30px;
  background: var(--dark);
  border-radius: 10px;
}

.piercing-details h4 {
  color: var(--accent);
  margin-bottom: 15px;
}

.piercing-details ul {
  list-style: none;
}

.piercing-details li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  color: var(--text-muted);
}

.piercing-details li::before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.shop-link {
  margin-top: 20px;
}

.btn.small {
  padding: 10px 25px;
  font-size: 0.9rem;
}

@media (max-width: 968px) {
  .piercings-content {
    grid-template-columns: 1fr;
  }
}
</style>

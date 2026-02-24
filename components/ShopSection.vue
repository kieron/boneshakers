<script setup lang="ts">
const categories = [
  {
    name: 'Jewellery',
    icon: 'M21 16l-4-4m0 0l-4 4m4-4v12M3 8l4-4m0 0l4 4M7 4v12',
    description: 'Premium body jewellery'
  },
  {
    name: 'Clothing',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    description: 'Studio merchandise'
  },
  {
    name: 'Art',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    description: 'Original prints & artwork'
  }
]
</script>

<template>
  <section id="shop">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">Merch</p>
        <h2>Shop</h2>
        <div class="divider"></div>
        <p>Our online store is coming soon</p>
      </div>

      <div class="shop-preview reveal">
        <div class="coming-soon-badge">Coming Soon</div>

        <p class="coming-soon-text">We're working on bringing you exclusive Boneshakers merchandise</p>

        <div class="shop-categories stagger-children">
          <div v-for="cat in categories" :key="cat.name" class="shop-category">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path :d="cat.icon" />
              </svg>
            </div>
            <h4>{{ cat.name }}</h4>
            <p>{{ cat.description }}</p>
          </div>
        </div>

        <div class="notify-cta">
          <p>Follow us on social media to be notified when we launch</p>
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
    </div>
  </section>
</template>

<style scoped>
#shop {
  background: var(--darker);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.shop-preview {
  border: 1px dashed var(--border-light);
  padding: var(--space-xl) var(--space-lg);
  text-align: center;
  position: relative;
}

.coming-soon-badge {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--dark);
  padding: 6px 12px;
  border: 1px solid var(--accent);
}

.coming-soon-text {
  color: var(--text-muted);
  max-width: 400px;
  margin: 0 auto var(--space-lg);
}

.shop-categories {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.shop-category {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-lg);
  min-width: 180px;
  transition: border-color 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo);
}

.shop-category:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

.category-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-sm);
  color: var(--accent);
}

.category-icon svg {
  width: 100%;
  height: 100%;
}

.shop-category h4 {
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: var(--text);
}

.shop-category p {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.notify-cta {
  padding-top: var(--space-md);
  border-top: 1px solid var(--border);
}

.notify-cta p {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: var(--space-sm);
}

.notify-cta .social-links {
  justify-content: center;
}

@media (max-width: 768px) {
  .shop-categories {
    flex-direction: column;
    align-items: center;
  }

  .shop-category {
    width: 100%;
    max-width: 280px;
  }

  .coming-soon-badge {
    position: static;
    display: inline-block;
    margin-bottom: var(--space-md);
  }
}
</style>

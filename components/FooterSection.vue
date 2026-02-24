<script setup lang="ts">
const currentYear = new Date().getFullYear()

const links = [
  { href: '#tattoos', label: 'Our Artists' },
  { href: '#piercings', label: 'Piercings' },
  { href: '#services', label: 'Services' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' }
]
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <h4>
            <span class="brand-bone">Bone</span><span class="brand-shakers">shakers</span>
          </h4>
          <p>Professional tattoo and piercing studio dedicated to exceptional body art.</p>
        </div>

        <nav class="footer-links">
          <span class="footer-label">Quick Links</span>
          <ul>
            <li v-for="link in links" :key="link.href">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer-hours">
          <span class="footer-label">Hours</span>
          <p>Monday - Saturday<br>10:00 AM - 6:00 PM</p>
          <p class="closed">Sunday - Closed</p>
        </div>

        <div class="footer-social-col">
          <span class="footer-label">Follow</span>
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

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Boneshakers Tattoo Studio</p>
        <p class="footer-credit">All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--black);
  border-top: 1px solid var(--border);
  padding: var(--space-xl) 0 var(--space-md);
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-md);
}

.footer-brand h4 {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
}

.brand-bone {
  color: var(--text);
}

.brand-shakers {
  color: var(--accent);
}

.footer-brand p {
  color: var(--text-muted);
  font-size: 0.85rem;
  max-width: 280px;
}

.footer-label {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: color 0.3s var(--ease-out-expo);
}

.footer-links a:hover {
  color: var(--text);
}

.footer-hours p {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

.footer-hours .closed {
  margin-top: 8px;
  color: var(--text-subtle);
}

.footer-social-col .social-links {
  flex-direction: column;
  align-items: flex-start;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-sm);
}

.footer-bottom p {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.footer-credit {
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
}

@media (max-width: 968px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .footer-brand {
    grid-column: 1 / -1;
    text-align: center;
  }

  .footer-brand p {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .footer-top {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-social-col .social-links {
    justify-content: center;
    flex-direction: row;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
}
</style>

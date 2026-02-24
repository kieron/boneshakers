<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Boneshakers</h4>
          <p class="footer-desc">Professional tattoo and piercing studio dedicated to creating exceptional body art.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#tattoos">Our Artists</a></li>
            <li><a href="#piercings">Piercings</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Opening Hours</h4>
          <p class="hours">Monday - Saturday<br>10:00 AM - 6:00 PM</p>
          <p class="hours closed">Sunday<br>Closed</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Boneshakers Tattoo Studio. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
footer {
  background: var(--black);
  border-top: 1px solid var(--border);
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  color: var(--accent);
  margin-bottom: 20px;
  font-size: 1rem;
}

.footer-desc {
  color: var(--text-muted);
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: var(--text-muted);
}

.footer-section a:hover {
  color: var(--accent);
}

.footer-social {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-social svg {
  fill: var(--text);
  transition: fill 0.3s ease;
}

.footer-social a:hover svg {
  fill: var(--accent);
}

.hours {
  color: var(--text-muted);
}

.hours.closed {
  margin-top: 10px;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }
}
</style>

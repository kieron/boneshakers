<script setup lang="ts">
const artists = [
  {
    name: 'George',
    role: 'Traditional & Neo-Traditional',
    description: 'Bold lines and vibrant colors. Specializing in classic American and Japanese-inspired work.',
    instagram: true,
    facebook: true,
    isGuest: false,
    image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?w=400&h=500&fit=crop'
  },
  {
    name: 'Ben',
    role: 'Blackwork & Dotwork',
    description: 'Intricate geometric patterns and mandalas. Precision meets artistry.',
    instagram: true,
    facebook: true,
    isGuest: false,
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=400&h=500&fit=crop'
  },
  {
    name: 'Lee',
    role: 'Realism & Portraits',
    description: 'Bringing photographs and memories to life on skin with stunning detail.',
    instagram: true,
    facebook: true,
    isGuest: false,
    image: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=400&h=500&fit=crop'
  },
  {
    name: 'Guest Artists',
    role: 'Rotating Talent',
    description: 'We regularly host talented artists from around the world. Follow us for announcements.',
    instagram: true,
    facebook: false,
    isGuest: true,
    image: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=400&h=500&fit=crop'
  }
]
</script>

<template>
  <section id="tattoos" class="corner-accents">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">The Team</p>
        <h2>Our Artists</h2>
        <div class="divider"></div>
        <p>Meet our talented team of tattoo artists</p>
      </div>

      <div class="artists-grid reveal stagger-children">
        <article
          v-for="(artist, index) in artists"
          :key="artist.name"
          class="artist-card"
          :class="{ 'guest-artist': artist.isGuest }"
        >
          <div class="artist-image-wrapper">
            <img class="artist-image" :src="artist.image" :alt="artist.name" loading="lazy" />
            <div class="artist-overlay">
              <div class="social-links">
                <a v-if="artist.instagram" href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a v-if="artist.facebook" href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="artist-info">
            <span class="artist-number">0{{ index + 1 }}</span>
            <h3>{{ artist.name }}</h3>
            <p class="artist-role">{{ artist.role }}</p>
            <p class="artist-desc">{{ artist.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
#tattoos {
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

.artists-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.artist-card {
  background: var(--dark);
  position: relative;
  overflow: hidden;
  transition: transform 0.5s var(--ease-out-expo);
}

.artist-card:hover {
  transform: translateY(-8px);
}

.artist-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
}

.artist-card:hover::before {
  opacity: 1;
}

.artist-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
}

.artist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(30%);
  transition: filter 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
}

.artist-card:hover .artist-image {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.artist-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(8, 8, 8, 0.9) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--space-sm);
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
}

.artist-card:hover .artist-overlay {
  opacity: 1;
}

.artist-info {
  padding: var(--space-md);
  position: relative;
}

.artist-number {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: var(--border);
  line-height: 1;
}

.artist-info h3 {
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: var(--text);
}

.artist-role {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.artist-desc {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

.guest-artist {
  border: 1px dashed var(--border-light);
}

.guest-artist::after {
  content: 'Guest Spots Available';
  position: absolute;
  top: var(--space-sm);
  left: var(--space-sm);
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--dark);
  padding: 4px 8px;
  z-index: 1;
}

@media (max-width: 1100px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .artists-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .artist-card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }

  .artist-image-wrapper {
    aspect-ratio: 1;
  }

  .artist-number {
    display: none;
  }
}
</style>

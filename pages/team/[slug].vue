<script setup lang="ts">
const route = useRoute()
const artist = artists.find(a => a.slug === route.params.slug)

if (!artist) {
  throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
}

useHead({ title: `${artist.name} · Boneshakers` })

const lightbox = ref<HTMLDialogElement | null>(null)
const current = ref(0)

const openImage = (index: number) => {
  current.value = index
  lightbox.value?.showModal()
}

const step = (delta: number) => {
  const count = artist.portfolio.length
  current.value = (current.value + delta + count) % count
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}

const bookingLink = `/enquire?service=${artist.bookingService}&artist=${artist.slug}`
</script>

<template>
  <div v-if="artist" class="page">
    <div class="page-hero">
      <img class="portrait" :src="artist.portrait" :alt="`Portrait of ${artist.name}`" width="480" height="600" />
      <h1 class="display-title">{{ artist.name }}</h1>
      <p class="label">{{ artist.role }} · {{ artist.tags.join(' · ') }}</p>
      <NuxtLink :to="bookingLink" class="button">Book with {{ artist.name }}</NuxtLink>
    </div>

    <section v-reveal class="section prose">
      <h2 class="section-title">About {{ artist.name }}</h2>
      <p>{{ artist.bio }}</p>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">Work</h2>
      <ul v-if="artist.portfolio.length" class="portfolio">
        <li v-for="(image, i) in artist.portfolio" :key="image.src">
          <button type="button" class="thumb" :aria-label="`Open ${image.alt}`" @click="openImage(i)">
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </button>
        </li>
      </ul>
      <p v-else class="empty">Portfolio coming soon.</p>
    </section>

    <section v-if="artist.instagram || artist.tiktok" v-reveal class="section">
      <h2 class="section-title">Follow</h2>
      <p class="socials">
        <a v-if="artist.instagram" :href="artist.instagram" class="text-link" target="_blank" rel="noopener">Instagram</a>
        <a v-if="artist.tiktok" :href="artist.tiktok" class="text-link" target="_blank" rel="noopener">TikTok</a>
      </p>
    </section>

    <p class="back"><NuxtLink to="/team" class="text-link">Back to the team</NuxtLink></p>

    <dialog
      v-if="artist.portfolio.length"
      ref="lightbox"
      class="lightbox"
      @keydown="onKey"
      @click.self="lightbox?.close()"
    >
      <img :src="artist.portfolio[current].src" :alt="artist.portfolio[current].alt" />
      <div class="lightbox-controls">
        <button type="button" class="button button-quiet" @click="step(-1)">Prev</button>
        <button type="button" class="button button-quiet" @click="lightbox?.close()">Close</button>
        <button type="button" class="button button-quiet" @click="step(1)">Next</button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.portrait {
  width: clamp(180px, 34vw, 260px);
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: grayscale(1) contrast(1.15);
  border: 3px solid var(--ink);
  outline: 8px solid var(--bone);
  transform: rotate(-2deg);
  margin-bottom: 1rem;
}

.portfolio {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.thumb {
  display: block;
  width: 100%;
  padding: 0;
  border: 2px solid var(--bone);
  background: none;
  cursor: zoom-in;
}

.thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.empty {
  color: var(--sage-text);
}

.socials {
  display: flex;
  gap: 1.5rem;
}

.back {
  margin-top: 4rem;
  text-align: center;
}

.lightbox {
  max-width: min(92vw, 900px);
  padding: 0;
  border: 0;
  background: transparent;
  margin: auto;
}

.lightbox::backdrop {
  background: rgba(3, 3, 43, 0.92);
}

.lightbox img {
  display: block;
  max-width: 100%;
  max-height: 80vh;
  margin: 0 auto;
  border: 3px solid var(--bone);
}

.lightbox-controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

@media (max-width: 560px) {
  .portfolio {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

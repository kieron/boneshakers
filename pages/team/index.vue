<script setup lang="ts">
useHead({ title: 'The Team · Boneshakers' })
const flash = ref(0)
</script>

<template>
  <div class="page">
    <PageHero title="The Team" intro="The artists and piercer behind Boneshakers. Pick someone to see their work and book in with them.">
      <template #mascot>
        <MascotSkeleton pose="camera" :react="flash" />
      </template>
    </PageHero>

    <ul class="team-grid">
      <li v-for="artist in artists" :key="artist.slug" v-reveal>
        <NuxtLink :to="`/team/${artist.slug}`" class="artist-card" @mouseenter="flash++" @focus="flash++">
          <img :src="artist.portrait" alt="" loading="lazy" width="480" height="600" />
          <span class="artist-name">{{ artist.name }}</span>
          <span class="label">{{ artist.role }}</span>
          <span class="tags">
            <span v-for="tag in artist.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>

    <p v-reveal class="guest-note">
      We regularly host guest artists. Follow the studio for announcements, or
      <NuxtLink to="/enquire?service=tattoo" class="text-link">ask about upcoming guest spots</NuxtLink>.
    </p>
  </div>
</template>

<style scoped>
.team-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

.artist-card {
  display: grid;
  gap: 0.35rem;
  padding: 0.75rem 0.75rem 1.25rem;
  background: var(--bone);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  transition: transform 150ms var(--ease-out), box-shadow 150ms var(--ease-out);
}

.studio .artist-card:hover {
  color: var(--ink);
  transform: translateY(-6px) rotate(-1deg);
  box-shadow: 8px 10px 0 var(--ink);
}

.artist-card img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: grayscale(1) contrast(1.15);
  border: 2px solid var(--ink);
  margin-bottom: 0.5rem;
}

.artist-name {
  font-family: var(--font-display);
  font-size: 2.25rem;
  line-height: 1;
  text-transform: uppercase;
}

.artist-card .label {
  color: #4a4c44;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.35rem;
}

.tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.1rem 0.55rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
}

.guest-note {
  margin-top: 3rem;
  text-align: center;
  color: var(--sage-text);
}

@media (max-width: 560px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .studio .artist-card:hover {
    transform: none;
    box-shadow: 4px 4px 0 var(--slate);
  }
}
</style>

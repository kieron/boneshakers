<script setup lang="ts">
useHead({ title: 'Shop · Boneshakers' })
const wave = ref(0)
</script>

<template>
  <div class="page">
    <PageHero title="Shop" intro="Studio merch and body jewellery, coming soon.">
      <template #mascot>
        <MascotSkeleton pose="merch" :react="wave" />
      </template>
    </PageHero>

    <ul class="preview">
      <li
        v-for="category in shopCategories"
        :id="category.name.toLowerCase()"
        :key="category.name"
        v-reveal
        class="tile"
        @mouseenter="wave++"
      >
        <span class="tile-name">{{ category.name }}</span>
        <span class="tile-body">{{ category.description }}</span>
        <span class="label tile-soon">Coming soon</span>
      </li>
    </ul>

    <p v-reveal class="follow panel">
      <template v-if="studio.instagram">
        Follow us on <a :href="studio.instagram" class="text-link" target="_blank" rel="noopener">Instagram</a> to hear when the shop opens.
      </template>
      <template v-else>
        Want something now? Ask in the studio, or
        <NuxtLink to="/enquire?service=other" class="text-link">send us a message</NuxtLink>.
      </template>
    </p>
  </div>
</template>

<style scoped>
.preview {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.tile {
  display: grid;
  gap: 0.4rem;
  align-content: start;
  min-height: 11rem;
  padding: 1.25rem;
  background: var(--bone);
  color: var(--ink);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--sage);
  scroll-margin-top: 6rem;
  transition: transform 150ms var(--ease-out);
}

.tile:hover {
  transform: rotate(-1.5deg) translateY(-4px);
}

.tile:nth-child(2) {
  background: var(--slate);
  color: var(--bone);
  box-shadow: 6px 6px 0 var(--bone);
}

.tile:nth-child(2) .tile-soon {
  color: #cfd4dc;
}

.tile-name {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  text-transform: uppercase;
}

.tile-body {
  font-size: 13px;
}

.tile-soon {
  margin-top: auto;
  color: #4a4c44;
}

.follow {
  margin-top: 3.5rem;
  text-align: center;
}

@media (max-width: 640px) {
  .preview {
    grid-template-columns: 1fr;
  }

  .tile {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile:hover {
    transform: none;
    box-shadow: 4px 4px 0 var(--slate);
  }
}
</style>

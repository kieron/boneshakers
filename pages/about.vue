<script setup lang="ts">
useHead({ title: 'About · Boneshakers' })

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.address)}`
</script>

<template>
  <div class="page">
    <PageHero title="About Us" intro="Tattoos, piercings and a skeleton who won't leave.">
      <template #mascot>
        <MascotSkeleton pose="door" react-on-view />
      </template>
    </PageHero>

    <section v-reveal class="section prose">
      <h2 class="section-title">Our story</h2>
      <p>Boneshakers Tattoo Studio has been serving the community with exceptional tattoo artistry and professional piercing services.</p>
      <p>Our team of artists brings years of combined experience and a passion for creating unique, meaningful body art. Every client gets personal attention, whether it's your first tattoo or you're adding to your collection.</p>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">What we stand for</h2>
      <ul class="values">
        <li><strong>Clean, always.</strong> The highest standards of hygiene, with single-use sterile equipment.</li>
        <li><strong>Good materials.</strong> Premium inks and implant-grade titanium jewellery only.</li>
        <li><strong>Your piece, your way.</strong> Time to talk your idea through before anything touches skin.</li>
      </ul>
    </section>

    <section v-reveal class="section panel">
      <h2 class="section-title">Find us</h2>
      <div class="visit">
        <div>
          <p class="label">Address</p>
          <p>{{ studio.address }}</p>
          <p><a :href="directions" class="text-link" target="_blank" rel="noopener">Get directions</a></p>
        </div>
        <div>
          <p class="label">Hours</p>
          <p v-for="row in studio.hoursLong" :key="row.days">{{ row.days }}: {{ row.time }}</p>
        </div>
        <div>
          <p class="label">Phone</p>
          <p><a :href="studio.phoneHref" class="text-link">{{ studio.phone }}</a></p>
        </div>
      </div>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">Questions</h2>
      <div class="faq">
        <details v-for="item in generalFaqs" :key="item.question">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.values {
  list-style: none;
  display: grid;
  gap: 1rem;
  max-width: var(--measure);
}

.values li {
  padding-left: 1.5rem;
  position: relative;
}

.values li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 0.6rem;
  height: 0.6rem;
  background: var(--slate);
  border: 1.5px solid var(--bone);
  transform: rotate(45deg);
}

.visit {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.visit .label {
  margin-bottom: 0.35rem;
}

@media (max-width: 640px) {
  .visit {
    grid-template-columns: 1fr;
  }
}
</style>

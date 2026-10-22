<script setup lang="ts">
useHead({ title: 'Piercings · Boneshakers' })
const flinch = ref(0)
</script>

<template>
  <div class="page">
    <PageHero title="Piercings" intro="Professional body piercing with implant-grade titanium jewellery. Prices include basic jewellery.">
      <template #mascot>
        <MascotSkeleton pose="wince" :react="flinch" />
      </template>
      <NuxtLink to="/enquire?service=piercing" class="button">Book a piercing</NuxtLink>
    </PageHero>

    <section v-reveal class="section panel">
      <h2 class="section-title">Price list</h2>
      <table class="prices">
        <thead>
          <tr>
            <th scope="col">Piercing</th>
            <th scope="col">Price incl. basic jewellery</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in piercingPrices" :key="item.name" @mouseenter="flinch++">
            <th scope="row">{{ item.name }}</th>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-reveal class="section prose">
      <h2 class="section-title">Jewellery upgrades</h2>
      <p>Want something fancier than the basic titanium? Ask about upgrades when you book, or have a look at what's coming to the <NuxtLink to="/shop#jewellery" class="text-link">jewellery shop</NuxtLink>.</p>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">Aftercare, age and ID</h2>
      <ul class="promises">
        <li v-for="item in piercingPromises" :key="item">{{ item }}</li>
      </ul>
      <p class="policy">
        Under-16s must be accompanied by a parent or guardian with matching photo ID.
        Your piercer will walk you through aftercare before you leave.
      </p>
    </section>

    <div v-reveal class="cta">
      <NuxtLink to="/enquire?service=piercing" class="button">Book a piercing</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.prices {
  width: 100%;
  border-collapse: collapse;
}

.prices th,
.prices td {
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(116, 118, 107, 0.5);
  text-align: left;
}

.prices thead th {
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--sage-text);
}

.prices td,
.prices thead th:last-child {
  text-align: right;
}

.prices tbody th {
  font-weight: 400;
}

.prices tbody tr:hover {
  background: rgba(3, 3, 43, 0.35);
}

.promises {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}

.promises li::before {
  content: '✶ ';
}

.policy {
  margin-top: 1.5rem;
  color: var(--sage-text);
  max-width: var(--measure);
}

.cta {
  margin-top: 4.5rem;
  text-align: center;
}
</style>

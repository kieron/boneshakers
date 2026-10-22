<script setup lang="ts">
useHead({ title: 'Tattoos · Boneshakers' })
const buzz = ref(0)
</script>

<template>
  <div class="page">
    <PageHero title="Tattoos" intro="Custom work, flash and cover-ups from our resident artists. Here's how booking works.">
      <template #mascot>
        <MascotSkeleton pose="machine" :react="buzz" />
      </template>
      <NuxtLink to="/enquire?service=tattoo" class="button" @mouseenter="buzz++" @focus="buzz++">Book a tattoo</NuxtLink>
    </PageHero>

    <section v-reveal class="section">
      <h2 class="section-title">How booking works</h2>
      <ol class="steps">
        <li v-for="item in bookingSteps" :key="item.title">
          <strong>{{ item.title }}</strong>
          <span>{{ item.body }}</span>
        </li>
      </ol>
      <p class="consent-note">
        Coming in soon? You can fill in the
        <NuxtLink to="/consent" class="text-link">consent form</NuxtLink>
        before your appointment.
      </p>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">Aftercare and FAQs</h2>
      <div class="faq">
        <details v-for="item in tattooFaqs" :key="item.question">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>

    <section v-reveal class="section">
      <h2 class="section-title">Also at the studio</h2>
      <dl class="services">
        <div v-for="service in otherServices" :key="service.title">
          <dt>{{ service.title }}</dt>
          <dd>{{ service.description }}</dd>
        </div>
      </dl>
    </section>

    <div v-reveal class="cta">
      <NuxtLink to="/enquire?service=tattoo" class="button" @mouseenter="buzz++" @focus="buzz++">Book a tattoo</NuxtLink>
      <NuxtLink to="/team" class="text-link">Meet the artists</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.consent-note {
  margin-top: 2rem;
  color: var(--sage-text);
}

.services {
  display: grid;
  gap: 1.25rem;
}

.services dt {
  font-weight: 700;
}

.services dd {
  color: var(--sage-text);
}

.cta {
  margin-top: 4.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
</style>

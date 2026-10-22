<script setup lang="ts">
// Every "Book" button lands here until online booking exists (docs/design-spec.md).
useHead({ title: 'Enquire · Boneshakers' })

const route = useRoute()
const services = [
  { value: 'tattoo', label: 'Tattoo' },
  { value: 'piercing', label: 'Piercing' },
  { value: 'laser', label: 'Laser removal' },
  { value: 'cosmetic', label: 'Cosmetic tattooing' },
  { value: 'other', label: 'Something else' }
]

const queryValue = (key: string) => {
  const value = route.query[key]
  return typeof value === 'string' ? value : ''
}

const initialService = services.some(s => s.value === queryValue('service')) ? queryValue('service') : ''
const initialArtist = artists.find(a => a.slug === queryValue('artist'))

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: initialService || initialArtist?.bookingService || '',
  artist: initialArtist?.name ?? '',
  piercing: '',
  message: ''
})

const tattooArtists = artists.filter(a => a.bookingService === 'tattoo')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const submit = async () => {
  status.value = 'loading'
  errorMessage.value = ''
  try {
    await $fetch('/api/enquiry', {
      method: 'POST',
      body: {
        ...form,
        artist: form.service === 'tattoo' ? form.artist : '',
        piercing: form.service === 'piercing' ? form.piercing : ''
      }
    })
    status.value = 'success'
  } catch (e: any) {
    status.value = 'error'
    errorMessage.value = e.data?.message || 'Failed to send your enquiry. Please try again.'
  }
}
</script>

<template>
  <div class="page">
    <div class="page-hero">
      <h1 class="display-title">Enquire</h1>
      <p class="page-intro">Tell us what you're after and we'll get back to you within 24 hours to sort out a consultation or booking.</p>
    </div>

    <div v-if="status === 'success'" class="sent" role="status">
      <div class="sent-skull"><SkullDoodle title="Happy skull" /></div>
      <p>Got it. We'll be in touch soon.</p>
      <NuxtLink to="/" class="text-link">Back home</NuxtLink>
    </div>

    <form v-else class="enquiry" @submit.prevent="submit">
      <div class="row">
        <label class="field">
          <span class="label">Name</span>
          <input v-model="form.name" type="text" name="name" autocomplete="name" required />
        </label>
        <label class="field">
          <span class="label">Email</span>
          <input v-model="form.email" type="email" name="email" autocomplete="email" required />
        </label>
      </div>

      <div class="row">
        <label class="field">
          <span class="label">Phone (optional)</span>
          <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" />
        </label>
        <label class="field">
          <span class="label">What for?</span>
          <select v-model="form.service" name="service">
            <option value="">Choose one</option>
            <option v-for="s in services" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </label>
      </div>

      <label v-if="form.service === 'tattoo'" class="field">
        <span class="label">Artist</span>
        <select v-model="form.artist" name="artist">
          <option value="">No preference</option>
          <option v-for="a in tattooArtists" :key="a.slug" :value="a.name">{{ a.name }} ({{ a.tags.join(', ') }})</option>
        </select>
      </label>

      <label v-if="form.service === 'piercing'" class="field">
        <span class="label">Piercing</span>
        <select v-model="form.piercing" name="piercing">
          <option value="">Not sure yet</option>
          <option v-for="p in piercingPrices" :key="p.name" :value="p.name">{{ p.name }} ({{ p.price }})</option>
        </select>
      </label>

      <label class="field">
        <span class="label">Your idea</span>
        <textarea v-model="form.message" name="message" rows="5" placeholder="Style, placement, rough size, any reference you have..." />
      </label>

      <p v-if="status === 'error'" class="error" role="alert">{{ errorMessage }}</p>

      <div>
        <button type="submit" class="button" :disabled="status === 'loading'">
          {{ status === 'loading' ? 'Sending...' : 'Send enquiry' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.enquiry {
  display: grid;
  gap: 1.25rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  background: var(--bone);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 0;
  font: inherit;
  font-size: 15px;
}

.field textarea {
  resize: vertical;
}

.error {
  padding: 0.75rem 1rem;
  background: var(--bone);
  color: #8a1c1c;
  border: 2px solid var(--ink);
}

.sent {
  display: grid;
  justify-items: center;
  gap: 1rem;
  text-align: center;
}

.sent-skull {
  width: 120px;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>

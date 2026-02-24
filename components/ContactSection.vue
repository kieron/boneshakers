<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const handleSubmit = async () => {
  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/enquiry', {
      method: 'POST',
      body: form
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.service = ''
    form.message = ''
  } catch (e: any) {
    status.value = 'error'
    errorMessage.value = e.data?.message || 'Failed to send enquiry. Please try again.'
  }
}

const contactItems = [
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Phone',
    value: '01234 567 890',
    href: 'tel:+441234567890'
  },
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Address',
    value: '123 High Street, Your Town, AB1 2CD',
    href: null
  }
]
</script>

<template>
  <section id="contact">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">Get In Touch</p>
        <h2>Contact Us</h2>
        <div class="divider"></div>
        <p>Book an appointment or discuss your next piece</p>
      </div>

      <div class="contact-layout">
        <div class="contact-info reveal-left">
          <div class="contact-card">
            <div v-for="item in contactItems" :key="item.label" class="contact-item">
              <span class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path :d="item.icon" />
                </svg>
              </span>
              <div class="contact-text">
                <span class="contact-label">{{ item.label }}</span>
                <a v-if="item.href" :href="item.href" class="contact-value">{{ item.value }}</a>
                <span v-else class="contact-value">{{ item.value }}</span>
              </div>
            </div>

            <div class="contact-divider"></div>

            <div class="contact-social">
              <span class="social-label">Follow Us</span>
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
        </div>

        <div class="enquiry-form reveal-right">
          <div class="form-header">
            <h3>Enquiry Form</h3>
            <span class="form-note">We'll respond within 24 hours</span>
          </div>

          <div v-if="status === 'success'" class="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12l5 5L20 7" />
            </svg>
            <p>Thank you for your enquiry! We'll get back to you soon.</p>
          </div>

          <form v-else @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input v-model="form.name" type="text" id="name" name="name" required placeholder="Your name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" id="email" name="email" required placeholder="your@email.com">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input v-model="form.phone" type="tel" id="phone" name="phone" placeholder="Optional">
              </div>
              <div class="form-group">
                <label for="service">Service</label>
                <select v-model="form.service" id="service" name="service">
                  <option value="">Select service...</option>
                  <option value="tattoo">Tattoo Enquiry</option>
                  <option value="piercing">Piercing Enquiry</option>
                  <option value="laser">Laser Removal</option>
                  <option value="cosmetic">Cosmetic Tattooing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-group full">
              <label for="message">Your Message</label>
              <textarea v-model="form.message" id="message" name="message" rows="4" placeholder="Tell us about your idea, preferred style, placement, size..."></textarea>
            </div>

            <div v-if="status === 'error'" class="error-message">
              {{ errorMessage }}
            </div>

            <button type="submit" class="btn submit-btn" :disabled="status === 'loading'">
              <span>{{ status === 'loading' ? 'Sending...' : 'Send Enquiry' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#contact {
  background:
    radial-gradient(ellipse at 0% 50%, var(--accent-dim) 0%, transparent 40%),
    var(--darker);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--space-lg);
  align-items: start;
}

.contact-card {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-lg);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.contact-item:last-of-type {
  margin-bottom: 0;
}

.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact-value {
  font-size: 0.9rem;
  color: var(--text);
}

a.contact-value:hover {
  color: var(--accent);
}

.contact-divider {
  height: 1px;
  background: var(--border);
  margin: var(--space-md) 0;
}

.contact-social {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.social-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.enquiry-form {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-lg);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border);
}

.form-header h3 {
  font-size: 1.5rem;
  color: var(--text);
}

.form-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-group {
  margin-bottom: var(--space-md);
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 14px 16px;
  background: var(--darker);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  transition: border-color 0.3s var(--ease-out-expo);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-subtle);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.submit-btn {
  width: 100%;
  margin-top: var(--space-sm);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl) var(--space-md);
  text-align: center;
}

.success-message svg {
  width: 48px;
  height: 48px;
  color: var(--accent);
}

.success-message p {
  color: var(--text);
  font-size: 1rem;
}

.error-message {
  padding: var(--space-sm);
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #dc3545;
  margin-bottom: var(--space-md);
  font-size: 0.85rem;
}

@media (max-width: 968px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

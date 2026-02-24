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
    // Reset form
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
</script>

<template>
  <section id="contact">
    <div class="container">
      <div class="section-header">
        <h2>Contact Us</h2>
        <div class="divider"></div>
        <p>Get in touch to discuss your next piece or book an appointment</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>Get In Touch</h3>
          <div class="contact-item">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div>
              <h4>Phone</h4>
              <a href="tel:+441onal23456789">01234 567 890</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <h4>Address</h4>
              <p>123 High Street<br>Your Town, AB1 2CD</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <h4>Facebook</h4>
              <a href="#">/BoneshakersStudio</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <h4>Instagram</h4>
              <a href="#">@boneshakers_tattoo</a>
            </div>
          </div>
        </div>
        <div class="enquiry-form">
          <h3>Enquiry Form</h3>

          <div v-if="status === 'success'" class="success-message">
            Thank you for your enquiry! We'll get back to you soon.
          </div>

          <form v-else @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input v-model="form.name" type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input v-model="form.email" type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input v-model="form.phone" type="tel" id="phone" name="phone">
            </div>
            <div class="form-group">
              <label for="service">Service</label>
              <select v-model="form.service" id="service" name="service">
                <option value="">Select a service...</option>
                <option value="tattoo">Tattoo Enquiry</option>
                <option value="piercing">Piercing Enquiry</option>
                <option value="laser">Laser Removal</option>
                <option value="cosmetic">Cosmetic Tattooing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Tell us about your idea</label>
              <textarea v-model="form.message" id="message" name="message" placeholder="Describe your tattoo idea, placement, size, etc."></textarea>
            </div>

            <div v-if="status === 'error'" class="error-message">
              {{ errorMessage }}
            </div>

            <button type="submit" class="btn submit-btn" :disabled="status === 'loading'">
              {{ status === 'loading' ? 'Sending...' : 'Send Enquiry' }}
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
    radial-gradient(ellipse at 0% 50%, rgba(201, 162, 39, 0.03) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 80%, rgba(201, 162, 39, 0.02) 0%, transparent 40%),
    var(--darker);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h3 {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 25px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: var(--dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon svg {
  width: 24px;
  height: 24px;
  fill: var(--accent);
}

.contact-item h4 {
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.contact-item p,
.contact-item a {
  color: var(--text-muted);
}

.enquiry-form {
  background: var(--dark);
  padding: 40px;
  border-radius: 10px;
}

.enquiry-form h3 {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 15px;
  background: var(--darker);
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  padding: 20px;
  background: rgba(40, 167, 69, 0.2);
  border: 1px solid #28a745;
  border-radius: 5px;
  color: #28a745;
  text-align: center;
}

.error-message {
  padding: 15px;
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid #dc3545;
  border-radius: 5px;
  color: #dc3545;
  margin-bottom: 15px;
}

@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>

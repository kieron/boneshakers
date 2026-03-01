<script setup lang="ts">
useHead({
  title: 'Consent Form - Boneshakers Tattoo Studio',
  script: [
    { src: 'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js' }
  ]
})

const form = reactive({
  fullName: '',
  dob: '',
  phone: '',
  email: '',
  location: '',
  description: '',
  medicationDetails: '',
  heart: '',
  bloodPressure: '',
  hepatitis: '',
  haemorrhaging: '',
  epilepsy: '',
  diabetes: '',
  skinConditions: '',
  latexAllergy: '',
  pregnant: '',
  alcoholDrugs: '',
  medication: '',
  confirmOver18: false,
  understandRisks: false,
  signature: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

let signaturePad: any = null
const canvasRef = ref<HTMLCanvasElement | null>(null)

const initSignaturePad = () => {
  if (!canvasRef.value || typeof window === 'undefined') return

  const canvas = canvasRef.value
  const container = canvas.parentElement
  if (!container) return

  canvas.style.width = '100%'
  canvas.style.height = '150px'

  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  // @ts-ignore - SignaturePad loaded via script
  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(73, 80, 87)'
  })
}

const clearSignature = () => {
  if (signaturePad) {
    signaturePad.clear()
  }
}

onMounted(() => {
  // Wait for signature pad script to load
  const checkAndInit = () => {
    // @ts-ignore
    if (typeof SignaturePad !== 'undefined') {
      initSignaturePad()
    } else {
      setTimeout(checkAndInit, 100)
    }
  }
  checkAndInit()

  window.addEventListener('resize', initSignaturePad)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', initSignaturePad)
  }
})

const medicalQuestions = [
  { name: 'heart', label: 'History of heart disease or murmurs' },
  { name: 'bloodPressure', label: 'High or low blood pressure' },
  { name: 'hepatitis', label: 'HIV, Hepatitis B or C' },
  { name: 'haemorrhaging', label: 'Any medical condition which may cause haemorrhaging' },
  { name: 'epilepsy', label: 'Epilepsy' },
  { name: 'diabetes', label: 'Diabetes' },
  { name: 'skinConditions', label: 'Impetigo, Eczema, Psoriasis or Warts' },
  { name: 'latexAllergy', label: 'Allergy to Latex' },
  { name: 'pregnant', label: 'Are you pregnant or breast feeding?' },
  { name: 'alcoholDrugs', label: 'Are you under the influence of alcohol or drugs?' },
  { name: 'medication', label: 'Are you taking any medication?' }
]

const handleSubmit = async () => {
  // Validate signature
  if (!signaturePad || signaturePad.isEmpty()) {
    errorMessage.value = 'Please provide your signature'
    status.value = 'error'
    return
  }

  // Validate consent checkboxes
  if (!form.confirmOver18 || !form.understandRisks) {
    errorMessage.value = 'Please confirm both consent statements'
    status.value = 'error'
    return
  }

  status.value = 'loading'
  errorMessage.value = ''

  // Get signature as base64
  form.signature = signaturePad.toDataURL()

  try {
    await $fetch('/api/consent', {
      method: 'POST',
      body: form
    })
    status.value = 'success'
  } catch (e: any) {
    status.value = 'error'
    errorMessage.value = e.data?.message || 'Failed to submit consent form. Please try again.'
  }
}

const resetForm = () => {
  form.fullName = ''
  form.dob = ''
  form.phone = ''
  form.email = ''
  form.location = ''
  form.description = ''
  form.medicationDetails = ''
  form.heart = ''
  form.bloodPressure = ''
  form.hepatitis = ''
  form.haemorrhaging = ''
  form.epilepsy = ''
  form.diabetes = ''
  form.skinConditions = ''
  form.latexAllergy = ''
  form.pregnant = ''
  form.alcoholDrugs = ''
  form.medication = ''
  form.confirmOver18 = false
  form.understandRisks = false
  form.signature = ''
  clearSignature()
  status.value = 'idle'
}
</script>

<template>
  <div class="consent-page">
    <div class="consent-container">
      <header class="consent-header">
        <NuxtLink to="/" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </NuxtLink>
        <h1>Consent Form</h1>
        <p class="subtitle">Boneshakers Tattoo Studio</p>
      </header>

      <div v-if="status === 'success'" class="success-state">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h2>Consent Form Submitted</h2>
        <p>Thank you! Your consent form has been received and a copy has been sent to the studio.</p>
        <button type="button" class="btn" @click="resetForm">Submit Another Form</button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="consent-form">
        <section class="form-section">
          <h2>Personal Information</h2>

          <div class="form-row">
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input v-model="form.fullName" type="text" id="fullName" required placeholder="Your full name">
            </div>
            <div class="form-group">
              <label for="dob">Date of Birth *</label>
              <input v-model="form.dob" type="date" id="dob" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input v-model="form.phone" type="tel" id="phone" required placeholder="Your phone number">
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input v-model="form.email" type="email" id="email" placeholder="Optional">
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2>Tattoo Details</h2>

          <div class="form-group">
            <label for="location">Tattoo Location on Body *</label>
            <input v-model="form.location" type="text" id="location" required placeholder="e.g. Left forearm, right shoulder">
          </div>

          <div class="form-group">
            <label for="description">Tattoo Description *</label>
            <textarea v-model="form.description" id="description" rows="4" required placeholder="Describe the tattoo design, size, style..."></textarea>
          </div>
        </section>

        <section class="form-section">
          <h2>Medical Information</h2>
          <p class="section-note">Do you suffer from any of the following?</p>

          <div class="medical-questions">
            <div v-for="q in medicalQuestions" :key="q.name" class="medical-question">
              <span class="question-label">{{ q.label }}</span>
              <div class="yes-no-group">
                <label class="radio-label">
                  <input type="radio" :name="q.name" value="yes" v-model="(form as any)[q.name]">
                  <span>Yes</span>
                </label>
                <label class="radio-label">
                  <input type="radio" :name="q.name" value="no" v-model="(form as any)[q.name]">
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>

          <div v-if="form.medication === 'yes'" class="form-group medication-details">
            <label for="medicationDetails">Medication Details</label>
            <textarea v-model="form.medicationDetails" id="medicationDetails" rows="3" placeholder="Please list any medications you are currently taking"></textarea>
          </div>
        </section>

        <section class="form-section">
          <h2>Consent</h2>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.confirmOver18" required>
              <span>I confirm I am over 18 years old and understand the legal implications of getting a tattoo at Boneshakers Tattoo Studio.</span>
            </label>
          </div>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.understandRisks" required>
              <span>I understand the risks, aftercare instructions, and potential complications that have been explained to me by the Boneshakers artist.</span>
            </label>
          </div>
        </section>

        <section class="form-section">
          <h2>Signature</h2>

          <div class="signature-container">
            <canvas ref="canvasRef" id="signature-pad"></canvas>
            <button type="button" class="btn btn-secondary" @click="clearSignature">Clear Signature</button>
          </div>
        </section>

        <div v-if="status === 'error'" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-submit" :disabled="status === 'loading'">
          {{ status === 'loading' ? 'Submitting...' : 'Submit Consent Form' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.consent-page {
  min-height: 100vh;
  background: var(--black);
  padding: var(--space-lg) var(--space-md);
}

.consent-container {
  max-width: 800px;
  margin: 0 auto;
}

.consent-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-md);
  transition: color 0.3s var(--ease-out-expo);
}

.back-link:hover {
  color: var(--accent);
}

.back-link svg {
  width: 16px;
  height: 16px;
}

.consent-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text);
  margin-bottom: var(--space-xs);
}

.consent-header .subtitle {
  color: var(--accent);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.consent-form {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-xl);
}

.form-section {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border);
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: var(--space-md);
  padding-bottom: 0;
}

.form-section h2 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: var(--space-md);
}

.section-note {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: var(--space-md);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-group {
  margin-bottom: var(--space-md);
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
.form-group textarea {
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
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* Medical questions */
.medical-questions {
  background: var(--darker);
  border: 1px solid var(--border);
  padding: var(--space-md);
}

.medical-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
}

.medical-question:last-child {
  border-bottom: none;
}

.question-label {
  flex: 1;
  color: var(--text);
  font-size: 0.9rem;
  padding-right: var(--space-md);
}

.yes-no-group {
  display: flex;
  gap: var(--space-md);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  color: var(--text);
  font-size: 0.85rem;
}

.radio-label:hover {
  background: var(--dark);
}

.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
}

.medication-details {
  margin-top: var(--space-md);
}

/* Checkboxes */
.checkbox-group {
  margin-bottom: var(--space-md);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: var(--space-md);
  background: var(--darker);
  border: 1px solid var(--border);
  transition: border-color 0.3s var(--ease-out-expo);
}

.checkbox-label:hover {
  border-color: var(--accent);
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--accent);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-label span {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Signature */
.signature-container {
  background: var(--darker);
  border: 1px solid var(--border);
  padding: var(--space-md);
}

.signature-container canvas {
  border: 1px solid var(--border);
  border-radius: 4px;
  width: 100%;
  height: 150px;
  background: white;
  cursor: crosshair;
  margin-bottom: var(--space-md);
}

/* Buttons */
.btn {
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  color: var(--black);
  border: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 168, 75, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: none;
}

.btn-submit {
  width: 100%;
  padding: 18px;
  margin-top: var(--space-md);
}

/* Messages */
.error-message {
  padding: var(--space-sm);
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #dc3545;
  margin-bottom: var(--space-md);
  font-size: 0.85rem;
}

/* Success state */
.success-state {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: var(--space-xxl);
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-lg);
}

.success-icon svg {
  width: 40px;
  height: 40px;
  color: var(--accent);
}

.success-state h2 {
  color: var(--text);
  margin-bottom: var(--space-md);
}

.success-state p {
  color: var(--text-muted);
  margin-bottom: var(--space-lg);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .consent-page {
    padding: var(--space-md) var(--space-sm);
  }

  .consent-form {
    padding: var(--space-lg) var(--space-md);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .medical-question {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .yes-no-group {
    width: 100%;
  }

  .radio-label {
    flex: 1;
    justify-content: center;
  }
}
</style>

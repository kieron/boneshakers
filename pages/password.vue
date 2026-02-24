<script setup lang="ts">
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth', {
      method: 'POST',
      body: { password: password.value }
    })
    // Redirect to home on success
    navigateTo('/')
  } catch (e: any) {
    error.value = e.data?.message || 'Incorrect password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="password-page">
    <div class="password-container">
      <div class="skull-logo">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="45" rx="35" ry="40"/>
          <ellipse cx="35" cy="40" rx="10" ry="12" fill="#0a0a0a"/>
          <ellipse cx="65" cy="40" rx="10" ry="12" fill="#0a0a0a"/>
          <ellipse cx="50" cy="55" rx="5" ry="8" fill="#0a0a0a"/>
          <rect x="38" y="75" width="5" height="12" rx="1"/>
          <rect x="47" y="75" width="5" height="12" rx="1"/>
          <rect x="56" y="75" width="5" height="12" rx="1"/>
        </svg>
      </div>
      <h1>Boneshakers</h1>
      
      <form @submit.prevent="handleSubmit">
        <input
          v-model="password"
          type="password"
                    autocomplete="current-password"
        />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Checking...' : 'Enter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--black);
  padding: 20px;
}

.password-container {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.skull-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  background: var(--darker);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--accent);
}

.skull-logo svg {
  width: 70px;
  height: 70px;
  fill: var(--accent);
}

h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  letter-spacing: 4px;
  margin-bottom: 30px;
  text-transform: uppercase;
}


form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 15px;
  background: var(--dark);
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  text-align: center;
}

input:focus {
  outline: none;
  border-color: var(--accent);
}

button {
  padding: 15px;
  background: var(--accent);
  color: var(--black);
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 2px solid var(--accent);
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  background: transparent;
  color: var(--accent);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  margin: 0;
}
</style>

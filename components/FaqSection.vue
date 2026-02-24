<script setup lang="ts">
const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: "You can book an appointment by calling us, sending a message through Facebook, or filling out the enquiry form on this page. We'll get back to you to discuss your ideas and schedule a consultation."
  },
  {
    question: 'Do I need a deposit?',
    answer: 'Yes, we require a deposit to secure your booking. This is non-refundable but will be deducted from your final tattoo price. Deposit amounts vary depending on the size of the project.'
  },
  {
    question: 'How should I prepare for my tattoo?',
    answer: "Get a good night's sleep, eat a proper meal beforehand, stay hydrated, and avoid alcohol for 24 hours before your appointment. Wear comfortable, loose clothing that allows easy access to the area being tattooed."
  },
  {
    question: 'What aftercare do you provide?',
    answer: 'We provide detailed aftercare instructions and recommend quality aftercare products. Your artist will walk you through everything you need to know to ensure your tattoo heals perfectly.'
  },
  {
    question: 'Do you do cover-ups?',
    answer: 'Yes! Several of our artists specialize in cover-up work. We also offer laser removal services if you need to lighten an existing tattoo before covering it. Book a consultation to discuss your options.'
  },
  {
    question: 'What age do you need to be?',
    answer: 'You must be 18 or over to get a tattoo. We require valid photo ID. For piercings, those under 16 must be accompanied by a parent or guardian with matching ID.'
  }
]

const openItems = ref<Set<number>>(new Set())

const toggleFaq = (index: number) => {
  if (openItems.value.has(index)) {
    openItems.value.delete(index)
  } else {
    openItems.value.add(index)
  }
}

const isOpen = (index: number) => openItems.value.has(index)
</script>

<template>
  <section id="faq">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">Questions</p>
        <h2>FAQ</h2>
        <div class="divider"></div>
        <p>Frequently asked questions about our services</p>
      </div>

      <div class="faq-list reveal stagger-children">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ active: isOpen(index) }"
        >
          <button class="faq-question" @click="toggleFaq(index)">
            <span class="faq-number">0{{ index + 1 }}</span>
            <h4>{{ faq.question }}</h4>
            <span class="faq-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 5v14m-7-7h14" v-if="!isOpen(index)" />
                <path d="M5 12h14" v-else />
              </svg>
            </span>
          </button>
          <div class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#faq {
  background:
    radial-gradient(ellipse at 20% 80%, var(--accent-dim) 0%, transparent 40%),
    var(--black);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--border);
  margin-bottom: var(--space-sm);
  overflow: hidden;
  transition: border-color 0.3s var(--ease-out-expo);
}

.faq-item:hover,
.faq-item.active {
  border-color: var(--accent);
}

.faq-question {
  width: 100%;
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--dark);
  border: none;
  text-align: left;
  transition: background 0.3s var(--ease-out-expo);
}

.faq-question:hover {
  background: var(--darker);
}

.faq-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  color: var(--text-subtle);
  min-width: 30px;
}

.faq-item.active .faq-number {
  color: var(--accent);
}

.faq-question h4 {
  flex: 1;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text);
  text-transform: none;
}

.faq-icon {
  width: 24px;
  height: 24px;
  color: var(--text-muted);
  transition: color 0.3s var(--ease-out-expo);
}

.faq-icon svg {
  width: 100%;
  height: 100%;
}

.faq-item.active .faq-icon {
  color: var(--accent);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-out-expo);
}

.faq-item.active .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding: 0 var(--space-md) var(--space-md);
  padding-left: calc(var(--space-md) + 30px + var(--space-md));
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.9rem;
}
</style>

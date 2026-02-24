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
    answer: 'Get a good night\'s sleep, eat a proper meal beforehand, stay hydrated, and avoid alcohol for 24 hours before your appointment. Wear comfortable, loose clothing that allows easy access to the area being tattooed.'
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
      <div class="section-header">
        <h2>FAQ</h2>
        <div class="divider"></div>
        <p>Frequently asked questions about our services</p>
      </div>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ active: isOpen(index) }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h4>{{ faq.question }}</h4>
            <span>+</span>
          </div>
          <div class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--dark);
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
}

.faq-question {
  padding: 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: var(--darker);
}

.faq-question h4 {
  font-size: 1rem;
}

.faq-question span {
  color: var(--accent);
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-question span {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 25px 25px;
  color: var(--text-muted);
}
</style>

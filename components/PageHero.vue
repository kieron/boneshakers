<script setup lang="ts">
defineProps<{ title: string, intro?: string }>()
</script>

<template>
  <div class="page-hero">
    <div class="hero-mascot swatches">
      <slot name="mascot" />
    </div>
    <h1 class="display-title">{{ title }}</h1>
    <p v-if="intro" class="page-intro">{{ intro }}</p>
    <slot />
  </div>
</template>

<style scoped>
.hero-mascot {
  width: clamp(150px, 26vw, 210px);
  margin: 1rem 0 0.5rem;
}
</style>

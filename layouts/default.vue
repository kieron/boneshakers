<script setup lang="ts">
useHead({ bodyAttrs: { class: 'studio' } })
</script>

<template>
  <div class="frame">
    <DoodleField />
    <SiteMenu />
    <main class="frame-main">
      <slot />
    </main>
    <SiteFooter />
    <PageWipe />
  </div>
</template>

<style scoped>
.frame {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.frame-main {
  position: relative;
  z-index: 1;
  flex: 1;
}

.frame > :deep(.site-footer) {
  position: relative;
  z-index: 1;
}
</style>

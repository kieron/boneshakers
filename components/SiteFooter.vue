<template>
  <footer class="site-footer">
    <NuxtLink to="/" class="footer-skull" aria-label="Boneshakers, home">
      <SkullLogo title="" aria-hidden="true" />
    </NuxtLink>
    <span>{{ studio.address }}</span>
    <span>{{ studio.hours }}</span>
    <a v-if="studio.instagram" :href="studio.instagram" target="_blank" rel="noopener">Instagram</a>
    <a :href="studio.phoneHref">{{ studio.phone }}</a>
    <NuxtLink to="/enquire">Enquire</NuxtLink>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 1.5rem;
  padding: 1.5rem var(--gutter) 2rem;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sage-text);
}

.site-footer a:hover {
  color: var(--bone);
}

.footer-skull {
  width: 22px;
}
</style>

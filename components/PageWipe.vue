<script setup lang="ts">
// The skull rolls across the screen as a 500 ms wipe between pages.
const router = useRouter()
const run = ref(0)
const active = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
let removeGuard: (() => void) | undefined

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  removeGuard = router.beforeEach((to, from) => {
    if (reduced.matches || to.path === from.path) return
    run.value++
    active.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (active.value = false), 520)
  })
})

onBeforeUnmount(() => {
  removeGuard?.()
  clearTimeout(timer)
})
</script>

<template>
  <div v-if="active" :key="run" class="wipe" aria-hidden="true">
    <div class="panel">
      <div class="roller">
        <img src="/skull-logo.svg" alt="" width="120" height="132" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wipe {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  overflow: hidden;
}

.panel {
  position: absolute;
  inset: 0;
  background: var(--slate);
  animation: sweep 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.roller {
  position: absolute;
  top: 50%;
  right: -60px;
  width: 120px;
  margin-top: -60px;
  animation: roll 500ms linear forwards;
}

.roller img {
  display: block;
  width: 100%;
  height: auto;
}

@keyframes sweep {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@keyframes roll {
  from { transform: rotate(0deg); }
  to { transform: rotate(540deg); }
}
</style>

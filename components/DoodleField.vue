<script setup lang="ts">
// Slow drifting background doodles with a slight cursor parallax.
type Kind = 'star' | 'bolt' | 'dagger' | 'skull'
type Tone = 'bone' | 'sage' | 'slate'

const doodles: { kind: Kind, tone: Tone, x: number, y: number, size: number, depth: number, spin: number, drift: number }[] = [
  { kind: 'star', tone: 'bone', x: 8, y: 14, size: 22, depth: 1, spin: 12, drift: 46 },
  { kind: 'skull', tone: 'sage', x: 22, y: 72, size: 34, depth: 2, spin: -14, drift: 54 },
  { kind: 'dagger', tone: 'slate', x: 86, y: 22, size: 44, depth: 1.5, spin: 24, drift: 58 },
  { kind: 'star', tone: 'sage', x: 74, y: 82, size: 16, depth: 2.5, spin: 0, drift: 42 },
  { kind: 'bolt', tone: 'bone', x: 92, y: 58, size: 24, depth: 1, spin: 10, drift: 50 },
  { kind: 'skull', tone: 'slate', x: 40, y: 8, size: 22, depth: 3, spin: 18, drift: 40 },
  { kind: 'dagger', tone: 'bone', x: 6, y: 46, size: 36, depth: 2, spin: -30, drift: 60 },
  { kind: 'skull', tone: 'bone', x: 58, y: 92, size: 26, depth: 1.2, spin: -8, drift: 48 },
  { kind: 'bolt', tone: 'sage', x: 64, y: 34, size: 18, depth: 2.8, spin: 40, drift: 44 },
  { kind: 'star', tone: 'slate', x: 30, y: 40, size: 12, depth: 3.2, spin: 0, drift: 52 },
  { kind: 'skull', tone: 'sage', x: 90, y: 88, size: 30, depth: 1.8, spin: 22, drift: 56 }
]

const PATHS: Record<Kind, string> = {
  star: 'M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4Z',
  bolt: 'M14 1L4 13H11L9 23L20 9H13L14 1Z',
  dagger: 'M12 1L14 4V15H10V4ZM6 15H18V17H6ZM10.5 17H13.5V22H10.5Z',
  skull: 'M12 2C6.6 2 3 5.6 3 10.2C3 12.9 4.2 14.6 5.8 15.7V19C5.8 20.1 6.7 21 7.8 21H16.2C17.3 21 18.2 20.1 18.2 19V15.7C19.8 14.6 21 12.9 21 10.2C21 5.6 17.4 2 12 2ZM7 10.5A2 2 0 1 0 11 10.5A2 2 0 1 0 7 10.5ZM13 10.5A2 2 0 1 0 17 10.5A2 2 0 1 0 13 10.5ZM12 13.6L10.9 15.6H13.1ZM9.5 17.5V21M12 17.5V21M14.5 17.5V21'
}

const layer = ref<HTMLElement | null>(null)
let frame = 0

const onPointer = (event: PointerEvent) => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    if (!layer.value) return
    const x = (event.clientX / window.innerWidth - 0.5) * -2
    const y = (event.clientY / window.innerHeight - 0.5) * -2
    layer.value.style.setProperty('--px', x.toFixed(3))
    layer.value.style.setProperty('--py', y.toFixed(3))
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('pointermove', onPointer, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onPointer)
})
</script>

<template>
  <div ref="layer" class="doodles" aria-hidden="true">
    <span
      v-for="(d, i) in doodles"
      :key="i"
      class="doodle"
      :class="`tone-${d.tone}`"
      :style="{
        left: `${d.x}%`,
        top: `${d.y}%`,
        width: `${d.size}px`,
        '--depth': d.depth,
        '--spin': `${d.spin}deg`,
        '--drift': `${d.drift}s`,
        '--delay': `${-i * 5}s`
      }"
    >
      <svg viewBox="0 0 24 24"><path :d="PATHS[d.kind]" /></svg>
    </span>
  </div>
</template>

<style scoped>
.doodles {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  --px: 0;
  --py: 0;
}

.doodle {
  position: absolute;
  display: block;
  opacity: 0.12;
  transform: translate(calc(var(--px) * var(--depth) * 8px), calc(var(--py) * var(--depth) * 8px));
  transition: transform 600ms var(--ease-out);
}

.doodle svg {
  display: block;
  width: 100%;
  height: auto;
  fill: none;
  stroke: var(--bone);
  stroke-width: 1.5;
  stroke-linejoin: round;
  transform: rotate(var(--spin));
  animation: drift var(--drift) ease-in-out var(--delay) infinite;
}

.doodle.tone-sage { opacity: 0.4; }
.doodle.tone-slate { opacity: 0.75; }
.doodle.tone-sage svg { stroke: var(--sage); }
.doodle.tone-slate svg { stroke: var(--slate); }

@keyframes drift {
  25% { transform: translate(14px, -10px) rotate(calc(var(--spin) + 8deg)); }
  50% { transform: translate(4px, -22px) rotate(var(--spin)); }
  75% { transform: translate(-12px, -8px) rotate(calc(var(--spin) - 8deg)); }
}

@media (prefers-reduced-motion: reduce) {
  .doodle {
    transform: none;
    transition: none;
  }

  .doodle svg {
    animation: none;
  }
}
</style>

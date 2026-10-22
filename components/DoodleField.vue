<script setup lang="ts">
// The living background (docs/design-spec.md, "Interaction and motion"): big flat
// palette shapes orbiting slowly, doodles that drift, twinkle and scatter from the
// cursor, scroll parallax that wraps, twinkling dots and the odd shooting star.
type Kind = 'star' | 'bolt' | 'dagger' | 'skull' | 'heart' | 'eye' | 'moon' | 'sparkle'
type Tone = 'bone' | 'sage' | 'slate'

const PATHS: Record<Kind, string> = {
  star: 'M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4Z',
  bolt: 'M14 1L4 13H11L9 23L20 9H13L14 1Z',
  dagger: 'M12 1L14 4V15H10V4ZM6 15H18V17H6ZM10.5 17H13.5V22H10.5Z',
  skull: 'M12 2C6.6 2 3 5.6 3 10.2C3 12.9 4.2 14.6 5.8 15.7V19C5.8 20.1 6.7 21 7.8 21H16.2C17.3 21 18.2 20.1 18.2 19V15.7C19.8 14.6 21 12.9 21 10.2C21 5.6 17.4 2 12 2ZM7 10.5A2 2 0 1 0 11 10.5A2 2 0 1 0 7 10.5ZM13 10.5A2 2 0 1 0 17 10.5A2 2 0 1 0 13 10.5ZM12 13.6L10.9 15.6H13.1ZM9.5 17.5V21M12 17.5V21M14.5 17.5V21',
  heart: 'M12 21C12 21 3 14.5 3 8.5C3 5.5 5.4 3.5 8 3.5C9.8 3.5 11.2 4.5 12 6C12.8 4.5 14.2 3.5 16 3.5C18.6 3.5 21 5.5 21 8.5C21 14.5 12 21 12 21Z',
  eye: 'M2 12C5 6.5 8.5 4.5 12 4.5S19 6.5 22 12C19 17.5 15.5 19.5 12 19.5S5 17.5 2 12ZM9 12A3 3 0 1 0 15 12A3 3 0 1 0 9 12Z',
  moon: 'M15 3A9 9 0 1 0 21 15A7 7 0 0 1 15 3Z',
  sparkle: 'M12 3V21M3 12H21M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5'
}

const KINDS: Kind[] = ['star', 'bolt', 'dagger', 'skull', 'heart', 'eye', 'moon', 'sparkle', 'skull', 'star']
const TONES: Tone[] = ['bone', 'bone', 'sage', 'slate']

// Seeded so server and client render the same field
const random = (() => {
  let seed = 0x5eed
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
})()

const between = (min: number, max: number) => min + random() * (max - min)

// Spread doodles over a 4 x 7 grid with jitter so they never clump
const doodles = Array.from({ length: 28 }, (_, i) => ({
  kind: KINDS[i % KINDS.length],
  tone: TONES[Math.floor(random() * TONES.length)],
  x: ((i % 4) + between(0.1, 0.9)) * 25,
  y: (Math.floor(i / 4) + between(0.1, 0.9)) * (120 / 7) - 10,
  size: Math.round(between(14, 40)),
  depth: Number(between(0.6, 3).toFixed(2)),
  spin: Math.round(between(-35, 35)),
  drift: Math.round(between(18, 34)),
  pulse: Number(between(1.6, 4.2).toFixed(2)),
  delay: -Math.round(between(0, 30))
}))

const dots = Array.from({ length: 36 }, () => ({
  x: between(0, 100),
  y: between(0, 100),
  size: random() > 0.8 ? 3 : 2,
  pulse: Number(between(1.5, 5).toFixed(2)),
  delay: -Number(between(0, 5).toFixed(2))
}))

const layer = ref<HTMLElement | null>(null)
const doodleEls = ref<HTMLElement[]>([])
const nudgeEls = ref<HTMLElement[]>([])

const REPEL_RADIUS = 170
const REPEL_PUSH = 42
const SCROLL_RATE = 0.06

let frame = 0
let pointer = { x: -9999, y: -9999 }

const update = () => {
  frame = 0
  const vw = window.innerWidth
  const vh = window.innerHeight
  const span = vh * 1.2
  const hasPointer = pointer.x > -999
  const px = hasPointer ? (pointer.x / vw - 0.5) * -2 : 0
  const py = hasPointer ? (pointer.y / vh - 0.5) * -2 : 0

  layer.value?.style.setProperty('--px', px.toFixed(3))
  layer.value?.style.setProperty('--py', py.toFixed(3))

  doodles.forEach((d, i) => {
    const outer = doodleEls.value[i]
    const nudge = nudgeEls.value[i]
    if (!outer || !nudge) return

    // Scroll parallax that wraps top-to-bottom so the field never runs out
    const baseY = (d.y / 100) * vh
    const shifted = baseY - window.scrollY * SCROLL_RATE * d.depth
    const wrapped = ((((shifted + vh * 0.1) % span) + span) % span) - vh * 0.1
    outer.style.transform = `translate3d(0, ${(wrapped - baseY).toFixed(1)}px, 0)`

    // Cursor parallax plus a push away from the pointer
    const cx = (d.x / 100) * vw + d.size / 2
    const cy = wrapped + d.size / 2
    const dx = cx - pointer.x
    const dy = cy - pointer.y
    const distance = Math.hypot(dx, dy) || 1
    const force = hasPointer ? Math.max(0, 1 - distance / REPEL_RADIUS) * REPEL_PUSH : 0
    const nx = px * d.depth * 10 + (dx / distance) * force
    const ny = py * d.depth * 10 + (dy / distance) * force
    nudge.style.transform = `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(1)}px, 0) rotate(${(force * 0.6).toFixed(1)}deg)`
  })
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

const onPointer = (event: PointerEvent) => {
  pointer = { x: event.clientX, y: event.clientY }
  schedule()
}

const onLeave = () => {
  pointer = { x: -9999, y: -9999 }
  schedule()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('pointermove', onPointer, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  schedule()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onPointer)
  document.documentElement.removeEventListener('pointerleave', onLeave)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
})
</script>

<template>
  <div ref="layer" class="field" aria-hidden="true">
    <span class="blob blob-a" />
    <span class="blob blob-b" />
    <span class="blob blob-c" />

    <span
      v-for="(dot, i) in dots"
      :key="`dot-${i}`"
      class="dot"
      :style="{ left: `${dot.x}%`, top: `${dot.y}%`, width: `${dot.size}px`, height: `${dot.size}px`, '--pulse': `${dot.pulse}s`, '--delay': `${dot.delay}s` }"
    />

    <span class="shooting shooting-a" />
    <span class="shooting shooting-b" />

    <span
      v-for="(d, i) in doodles"
      :key="i"
      ref="doodleEls"
      class="doodle"
      :class="[`tone-${d.tone}`, `kind-${d.kind}`]"
      :style="{
        left: `${d.x}%`,
        top: `${d.y}%`,
        width: `${d.size}px`,
        '--spin': `${d.spin}deg`,
        '--drift': `${d.drift}s`,
        '--pulse': `${d.pulse}s`,
        '--delay': `${d.delay}s`
      }"
    >
      <span ref="nudgeEls" class="nudge">
        <span class="drift">
          <svg viewBox="0 0 24 24"><path :d="PATHS[d.kind]" /></svg>
        </span>
      </span>
    </span>
  </div>
</template>

<style scoped>
.field {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  --px: 0;
  --py: 0;
}

/* Big flat palette shapes, orbiting slowly like the space reference's background */
.blob {
  position: absolute;
  border-radius: 50%;
  translate: calc(var(--px) * 14px) calc(var(--py) * 14px);
  transition: translate 900ms var(--ease-out);
}

.blob-a {
  width: 62vmax;
  height: 62vmax;
  left: -18vmax;
  top: 38%;
  background: var(--slate);
  opacity: 0.2;
  animation: orbit-a 70s ease-in-out infinite;
}

.blob-b {
  width: 38vmax;
  height: 38vmax;
  right: -10vmax;
  top: -14vmax;
  background: var(--sage);
  opacity: 0.12;
  animation: orbit-b 85s ease-in-out infinite;
}

.blob-c {
  width: 24vmax;
  height: 24vmax;
  right: 12%;
  bottom: -10vmax;
  background: var(--slate);
  opacity: 0.16;
  animation: orbit-c 60s ease-in-out infinite;
}

@keyframes orbit-a {
  33% { transform: translate(12vw, -8vh) scale(1.08); }
  66% { transform: translate(4vw, 10vh) scale(0.94); }
}

@keyframes orbit-b {
  50% { transform: translate(-14vw, 16vh) scale(1.12); }
}

@keyframes orbit-c {
  40% { transform: translate(-18vw, -12vh) scale(1.15); }
  80% { transform: translate(6vw, -4vh) scale(0.9); }
}

/* Twinkling dots */
.dot {
  position: absolute;
  border-radius: 50%;
  background: var(--bone);
  opacity: 0.15;
  animation: twinkle var(--pulse) ease-in-out var(--delay) infinite;
}

@keyframes twinkle {
  50% { opacity: 0.7; transform: scale(1.6); }
}

/* Shooting stars: a quick streak, then a long pause */
.shooting {
  position: absolute;
  width: 120px;
  height: 2px;
  border-radius: 2px;
  background: var(--bone);
  opacity: 0;
  rotate: 18deg;
}

.shooting-a {
  top: 12%;
  left: -10%;
  animation: shoot 13s linear 3s infinite;
}

.shooting-b {
  top: 38%;
  left: 20%;
  rotate: 24deg;
  animation: shoot 19s linear 9s infinite;
}

@keyframes shoot {
  0% { transform: translateX(0) scaleX(0.2); opacity: 0; }
  1% { opacity: 0.8; }
  6% { transform: translateX(70vw) scaleX(1); opacity: 0; }
  100% { transform: translateX(70vw) scaleX(1); opacity: 0; }
}

/* Doodles */
.doodle {
  position: absolute;
  display: block;
  opacity: 0.22;
  will-change: transform;
}

.doodle.tone-sage { opacity: 0.5; }
.doodle.tone-slate { opacity: 0.85; }

.nudge {
  display: block;
  transition: transform 500ms var(--ease-wobble);
}

.drift {
  display: block;
  rotate: var(--spin);
  animation: drift var(--drift) ease-in-out var(--delay) infinite;
}

.doodle svg {
  display: block;
  width: 100%;
  height: auto;
  fill: none;
  stroke: var(--bone);
  stroke-width: 1.6;
  stroke-linejoin: round;
  stroke-linecap: round;
  transform-origin: center;
}

.doodle.tone-sage svg { stroke: var(--sage); }
.doodle.tone-slate svg { stroke: var(--slate); }

.kind-star svg,
.kind-sparkle svg { animation: sparkle var(--pulse) ease-in-out var(--delay) infinite; }
.kind-bolt svg { animation: flicker var(--pulse) steps(1) var(--delay) infinite; }
.kind-heart svg { animation: beat var(--pulse) ease-in-out var(--delay) infinite; }
.kind-eye svg { animation: blink calc(var(--pulse) * 2) ease-in-out var(--delay) infinite; }
.kind-skull svg { animation: rattle var(--pulse) ease-in-out var(--delay) infinite; }

@keyframes drift {
  25% { transform: translate(22px, -16px) rotate(10deg); }
  50% { transform: translate(6px, -32px) rotate(0deg); }
  75% { transform: translate(-18px, -12px) rotate(-10deg); }
}

@keyframes sparkle {
  50% { transform: scale(1.35) rotate(45deg); opacity: 0.4; }
}

@keyframes flicker {
  0%, 70%, 78%, 100% { opacity: 1; }
  72%, 80% { opacity: 0.15; }
}

@keyframes beat {
  0%, 40%, 100% { transform: scale(1); }
  20% { transform: scale(1.25); }
  30% { transform: scale(1.05); }
}

@keyframes blink {
  0%, 44%, 50%, 100% { transform: scaleY(1); }
  47% { transform: scaleY(0.1); }
}

@keyframes rattle {
  0%, 60%, 100% { transform: rotate(0deg); }
  68% { transform: rotate(-12deg); }
  76% { transform: rotate(10deg); }
  84% { transform: rotate(-6deg); }
}

@media (prefers-reduced-motion: reduce) {
  .blob,
  .dot,
  .drift,
  .doodle svg,
  .nudge {
    animation: none;
    transition: none;
  }

  .shooting {
    display: none;
  }
}
</style>

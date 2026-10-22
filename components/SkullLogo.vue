<script setup lang="ts">
// The studio's own skull mark (assets/art/skull-logo.ts). Layers: sticker edge,
// dark mouth, upper skull, hinged jaw, and eyes that glance and blink.
import { SKULL_EYES, SKULL_INK, SKULL_SILHOUETTE } from '~/assets/art/skull-logo'

const props = withDefaults(defineProps<{
  track?: boolean
  blink?: boolean
  interactive?: boolean
  chatter?: boolean
  title?: string
}>(), {
  track: false,
  blink: false,
  interactive: false,
  chatter: false,
  title: 'Boneshakers skull'
})

const uid = useId()
const upperClip = `skull-upper-${uid}`
const jawClip = `skull-jaw-${uid}`

// Mouth line in the traced artwork; the jaw hinges just below it at the back of the skull
const MOUTH_Y = 600
const MAX_GLANCE = 16

const root = ref<SVGSVGElement | null>(null)
const glance = reactive({ x: 0, y: 0 })
const blinking = ref(false)
const rattling = ref(false)

let frame = 0
let blinkTimer: ReturnType<typeof setTimeout> | undefined
let rattleTimer: ReturnType<typeof setTimeout> | undefined
const cleanups: (() => void)[] = []

const aimAt = (clientX: number, clientY: number) => {
  if (!root.value) return
  const box = root.value.getBoundingClientRect()
  const dx = clientX - (box.left + box.width * 0.6)
  const dy = clientY - (box.top + box.height * 0.48)
  const distance = Math.hypot(dx, dy) || 1
  const reach = Math.min(distance / 260, 1)
  glance.x = (dx / distance) * MAX_GLANCE * reach
  glance.y = (dy / distance) * MAX_GLANCE * reach
}

const scheduleBlink = () => {
  blinkTimer = setTimeout(() => {
    blinking.value = true
    setTimeout(() => {
      blinking.value = false
      scheduleBlink()
    }, 180)
  }, 6000 + Math.random() * 4000)
}

const rattle = () => {
  if (!props.interactive) return
  rattling.value = false
  clearTimeout(rattleTimer)
  requestAnimationFrame(() => {
    rattling.value = true
    rattleTimer = setTimeout(() => (rattling.value = false), 700)
  })
}

onMounted(() => {
  if (props.track) {
    const onPointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => aimAt(event.clientX, event.clientY))
    }
    const onTilt = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return
      glance.x = Math.max(-1, Math.min(1, event.gamma / 30)) * MAX_GLANCE
      glance.y = Math.max(-1, Math.min(1, (event.beta - 45) / 30)) * MAX_GLANCE
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('deviceorientation', onTilt, { passive: true })
    cleanups.push(() => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('deviceorientation', onTilt)
    })
  }
  if (props.blink) scheduleBlink()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(blinkTimer)
  clearTimeout(rattleTimer)
  cleanups.forEach(fn => fn())
})
</script>

<template>
  <svg
    ref="root"
    class="skull"
    :class="{ 'is-blinking': blinking, 'is-chattering': chatter || rattling, 'is-rattling': rattling, 'is-interactive': interactive }"
    viewBox="-40 -40 800 880"
    role="img"
    :aria-label="title"
    :style="{ '--gx': `${glance.x}px`, '--gy': `${glance.y}px` }"
    @click="rattle"
  >
    <defs>
      <clipPath :id="upperClip"><rect x="-40" y="-40" width="800" :height="MOUTH_Y + 42" /></clipPath>
      <clipPath :id="jawClip"><rect x="-40" :y="MOUTH_Y" width="800" height="280" /></clipPath>
    </defs>

    <g class="skull-body">
      <path :d="SKULL_SILHOUETTE" class="sticker" />
      <path :d="SKULL_SILHOUETTE" class="mouth" />

      <g class="jaw" :clip-path="`url(#${jawClip})`">
        <path :d="SKULL_SILHOUETTE" class="bone" />
        <path :d="SKULL_INK" class="ink" />
      </g>

      <g :clip-path="`url(#${upperClip})`">
        <path :d="SKULL_SILHOUETTE" class="bone" />
        <path :d="SKULL_INK" class="ink" />
      </g>

      <g class="eyes">
        <path :d="SKULL_EYES" class="ink eyes-shape" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.skull {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.skull.is-interactive {
  cursor: pointer;
}

.sticker {
  fill: var(--bone);
  stroke: var(--bone);
  stroke-width: 64;
  stroke-linejoin: round;
}

.mouth { fill: var(--ink); }
.bone { fill: var(--bone); }

.ink {
  fill: var(--ink);
  fill-rule: evenodd;
}

.eyes {
  transform: translate(var(--gx, 0), var(--gy, 0));
  transition: transform 140ms linear;
}

.eyes-shape {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 90ms ease-in;
}

.is-blinking .eyes-shape {
  transform: scaleY(0.1);
}

.skull-body,
.jaw {
  transform-box: view-box;
}

.skull-body { transform-origin: 380px 760px; }
.jaw { transform-origin: 150px 600px; }

.is-rattling .skull-body {
  animation: skull-rattle 700ms var(--ease-wobble);
}

.is-chattering .jaw {
  animation: jaw-chatter 150ms steps(2) 5;
}

@keyframes jaw-chatter {
  50% { transform: rotate(6deg); }
}

@keyframes skull-rattle {
  15% { transform: rotate(-7deg); }
  35% { transform: rotate(6deg); }
  55% { transform: rotate(-4deg); }
  75% { transform: rotate(2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .eyes,
  .eyes-shape {
    transition: none;
  }

  .is-rattling .skull-body,
  .is-chattering .jaw {
    animation: none;
  }
}
</style>

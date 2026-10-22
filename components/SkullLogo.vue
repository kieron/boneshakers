<script setup lang="ts">
// Stand-in for the studio's skull mark, drawn in layers (sticker, cranium, eyes,
// glints, jaw) so the final artwork can replace it with the same animation hooks.
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

const root = ref<SVGSVGElement | null>(null)
const glint = reactive({ x: 0, y: 0 })
const blinking = ref(false)
const rattling = ref(false)

const MAX_GLINT = 7

let frame = 0
let blinkTimer: ReturnType<typeof setTimeout> | undefined
let rattleTimer: ReturnType<typeof setTimeout> | undefined
const cleanups: (() => void)[] = []

const aimAt = (clientX: number, clientY: number) => {
  if (!root.value) return
  const box = root.value.getBoundingClientRect()
  const dx = clientX - (box.left + box.width / 2)
  const dy = clientY - (box.top + box.height * 0.45)
  const distance = Math.hypot(dx, dy) || 1
  const reach = Math.min(distance / 240, 1)
  glint.x = (dx / distance) * MAX_GLINT * reach
  glint.y = (dy / distance) * MAX_GLINT * reach
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
      glint.x = Math.max(-1, Math.min(1, event.gamma / 30)) * MAX_GLINT
      glint.y = Math.max(-1, Math.min(1, (event.beta - 45) / 30)) * MAX_GLINT
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

const CRANIUM = 'M100 8C150 8 192 44 192 98C192 128 180 148 162 160L160 186L40 186L38 160C20 148 8 128 8 98C8 44 50 8 100 8Z'
const JAW = 'M40 186H160V196C160 208 151 216 139 216H61C49 216 40 208 40 196Z'
</script>

<template>
  <svg
    ref="root"
    class="skull"
    :class="{ 'is-blinking': blinking, 'is-chattering': chatter || rattling, 'is-rattling': rattling, 'is-interactive': interactive }"
    viewBox="-16 -16 232 252"
    role="img"
    :aria-label="title"
    :style="{ '--gx': `${glint.x}px`, '--gy': `${glint.y}px` }"
    @click="rattle"
  >
    <g class="skull-body">
      <!-- Sticker backing: a bone border so the ink outline reads on navy -->
      <path :d="CRANIUM" class="sticker" />
      <g class="jaw">
        <path :d="JAW" class="sticker" />
      </g>

      <path :d="CRANIUM" class="bone" />
      <path d="M44 150C50 160 56 165 64 168M156 150C150 160 144 165 136 168" class="crease" />

      <g class="jaw">
        <path :d="JAW" class="bone" />
        <path d="M76 186V211M93 186V214M110 186V214M127 186V211" class="teeth" />
      </g>

      <g class="sockets">
        <ellipse cx="66" cy="104" rx="30" ry="33" class="ink" />
        <ellipse cx="136" cy="104" rx="30" ry="33" class="ink" />
      </g>

      <g class="glints">
        <circle cx="57" cy="94" r="10" />
        <circle cx="74" cy="118" r="4.5" />
        <circle cx="127" cy="94" r="10" />
        <circle cx="144" cy="118" r="4.5" />
      </g>

      <path d="M101 166C92 158 87 150 90 144C93 139 99 140 101 145C103 140 109 139 112 144C115 150 110 158 101 166Z" class="ink" />
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
  stroke-width: 26;
  stroke-linejoin: round;
}

.bone {
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 8;
  stroke-linejoin: round;
}

.ink {
  fill: var(--ink);
}

.crease,
.teeth {
  fill: none;
  stroke: var(--ink);
  stroke-width: 6;
  stroke-linecap: round;
}

.glints {
  fill: var(--bone);
  transform: translate(var(--gx, 0), var(--gy, 0));
  transition: transform 120ms linear;
}

.sockets ellipse,
.glints circle {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 90ms ease-in;
}

.is-blinking .sockets ellipse {
  transform: scaleY(0.12);
}

.is-blinking .glints circle {
  transform: scaleY(0);
}

.skull-body {
  transform-box: fill-box;
  transform-origin: 50% 85%;
}

.is-rattling .skull-body {
  animation: skull-rattle 700ms var(--ease-wobble);
}

.is-chattering .jaw {
  animation: jaw-chatter 140ms steps(2) 5;
}

@keyframes jaw-chatter {
  50% { transform: translateY(7px); }
}

@keyframes skull-rattle {
  15% { transform: rotate(-7deg); }
  35% { transform: rotate(6deg); }
  55% { transform: rotate(-4deg); }
  75% { transform: rotate(2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .glints,
  .sockets ellipse,
  .glints circle {
    transition: none;
  }

  .is-rattling .skull-body,
  .is-chattering .jaw {
    animation: none;
  }
}
</style>

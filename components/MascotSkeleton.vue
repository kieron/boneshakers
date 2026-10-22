<script setup lang="ts">
// Stand-in for the studio's punk skeleton, one pose per page (docs/design-spec.md,
// "Characters and logo"). Increment `react` to play the pose's reaction.
export type MascotPose = 'camera' | 'door' | 'machine' | 'wince' | 'merch' | 'lost'

const props = withDefaults(defineProps<{
  pose: MascotPose
  react?: number
  reactOnView?: boolean
  label?: string
}>(), {
  react: 0,
  reactOnView: false,
  label: ''
})

const emit = defineEmits<{ click: [] }>()

const root = ref<SVGSVGElement | null>(null)
const reacting = ref(false)
const flipped = ref(false)
const filterId = `mascot-sticker-${useId()}`

const REACTION_MS: Record<MascotPose, number> = {
  camera: 450,
  door: 900,
  machine: 600,
  wince: 500,
  merch: 1200,
  lost: 0
}

let reactTimer: ReturnType<typeof setTimeout> | undefined

const play = () => {
  if (props.pose === 'lost') {
    flipped.value = !flipped.value
    return
  }
  reacting.value = false
  clearTimeout(reactTimer)
  requestAnimationFrame(() => {
    reacting.value = true
    reactTimer = setTimeout(() => (reacting.value = false), REACTION_MS[props.pose])
  })
}

watch(() => props.react, play)

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!props.reactOnView || !root.value) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      setTimeout(play, 300)
      observer?.disconnect()
    }
  }, { threshold: 0.6 })
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  clearTimeout(reactTimer)
  observer?.disconnect()
})

const onClick = () => {
  if (props.pose === 'lost') play()
  emit('click')
}

const defaultLabels: Record<MascotPose, string> = {
  camera: 'Skeleton mascot taking a photo',
  door: 'Skeleton mascot leaning on the studio door, arms crossed',
  machine: 'Skeleton mascot holding a buzzing tattoo machine',
  wince: 'Skeleton mascot wincing, with a ring through its nose',
  merch: 'Skeleton mascot in studio merch with a guitar on its back',
  lost: 'Skeleton mascot holding a map upside down'
}

// Head is the skull mark at half size, drawn in skull coordinates
const CRANIUM = 'M100 8C150 8 192 44 192 98C192 128 180 148 162 160L160 186L40 186L38 160C20 148 8 128 8 98C8 44 50 8 100 8Z'
const JAW = 'M40 186H160V196C160 208 151 216 139 216H61C49 216 40 208 40 196Z'

const ARMS: Record<MascotPose, string[]> = {
  camera: ['M90 154C70 176 80 190 94 176', 'M150 154C170 176 160 190 146 176'],
  door: ['M90 156C96 192 130 194 146 184', 'M150 156C144 192 110 194 94 184'],
  machine: ['M90 154C68 180 76 204 96 210', 'M150 154C174 148 182 128 176 114'],
  wince: ['M90 154C64 150 62 124 80 112', 'M150 154C176 150 178 124 160 112'],
  merch: ['M90 154C70 180 76 204 94 212'],
  lost: ['M90 154C74 176 80 186 92 178', 'M150 154C166 176 160 186 148 178']
}
const WAVE_ARM = 'M150 154C174 140 184 114 180 96'
</script>

<template>
  <svg
    ref="root"
    class="mascot"
    :class="[`pose-${pose}`, { 'is-reacting': reacting, 'is-flipped': flipped }]"
    viewBox="-12 -36 264 380"
    role="img"
    :aria-label="label || defaultLabels[pose]"
    @click="onClick"
  >
    <defs>
      <filter :id="filterId" x="-15%" y="-15%" width="130%" height="130%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="grown" />
        <feFlood flood-color="#f2efe8" />
        <feComposite in2="grown" operator="in" result="outline" />
        <feMerge>
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g :filter="`url(#${filterId})`">
      <!-- Door (About) sits behind the figure -->
      <g v-if="pose === 'door'" class="door">
        <rect x="6" y="36" width="74" height="290" rx="3" class="fill-bone" />
        <rect x="20" y="54" width="46" height="62" rx="2" class="fill-ink" />
        <path d="M20 140H66M20 200H66M20 260H66" class="line" />
        <circle cx="70" cy="196" r="5" class="fill-ink" />
      </g>

      <g class="figure">
        <!-- Guitar slung on the back (Shop) -->
        <g v-if="pose === 'merch'" class="guitar">
          <path d="M70 262L196 70" class="neck" />
          <path d="M186 60L206 50L214 66L198 78Z" class="fill-ink" />
          <path d="M44 238C40 214 58 200 76 210C92 200 112 214 104 236C116 254 100 282 74 280C48 284 32 260 44 238Z" class="fill-bone" />
          <circle cx="72" cy="244" r="9" class="fill-ink" />
        </g>

        <!-- Legs and shoes -->
        <path d="M108 236C104 268 96 288 90 306" class="leg" />
        <path d="M132 236C136 268 144 288 150 306" class="leg" />
        <g class="shoe shoe-left">
          <ellipse cx="80" cy="312" rx="26" ry="13" class="fill-bone" />
          <path d="M56 318H104" class="line" />
        </g>
        <g class="shoe shoe-right">
          <ellipse cx="160" cy="312" rx="26" ry="13" class="fill-bone" />
          <path d="M136 318H184" class="line" />
        </g>

        <!-- Torso: jacket with ribs, or a studio tee for the Shop -->
        <g class="torso">
          <path
            d="M90 146L150 146C156 170 152 205 146 232L94 232C88 205 84 170 90 146Z"
            :class="pose === 'merch' ? 'fill-bone' : 'fill-ink'"
          />
          <template v-if="pose === 'merch'">
            <circle cx="120" cy="184" r="15" class="fill-ink" />
            <circle cx="114" cy="182" r="4" class="fill-bone" />
            <circle cx="126" cy="182" r="4" class="fill-bone" />
            <path d="M115 194H125" class="line-bone" />
          </template>
          <path v-else d="M104 166Q120 160 136 166M102 182Q120 176 138 182M102 198Q120 192 138 198M104 214Q120 208 136 214M120 156V224" class="ribs" />
          <rect x="92" y="226" width="56" height="13" rx="3" class="fill-ink" />
          <path d="M100 232.5H101M110 232.5H111M120 232.5H121M130 232.5H131M140 232.5H141" class="studs" />
        </g>

        <!-- Neck -->
        <path d="M120 134V148" class="leg neck-bone" />

        <!-- Arms, per pose: ink underlay + bone stripes -->
        <g class="arms">
          <template v-for="d in ARMS[pose]" :key="d">
            <path :d="d" class="arm-under" />
            <path :d="d" class="arm-stripes" />
          </template>
          <g v-if="pose === 'merch'" class="wave-arm">
            <path :d="WAVE_ARM" class="arm-under" />
            <path :d="WAVE_ARM" class="arm-stripes" />
            <circle cx="180" cy="92" r="9" class="hand" />
          </g>
        </g>

        <!-- Head -->
        <g class="head">
          <g transform="translate(70 26) scale(0.5)">
            <g class="spikes">
              <path d="M78 22L100 -64L122 22Z" class="fill-ink" />
              <path d="M46 40L34 -44L90 16Z" class="fill-ink" />
              <path d="M110 16L166 -44L154 40Z" class="fill-ink" />
              <path d="M22 70L-24 8L56 32Z" class="fill-ink" />
              <path d="M144 32L224 8L178 70Z" class="fill-ink" />
            </g>
            <path :d="CRANIUM" class="head-bone" />
            <path :d="JAW" class="head-bone" />
            <path d="M76 186V211M93 186V214M110 186V214M127 186V211" class="head-line" />
            <template v-if="pose === 'wince'">
              <path d="M42 88L84 106L42 124M160 88L118 106L160 124" class="head-line wince-eyes" />
              <circle cx="101" cy="174" r="14" class="nose-ring" />
            </template>
            <template v-else>
              <ellipse cx="66" cy="104" rx="30" ry="33" class="fill-ink" />
              <ellipse cx="136" cy="104" rx="30" ry="33" class="fill-ink" />
              <circle :cx="pose === 'lost' ? 70 : 57" :cy="pose === 'lost' ? 88 : 94" r="10" class="fill-bone" />
              <circle :cx="pose === 'lost' ? 140 : 127" :cy="pose === 'lost' ? 88 : 94" r="10" class="fill-bone" />
            </template>
            <path d="M101 166C92 158 87 150 90 144C93 139 99 140 101 145C103 140 109 139 112 144C115 150 110 158 101 166Z" class="fill-ink" />
          </g>
        </g>

        <!-- Props held in the hands -->
        <g v-if="pose === 'camera'" class="camera">
          <rect x="88" y="150" width="64" height="38" rx="6" class="fill-ink" />
          <rect x="134" y="143" width="12" height="7" rx="1" class="fill-ink" />
          <circle cx="120" cy="169" r="13" class="fill-bone" />
          <circle cx="120" cy="169" r="6" class="fill-ink" />
          <path class="flash" d="M140 104L146 124L166 118L152 133L168 146L147 144L144 164L136 145L116 150L130 135L118 120L138 126Z" />
        </g>

        <g v-if="pose === 'machine'" class="machine">
          <g transform="translate(176 112) rotate(-25)">
            <rect x="-7" y="-4" width="14" height="30" rx="4" class="fill-bone" />
            <circle cx="-10" cy="-14" r="8" class="fill-ink" />
            <circle cx="10" cy="-14" r="8" class="fill-ink" />
            <path d="M0 26V44" class="line" />
          </g>
        </g>

        <g v-if="pose === 'lost'" class="map">
          <rect x="82" y="152" width="76" height="48" rx="2" class="fill-bone" />
          <path d="M90 190C100 176 112 186 122 172S142 166 150 160" class="route" />
          <path d="M144 184L152 192M152 184L144 192" class="line" />
          <path d="M98 160V172M94 168L98 172L102 168" class="line" />
        </g>
        <text v-if="pose === 'lost'" x="182" y="22" class="query">?</text>

        <!-- Hands drawn last so they sit over props -->
        <g class="hands">
          <template v-if="pose === 'camera'">
            <circle cx="94" cy="176" r="9" class="hand" />
            <circle cx="146" cy="176" r="9" class="hand" />
          </template>
          <template v-else-if="pose === 'door'">
            <circle cx="146" cy="184" r="9" class="hand" />
            <circle cx="94" cy="184" r="9" class="hand" />
          </template>
          <template v-else-if="pose === 'machine'">
            <circle cx="96" cy="210" r="9" class="hand" />
            <circle cx="176" cy="114" r="9" class="hand" />
          </template>
          <template v-else-if="pose === 'wince'">
            <circle cx="80" cy="112" r="9" class="hand" />
            <circle cx="160" cy="112" r="9" class="hand" />
          </template>
          <template v-else-if="pose === 'merch'">
            <circle cx="94" cy="212" r="9" class="hand" />
          </template>
          <template v-else>
            <circle cx="92" cy="178" r="9" class="hand" />
            <circle cx="148" cy="178" r="9" class="hand" />
          </template>
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.mascot {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.pose-lost {
  cursor: pointer;
}

.fill-ink { fill: var(--ink); }

.fill-bone {
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 6;
  stroke-linejoin: round;
}

.line,
.route {
  fill: none;
  stroke: var(--ink);
  stroke-width: 4;
  stroke-linecap: round;
}

.route { stroke-dasharray: 2 7; }

.line-bone {
  fill: none;
  stroke: var(--bone);
  stroke-width: 4;
  stroke-linecap: round;
}

.ribs {
  fill: none;
  stroke: var(--bone);
  stroke-width: 4;
  stroke-linecap: round;
}

.studs {
  stroke: var(--bone);
  stroke-width: 4;
  stroke-linecap: round;
}

.leg {
  fill: none;
  stroke: var(--ink);
  stroke-width: 16;
  stroke-linecap: round;
}

.neck-bone { stroke-width: 12; }

.neck {
  stroke: var(--ink);
  stroke-width: 12;
  stroke-linecap: round;
}

/* Striped rubber-hose sleeves, as on the moodboard guitarist */
.arm-under {
  fill: none;
  stroke: var(--ink);
  stroke-width: 15;
  stroke-linecap: round;
}

.arm-stripes {
  fill: none;
  stroke: var(--bone);
  stroke-width: 8;
  stroke-dasharray: 6 7;
}

.hand {
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 5;
}

.head-bone {
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 12;
  stroke-linejoin: round;
}

.head-line {
  fill: none;
  stroke: var(--ink);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nose-ring {
  fill: none;
  stroke: var(--ink);
  stroke-width: 8;
}

.flash {
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 3;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

.query {
  font-family: var(--font-display);
  font-size: 64px;
  fill: var(--bone);
  stroke: var(--ink);
  stroke-width: 3;
  paint-order: stroke;
}

/* Transform origins */
.figure,
.head,
.wave-arm,
.machine,
.map,
.shoe-right {
  transform-box: view-box;
}

.figure { transform-origin: 120px 320px; }
.head { transform-origin: 120px 140px; }
.wave-arm { transform-origin: 150px 154px; }
.machine { transform-origin: 176px 114px; }
.map { transform-origin: 120px 176px; transition: transform 500ms var(--ease-wobble); }
.shoe-right { transform-origin: 140px 318px; }

/* Idle loops */
.figure { animation: bob 3s ease-in-out infinite; }
.shoe-right { animation: tap 2s ease-in-out infinite; }
.pose-door .figure { animation: none; transform: rotate(-4deg); }
.pose-machine .machine { animation: buzz 90ms steps(2) infinite; }
.pose-lost .head { transform: rotate(8deg); }

@keyframes bob {
  50% { transform: translateY(-4px); }
}

@keyframes tap {
  0%, 60%, 100% { transform: rotate(0); }
  75% { transform: rotate(-12deg); }
}

@keyframes buzz {
  50% { transform: translate(1px, -1px); }
}

/* Reactions */
.pose-camera.is-reacting .flash { animation: flash 450ms ease-out; }
.pose-door.is-reacting .head { animation: nod 900ms ease-in-out; }
.pose-machine.is-reacting .figure { animation: wobble 600ms var(--ease-wobble); }
.pose-wince.is-reacting .figure { animation: flinch 500ms var(--ease-wobble); }
.pose-merch.is-reacting .wave-arm { animation: wave 1200ms ease-in-out; }
.pose-lost.is-flipped .map { transform: rotate(180deg); }

@keyframes flash {
  0% { opacity: 0; transform: scale(0.4); }
  20% { opacity: 1; transform: scale(1.15); }
  100% { opacity: 0; transform: scale(1.4); }
}

@keyframes nod {
  30% { transform: rotate(10deg) translateY(4px); }
  60% { transform: rotate(-2deg); }
}

@keyframes wobble {
  20% { transform: rotate(-4deg); }
  40% { transform: rotate(4deg); }
  60% { transform: rotate(-3deg); }
  80% { transform: rotate(2deg); }
}

@keyframes flinch {
  30% { transform: translateX(10px) scaleY(0.94) rotate(4deg); }
}

@keyframes wave {
  20%, 60% { transform: rotate(-22deg); }
  40%, 80% { transform: rotate(12deg); }
}

@media (prefers-reduced-motion: reduce) {
  .figure,
  .shoe-right,
  .pose-machine .machine {
    animation: none;
  }

  .is-reacting .figure,
  .is-reacting .head,
  .is-reacting .wave-arm {
    animation: none;
  }

  .map { transition: none; }
}
</style>

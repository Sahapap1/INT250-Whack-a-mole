<script setup>

import SoundButton from '@/components/SoundButton.vue';
import Alien from '@/components/Alien.vue';
import Blaster from '@/components/ฺBlaster.vue';
import Flash from '@/components/Flash.vue';

import { useAlienSpawner } from '@/composables/useAlienSpawner'
import { useKeyboardShoot } from '@/composables/useKeyboardShoot'

import { onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'



const route = useRoute()
const router = useRouter()
const isPaused = ref(false)

const difficulty = ref(route.query.diff || 'easy')
const control = ref(route.query.control || 'keyboard')

const difficultyClass = computed(() => {
  if (difficulty.value === 'easy') {
    return 'bg-emerald-600/60 border-emerald-300'
  }
  if (difficulty.value === 'medium') {
    return 'bg-amber-500/60 border-amber-200'
  }
  if (difficulty.value === 'hard') {
    return 'bg-rose-600/60 border-rose-300'
  }
  return ''
})

// All 9 positions carefully mapped by the user
const alienPositions = [
  { id: 1, left: '23%', top: '55%' },
  { id: 2, left: '48%', top: '52%' },
  { id: 3, left: '68%', top: '55%' },
  { id: 4, left: '38%', top: '65%' },
  { id: 5, left: '60%', top: '68%' },
  { id: 6, left: '84%', top: '65%' },
  { id: 7, left: '27%', top: '80%' },
  { id: 8, left: '48%', top: '85%' },
  { id: 9, left: '75%', top: '83%' }
]

const { aliens, start, stop } = useAlienSpawner(alienPositions, difficulty)
const flashes = ref([])
const shootTrigger = ref(0)

const GUN_DURATION = 300 // ms (ต้องเท่ากับ animation ปืน)

const score = ref(0)
const combo = ref(1)
const MAX_COMBO = 10

const timeLeft = ref(60) // 1 นาที
let gameTimer = null

const scoreEffect = ref('') // '', 'up', 'down'


const formattedScore = computed(() => {
  return score.value.toLocaleString()
})

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

useKeyboardShoot(aliens, (alien, index) => {
  shootTrigger.value++
  shootAlien(alien, index)
}, control)

onMounted(() => {
  start()
  startTimer()
})

const handleReset = () => {

  // 🔄 reset state
  score.value = 0
  combo.value = 1
  timeLeft.value = 60

  flashes.value = []

  aliens.value.forEach(alien => {
    alien.visible = false
    alien.state = 'idle'
  })

  // 🔥 หยุดทุกอย่างก่อน
  stop()
  stopTimer()

  // ▶️ เริ่มใหม่
  isPaused.value = false
  start()
  startTimer()
}


watch(isPaused, (val) => {
  if (val) {
    stop()
    stopTimer()
  } else {
    start()
    startTimer()
  }
})


function shootAlien(alien, index) {

  shootTrigger.value++

  const pos = alienPositions[index]
  const id = Date.now() + Math.random()

  // 💥 flash
  setTimeout(() => {
    flashes.value.push({
      id,
      left: pos.left,
      top: pos.top
    })

    setTimeout(() => {
      flashes.value = flashes.value.filter(f => f.id !== id)
    }, 300)

  }, GUN_DURATION)

  // 👽 hit logic
  setTimeout(() => {

    // ❌ ยิงพลาด → reset combo
    if (!alien || !alien.visible || alien.state === 'dead') {
      combo.value = 1
      return
    }

    // 🎯 ยิงโดน
    alien.state = 'dead'

    // 🔥 เช็ค type
    if (alien.type === 'predator') {
      score.value -= 20
      combo.value = 1

      triggerScoreEffect('down') // 🔴

    } else if (alien.type === 'alien') {
      score.value += 30 * combo.value
      combo.value = Math.min(combo.value + 1, MAX_COMBO)
      triggerScoreEffect('up')
    } else if (alien.type === 'blue') {
      score.value += 15 * combo.value
      combo.value = Math.min(combo.value + 1, MAX_COMBO)
      triggerScoreEffect('up')
    }
    else if (alien.type === 'green') {
      score.value += 10 * combo.value
      combo.value = Math.min(combo.value + 1, MAX_COMBO)
      triggerScoreEffect('up')
    } else {
      combo.value = Math.min(combo.value + 1, MAX_COMBO)
      score.value += combo.value * 5

      triggerScoreEffect('up') // 🟢
    }

    setTimeout(() => {
      alien.visible = false
    }, 300)

  }, GUN_DURATION)
}

function triggerScoreEffect(type) {
  scoreEffect.value = type

  setTimeout(() => {
    scoreEffect.value = ''
  }, 300) // ระยะเวลาที่สีแสดง
}

function startTimer() {
  if (gameTimer) return // 🔥 กันซ้อน

  gameTimer = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value <= 0) {
      timeLeft.value = 0 // 🔥 กันติดลบ
      clearInterval(gameTimer)
      gameTimer = null
      stop()
      router.push({
        name: 'result',
        query: {
          score: score.value,
          diff: difficulty.value,
          control: control.value
        }
      })
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(gameTimer)
  gameTimer = null
}

</script>

<template>
  <div class="fixed inset-0 w-screen h-screen bg-black overflow-hidden font-kanit">
    <!-- Background Image: Stretched fixed to the screen 100%x100% (No zoom, no crop) -->
    <img src="../assets/bg/bg3.png" class="absolute inset-0 w-full h-full object-fill -z-10" alt="">

    <!-- UI Overlay Layer -->
    <!-- Header Bar -->
    <div class="absolute top-0 inset-x-0 z-20 flex justify-center px-2 sm:px-4 mt-2 sm:mt-3 pointer-events-none">
      <div
        class="pointer-events-auto bg-black/50 backdrop-blur-md border-[#c874b2]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] hover:border-[#c874b2]/40 transition-colors duration-500 pt-2 pb-2 sm:pt-2 sm:pb-3 px-4 sm:px-11 max-w-5xl w-full rounded-3xl sm:rounded-4xl text-center text-shadow-2xs border-4 space-y-2">
        <div class="flex items-center justify-between gap-2">
          <div
            class="bg-purple-600/60 backdrop-blur-xl border border-[#c874b2]/20 space-y-1 inline-block px-3 sm:px-8 py-1 rounded-3xl w-45 text-center">
            <h1 :class="['text-2xl sm:text-4xl md:text-5xl text-shadow-2xs flex-1 transition-colors duration-200', scoreEffect === 'up' && 'text-green-400', scoreEffect === 'down' && 'text-red-500', !scoreEffect && 'text-white'
            ]">
              {{ formattedScore }}
            </h1>
          </div>
          <h1
            class="text-lg sm:text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mt-1 sm:mt-2 shadow-2xl tracking-tight leading-tight text-center drop-shadow-[0_0_10px_rgba(200,116,178,0.8) font-kanit">
            SHOOT-AN-ALIEN
          </h1>
          <div class="bg-[#c874b2]/20 space-y-1 inline-block px-3 sm:px-8 py-1 rounded-4xl shadow-2xl w-45 text-center">
            <h1 class="text-2xl sm:text-4xl md:text-5xl text-white text-shadow-2xs ">
              {{ formattedTime }}
            </h1>
          </div>
        </div>

        <div :class="[
          'border-2 text-white inline-block px-8 sm:px-25 py-1 rounded-4xl mx-auto shadow-2xl',
          difficultyClass
        ]">
          <h1 class="text-xl sm:text-3xl text-white text-shadow-2xs ">
            {{ difficulty }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Aliens Layer -> Coordinates precisely tuned to mapped stretch -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div class="absolute bottom-25 left-20 -rotate-30">
        <Blaster :shootTrigger="shootTrigger" />
      </div>
      <div v-for="alien in aliens" :key="alien.id"
        class="absolute pointer-events-auto -translate-x-1/2 -translate-y-[80%]"
        :style="{ left: alien.left, top: alien.top }">
        <Alien v-if="alien.visible" :state="alien.state" :type="alien.type" />
      </div>
      <div v-for="flash in flashes" :key="flash.id"
        class="absolute pointer-events-none -translate-x-1/2 -translate-y-[80%]"
        :style="{ left: flash.left, top: flash.top }">
        <Flash />
      </div>
    </div>

    <!-- Pause Button — bottom LEFT -->
    <button @click="isPaused = !isPaused"
      class="cursor-pointer absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#c874b2]/40 text-[#f5d5e0] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/90 hover:border-[#c874b2] shadow-[0_0_20px_rgba(0,0,0,0.8)] focus:outline-none z-20 group">
      <div
        class="absolute inset-0 rounded-full bg-[#f5d5e0]/0 group-hover:bg-[#f5d5e0]/10 transition-colors duration-300">
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    </button>

    <!-- Volume Button — bottom RIGHT -->
    <SoundButton />

    <!-- Pause Overlay -->
    <div v-if="isPaused" class="absolute inset-0 z-50 flex items-center justify-center">
      <!-- Dark backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" @click="isPaused = false"></div>

      <!-- Main Pause Card -->
      <div
        class="relative z-10 w-[90%] max-w-md rounded-[2.5rem] px-8 py-16 sm:px-12 sm:py-20 flex flex-col items-center justify-center overflow-hidden bg-gray-900/80 backdrop-blur-xl border-2 border-gray-600/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-gray-500/80 transition-colors duration-500">
        <div class="absolute inset-0 bg-linear-to-b from-gray-500/10 to-transparent pointer-events-none"></div>
        <div class="text-center space-y-1 mb-12 w-full border-b border-gray-700/80 pb-8 flex justify-center">
          <h2
            class="text-4xl sm:text-5xl! leading-none font-black whitespace-nowrap text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-[0.2em] pl-[0.2em] selection:bg-gray-600 selection:text-white uppercase">
            GAME PAUSED
          </h2>
        </div>
        <div class="w-full flex flex-col gap-6">
          <button @click="isPaused = false"
            class="w-full py-4 rounded-2xl font-black text-xl tracking-[0.2em] transition-all duration-300 border-2 outline-none cursor-pointer bg-white border-white text-black hover:bg-gray-200 hover:border-gray-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-[0.98]">
            CONTINUE
          </button>
          <div class="w-full flex gap-4">
            <button @click="router.push('/')"
              class="flex-1 py-4 rounded-2xl font-bold text-lg sm:text-xl tracking-widest transition-all duration-300 border-2 outline-none cursor-pointer bg-gray-900/60 border-gray-600 text-gray-200 hover:text-white hover:border-gray-400 hover:bg-gray-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-[0.98]">
              BACK
            </button>
            <button @click="handleReset"
              class="flex-1 py-4 rounded-2xl font-bold text-lg sm:text-xl tracking-widest transition-all duration-300 border-2 outline-none cursor-pointer bg-gray-600/40 border-gray-400 text-white hover:border-white hover:bg-gray-500/60 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-[0.98]">
              RESTART
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
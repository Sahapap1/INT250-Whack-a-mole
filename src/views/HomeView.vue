<script setup>
import { ref } from 'vue'

const difficulties = [
  { 
    id: 'easy', 
    label: 'ง่าย',
    activeClass: 'bg-emerald-600 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-[1.03]',
    inactiveClass: 'bg-emerald-900/40 border-emerald-500 text-white hover:border-emerald-400 hover:bg-emerald-800/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
  },
  { 
    id: 'medium', 
    label: 'กลาง',
    activeClass: 'bg-amber-500 border-amber-200 text-white shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-[1.03]',
    inactiveClass: 'bg-amber-900/40 border-amber-500 text-white hover:border-amber-400 hover:bg-amber-800/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
  },
  { 
    id: 'hard', 
    label: 'ยาก',
    activeClass: 'bg-rose-600 border-rose-300 text-white shadow-[0_0_20px_rgba(225,29,72,0.8)] scale-[1.03]',
    inactiveClass: 'bg-rose-900/40 border-rose-500 text-white hover:border-rose-400 hover:bg-rose-800/60 shadow-[0_0_10px_rgba(225,29,72,0.2)]'
  }
]

const controlOptions = [
  { 
    id: 'keyboard', 
    label: 'คีย์บอร์ด', 
    icon: 'keyboard',
    activeClass: 'bg-cyan-600 border-cyan-300 text-white shadow-[0_0_20px_rgba(8,145,178,0.8)] scale-[1.03]',
    inactiveClass: 'bg-cyan-900/40 border-cyan-500 text-white hover:border-cyan-400 hover:bg-cyan-800/60 shadow-[0_0_10px_rgba(8,145,178,0.2)]'
  },
  { 
    id: 'numbers', 
    label: 'ตัวเลข', 
    icon: 'numbers',
    activeClass: 'bg-gray-600 border-gray-400 text-white shadow-[0_0_20px_rgba(156,163,175,0.6)] scale-[1.03]',
    inactiveClass: 'bg-gray-800/40 border-gray-500 text-white hover:border-gray-400 hover:bg-gray-700/60 shadow-[0_0_10px_rgba(156,163,175,0.2)]'
  }
]

const selectedDiff = ref('easy')
const selectedControl = ref('keyboard')
const isMuted = ref(false)

const startGame = () => {
  console.log('Starting game with:', selectedDiff.value, selectedControl.value)
}
</script>

<template>
  <div class="relative w-screen h-screen flex items-center justify-center overflow-hidden font-kanit">
    <!-- Background Content -->
    <div class="absolute inset-0 w-full h-full -z-20">
      <img src="../assets/bg/bg.png" alt="Background" class="w-full h-full object-fill object-center" />
      <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
    </div>

    <!-- Additional Ambient Glows -->
    <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
      <div class="w-[80vw] h-[80vw] max-w-4xl max-h-4xl bg-[#7b337d]/20 rounded-full blur-[120px] mix-blend-screen"></div>
    </div>

    <!-- Main Card -->
    <div class="relative z-10 w-[92%] max-w-[640px] rounded-[2.5rem] p-8 sm:p-12 flex flex-col items-center justify-center overflow-hidden bg-black/50 backdrop-blur-xl border border-[#c874b2]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] group/card hover:border-[#c874b2]/40 transition-colors duration-500">
      
      <!-- Card inner glow -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

      <!-- Header -->
      <div class="text-center space-y-1 mb-8">
        <h1 class="text-4xl sm:text-5xl md:text-6xl leading-none font-black whitespace-nowrap text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-wide selection:bg-[#7b337d] selection:text-white">
          SHOOT-AN-ALIEN
        </h1>
        <p class="text-xs sm:text-sm font-semibold tracking-[0.3em] text-white/90 mt-3">
          CHOOSE YOUR SETTINGS
        </p>
      </div>

      <!-- Settings Section -->
      <div class="w-full space-y-8">
        
        <!-- Difficulty -->
        <div class="space-y-4">
          <h3 class="text-xs sm:text-sm font-bold tracking-[0.2em] text-white text-center w-full uppercase opacity-90">ระดับความยาก (Difficulty)</h3>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
            <button 
              v-for="diff in difficulties" :key="diff.id"
              @click="selectedDiff = diff.id"
              :class="[
                'flex-1 py-3 sm:py-4 px-6 rounded-2xl font-semibold text-lg sm:text-xl transition-all duration-300 border-2 outline-none',
                selectedDiff === diff.id ? diff.activeClass : diff.inactiveClass
              ]"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Controls -->
        <div class="space-y-4">
          <h3 class="text-xs sm:text-sm font-bold tracking-[0.2em] text-white text-center uppercase opacity-90">วิธีเล่น (Controls)</h3>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
            <button 
              v-for="ctrl in controlOptions" :key="ctrl.id"
              @click="selectedControl = ctrl.id"
              :class="[
                'flex-[1] sm:flex-[0.5] flex items-center justify-center gap-3 py-3 sm:py-4 px-6 rounded-2xl font-semibold text-lg sm:text-xl transition-all duration-300 border-2 outline-none',
                selectedControl === ctrl.id ? ctrl.activeClass : ctrl.inactiveClass
              ]"
            >
              <div v-if="ctrl.icon === 'keyboard'" class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                  <path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-black/40 border-[1.5px] border-current">
                <span class="text-[14px] sm:text-[16px] font-bold leading-none translate-y-[1px]">9</span>
              </div>
              {{ ctrl.label }}
            </button>
          </div>
        </div>

      </div>

      <!-- Bottom elements -->
      <div class="w-full flex flex-col items-center gap-6 mt-10">
        
        <button @click="startGame" class="relative overflow-hidden w-full py-5 rounded-2xl bg-gradient-to-r from-[#430d4b] via-[#7b337d] to-[#430d4b] text-[#f5d5e0] font-black text-2xl tracking-[0.2em] outline-none transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,116,178,0.6)] border border-[#c874b2]/50 hover:border-[#f5d5e0] active:scale-[0.98] group bg-[length:200%_auto] hover:bg-[position:right_center]">
          <div class="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-[#f5d5e0]/30 to-transparent -skew-x-12 -translate-x-[250%] transition-transform duration-1000 ease-in-out group-hover:translate-x-[250%] pointer-events-none"></div>
           PLAY GAME
        </button>
      </div>

    </div>

    <!-- Mute Button -->
    <button 
      @click="isMuted = !isMuted"
      class="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#c874b2]/40 text-[#f5d5e0] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/90 hover:border-[#c874b2] shadow-[0_0_20px_rgba(0,0,0,0.8)] focus:outline-none z-20 group"
    >
      <div class="absolute inset-0 rounded-full bg-[#f5d5e0]/0 group-hover:bg-[#f5d5e0]/10 transition-colors duration-300"></div>
      <svg v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-7 sm:h-7 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="1" x2="1" y2="23"></line>
        <line x1="22.93" y1="9.07" x2="17.07" y2="14.93"></line>
        <line x1="17.07" y1="9.07" x2="22.93" y2="14.93"></line>
      </svg>
    </button>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');

.font-kanit {
  font-family: 'Kanit', sans-serif;
}
</style>

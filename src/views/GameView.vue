<script setup>
import Alien from '@/components/Alien.vue';
import SoundButton from '@/components/SoundButton.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const isPaused = ref(false)

const handleReset = () => {
  // Add game reset logic here
  isPaused.value = false
  // For now we can reload the view or similar, depending on game flow
  // router.go(0)
}
</script>

<template>
  <div class="relative w-screen h-screen flex flex-col">
    <div class="absolute inset-0 -z-10">
      <img src="../assets/bg/bg3.png" class="bg-cover bg-center w-full h-full" alt="">
    </div>

    <!-- Header Bar -->
    <div class="flex justify-center px-2 sm:px-4">
<div class="bg-black/50 backdrop-blur-md  border-[#c874b2]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] hover:border-[#c874b2]/40 transition-colors duration-500 pt-2 pb-2 sm:pt-2 sm:pb-3 px-4 sm:px-11 mt-2 sm:mt-3
    max-w-5xl w-full rounded-3xl sm:rounded-4xl text-center text-shadow-2xs border-4 space-y-2 font-kanit">
            <div class="flex items-center justify-between gap-2">
                <div class="bg-purple-600/60 backdrop-blur-xl border border-[#c874b2]/20 space-y-1 inline-block px-3 sm:px-8 py-1 rounded-3xl">
                    <h1 class="text-2xl sm:text-4xl md:text-5xl text-white text-shadow-2xs ">
                        9,999
                    </h1>
                </div>
                <h1 class="text-lg sm:text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mt-1 sm:mt-2 shadow-2xl tracking-tight leading-tight text-center drop-shadow-[0_0_10px_rgba(200,116,178,0.8) font-kanit">
                    SHOOT-AN-ALIEN
                </h1>
                <div class="bg-[#c874b2]/20 space-y-1 inline-block px-3 sm:px-8 py-1 rounded-4xl shadow-2xl ">
                    <h1 class="text-2xl sm:text-4xl md:text-5xl text-white text-shadow-2xs ">
                        03.00
                    </h1>
                </div>
            </div>

        <div
          class="bg-amber-900/40 border-amber-500 border-2 text-white space-y-1 inline-block px-8 sm:px-25 py-1 rounded-4xl mx-auto text-shadow-2xs shadow-2xl">
          <h1 class="text-xl sm:text-3xl text-white text-shadow-2xs ">
            Medium
          </h1>
        </div>
      </div>
    </div>


    <div class="mt-2 m-20 flex-1 relative">
      <div class="absolute left-39 top-6">
        <Alien />
      </div>
      <div class="absolute top-[0%] left-[39%]">
        <Alien />
      </div>
      <div class="absolute right-[20%] top-[5%]">
        <Alien />
      </div>
      <div class="absolute right-[4%] top-[20%]">
        <Alien />
      </div>
      <div class="absolute left-[28%] top-[20%]">
        <Alien />
      </div>
      <div class="absolute right-[31%] top-[27%]">
        <Alien />
      </div>
      <div class="absolute right-[15%] -bottom-[3%]">
        <Alien />
      </div>
      <div class="absolute right-[44%] -bottom-[7%]">
        <Alien />
      </div>
      <div class="absolute left-[15%] bottom-[2%]">
        <Alien />
      </div>
      
    </div>

    <!-- Pause Button — bottom LEFT -->
    <button @click="isPaused = !isPaused"
      class="cursor-pointer absolute bottom-4 left-4 sm:bottom-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#c874b2]/40 text-[#f5d5e0] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/90 hover:border-[#c874b2] shadow-[0_0_20px_rgba(0,0,0,0.8)] focus:outline-none z-20 group">
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
    <div v-if="isPaused" class="fixed inset-0 z-50 flex items-center justify-center font-kanit">
      <!-- Dark backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isPaused = false"></div>

      <!-- Main Pause Card (Settings Style) -->
      <div class="relative z-10 w-[90%] max-w-md rounded-[2.5rem] px-8 py-16 sm:px-12 sm:py-20 flex flex-col items-center justify-center overflow-hidden bg-gray-900/80 backdrop-blur-xl border-2 border-gray-600/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-gray-500/80 transition-colors duration-500">
        
        <!-- Inner glow -->
        <div class="absolute inset-0 bg-linear-to-b from-gray-500/10 to-transparent pointer-events-none"></div>

        <!-- Header -->
        <div class="text-center space-y-1 mb-12 w-full border-b border-gray-700/80 pb-8 flex justify-center">
          <h2 class="text-4xl sm:text-5xl! leading-none font-black whitespace-nowrap text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-[0.2em] pl-[0.2em] selection:bg-gray-600 selection:text-white uppercase">
            GAME PAUSED
          </h2>
        </div>

        <!-- Buttons -->
        <div class="w-full flex flex-col gap-6">
          <!-- CONTINUE (Solid White for max legibility & emphasis) -->
          <button @click="isPaused = false" class="w-full py-4 rounded-2xl font-black text-xl tracking-[0.2em] transition-all duration-300 border-2 outline-none cursor-pointer bg-white border-white text-black hover:bg-gray-200 hover:border-gray-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-[0.98]">
            CONTINUE
          </button>

          <!-- Secondary Buttons Row -->
          <div class="w-full flex gap-4">
            <!-- BACK (Dark Gray tone) -->
            <button @click="router.push('/')" class="flex-1 py-4 rounded-2xl font-bold text-lg sm:text-xl tracking-[0.1em] transition-all duration-300 border-2 outline-none cursor-pointer bg-gray-900/60 border-gray-600 text-gray-200 hover:text-white hover:border-gray-400 hover:bg-gray-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-[0.98]">
              BACK
            </button>

            <!-- RESET (Mid Gray tone) -->
            <button @click="handleReset" class="flex-1 py-4 rounded-2xl font-bold text-lg sm:text-xl tracking-[0.1em] transition-all duration-300 border-2 outline-none cursor-pointer bg-gray-600/40 border-gray-400 text-white hover:border-white hover:bg-gray-500/60 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-[0.98]">
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<style scoped></style>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from 'vue'

const router = useRouter();
const route = useRoute();

const score = Number(route.query.score || 0)
const difficulty = ref(route.query.diff || 'easy')
const control = ref(route.query.control || 'keyboard')

const goBack = () => {
  router.push("/"); // กลับไปหน้า HomeView
};

const playAgain = () => {
  router.push({
    name: 'game',
    query: {
      diff: difficulty.value,
      control: control.value
    }
  }) // กลับไปหน้า GameView
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-kanit">
    <div class="absolute inset-0 w-full h-full -z-20">
      <img src="../assets/bg/bg.png" alt="Background" class="w-full h-full object-fill object-center" />
      <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
    </div>
    <div
      class="relative z-10 w-[92%] max-w-160 rounded-[2.5rem] p-8 sm:p-12 flex flex-col items-center justify-center overflow-hidden bg-black/50 backdrop-blur-xl border border-[#c874b2]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] group/card hover:border-[#c874b2]/40 transition-colors duration-500">
      <div class="mb-6 w-full flex justify-center">
        <img src="@/assets/logo/shoot_alien_logo.png" alt="Shoot An Alien"
          class="w-64 h-auto object-contain drop-shadow-lg" />
      </div>

      <h1 class="text-4xl md:text-5xl font-black text-[#2e9caf] mb-2 tracking-wide text-center uppercase">
        Great Job !
      </h1>

      <h2 class="text-xl md:text-2xl font-bold text-gray-300 mb-4 text-center">
        Your Score
      </h2>

      <div class="text-4xl md:text-5xl font-black text-red-600 mb-10 tracking-widest drop-shadow-md">
        {{ score }}
      </div>

      <div class="flex flex-col sm:flex-row gap-5 w-full justify-center px-4">
        <button @click="goBack" class="flex-1 sm:flex-[0.5] flex items-center justify-center gap-3
         py-3 sm:py-4 px-6 rounded-2xl font-semibold text-lg sm:text-xl
         transition-all duration-300 border-2 cursor-pointer
         text-white

         bg-linear-to-r from-gray-600 to-gray-500
         border-gray-400

         shadow-[0_0_15px_rgba(255,255,255,0.2)]

         hover:scale-105
         hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
         hover:from-gray-500 hover:to-gray-400
  ">
          Back
        </button>

        <button @click="playAgain" class="flex-1 sm:flex-[0.5] flex items-center justify-center gap-3
         py-3 sm:py-4 px-6 rounded-2xl font-semibold text-lg sm:text-xl
         transition-all duration-300 border-2 cursor-pointer
         text-white

         bg-linear-to-r from-[#0c6278] to-[#2e9caf]
         border-[#81cddf]

         shadow-[0_0_20px_rgba(46,156,175,0.6)]

         hover:scale-105
         hover:shadow-[0_0_30px_rgba(46,156,175,0.9)]
         hover:from-[#2e9caf] hover:to-[#4fd1e5]
  ">
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

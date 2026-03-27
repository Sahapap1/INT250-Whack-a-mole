<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const score = ref(1000);

const goBack = () => {
  router.push("/"); // กลับไปหน้า HomeView
};

const playAgain = () => {
  router.push("/game"); // กลับไปหน้า GameView
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 font-sans bg-[url('@/assets/bg/bg.png')] bg-cover bg-center"
  >
    <div
      class="bg-black rounded-[2.5rem] p-10 w-full max-w-lg flex flex-col items-center shadow-2xl relative overflow-hidden"
    >
      <div class="mb-6 w-full flex justify-center">
        <img
          src="@/assets/logo/shoot_alien_logo.png"
          alt="Shoot An Alien"
          class="w-64 h-auto object-contain drop-shadow-lg"
        />
      </div>

      <h1
        class="text-4xl md:text-5xl font-black text-[#2e9caf] mb-2 tracking-wide text-center uppercase"
      >
        Great Job !
      </h1>

      <h2 class="text-xl md:text-2xl font-bold text-gray-300 mb-4 text-center">
        Your Score
      </h2>

      <div
        class="text-4xl md:text-5xl font-black text-red-600 mb-10 tracking-widest drop-shadow-md"
      >
        {{ score.toLocaleString() }}
      </div>

      <div class="flex flex-col sm:flex-row gap-5 w-full justify-center px-4">
        <button
          @click="goBack"
          class="flex-1 bg-[#8c8c8c] hover:bg-[#7a7a7a] text-white font-bold py-3 px-8 rounded-2xl border-4 border-[#b3b3b3] transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider shadow-lg"
        >
          Back
        </button>

        <button
          @click="playAgain"
          class="flex-1 bg-[#094d5e] hover:bg-[#0c6278] text-white font-bold py-3 px-8 rounded-2xl border-4 border-[#81cddf] transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider shadow-lg"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

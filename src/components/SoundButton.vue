<script setup>
import { ref } from 'vue'

const isMuted = ref(false)
</script>
<template>
    <button @click="isMuted = !isMuted"
        class="cursor-pointer absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#c874b2]/40 text-[#f5d5e0] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/90 hover:border-[#c874b2] shadow-[0_0_20px_rgba(0,0,0,0.8)] focus:outline-none z-20 group">
        <div
            class="absolute inset-0 rounded-full bg-[#f5d5e0]/0 group-hover:bg-[#f5d5e0]/10 transition-colors duration-300">
        </div>
        <svg v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-7 sm:h-7 opacity-70" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="1" x2="1" y2="23"></line>
            <line x1="22.93" y1="9.07" x2="17.07" y2="14.93"></line>
            <line x1="17.07" y1="9.07" x2="22.93" y2="14.93"></line>
        </svg>
    </button>
</template>
<style scoped></style>
<script setup>

import { ref, watch } from 'vue'

// รับ trigger จาก parent
const props = defineProps({
    shootTrigger: Number
})

const isShooting = ref(false)

watch(() => props.shootTrigger, () => {
    isShooting.value = true

    setTimeout(() => {
        isShooting.value = false
    }, 300)
})
</script>

<template>
    <div :class="`
    w-[323.1px] h-40.75
    bg-[url('@/assets/sprite/blaster.png')] bg-no-repeat
    -translate-x-5.75 -translate-y-10 scale-[0.8]
    origin-[50%_80%]
    transition-transform duration-300 ease-out
    ${isShooting ? 'shot' : 'animate-float'}
  `"></div>
</template>


<style>
@keyframes floatRotate {
    0% {
        transform: translate(-23px, -40px) scale(0.8) rotate(-2deg);
    }

    50% {
        transform: translate(-23px, -45px) scale(0.8) rotate(2deg);
    }

    100% {
        transform: translate(-23px, -40px) scale(0.8) rotate(-2deg);
    }
}

/* 👉 เอา animation นี้ไปผูกกับ tailwind */
.animate-float {
    animation: floatRotate 3s ease-in-out infinite;
}

.shot {
    animation: shotAnim 0.3s steps(4) forwards;
}

@keyframes shotAnim {
    from {
        background-position: 0 0;
    }

    to {
        background-position: -1293px 0;
    }
}
</style>
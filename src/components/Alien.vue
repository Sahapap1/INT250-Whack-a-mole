<script setup>
import { ref } from 'vue'

const state = ref('idle')

function setState(s) {
    state.value = s
}

function jump() {
    state.value = 'jump'
}

function dead() {
    state.value = 'dead'
}

function idle() {
    state.value = 'idle'
}
</script>
<template>
    <div class="sprite" :class="state"></div>
</template>


<style scoped>
.sprite {
    width: 230px;
    height: 250px;

    background-image: url('@/assets/sprite/alien.png');
    background-repeat: no-repeat;

    /* Base scale for large desktop screens. 
       Added translate(-23px, -40px) to exactly match the visual offset 
       of the old "transform-origin: top left" so the manual % coordinates 
       stay perfectly aligned! */
    transform: translate(-23px, -40px) scale(0.8);
    
    /* VERY IMPORTANT: Lock the pivot point to the bottom-center "feet". 
       Since the parent translate is -translate-y-[80%], we anchor the scale at 80% Y. */
    transform-origin: 50% 80%;
    
    /* Smoothly transition any scale changes from resizing window */
    transition: transform 0.3s ease-out;
}

/* Responsive Scaling: Step down the size of the alien as the screen width gets narrower */
@media (max-width: 1536px) { .sprite { transform: translate(-23px, -40px) scale(0.7); } }
@media (max-width: 1280px) { .sprite { transform: translate(-23px, -40px) scale(0.6); } }
@media (max-width: 1024px) { .sprite { transform: translate(-23px, -40px) scale(0.5); } }
@media (max-width: 768px) { .sprite { transform: translate(-23px, -40px) scale(0.4); } }
@media (max-width: 640px) { .sprite { transform: translate(-23px, -40px) scale(0.35); } }
@media (max-width: 480px) { .sprite { transform: translate(-23px, -40px) scale(0.25); } }
@media (max-width: 360px) { .sprite { transform: translate(-23px, -40px) scale(0.2); } }

.jump {
    animation: jumpAnim 0.4s steps(5) forwards;
}

@keyframes jumpAnim {
    from {
        background-position: 0 0;
    }
    to {
        background-position: -1150px 0;
    }
}

.idle {
    animation: idleAnim 0.4s steps(3) infinite;
}

@keyframes idleAnim {
    from {
        background-position: 0 -250px;
    }
    to {
        background-position: -690px -250px;
    }
}

.dead {
    animation: deadAnim 0.4s steps(5) forwards;
}

@keyframes deadAnim {
    from {
        background-position: 0 -500px;
    }
    to {
        background-position: -1150px -500px;
    }
}
</style>
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

    transform: scale(0.8);
    transform-origin: top left;
}

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
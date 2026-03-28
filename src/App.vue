<script setup>
import { onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { init } = useAudio()

onMounted(() => {
  init() 
})
</script>

<template>
  <router-view />

</template>

<style scoped></style>

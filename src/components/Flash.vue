<script setup>
</script>

<template>
  <div
    class="w-39.25 h-31.25
           bg-[url('@/assets/sprite/flash.png')] bg-no-repeat
           -translate-x-5.75 -translate-y-10 scale-[0.8]
           origin-[50%_80%]
           transition-transform duration-300 ease-out
           boom">
  </div>
</template>


<style>
.boom {
  animation: boom 0.3s steps(4) forwards;
}

@keyframes boom {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -660px 0;
  }
}
</style>
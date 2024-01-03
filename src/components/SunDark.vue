<script setup lang='ts'>
import { isDark, toggleDark } from '~/composables/dark'
</script>

<template>
  <div class="cursor-pointer" @click="toggleDark()">
    <div v-if="isDark" i-carbon-moon />
    <div v-else i-carbon-sun />
  </div>
</template>

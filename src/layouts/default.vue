<script setup lang="ts">
</script>

<template>
  <main class="px-6 py-4 text-center text-gray-700 !dark:text-gray-200">
    <Header />
    <div min-h-70vh max-w-60vw mx-auto mt-5vh lt-md:max-w-80vw>
      <RouterView />
    </div>
    <Footer />
  </main>
</template>

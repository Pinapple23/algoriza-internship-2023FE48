<template>
  <header class="sticky top-0 bg-white">
    <nav class="container flex justify-between items-center gap-4 text-black py-6">
      <div class="flex items-center gap-3">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-plane text-2xl"></i>
            <p class="text-2xl">My Dream Place</p>
          </div>
        </RouterLink>
      </div>

      <div class="flex items-center gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/discover">Discover</RouterLink>
        <RouterLink to="/activities">Activities</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
      <button class="bg-blue-600 rounded-lg px-4 py-2 text-white">
        <RouterLink to="/login">login</RouterLink>
      </button>
    </nav>
  </header>
</template>
  
<script setup>
</script>
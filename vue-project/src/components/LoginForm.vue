<template>
    <div class="flex items-center justify-center h-screen">
      <div class="w-96">
        <h2 class="text-2xl font-medium mb-4 text-center">Sign In</h2>
  
        <form @submit.prevent="signIn">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email Address:</label>
            <input v-model="email" type="email" id="email" class="bg-gray-100 w-full h-12 p-2 border border-gray-300 rounded-md" required>
          </div>
  
          <div class="mb-4 relative">
            <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" class="bg-gray-100 w-full h-12 p-2 border border-gray-300 rounded-md pr-10" required>
            <span @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer pt-5">
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </span>
          </div>
  
          <button type="submit" class="w-full h-12 bg-blue-500 text-white rounded-md">Sign In</button>
        </form>
  
        <p class="mt-4 text-sm text-center">
          Don't have an account? 
          <router-link to="/signup" class="text-blue-500">Register</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  
  const signIn = () => {
    // Your sign-in logic goes here
    console.log('Signing in...');
    // Example: Redirect to home page after signing in
    useRouter().push('/');
  };
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  </script>
  
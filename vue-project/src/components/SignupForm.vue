<template>
    <div class="flex items-center justify-center h-screen">
      <div class="w-96">
        <h2 class="text-2xl mb-4">Register</h2>
  
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
            <input v-model="email" type="email" id="email" class="bg-gray-100 w-full h-12 p-2 border border-gray-300 rounded-md" required>
          </div>
  
          <div class="mb-4 relative">
            <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" class="bg-gray-100 w-full h-12 p-2 border border-gray-300 rounded-md pr-10" required>
            <span @click="togglePasswordVisibility('password')" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer pt-5">
              <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
            </span>
          </div>
  
          <div class="mb-4 relative">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password:</label>
            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" class="bg-gray-100 w-full h-12 p-2 border border-gray-300 rounded-md pr-10" required>
            <span @click="togglePasswordVisibility('confirmPassword')" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer pt-5">
              <i :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
            </span>
            <p v-if="password !== '' && confirmPassword !== '' && password !== confirmPassword" class="text-red-500 text-sm mt-1">Passwords do not match.</p>
          </div>
  
          <button type="submit" class="w-full h-12 bg-blue-500 text-white rounded-md">Register</button>
        </form>
  
        <p class="mt-4 text-sm">
          Already have an account? 
          <router-link to="/signin" class="text-blue-500">Sign In</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  
  const register = () => {
    if (password === confirmPassword) {
      // Your registration logic goes here
      console.log('Registering...');
      // Example: Redirect to home page after registering
      useRouter().push('/');
    } else {
      console.log('Passwords do not match.');
      // You can show an error message or handle it as needed
    }
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      showPassword.value = !showPassword.value;
    } else if (field === 'confirmPassword') {
      showConfirmPassword.value = !showConfirmPassword.value;
    }
  };
  </script>
  
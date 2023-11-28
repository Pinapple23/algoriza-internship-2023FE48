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
  const router = useRouter();

  const logTrial = () => {
    const users = [
    { id: 1, email: 'user@example.com', password: 'password123' },
  ];

  const user = users.find(u => u.email === email.value && u.password === password.value);

  if (user) {
    // Generate a JWT token
    const token = generateJwtToken(user);

    // Decode the token to get user information
    const decodedToken = jwtDecode(token);

    // Log the decoded token to the console (for testing purposes)
    console.log(decodedToken);


    // Store the token in local storage
    localStorage.setItem('token', token);

    // Redirect to the home page
    router.push('/');
  } else {
    alert('Invalid email or password. Please try again.');
  }
};

const signIn = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email.value && u.password === password.value);

  if (user) {
    const token = generateToken();
    // Save the token (in a real-world scenario, use a secure storage method)
    localStorage.setItem('token', token);
    // Redirect to the homepage or perform necessary actions
    router.push('/');
  } else {
    alert('Invalid email or password');
  }
};

const generateToken = () => {
  const expirationTime = 60 * 60 * 24; // 1 day in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationDate = currentTime + expirationTime;

  const payload = {
    email: email.value,
    exp: expirationDate,
  };

  // Encode the payload to base64
  const payloadBase64 = btoa(JSON.stringify(payload));

  // Create the token by combining header, payload, and signature (for simplicity, skipping signature)
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payloadBase64}.fakeSignature`;

  return token;
};

  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  </script>
  
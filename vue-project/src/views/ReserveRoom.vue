<template>
    <div class="max-w-2xl mx-auto mt-8 p-4">
      <h1 class="text-3xl font-semibold mb-4">Reserve Room</h1>
  
      <!-- Payment Form -->
      <form @submit.prevent="submitReservation" class="bg-white p-6 rounded-md shadow-md">
        <!-- Room Details (replace with actual data) -->
        <h2 class="text-xl font-semibold mb-4">Room Details</h2>
        <p class="mb-2">Room ID: {{ roomId }}</p>
        <!-- Other room details go here -->
  
        <!-- Payment Details -->
        <h2 class="text-xl font-semibold mb-4">Payment Details</h2>
        <div class="mb-4">
          <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required
                 class="mt-1 p-2 w-full border rounded-md">
        </div>
  
        <div class="mb-4">
          <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required
                 class="mt-1 p-2 w-1/2 border rounded-md">
        </div>
  
        <div class="mb-4">
          <label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
          <input type="text" id="cvv" name="cvv" placeholder="123" required
                 class="mt-1 p-2 w-1/4 border rounded-md">
        </div>
  
        <!-- Other payment options or fields can be added here -->
  
        <!-- Submit Button -->
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Submit Reservation
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();

  // Fetch room ID from route parameters
  const roomId = route.params.id;
  
  const submitReservation = () => {
    // Perform reservation logic (e.g., send data to a server)
    // After successful reservation, you can redirect to a confirmation page or perform other actions
    router.push({ name: 'reservation-confirmation' });
  };
  </script>
  
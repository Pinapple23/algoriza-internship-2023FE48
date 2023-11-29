<template>
    <div class="grid gap-16 grid-cols-6 search-container p-4">
      <div>
        <div class="relative">
          <select v-model="selectedDestination" id="destination" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" >
            <option value="" disabled selected class="text-gray-200">Where are you going?</option>
            <option value="paris">Paris</option>
            <option value="new-york">New York</option>
            <option value="tokyo">Tokyo</option>
            <!-- Add more destination options as needed -->
          </select>
          <i class="fas fa-map-marker-alt absolute top-1/2  transform -translate-y-1/2 text-gray-200"></i>

        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="date" v-model="checkinDate" id="checkin" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Check-in Date">
          <i class="fas fa-calendar-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="date" v-model="checkoutDate" id="checkout" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Check-out Date">
          <i class="fas fa-calendar-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="number" v-model="guests" id="guests" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Guests">
          <i class="fas fa-users absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="number" v-model="rooms" id="rooms" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Rooms">
          <i class="fas fa-door-open absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
  
      <div class="">
        <button @click="search" class="w-full p-2 bg-blue-500 text-white rounded-md">
          <i class="fas fa-search mr-2"></i> Search
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedDestination = ref('');
  const checkinDate = ref('');
  const checkoutDate = ref('');
  const guests = ref();
  const rooms = ref();
  
  const search = () => {
    // Perform search based on the selected options
    console.log('Search:', {
      destination: selectedDestination.value,
      checkin: checkinDate.value,
      checkout: checkoutDate.value,
      guests: guests.value,
      rooms: rooms.value,
    });
  };
  </script>
  
  
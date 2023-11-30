<template>
    <div>
      <!-- Include the SearchForm component and pass the initial values -->
      <SearchForm
        :initialDestination="$route.query.selectedDestination"
        :initialCheckinDate="$route.query.checkin"
        :initialCheckoutDate="$route.query.checkout"
        :initialGuests="$route.query.guests"
        :initialRooms="$route.query.rooms"
      />
  
      <!-- Display search results based on the query parameters -->
      <!-- Your other search results content -->
    </div>
  </template>
  
  <script setup>
  import SearchForm from '@/components/SearchForm.vue';
  </script>
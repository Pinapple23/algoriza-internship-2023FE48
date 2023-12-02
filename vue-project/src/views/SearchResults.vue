<template>
  <div>
    <SiteNavigation />

    <!-- Include the SearchForm component and pass the initial values -->
    <SearchForm
      :initialDestination="$route.query.destination"
      :initialCheckinDate="$route.query.checkin"
      :initialCheckoutDate="$route.query.checkout"
      :initialGuests="$route.query.guests"
      :initialRooms="$route.query.rooms"
    />

    <!-- Display search results based on the query parameters -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <!-- Display your fetched search results as cards -->
      <div v-for="result in searchResults" :key="result.property.id" class="border-gray-100 border p-4 mb-4 rounded-md">
        <div class="flex">
          <!-- Hotel Image -->
          <img :src="result.property.photoUrls[0]" alt="Hotel Image" class="w-72 h-52 object-cover mb-2 rounded-md mr-4" />

          <!-- Hotel Details -->
          <div class="flex-1">
            <!-- Hotel Name -->
            <h2 class="text-xl font-semibold mb-2">{{ result.property.name }}</h2>

            <!-- Rating as Filled Stars -->
            <p>Score: {{ result.property.reviewScore }}</p>

            <!-- You can add more details or customize as needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
 import { ref, onMounted } from 'vue';
import axios from 'axios';
import SearchForm from '@/components/SearchForm.vue';
import SiteNavigation from "../components/SiteNavigation.vue";
import { useRoute } from 'vue-router';


const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);

const route = useRoute(); // Use useRoute to access route information


onMounted(() => {
  // Fetch search results when the component is mounted
  console.log("dest",route.query.destination)
  console.log("id", route.query.destinationId)
  fetchSearchResults();
});

const fetchSearchResults = async () => {
  loading.value = true;

  try {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id: route.query.destinationId,
        search_type: 'CITY',
        arrival_date: route.query.checkin,
        departure_date: route.query.checkout,
        adults: route.query.guests,
        room_qty: route.query.rooms,
        languagecode: 'en-us',
        currency_code: 'AED'
      },
      headers: {
        'X-RapidAPI-Key': 'e9f543ecb9msh467c6d3dfafa0b1p1445cajsna03fbaad4ef4',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    searchResults.value = response.data.data.hotels; // Replace with the actual structure of your API response
    console.log(searchResults.value);
  } catch (err) {
    error.value = 'Error fetching search results';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
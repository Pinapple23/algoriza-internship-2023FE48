<template>
   <form @submit.prevent="search" class="grid gap-16 grid-cols-6 lg:grid-cols-4 md:grid-col-3 p-4">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        id="destination"
        class="w-full p-2 h-12 bg-gray-100 rounded-md"
        style="width: 206px; top: 558px; left: 217px;"
        placeholder="Where are you going?"
      />

      <ul v-if="destinationOptions.length > 0" class="absolute z-10 mt-2 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
        <li v-for="option in destinationOptions" :key="option.id" @click="selectOption(option)" class="p-2 cursor-pointer hover:bg-gray-100">
          {{ option.label }}
        </li>
      </ul>
    </div>        
  
      <div>
        <div class="relative">
          <input type="date" v-model="checkinDate" id="checkin" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Check-in Date">
          <!-- <i class="fas fa-calendar-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i> -->
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="date" v-model="checkoutDate" id="checkout" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Check-out Date">
          <!-- <i class="fas fa-calendar-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i> -->
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="number" v-model="guests" id="guests" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Guests">
          <!-- <i class="fas fa-users absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i> -->
        </div>
      </div>
  
      <div>
        <div class="relative">
          <input type="number" v-model="rooms" id="rooms" class="w-full p-2 h-12 bg-gray-100 rounded-md" style="width: 206px; top: 558px; left: 217px;" placeholder="Rooms">
          <!-- <i class="fas fa-door-open absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"></i> -->
        </div>
      </div>
  
      <div class="">
      <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded-md">
        <!-- <i class="fas fa-search mr-2"></i> -->
         Search
      </button>
    </div>
    <div v-if="error" class="text-red-500 mt-2">
      {{ error }}
    </div>
    </form>
  </template>
  
  <script setup>
  import { ref, onMounted ,watch} from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';


  
  const selectedDestination = ref('');
  const checkinDate = ref('');
  const checkoutDate = ref('');
  const guests = ref();
  const rooms = ref();

  const searchQuery = ref('');
  const destinationOptions = ref([]);
  const selectedDestinationId = ref('');
  const error = ref('');
  const router = useRouter();

  const props = defineProps(['initialDestination', 'initialCheckinDate', 'initialCheckoutDate', 'initialGuests', 'initialRooms']);

// Set the initial search data on component mount
onMounted(() => {
  searchQuery.value = props.initialDestination;
  checkinDate.value = props.initialCheckinDate;
  checkoutDate.value = props.initialCheckoutDate;
  guests.value = props.initialGuests;
  rooms.value = props.initialRooms;
});

// Update search data when props change
watch(() => props.initialDestination, (newValue) => {
  searchQuery.value = newValue;
  console.log(searchQuery.value);
});

// Update search data when props change
watch([props.initialDestination, props.initialCheckinDate, props.initialCheckoutDate, props.initialGuests, props.initialRooms], () => {
  searchQuery.value = props.initialDestination;
  checkinDate.value = props.initialCheckinDate;
  checkoutDate.value = props.initialCheckoutDate;
  guests.value = props.initialGuests;
  rooms.value = props.initialRooms;
});



const fetchDestinationOptions = async () => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    params: { query: searchQuery.value },
    headers: {
    'X-RapidAPI-Key': '123ef2e7d7mshd1a3a9481e2c466p1bf753jsn67db952e3926',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  }
  };

  try {
    const response = await axios.request(options);
    destinationOptions.value = response.data.data.map(item => ({
      id: item.dest_id,
      label: `${item.city_name}, ${item.region}, ${item.country}`,
    }));
  } catch (error) {
    console.error(error);
    showError('Error fetching destination options');
  }
};

const handleSearch = () => {
  if (searchQuery.value.length > 2) {
    fetchDestinationOptions();
  } else {
    showError('Please enter at least 3 characters for the destination');
  }
};

// Clear options when searchQuery is cleared
watch(searchQuery, () => {
  if (!searchQuery.value) {
    destinationOptions.value = [];
  }
});

  
const selectOption = (option) => {
  searchQuery.value = option.label;
  selectedDestination.value =option.label;
  selectedDestinationId.value = option.id;
  console.log("selectedDestination.value :" ,selectedDestination.value)
  destinationOptions.value = [];
};

const search = async () => {
  if (!selectedDestinationId.value || !checkinDate.value || !checkoutDate.value || !guests.value || !rooms.value) {
    showError('Please fill in all the required fields');
    return;
  }
  try {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id: selectedDestinationId.value,
        search_type: 'CITY',
        arrival_date: checkinDate.value,
        departure_date: checkoutDate.value,
        adults: guests.value,
        room_qty: rooms.value,
        page_number: '1',
        languagecode: 'en-us',
        currency_code: 'USD'
      },
      headers: {
    'X-RapidAPI-Key': '123ef2e7d7mshd1a3a9481e2c466p1bf753jsn67db952e3926',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  }
    };

    const response = await axios.request(options);
    if (response.data.data.hotels.length > 0){
      router.push({
        name: 'search-results',
        query: {
          destination: selectedDestination.value,
          destinationId:selectedDestinationId.value,
          checkin: checkinDate.value,
          checkout: checkoutDate.value,
          guests: guests.value,
          rooms: rooms.value,
        },
      });

    }
  }catch (error) {
    console.error(error);
    showError('Error performing search');
  }
};
const showError = (errorMessage) => {
  error.value = errorMessage;
  setTimeout(() => {
    error.value = '';
  }, 5000); // Clear error message after 5 seconds
};
</script>
  
  
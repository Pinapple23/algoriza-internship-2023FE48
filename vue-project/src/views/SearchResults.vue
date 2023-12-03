<template>
  <div class="mx-20">

    <!-- Include the SearchForm component and pass the initial values -->
    <SearchForm
      :initialDestination="$route.query.destination"
      :initialCheckinDate="$route.query.checkin"
      :initialCheckoutDate="$route.query.checkout"
      :initialGuests="$route.query.guests"
      :initialRooms="$route.query.rooms"
    />
    <div class="flex"> 
    <!-- filters container-->
    <div class="flex flex-col w-1/4 p-4 ">
    <!-- Sort By Select Input -->
    <div class="my-4">
    <label for="sortBy" class="mr-2">Sort By:</label>
    <select v-model="sortBy" @change="handleSortChange" id="sortBy" class="p-2 bg-gray-100 rounded-md">
      <option v-for="option in sortByOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    </div>

    <!-- Search by Property Name Input -->
    <div class="my-4">
      <label for="propertyName" class="mr-2">Search by Property Name:</label>
    <input v-model="propertyName" @input="handleSearchByName" id="propertyName" class="p-2 bg-gray-100 rounded-md">
    </div>

      <!-- Budget Checkboxes -->
      <div class="my-4">
        <div class="my-4">
          <label class="mr-2">Budget:</label>
          <div v-for="budgetOption in budgetOptions" :key="budgetOption.value">
            <input
              type="checkbox"
              :checked="selectedBudget.includes(budgetOption.value)"
              @change="handleBudgetChange(budgetOption.value)"
            />
            <label class="mr-2">{{ budgetOption.label }}</label>
          </div>
  </div>

    <!-- Toggle Switch for Custom Budget -->
     <div class="flex items-center mt-2">
        <label for="customBudget" class="mr-2">Custom:</label>
        <input type="checkbox" v-model="customBudgetToggle" id="customBudget" class="form-checkbox h-5 w-5 text-blue-500">
      </div>

      <!-- Custom Budget Inputs (Show only when "Custom" is selected and the toggle is on) -->
      <div v-if="customBudgetToggle" class="flex mt-2">
        <div class="mr-4">
          <label for="budgetMin">Min:</label>
          <input v-model="budgetMin" type="number" id="budgetMin" class="p-2 bg-gray-100 rounded-md" @keyup.enter="handleCustomBudgetEnter"  />
        </div>
        <div>
          <label for="budgetMax">Max:</label>
          <input v-model="budgetMax" type="number" id="budgetMax" class="p-2 bg-gray-100 rounded-md" @keyup.enter="handleCustomBudgetEnter"/>
        </div>
      </div>
    </div>
  </div>
  <!--Search results -->
    <!-- Display search results based on the query parameters -->
    <div class="flex-1 inline-block w-1/2 ">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else >
      <p class="text-3xl">{{$route.query.destination}}:{{ searchResults.length }} </p>
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
            <p>Score: {{ result.property.reviewScore }} ({{ result.property.reviewCount}} Reviews)</p>
            <p>Live a little and celbrate with champagne</p>
            <p>Reats include a glass of French champagne, parking and a late checkout. Gym included. Flexible cancellation applies</p>
            <p class=" font-semibold text-2xl  text-right bottom-0 right-0"> $ {{ Math.round(result.property.priceBreakdown.grossPrice.value) }} </p>
        
             <!-- Button to view hotel details -->
             <router-link :to="{ name: 'hotel-details', params: { id: result.property.id }, query: { checkin: $route.query.checkin, checkout: $route.query.checkout, Guests: $route.query.guests, Rooms:$route.query.rooms } }">
                <button class="bg-blue-500 text-white p-2 rounded-md mt-2">Check Availabilty</button>
              </router-link>
          </div>
        </div>
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
import SiteNavigation from "../components/SiteNavigation.vue"
import { useRoute } from 'vue-router';

const route = useRoute(); 



const sortBy = ref(''); // Holds the selected sort option
const sortByOptions = ref([]);
const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);
const propertyName = ref('');

const budgetMin =ref();
const budgetMax =ref();
const customBudgetToggle = ref(false);
const selectedBudget = ref([]);
const budgetOptions = ref([
  { label: '$ 0 - $ 200', value: 'Budget 1' },
  { label: '$ 200 - $ 500', value: 'Budget 2' },
  { label: '$ 500 - $ 1000', value: 'Budget 3' },
  { label: '$ 1,000 - $ 2,000', value: 'Budget 4' },
  { label: '$ 2,000 - $ 5,000', value: 'Budget 5' },
]);

const handleBudgetChange = (selectedValue) => {
  console.log(selectedBudget.value)
    // Clear the selectedBudget array
    selectedBudget.value = [];

// Add the selected value to the array
selectedBudget.value.push(selectedValue);
    switch (selectedBudget.value[0]) {
      case 'Budget 1':
        setBudgetRange(0, 200);
        break;
      case 'Budget 2':
        setBudgetRange(200, 500);
        break;
      case 'Budget 3':
        setBudgetRange(500, 1000);
        break;
      case 'Budget 4':
        setBudgetRange(1000, 2000);
        break;
      case 'Budget 5':
        setBudgetRange(2000, 5000);
        break;
      default:
        setBudgetRange(null, null);
    }
};

const setBudgetRange = (min, max) => {
  budgetMin.value = min;
  budgetMax.value = max;
  fetchSearchResults();
};

const handleCustomBudgetEnter = () => {
  // Check if both budgetMin and budgetMax are filled
  if (budgetMin && budgetMax) {
    fetchSearchResults();
  }
};



onMounted(() => {
  fetchSortOptions();
  fetchSearchResults();
});

const fetchSortOptions = async () => {
  try {
    const req = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getSortBy',
      params: {
        dest_id: route.query.destinationId,
        search_type: 'CITY',
        arrival_date: route.query.checkin,
        departure_date: route.query.checkout,
        adults: route.query.guests,
        room_qty: route.query.rooms,
      },
      headers: {
        'X-RapidAPI-Key': '619bb2afdbmsh25e156453594afdp1cc64cjsn0d5ddb8df355',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };

    const response = await axios.request(req);
    sortByOptions.value = response.data.data.map(option => ({ label: option.title, value: option.id }));
  } catch (err) {
    console.error('Error fetching sort options', err);
  }
};

const handleSortChange = () => {
  // Handle the sort change logic here
  fetchSearchResults();
};

const handleSearchByName = () => {
  // Handle the search by property name logic here
  if(propertyName.value !==''){
    searchResults.value = searchResults.value.filter(result => result.property.name.toLowerCase().includes(propertyName.value.toLowerCase()));
  }else{
    fetchSearchResults();
  }
};

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
        currency_code: 'USD',
        sort_by: sortBy.value,
        price_min: budgetMin.value,
        price_max: budgetMax.value
      },
      headers: {
        'X-RapidAPI-Key': '619bb2afdbmsh25e156453594afdp1cc64cjsn0d5ddb8df355',
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
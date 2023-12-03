<template class="">
    <div class="bg-gray-100">
      <div class="mx-20">
      <SiteNavigation />
      <!-- images -->
      <div class="flex">
    <img src="../assets/images/Rectangle 28.png" alt="Oculous Inn Stay" class="mr-4">
    <div class="flex flex-col">
        <img src="../assets/images/Rectangle 29.png" alt="Oculous Inn Stay" class="mb-4">
        <img src="../assets/images/Rectangle 30.png" alt="Oculous Inn Stay">
    </div>
</div>
      <!-- Tabs -->
      <div class="flex">
        <button
          :class="{ 'border-b-2 border-blue-500': activeTab === 'overview', 'text-gray-500': activeTab !== 'overview' }"
          @click="activeTab = 'overview'"
          class="p-4 cursor-pointer"
        >
          Overview
        </button>
        <button
          :class="{ 'border-b-2 border-blue-500': activeTab === 'rooms', 'text-gray-500': activeTab !== 'rooms' }"
          @click="activeTab = 'rooms'"
          class="p-4 cursor-pointer"
        >
          Rooms Available
        </button>
      </div>
  
      <!-- Tab Content -->
      <div v-if="activeTab === 'overview'" >
        <div class="flex">
        <!-- Overview content goes here -->
        <div class="w-2/3 mx-10 mt-12">
          <h2 class="font-semibold text-3xl">{{ details.hotel_name }}</h2>
          <p>(Reviews {{ details.review_nr }})</p>
          <p>{{ details.address }}</p>
          <!-- Content for Overview tab -->
          <div class="bg-white p-4">
            <h1>Overview</h1>
            <p>{{ description?.data?.[0]?.description }}</p>
            <br>
            <p>{{ description?.data?.[1]?.description }}</p>

            <hr>
            <!--facilities-->
          <div class="mt-4">
            <h2 class="font-semibold text-2xl">Top Facilities</h2>
            <div class="grid grid-cols-2 gap-4">
              
                <!-- Loop through the first six facilities -->
                <div v-for="(facility, index) in details.facilities_block?.facilities?.slice(0, 6)" :key="index" class="flex items-center">
                    <!-- Display facility icon (you may need to replace 'facility.icon' with the actual property) -->
                    <i :class="'fas fa-' + facility.icon + ' text-xl mr-2'"></i>
                    <!-- Display facility name -->
                    <span>{{ facility.name }}</span>
                </div>
            </div>
        </div>
          </div>

        </div>

        <!--map-->
        <div class="flex flex-col w-1/3"> 
          <iframe
          title="Map"
            width="400"
            height="240"
            frameborder="0"
            style="border:0"
            :src="'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d' + details.latitude + '!2d' + details.longitude + '!3d12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z' + details.latitude + '!3z' + details.longitude + '!5e0!3m2!1sen!2sus!4v1'"
            allowfullscreen
            loading="lazy"
            class="mb-4"
          ></iframe>
            <p class="my-4 font-medium text-lg">Explore the area</p>
          <img src="../assets/images/frame 52.png" alt="list" >
        </div>
      </div>
      <div> 
        <!-- Available rooms -->
        <div class="my-10">
          <p class="text-2xl font-semibold">Available rooms</p>

          <!-- Offer Image -->
          <div class="grid grid-cols-3 gap-4 mt-4">
              <img src="../assets/images/offer.png" alt="offer" class="col-span-1 w-full h-auto">
              
              <template v-if="availableRooms && availableRooms.rooms">
                  <div v-for="roomId in Object.keys(availableRooms.rooms).slice(0, 2)" :key="roomId" class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                      <div class="bg-white p-4 border border-gray-300 rounded-md">
                          <!-- Room Image -->
                          <img v-if="availableRooms.rooms[roomId]?.photos" :src="availableRooms.rooms[roomId].photos[0].url_max300" alt="Room Image" class="w-full h-40 object-cover mb-4">

                          <!-- Bed Configurations -->
                          <p class="text-base font-semibold mb-2">{{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[0]?.name_with_count }} and {{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[1]?.name_with_count }}</p>

                          <!-- Additional details -->
                          <p>300 sqft</p>
                          <p>300 sqft</p>
                          
                          <!-- Duplicate bed configurations or other details as needed -->
                          <p class="text-base mb-2">{{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[0]?.name_with_count }} and {{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[1]?.name_with_count }}</p>
                          <router-link :to="{ name: 'reserve-room', params: { id: roomId},query:{hotelId: hotelId,checkin:arrivalDate,checkout:departureDate,rooms:roomQty}}">
                      <button class="bg-blue-500 text-white p-2 rounded-md mt-2">Book</button>
                    </router-link>
                      </div>
                  </div>
              </template>
          </div>
        </div>
      </div>
      </div>

  
      <div v-if="activeTab === 'rooms'">
        <!-- Available rooms -->
        <div class="my-10">
          <p class="text-2xl font-semibold">Available rooms</p>

          <!-- Offer Image -->
          <div class="grid grid-cols-3 gap-4 mt-4">
              <img src="../assets/images/offer.png" alt="offer" class="col-span-1 w-full h-auto">
              
              <template v-if="availableRooms && availableRooms.rooms">
                  <div v-for="roomId in Object.keys(availableRooms.rooms)" :key="roomId" class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                      <div class="bg-white p-4 border border-gray-300 rounded-md">
                          <!-- Room Image -->
                          <img v-if="availableRooms.rooms[roomId]?.photos" :src="availableRooms.rooms[roomId].photos[0].url_max300" alt="Room Image" class="w-full h-40 object-cover mb-4">

                          <!-- Bed Configurations -->
                          <p class="text-base font-semibold mb-2">{{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[0]?.name_with_count }} and {{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[1]?.name_with_count }}</p>

                          <!-- Additional details -->
                          <p>300 sqft</p>
                          <p>300 sqft</p>
                          
                          <!-- Duplicate bed configurations or other details as needed -->
                          <p class="text-base mb-2">{{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[0]?.name_with_count }} and {{ availableRooms.rooms[roomId]?.bed_configurations[0]?.bed_types[1]?.name_with_count }}</p>

                          <router-link :to="{ name: 'reserve-room', params: { id: roomId},query:{hotelId: hotelId,checkin:arrivalDate,checkout:departureDate,rooms:roomQty}}">
                      <button class="bg-blue-500 text-white p-2 rounded-md mt-2">Book</button>
                    </router-link>
                      </div>
                  </div>
              </template>
          </div>
        </div>
      </div>

      <img src="../assets/images/group 17.png" alt="covid" class="w-full h-auto my-10">
      <img src="../assets/images/group 10.png" alt="covid" class="w-full h-auto">
      </div>
    </div>
    

  </template>
 
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import SiteNavigation from "../components/SiteNavigation.vue";

  
  const route = useRoute();
  
  const activeTab = ref('overview');
  const details = ref([]);
  const description = ref([]);
  const availableRooms =ref([]);

  const hotelId = route.params.id;
  const arrivalDate = route.query.checkin;
  const departureDate = route.query.checkout;
  const adults = route.query.Guests || '1';
  const roomQty = route.query.Rooms || '1';
  
  onMounted(() => {
    fetchdescription();
    checkAvailability();
    fetchRooms();
  });
  
  const fetchdescription = async () => {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getDescriptionAndInfo',
      params: {
        hotel_id: hotelId,
        languagecode: 'en-us'
      },
      headers: {
        'X-RapidAPI-Key': '7ff09882f6msh37fc72ccd8eae75p145d08jsnf354b202fcb5',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      description.value = response.data;

    } catch (error) {
      console.error(error);
    }
  };
  
  const checkAvailability = async () => {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
      params: {
        hotel_id: hotelId,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults: adults,
        room_qty: roomQty,
        languagecode: 'en-us',
        currency_code: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '7ff09882f6msh37fc72ccd8eae75p145d08jsnf354b202fcb5',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      details.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRooms = async() => {
    const options = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getRoomList',
  params: {
    hotel_id: hotelId,
    arrival_date: arrivalDate,
    departure_date: departureDate,
    adults: adults,
    room_qty: roomQty,
    languagecode: 'en-us',
    currency_code: 'USD'
  },
  headers: {
    'X-RapidAPI-Key': '7ff09882f6msh37fc72ccd8eae75p145d08jsnf354b202fcb5',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
  availableRooms.value =response.data.data
	console.log("rooms",availableRooms.value.rooms);
} catch (error) {
	console.error(error);
}
}
  </script>
  
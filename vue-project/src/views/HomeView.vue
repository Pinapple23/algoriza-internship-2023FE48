<template>
  <div >
    <SiteNavigation />
    <div class="pt-96">
    <div class="flex flex-col space-y-10 mx-36 justify-center h-screen">

      <div class="pt-96">
          <img src="../assets/images/Rectangle 2.png" alt="sydney" >
          <div class="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white font-WorkSans font-bold text-3xl	">
              <p>Enjoy Your Dream Vacation</p>
          </div>
          <div class="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-WorkSans">
            <p>Plan and book our perfect trip with expert advice, travel tips, destination information and  inspiration from us</p>
          </div>
       </div>
       <!-- <SearchForm/> -->
       <SearchForm
          :initialDestination="initialDestination"
          :initialCheckinDate="initialCheckinDate"
          :initialCheckoutDate="initialCheckoutDate"
          :initialGuests="initialGuests"
          :initialRooms="initialRooms"
        />
 
          <!-- Rectangle with text -->
          <div class=" ml-2 left-100 top-662 w-full h-16 bg-yellow-100 rounded-lg p-4">
            <p class="text-gray-800">
              <i class="fa-solid fa-exclamation-triangle text-2xl"></i>
              Check the latest COVID-19 restrictions before you travel. Learn more
            </p>
          </div>

          <div class="left-0 text-left font-WorkSans">
            <p class="font-bold	text-2xl">Enjoy your dream vacation</p>
            <p class="my-4">Plan and book our perfect trip with expert advice, travel tips, destination information and  inspiration from us</p>
            <div class="grid grid-cols-4 gap-4">
              <div>
                <img src="../assets/images/Rectangle 8.png" alt="Austrlia">
                <p class="text-xl	font-semibold">Australia</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 9.png" alt="Japan">
                <p class="text-xl	font-semibold">Japan</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 10.png" alt="New Zealand">
                <p class="text-xl	font-semibold">New Zealand</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 11.png" alt="Greece">
                <p class="text-xl	font-semibold">Greece</p>
                <p>2248 properties</p>
              </div>
            </div>
          </div>
          
          <div class="left-0 text-left font-WorkSans">
            <p class="font-bold	text-2xl">Get inspiration for your next trip</p>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <img src="../assets/images/Rectangle 18.png" alt="Austrlia">

              </div>
              <div>
                <img src="../assets/images/Rectangle 16.png" alt="Japan">

              </div>
              <div>
                <img src="../assets/images/Rectangle 17.png" alt="New Zealand">

              </div>
            </div>
          </div>

          <div class="left-0 text-left font-WorkSans">
            <p class="font-bold	text-2xl">Popular Hotels</p>
            <div class="grid grid-cols-4 gap-4">
              <div>
                <img src="../assets/images/Rectangle 12.png" alt="Lakeside Motel Warefront">
                <p class="text-xl	font-semibold">Lakeside Motel Warefront</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 13.png" alt="Recce Graham resort">
                <p class="text-xl	font-semibold">Recce Graham resort</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 14.png" alt="Fireside Dinners">
                <p class="text-xl	font-semibold">Fireside Dinners</p>
                <p>2248 properties</p>
              </div>
              <div>
                <img src="../assets/images/Rectangle 15.png" alt="Oculous Inn Stay">
                <p class="text-xl	font-semibold">Oculous Inn Stay</p>
                <p>2248 properties</p>
              </div>
            </div>
          </div>
          <div>
            <img src="../assets/images/Group 20.png" alt="sydney" >
          </div>
        
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SiteNavigation from "../components/SiteNavigation.vue";
import SearchForm from "../components/SearchForm.vue";



const isAuthenticated = ref(false);
const userEmail = ref('');

const initialDestination = ref('');
const initialCheckinDate = ref(''); // Set to your desired initial value
const initialCheckoutDate = ref(''); // Set to your desired initial value
const initialGuests = ref(); // Set to your desired initial value
const initialRooms = ref();


onMounted(() => {  // Check if the token is valid when the component is mounted
  checkTokenValidity();
});

const checkTokenValidity = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if the token is not expired
      if (currentTime < payload.exp) {
        isAuthenticated.value = true;
        userEmail.value = payload.email;
      } else {
        // Token expired, clear it
        localStorage.removeItem('token');
        console.error('Token expired');
      }
    } catch (error) {
      // Invalid token format or decoding error
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
    }
  }
};

</script>

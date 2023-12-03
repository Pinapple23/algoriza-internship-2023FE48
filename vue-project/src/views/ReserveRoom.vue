<template>
  <div class="bg-gray-100">
    <div class="mx-20 mt-20">
      <h1 class="text-2xl font-semibold mb-4">Secure your reservation</h1>
      <img src="../assets/images/group 17.png" alt="covid" class="w-full h-auto my-10">

      <div class="flex">
      <!-- Payment Form -->
      <form @submit.prevent="submitReservation" class="w-2/3">
        <!-- Room Information -->
        <div class="bg-blue-500 p-4 rounded-md flex">
          <img src="../assets/images/security-user 1.png" alt="user" class="mr-2">
          <p class="text-white font-medium text-lg">Room {{ getLastDigit(roomId) }}</p>
        </div>

        <!-- Personal Information -->
        <div class="bg-white p-6 rounded-md">
          <div class="mb-4">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model="formData.firstName" required class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="mb-4">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="formData.lastName" required class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="mb-4">
            <label for="mobileNumber">Mobile Number</label>
            <input type="text" id="mobileNumber" v-model="formData.mobileNumber" required class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="mb-4">
            <label>
              <input type="checkbox" v-model="formData.receiveTextAlerts">
              Receive text alerts about this trip.
            </label>
          </div>
        </div>

         <!-- Payment Details -->
         <div class="bg-blue-500 p-4 rounded-md flex mt-10">
          <img src="../assets/images/card-tick 1.png" alt="user" class="mr-2">
          <p class="text-white font-medium text-lg">Payment options</p>
        </div>
        <div class="bg-white p-6 rounded-md">
          <div class="mb-4">
            <label for="cardName" class="block text-sm font-medium text-gray-700">Name on card</label>
            <input type="text" id="cardName" v-model="formData.cardName" placeholder="Name" required class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="mb-4">
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number</label>
            <input type="number" id="cardNumber" v-model="formData.cardNumber" placeholder="1234 5678 9012 3456" required class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="flex mb-4 space-x-4">
            <div class="flex-1">
              <label for="expiryMonth" class="block text-sm font-medium text-gray-700">Expiration Month</label>
              <select id="expiryMonth" v-model="formData.expiryMonth" class="mt-1 p-2 w-full border rounded-md">
                <option value="" disabled>Select Month</option>
                <!-- Add options for months (1 to 12) -->
                <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
              </select>
            </div>

            <div class="flex-1">
              <label for="expiryYear" class="block text-sm font-medium text-gray-700">Expiration Year</label>
              <select id="expiryYear" v-model="formData.expiryYear" class="mt-1 p-2 w-full border rounded-md">
                <option value="" disabled>Select Year</option>
                <!-- Add options for future years -->
                <option v-for="year in futureYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>

          <div class="mb-4">
            <label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
            <input type="text" id="cvv" v-model="formData.cvv" placeholder="123" required class="mt-1 p-2 w-1/4 border rounded-md">
          </div>

          <div class="mb-4">
            <label for="billingZip" class="block text-sm font-medium text-gray-700">Billing Zip Code</label>
            <input type="text" id="billingZip" v-model="formData.billingZip" placeholder="12345" required class="mt-1 p-2 w-full border rounded-md">
          </div>
        </div>

        <div class="bg-amber-400 p-4 rounded-md flex mt-10">
          <p class="text-white font-medium text-lg mx-5">Important information about your booking </p>
        </div>
        <div class="bg-white p-6 rounded-md">
          <ol class="list-decimal mx-5">
            <li>This rate is non-refundable. If you change or cancel your booking you will not get a refund or credit to use for a future stay</li>
            <li>Stay extensions will require a new reservation.</li>
            <li>Front desk staff will greet guests on arrival</li>
            <li>No refunds will be issued for late check-in or early check-out.</li>
          </ol>
          <p class="mt-8">By clicking the button below, I acknowledge that I have reviewed the Privacy Statement and have reviewd and accept the Rules and Restrictions and Terms of Use.</p>

        <!-- Submit Button -->
        <button type="submit" class="mt-8 bg-blue-500 text-white p-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Complete Booking
        </button>
        </div>

      </form>
      <div class="w-1/3"> 
      <!--Hotel Details-->
      <div class="bg-white rounded-md mx-5 p-5">
        <img src="../assets/images/Rectangle 68.png" alt="hotel"/>
        <p>{{ details?.hotel_name }}</p>
        <p>
          {{ details?.aggregated_data?.has_refundable ? 'Refundable' : 'Nonrefundable' }}
        </p>
        <p>
          Check in: {{ formatCheckinDate(route.query.checkin) }}
        </p>
        <p>
          Check out: {{ formatCheckinDate(route.query.checkout) }}
        </p>
        <p>
          Nights: {{ calculateNights(route.query.checkin, route.query.checkout) }}
        </p>
      </div>
      <div class="mx-5 mt-8">
      <div class="bg-green-200 p-4 rounded-md">
        <p>Price Details</p>
      </div>
      <div class="bg-white p-4 rounded-md">
        <div class="grid grid-cols-2 my-5">
        <p>{{ route.query.rooms }} room x {{ calculateNights(route.query.checkin, route.query.checkout) }} Nights </p>
        <p class="text-right text-gray-400">$ {{ Math.round(details?.composite_price_breakdown?.net_amount.value )}}</p>
        <p> Tax and service fees</p>
        <p class="text-right text-gray-400">$ {{ Math.round(details?.composite_price_breakdown?.included_taxes_and_charges_amount.value) }}</p>
      </div>
      <hr>
      <div class="grid grid-cols-2 my-2">
      <p class="font-semibold text-md">Total</p>
      <p class="text-right font-semibold text-md">$ {{Math.round(details?.composite_price_breakdown?.gross_amount.value)}}</p>
      </div>
      </div>
      </div>
    </div>
    </div>

    </div>

      <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 overflow-y-auto flex items-center justify-center">
    <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

    <div class="modal-container bg-white w-1/3 p-20 mx-auto rounded-md shadow-lg z-50">
      <!-- Your modal content goes here -->
      <img src="../assets/images/success.png" alt="success"/>
      <button @click="hideModal" class="mt-4 bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Close
      </button>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const roomId = route.params.id;

const details = ref([]);

const formData = ref({
  firstName: '',
  lastName: '',
  mobileNumber: '',
  receiveTextAlerts: false,
  cardName: '',
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
  billingZip: '',
});
const showModal = ref(false);


const getLastDigit = (str) => {
  const lastChar = str.charAt(str.length - 1);
  return isNaN(lastChar) ? '' : parseInt(lastChar);
};

// Function to format the check-in date
const formatCheckinDate = (checkinDate) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(checkinDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

// Function to calculate nights between dates
const calculateNights = (checkin, checkout) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  const nights = Math.round(Math.abs((checkoutDate - checkinDate) / oneDay));
  return nights;
};

// Generate an array of future years for the expiration year select
const currentYear = new Date().getFullYear();
const futureYears = Array.from({ length: 10 }, (_, index) => currentYear + index);

onMounted(() => {
  fetchHotelDetails();
  });
const fetchHotelDetails = async () => {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
      params: {
        hotel_id: route.query.hotelId,
        arrival_date: route.query.checkin,
        departure_date: route.query.checkout,
        room_qty: route.query.rooms,
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
      console.log(details.value);
    } catch (error) {
      console.error(error);
    }
  };

  const showReservationModal = () => {
  showModal.value = true;
};

const hideModal = () => {
  showModal.value = false;
};

const submitReservation = () => {
  // Perform reservation logic (e.g., send data to a server)
  // After successful reservation, show the modal
  showReservationModal();
};
</script>
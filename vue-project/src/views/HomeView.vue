
 <template>
  <div class="items-center">
    <SiteNavigation/>

    <img src="../assets/images/sydney.png" alt="sydney">
    <div v-if="isAuthenticated">
      <p>Welcome, {{ userEmail }}!</p>
      <!-- Content for authenticated users -->
    </div>
    <div v-else>
      <p>Please log in to access this page.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SiteNavigation from "../components/SiteNavigation.vue";


const isAuthenticated = ref(false);
const userEmail = ref('');

onMounted(() => {
  // Check if the token is valid when the component is mounted
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

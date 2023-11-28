import './assets/tailwind.css'
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')
// main.js or main.ts

// import { createApp } from 'vue';
// import App from './App.vue';
// import store from './store'; // Import your Vuex store
// import router from './router'; // Import your Vue Router instance

// createApp(App).use(store).use(router).mount('#app');

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Set initial users in local storage
const initialUsers = [
    { userId: 1, email: 'user1@example.com', password: '1234' },
    { userId: 2, email: 'user2@example.com', password: '1234' },
]
localStorage.setItem("users", JSON.stringify(initialUsers));

createApp(App).use(router).mount("#app");

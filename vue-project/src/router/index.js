import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import RegisterView from '../views/RegisterView.vue'
import SearchResults from '../views/SearchResults.vue'
import HotelDetails from '../views/HotelDetails.vue'
import ReserveRoom from '../views/ReserveRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/login',
      name:'login',
      component: Login
    },
    { path: '/signup',
      name:'signup',
      component: RegisterView 
    },
    { path: '/searchresults',
      name:'search-results',
      component:SearchResults
    },
    {
      path: '/hotel-details/:id',
      name: 'hotel-details',
      component: HotelDetails,
    },
    {
      path: '/reserve-room/:id',
      name: 'reserve-room',
      component: ReserveRoom,
    },
    
    
  ]
})

export default router

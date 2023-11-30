import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import RegisterView from '../views/RegisterView.vue'
import SearchResults from '../views/SearchResults.vue'


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
    }
    
  ]
})

export default router

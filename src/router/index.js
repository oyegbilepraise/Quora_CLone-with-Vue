import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '../components/Register'
// import Login from '../components/Login'
import Quora from '../components/Quora'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/Quora/:id',
    name: 'Quora',
    component: Quora
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Carousel from './components/Carousel.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'carousel',
      component: Carousel
    }
  ]
})

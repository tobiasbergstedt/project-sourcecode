import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from './views/AboutView.vue'
import HomeView from './views/HomeView.vue'
import ShowView from './views/ShowView.vue'

export default createRouter({
  mode: 'history',
  hash: false,
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: '/about',
    },
    {
      component: HomeView,
      path: '/',
    },
    {
      component: ShowView,
      path: '/show/:showid',
    },
  ],
})

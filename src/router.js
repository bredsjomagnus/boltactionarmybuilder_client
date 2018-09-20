import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Army from './components/Army.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './components/About.vue')
    },
    {
      path: '/army',
      name: 'Army',
      component: Army
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('./components/Admin.vue')
    },
    {
      path: '/adminusers',
      name: 'AdminUsers',
      component: () => import('./components/AdminUsers.vue')
    },
    {
      path: '/adminarmies',
      name: 'AdminArmies',
      component: () => import('./components/AdminArmies.vue')
    },
    {
      path: '/addarmy',
      name: 'AddArmy',
      component: () => import('./components/AddArmy.vue')
    },
    {
      path: '/editarmy',
      name: 'EditArmy',
      component: () => import('./components/EditArmy.vue')
    },
    {
      path: '/createaccount',
      name: 'CreateAccount',
      component: () => import('./components/CreateAccount.vue')
    },
    {
      path: '/armybuilder',
      name: 'Armybuilder',
      component: () => import('./components/ArmyBuilder.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

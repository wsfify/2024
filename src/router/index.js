import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/list.vue'),
        meta:{
          title:"用户管理",
          names:"用户列表"
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/order.vue'),
        meta:{
          title:"11",
          names:"111"
        }
      },

    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  var token=localStorage.getItem("token")
 if(!token){
  if(to.path=="/login"){
    next()
  }else{
    next("/login")
  }
 }else{
  if(to.path=="/login"){
    next("/")
  }else{
    next()
  }
 }
})
export default router

import Vue from 'vue'
import VueRouter from "vue-router"

const Home = () => import('../views/home/Home')
const Cate = () => import('../views/cate/Cate')
const Cart = () => import('../views/cart/Cart')
const My = () => import('../views/my/My')
const Detail = () => import('../views/detail/Detail')

//1、安装插件
Vue.use(VueRouter)

//2、创建路由对象

const routes = [
  {
    path: '',
    name: '',
    redirect:'/home'
  },{
    path: '/home',
    component:Home
  },{
    path: '/cate',
    component:Cate
  },{
    path: '/cart',
    component:Cart
  },{
    path: '/my',
    component:My
  },{
    path: '/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
export default router

import { createRouter, createWebHistory } from 'vue-router'

// Import components/pages
import Home from '../components/homepg.vue'
import AdminHomeEdit from '../adminfolder/add_home.vue'
import About from '../components/aboutpg.vue' 
import Products from '../adminfolder/add_product.vue'
import Product from '../adminfolder/modify_product.vue'
import Contact from '../components/contact.vue'
import order from '../adminfolder/orders.vue'
import about2 from '../components/about2.vue'
import login from '../adminfolder/adminlogin.vue'
import register from '../adminfolder/adminregister.vue'
import Customize from '../adminfolder/Customize.vue'
import colorpalette from '../adminfolder/colorpalette.vue'
import orderStatus from '../components/orderStatus.vue'
import userRegister from '../components/userregister.vue'
import userLogin from '../components/userLogin.vue'
import hexpalette from '@/components/hexpalette.vue'
import Cart from '@/adminfolder/cart.vue'
import Checkout from '@/adminfolder/checkout.vue'
import Catelog from '@/adminfolder/catelog.vue'
import add_catelog from '@/adminfolder/add_catelog.vue'
import all_journal from '@/components/all_journals.vue'
import add_saree_jornal from '@/adminfolder/addsareejournal.vue'
import TrackStatus from '@/components/TrackStatus.vue'
import ComingSoon from '@/components/ComingSoon.vue'
import CategoryAdmin from '@/adminfolder/CategoryAdmin.vue'
import JournalAdmin from '@/adminfolder/JournalAdmin.vue'


const routes = [
  {
    path: '/',                 
    name: 'Home',
    component: Home,
    meta: { navbar: "user" }
  },
  {
    path: '/admin/home_edit',  
    name: 'AdminHomeEdit',
    component: AdminHomeEdit,
     meta: { navbar: "admin" }
  },
  {
    path: '/about',  
    name: 'About',
    component: About,
    meta: { navbar: "user" }
  },
  
  {
    path: '/add_product',  
    name: 'Products',
    component: Products,
     meta: { navbar: "admin" }
  },
  {
    path: '/update_product',  
    name: 'Product',
    component: Product,
     meta: { navbar: "admin" }
  },
  {
    path: '/contact',  
    name: 'Contact',
    component: Contact,
      meta: { navbar: "user" }
  },
  {
    path: '/order_list',  
    name: 'order',
    component: order,
     meta: { navbar: "admin" }
  },
  {
    path: '/about2',  
    name: 'about2',
    component: about2
  },
  {
    path: '/admin/auth/login',  
    name: 'login',
    component: login,
  },
   {
    path: '/admin/auth/register',  
    name: 'register',
    component: register,
  },
  {
    path: '/Customize',  
    name: 'Customize',
    component: Customize,
    meta: { navbar: "user" }
  },
  {
  path: '/update-status/:id',
  name: 'UpdateStatus',
  component: () => import('@/adminfolder/Updatestatus.vue'),
  props: true,
   meta: { navbar: "admin" }
  },
  {
    path: '/color-palette',  
    name: 'colorpalette',
    component: colorpalette,
    meta: { navbar: "user" }
  },
  {
  path: '/orders/:id',
  component: () => import('@/adminfolder/see_order.vue'),
  props: true
  },
  {
    path: '/orderStatus',  
    name: 'orderStatus',
    component: orderStatus,
     meta: { navbar: "user" }
  },
  {
    path: '/tracking/:id',  
    name: 'TrackStatus',
    component: TrackStatus,
     meta: { navbar: "user" }
  },
  {
    path: '/register/account',  
    name: 'userRegister',
    component: userRegister,
   
  },
  {
    path: '/login/account',  
    name: 'userLogin',
    component: userLogin,
   
  },
  {
  path: '/product/:id',
  name: 'showproduct',
  component: () => import('@/adminfolder/showproduct.vue'), // lazy load
  props: true,
    meta: { navbar: "user" }
},
 {
    path: '/collections',  
    name: 'Collection',
    component: () => import('@/components/collection.vue'),
    props: true,
      meta: { navbar: "user" }
  },
{
    path: '/hexpalette',  
    name: 'hexpalette',
    component: hexpalette,
    meta: { navbar: "user" }
},
{
   path: '/modify',  
    name: 'Product',
    component: Product,
    meta: { navbar: "admin" }
},
{
  path: '/checkout',
  name: 'checkout',
  component: Checkout
},
{
  path: '/cart',
  name: 'cart',
  component: Cart
},
{
  path: '/catelog',
  name: 'catelog',
  component: Catelog,
  meta: { navbar: "user" }
},
{
    path: '/add/catelog',  
    name: 'add_catelog',
    component: add_catelog,
    meta: { navbar: "admin" }
  },
  {
  path: '/saree-journal/:id',
  name: 'SareeJournal',
  component: () => import('@/components/saree_jornal.vue')
},
{
    path: '/add/saree_jornal',  
    name: 'add_saree_jornal',
    component: add_saree_jornal,
    meta: { navbar: "admin" }
  },
  {
  path: '/all_journal',
  name: 'all_journal',
  component: all_journal,
  meta: { navbar: "user" }
},
{
  path: "/oauth-success",
  component: () => import("@/components/OAuthSuccess.vue"),
},
{
  path: '/order-details/:id',
  name: 'OrderDetails',
  component: () => import('@/components/OrderDetails.vue'),
  meta: { navbar: "user" }
},
{
      path: "/coming-soon",
      name: "ComingSoon",
      component: ComingSoon
},
{
    path: '/modify-category',  
    name: 'modify-category',
    component: CategoryAdmin,
    meta: { navbar: "admin" }
  },
  {
    path: '/modify-journal',
    name: 'modify-journal',
    component: JournalAdmin,
    meta: { navbar: "admin" }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  },



]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 100)  
    })
  }
  return { top: 0, left: 0 }
}
})

export default router

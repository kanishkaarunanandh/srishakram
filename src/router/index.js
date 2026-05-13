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

const SITE_URL = 'https://srishakram-frontend-v2.vercel.app'
const DEFAULT_TITLE = 'Sri Shakram Silks | Luxury Kanchipuram Silk Sarees'
const DEFAULT_DESCRIPTION = 'Sri Shakram offers luxury Kanchipuram silk sarees with traditional elegance and modern design.'
const DEFAULT_KEYWORDS = 'Sri Shakram, Sri Shakram Silks, Kanchipuram silk sarees, luxury silk sarees, traditional silk sarees, bridal silk sarees'

function setMetaTag(selector, attribute, value) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    const match = selector.match(/\[(name|property)="([^"]+)"\]/)
    if (match) element.setAttribute(match[1], match[2])
    document.head.appendChild(element)
  }

  element.setAttribute(attribute, value)
}

function setCanonical(path) {
  let canonical = document.head.querySelector('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', `${SITE_URL}${path}`)
}

function updateSeo(to) {
  const title = to.meta.title || DEFAULT_TITLE
  const description = to.meta.description || DEFAULT_DESCRIPTION
  const keywords = to.meta.keywords || DEFAULT_KEYWORDS
  const canonicalPath = to.meta.canonicalPath || to.path
  const canonicalUrl = `${SITE_URL}${canonicalPath}`

  document.title = title
  setMetaTag('meta[name="description"]', 'content', description)
  setMetaTag('meta[name="keywords"]', 'content', keywords)
  setMetaTag('meta[name="robots"]', 'content', to.meta.robots || 'index, follow, max-image-preview:large')
  setMetaTag('meta[property="og:title"]', 'content', title)
  setMetaTag('meta[property="og:description"]', 'content', description)
  setMetaTag('meta[property="og:url"]', 'content', canonicalUrl)
  setMetaTag('meta[name="twitter:title"]', 'content', title)
  setMetaTag('meta[name="twitter:description"]', 'content', description)
  setCanonical(canonicalPath)
}


const routes = [
  {
    path: '/',                 
    name: 'Home',
    component: Home,
    meta: {
      navbar: "user",
      title: DEFAULT_TITLE,
      description: 'Luxury Kanchipuram Silk Sarees with traditional elegance and modern design. Explore Sri Shakram Silks for premium silk sarees and timeless South Indian craftsmanship.',
      keywords: DEFAULT_KEYWORDS
    }
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
    meta: {
      navbar: "user",
      title: 'About Sri Shakram Silks | Kanchipuram Silk Heritage',
      description: 'Learn about Sri Shakram Silks, a luxury silk saree brand rooted in Kanchipuram tradition, South Indian heritage, zari detail, and modern boutique elegance.',
      keywords: 'About Sri Shakram, Sri Shakram Silks, Kanchipuram silk heritage, Tamil silk sarees, traditional saree brand'
    }
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
  meta: {
    title: 'Admin Login | Sri Shakram Silks',
    description: 'Secure Sri Shakram Silks admin login page.',
    robots: 'noindex, nofollow'
  }
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
  meta: {
    title: 'Customer Login | Sri Shakram Silks',
    description: 'Login to your Sri Shakram Silks customer account to view orders, cart, and premium silk saree shopping details.',
    keywords: 'Sri Shakram login, Sri Shakram customer account, silk saree shopping login'
  }
  },
  {
  path: '/product/:id',
  name: 'showproduct',
  component: () => import('@/adminfolder/showproduct.vue'), // lazy load
  props: true,
    meta: {
      navbar: "user",
      title: 'Luxury Silk Saree | Sri Shakram Silks',
      description: 'View premium Sri Shakram silk sarees with traditional Kanchipuram elegance, rich colors, zari detail, and modern luxury styling.',
      keywords: 'Sri Shakram silk saree, Kanchipuram silk saree, luxury saree, traditional silk saree, bridal saree',
      canonicalPath: '/collections'
    }
},
 {
    path: '/collections',  
    name: 'Collection',
    component: () => import('@/components/collection.vue'),
    props: true,
      meta: {
        navbar: "user",
        title: 'Kanchipuram Silk Saree Collections | Sri Shakram Silks',
        description: 'Shop Sri Shakram Silks collections featuring luxury Kanchipuram silk sarees, pure silk sarees, traditional silk sarees, bridal sarees, and elegant zari designs.',
        keywords: 'Sri Shakram collections, Kanchipuram silk sarees, luxury silk sarees, pure silk sarees, traditional silk sarees'
      }
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
  component: Checkout,
  meta: {
    title: 'Checkout | Sri Shakram Silks',
    description: 'Complete your Sri Shakram Silks purchase securely.',
    robots: 'noindex, nofollow'
  }
},
{
  path: '/cart',
  name: 'cart',
  component: Cart,
  meta: {
    title: 'Shopping Cart | Sri Shakram Silks',
    description: 'Review your selected Sri Shakram silk sarees before checkout.',
    robots: 'noindex, nofollow'
  }
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
  component: () => import('@/components/saree_jornal.vue'),
  meta: {
    title: 'Saree Journal | Sri Shakram Silks',
    description: 'Read Sri Shakram saree stories about Kanchipuram silk, zari craftsmanship, traditional elegance, and South Indian fashion culture.',
    keywords: 'Sri Shakram saree journal, Kanchipuram silk stories, saree craftsmanship, zari work'
  }
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
  meta: {
    navbar: "user",
    title: 'Saree Journal | Sri Shakram Silks',
    description: 'Explore Sri Shakram Silks stories on Kanchipuram silk sarees, handloom-inspired craft, traditional silk elegance, and modern ethnic fashion.',
    keywords: 'Sri Shakram journal, saree journal, Kanchipuram silk sarees, traditional silk sarees'
  }
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
      component: ComingSoon,
      meta: {
        title: 'Coming Soon | Sri Shakram Silks',
        description: 'New Sri Shakram Silks luxury saree experiences are coming soon.',
        robots: 'noindex, follow'
      }
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

router.afterEach((to) => {
  updateSeo(to)
})

export default router

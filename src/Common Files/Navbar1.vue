<template>
  <div class="customer-nav-shell">
    <header
      class="navbar-fixed"
      :class="{
        'navbar-fixed--scrolled': isScrolled,
        'navbar-fixed--page': !hasHeroRoute
      }">
      <div class="nav-ornament"></div>
      <div class="navbar-content">
        <div class="mobile-left-controls">
          <button class="icon-button mobile-only" type="button" aria-label="Open menu" @click="mobileMenu = true">
            <v-icon size="24">mdi-menu</v-icon>
          </button>
         <v-tooltip
          v-if="$route.path !== '/'"
          location="top"
        >
        <template #activator="{ props }">
          <button
            v-bind="props"
            @click="goHome"
            class="icon-button"
            style="margin-right: 5px;"
            type="button"
          >
            <v-icon size="21">mdi-home-outline</v-icon>
          </button>
        </template>
        <span>Go to Home</span>
      </v-tooltip>
   <v-tooltip location="top"  v-if="$route.path !== '/'">
  <template #activator="{ props }">
    <button
      v-bind="props"
      @click="$router.go(-1)"
      class="icon-button desktop-only"
      style="margin-right: 5px;"
      type="button"
    >
      <v-icon size="21">mdi-arrow-left</v-icon>
    </button>
  </template>

  <span>Go Back</span>
</v-tooltip>
          <button class="search-pill" type="button" @click="searchOpen = true">
            <v-icon size="18">mdi-magnify</v-icon>
            <span>Search silks, colors, collections</span>
          </button>
        </div>

        <img src="@/assets/logo-now.png" class="logo" @click="$router.push('/')" />

        <div class="icon-group">
            <v-tooltip top class="desktop-only">
              <template #activator="{ props }">
                <button v-bind="props" class="icon-button desktop-only" type="button" @click="gotoOrders">
                  <v-icon size="21">mdi-package-variant</v-icon>
                </button>
              </template>
              <span v-if="isLoggedIn">Orders</span>
              <span v-else>Login to access Orders</span>
            </v-tooltip>

            <v-menu offset-y>
              <template #activator="{ props }">
                <button v-bind="props" class="icon-button account-button" type="button">
                  <v-icon size="21">{{ isLoggedIn ? 'mdi-account-check-outline' : 'mdi-account-outline' }}</v-icon>
                </button>
              </template>
              <div class="account-menu">
                <p class="menu-eyebrow">{{ isLoggedIn ? 'Welcome back' : 'Sri Shakram account' }}</p>
                <button v-if="!isLoggedIn" @click="handleAccountClick">Login</button>
                <button v-if="isLoggedIn" @click="gotoOrders">My Orders</button>
                <button v-if="isLoggedIn" @click="logout">Logout</button>
              </div>
            </v-menu>

            <v-tooltip top>
              <template #activator="{ props }">
                <v-badge 
                  v-if="cartItemCount > 0" 
                  :content="cartItemCount" 
                  color="maroon"
                  overlap
                >
                  <button v-bind="props" class="icon-button" type="button" @click="openCart">
                    <v-icon size="21">mdi-cart-plus</v-icon>
                  </button>
                </v-badge>
                <button v-else v-bind="props" class="icon-button" type="button" @click="openCart">
                  <v-icon size="21">mdi-shopping-outline</v-icon>
                </button>
              </template>
              <span>Cart</span>
            </v-tooltip>
        </div>
      </div>

      <nav class="menu-bar desktop-only">
        <div class="menu-wrapper">
          <v-menu open-on-hover offset-y>
            <template #activator="{ props }">
              <button v-bind="props" class="nav-link" :class="{ active: isCollectionRoute }">
                Kanchipuram Silks
                <v-icon size="16">mdi-chevron-down</v-icon>
              </button>
            </template>
            <div class="dropdown-menu">
              <button v-for="item in kanchipuramItems" :key="item.Category"
                class="dropdown-item" @click="searchcategory(item.Category)">
                {{ item.Category }}
              </button>
            </div>
          </v-menu>

          <button
          class="nav-link"
          :class="{ active: isPureSilkRoute }"
          @click="searchcategory('Pure Silk')"
        >
          Pure Silks
        </button>
        <button
          class="nav-link"
          :class="{ active: isMorningEveningRoute }"
          @click="searchcategory('Morning-Evening')"
        >
          Morning-Evening
        </button>
          
          <button class="nav-link" :class="{ active: $route.path === '/about' }" @click="$router.push('/about')">About</button>
           <button class="nav-link" :class="{ active: $route.path === '/all_journal'}" @click="$router.push('/all_journal')">Saree Journal</button>
          <button class="nav-link" @click="$router.push('/coming-soon?type=customization')">Customization</button>
          <button class="nav-link nav-link--soon" @click="$router.push('/coming-soon?type=tussar-silks')">
            <span>Tussar Silks</span>
            <span class="coming-soon-badge">Coming Soon</span>
          </button>
        </div>
      </nav>
    </header>
    <div v-if="!hasHeroRoute" class="nav-spacer"></div>

    <!-- Search Overlay -->
    <v-dialog v-model="searchOpen" fullscreen>
      <v-card flat class="search-overlay">
        <div class="search-header">
          <v-text-field v-model="searchQuery" placeholder="Search silk sarees, zari, colors" variant="outlined" hide-details autofocus
            class="search-input" />
          <v-icon class="close-icon" @click="searchOpen = false">mdi-close</v-icon>
        </div>

        <div class="search-content">
          <!-- Suggestions -->
          <div class="search-column" v-show="suggestions.length > 0">
            <p class="section-title">SUGGESTIONS</p>
            <p v-for="(item, i) in suggestions" :key="i" class="suggestion" @click="searchproduct(item)">
              {{ item }}
            </p>

            <p class="section-title">COLORS</p>
            <div v-for="(colors, category) in colorProducts" :key="category">
              <p v-for="color in colors" :key="category + color" class="suggestion"
                @click="searchbycolor(category, color)">
                {{ color }}
              </p>
            </div>

            <p class="section-title" style="margin-top: 30px;">COLLECTIONS</p>
            <p v-for="(colors, category) in colorProducts" :key="category" class="suggestion"
              @click="searchbyproduct(category)">
              {{ category }}
            </p>
          </div>

          <!-- Products -->
          <div class="search-column" v-show="products.length > 0">
            <p class="section-title">PRODUCTS</p>
            <div v-for="product in filteredProducts" :key="product.id" class="product-row"
              @click="goToProduct(product.id)">
              <img :src="product.img || '/no-image.png'" @error="e => e.target.src = '/no-image.png'"
                class="product-img" />
              <p class="product-title">{{ product.title }}</p>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- Cart Overlay -->
    <transition name="cart-slide">
      <div v-if="cartOpen" class="cart-overlay" @click.self="cartOpen = false">
        <div class="cart-panel">
          <div class="cart-header">
            <div>
              <p class="cart-eyebrow">Sri Shakram</p>
              <h2>Shopping Cart</h2>
            </div>
            <button class="close" type="button" aria-label="Close cart" @click="cartOpen = false">
              <v-icon size="18">mdi-close</v-icon>
            </button>
          </div>

          <v-divider class="cart-divider"></v-divider>

          <!-- Empty Cart -->
          <div v-if="cartItems.length === 0" class="empty-cart">
          <v-icon class="empty-cart-icon" size="78">mdi-shopping-outline</v-icon>
            <p class="empty-message">Your cart is empty</p>
            <button class="continue-btn" @click="cartOpen = false">CONTINUE SHOPPING</button>
          </div>

          <!-- Cart Items -->
          <div v-else class="cart-content">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" class="cart-product-img" @error="e => e.target.src = '/no-image.png'" />

              <div class="product-info">
                <h4>{{ item.productName }}</h4>

                <div class="qty">
                  <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)">+</button>
                </div>

                <p class="new-price">
                  Rs. {{ formatPrice(item.price * item.quantity) }}
                  <span class="tax">Tax and discounts calculated at checkout.</span>
                </p>
              </div>

              <v-icon class="remove-icon" size="20" @click="removeItem(item)">
                mdi-trash-can-outline
              </v-icon>
            </div>
          </div>

          <!-- Cart Footer -->
          <div v-if="cartItems.length > 0" class="cart-footer">
            <div class="subtotal">
              <span class="subtotal-label">SUBTOTAL</span>
              <strong class="subtotal-amount">Rs. {{ formatPrice(cartTotal) }} (Excluding GST)</strong>
            </div>

            <p class="info">
              Shipping, taxes, and discount codes calculated at checkout.
            </p>

            <button class="checkout-btn" @click="goToCheckout">CHECK OUT</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu -->
    <v-dialog v-model="mobileMenu" fullscreen transition="slide-x-transition">
      <v-card class="mobile-menu-card">
        <div class="mobile-close">
          <v-icon size="22" @click="mobileMenu = false">mdi-close</v-icon>
        </div>

        <div class="mobile-menu-items">
          <v-menu>
            <template #activator="{ props }">
              <p v-bind="props" class="mobile-title">
                KANCHIPURAM SILKS
                <v-icon small>mdi-menu-down</v-icon>
              </p>
            </template>
            <div class="mobile-dropdown">
              <p v-for="item in kanchipuramItems" :key="item.Category"
                class="mobile-dropdown-item" @click="searchcategory(item.Category)">
                {{ item.Category }}
              </p>
            </div>
          </v-menu>
          <p class="mobile-title" @click="searchcategory('Pure Silk')">PURE SILKS</p>
          <p class="mobile-title" @click="searchcategory('Morning-Evening')">MORNING-EVENING</p>
          <p class="mobile-title" @click="navigateMobile('/about')">ABOUT US</p>
          <p class="mobile-title" @click="navigateMobile('/all_journal')">SAREE JOURNAL</p>
          <p class="mobile-title" @click="navigateMobile('/coming-soon?type=customization')">CUSTOMIZATION</p>
          <p class="mobile-title mobile-title--soon" @click="navigateMobile('/coming-soon?type=tussar-silks')">
            TUSSAR SILKS
            <span class="coming-soon-badge mobile-soon-badge">Coming Soon</span>
          </p>
        </div>

        <div class="mobile-socials">
          <v-icon>mdi-instagram</v-icon>
          <v-icon>mdi-facebook</v-icon>
          <v-icon>mdi-youtube</v-icon>
          <v-icon>mdi-pinterest</v-icon>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '@/adminfolder/axios';
import { showToast } from '@/utils/toast';

export default {
  data() {
    return {
      mobileMenu: false,
      kanchipuramItems: [
      { Category: "All Kanchipuram Silk Saree"},
      { Category: 'Morning-Evening' },
      { Category: 'Pure Silk' },
      { Category: 'Brocade' },
      { Category: 'Double Naada' }
      ],      
      searchOpen: false,
      cartOpen: false,
      searchQuery: "",
      suggestions: [],
      products: [],
      colorProducts: [],
      cartItems: [],
      isAuth: !!localStorage.getItem("token"),
      customerId: localStorage.getItem("customerId") || null,
      isScrolled: false,
    };
  },

  mounted() {
    this.fetchCategoryFilters();
    if (this.isLoggedIn) {
      this.fetchCart();
    }
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    isLoggedIn() {
      return this.isAuth;
    },

    filteredProducts() {
      if (!this.searchQuery) return this.products;
      const q = this.searchQuery.toLowerCase();
      return this.products.filter(p =>
        p?.title?.toLowerCase().includes(q) ||
        p?.color?.toLowerCase().includes(q)
      );
    },

    cartTotal() {
      return this.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },

    cartItemCount() {
      return this.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    isCollectionRoute() {
    return (
      this.$route.name === "Collection" &&
      !["Pure Silk", "Morning-Evening"].includes(this.$route.query.category)
    );
  },
    isPureSilkRoute() {
  return (
    this.$route.name === "Collection" &&
    this.$route.query.category === "Pure Silk"
  );
},
 isMorningEveningRoute() {
  return (
    this.$route.name === "Collection" &&
    this.$route.query.category === "Morning-Evening"
  );
},
    hasHeroRoute() {
      return ["Home", "About"].includes(this.$route.name);
    }
  },

  watch: {
    searchQuery(val) {
      if (!val || val.length < 2) {
        this.products = [];
        this.suggestions = [];
        return;
      }
      this.searchApi(val);
    }
  },

  methods: {
    goHome() {
    this.$router.push('/');
  },
    handleScroll() {
      this.isScrolled = window.scrollY > 24;
    },

    handleAccountClick() {
      if (this.isLoggedIn) {
        this.logout();
      } else {
        this.navigateMobile('/login/account');
      }
    },

    goToCheckout() {
      sessionStorage.removeItem("buyNowItem");
      this.navigateMobile("/checkout");
    },

    navigateMobile(path) {
      this.mobileMenu = false;
      this.$router.push(path);
    },

    async fetchCategoryFilters() {
      const res = await api.get("/catelog");
      this.kanchipuramItems = res.data;
    },

    async searchApi(query) {
      const res = await api.get("api/search", { params: { q: query } });
      this.suggestions = res.data.suggestions || [];
      this.colorProducts = res.data.colorProducts || [];
      this.products = (res.data.products || []).map(p => ({
        id: p.id,
        title: p.name,
        img: p.imageUrl,
        color: p.color
      }));
    },

    searchcategory(item) {
      this.$router.push({ name: 'Collection', query: { category: item.trim() } });
      this.searchOpen = false;
      this.mobileMenu = false;
    },

    goToProduct(id) {
      this.$router.push({ name: 'showproduct', params: { id } });
      this.searchOpen = false;
      this.mobileMenu = false;
    },

    gotoOrders() {
      if (!this.isLoggedIn) this.navigateMobile("/login/account");
      else this.navigateMobile('/orderStatus');
    },

    logout() {
      localStorage.clear();
      this.isAuth = false;
      this.$router.push("/login/account");
    },

    async searchproduct(item) {
      const res = await api.get(`/upload/search`, { params: { title: item } });
      if (res.data.length > 0) {
        this.$router.push({ name: 'showproduct', params: { id: res.data[0].id } });
      } else {
        showToast("No product found", "warning");
      }
      this.searchOpen = false;
    },

    searchbyproduct(category) {
      this.$router.push({ name: 'Collection', query: { category } });
      this.searchOpen = false;
    },

    searchbycolor(category, color) {
      this.$router.push({
        name: 'Collection',
        query: { category, color }
      });
      this.searchOpen = false;
    },

    openCart() {
      if (!this.isAuthenticated()) return;
      this.fetchCart();
      this.cartOpen = true;
    },

    isAuthenticated() {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Please login to continue", "warning");
        this.$router.push("/login/account");
        return false;
      }
      return true;
    },

    async fetchCart() {
      try {
        const res = await api.get("/cart");
        this.cartItems = res.data;
      } catch (err) {
        console.error("Cart fetch failed", err);
      }
    },

    async increaseQuantity(item) {
      try {
        const newQty = item.quantity + 1;
        const res = await api.put(`/cart/${item.id}/${newQty}`);
        item.quantity = res.data.quantity;
      } catch (err) {
        console.error("Failed to increase quantity", err);
        showToast("Failed to update quantity. Try again.", "error");
      }
    },

    async decreaseQuantity(item) {
      try {
        const newQty = item.quantity - 1;
        const res = await api.put(`/cart/${item.id}/${newQty}`);
        if (res.data.quantity <= 0) {
          this.cartItems = this.cartItems.filter(i => i.id !== item.id);
        } else {
          item.quantity = res.data.quantity;
        }
      } catch (err) {
        console.error("Failed to decrease quantity", err);
        showToast("Failed to update quantity. Try again.", "error");
      }
    },

    async removeItem(item) {
      await api.delete(`/cart/${item.id}`);
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      showToast("Item removed from cart", "success");
    },

    formatPrice(price) {
      return price.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
};
</script>

<style scoped src="@/components/stylesheets/Navbar1.css"></style>

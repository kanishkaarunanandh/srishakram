<template>
  <div class="customer-nav-shell">
    <header
      class="navbar-fixed"
      :class="{
        'navbar-fixed--scrolled': isScrolled,
        'navbar-fixed--page': !hasHeroRoute
      }"
    >
      <div class="nav-ornament"></div>
      <div class="navbar-content">
        <div class="mobile-left-controls">
          <button class="icon-button mobile-only" type="button" aria-label="Open menu" @click="mobileMenu = true">
            <v-icon size="24">mdi-menu</v-icon>
          </button>

          <button class="search-pill" type="button" @click="searchOpen = true">
            <v-icon size="18">mdi-magnify</v-icon>
            <span>Search silks, colors, collections</span>
          </button>
        </div>

        <img src="@/assets/logo-now.png" class="logo" @click="$router.push('/')" />

        <div class="icon-group">
            <v-tooltip top class="desktop-only">
              <template #activator="{ props }">
                <button v-bind="props" class="icon-button" type="button" @click="gotoOrders">
                  <v-icon size="21">mdi-shopping-outline</v-icon>
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
                    <v-icon size="21">mdi-shopping-outline</v-icon>
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

          <button class="nav-link" @click="searchcategory('Pure Silk')">Pure Silks</button>
          <button class="nav-link" @click="searchcategory('Morning-Evening')">Morning-Evening</button>
          
          <button class="nav-link" :class="{ active: $route.path === '/about' }" @click="$router.push('/about')">About</button>
           <button class="nav-link" @click="$router.push('/all_journal')">Saree Journal</button>
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
      kanchipuramItems: [],
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
      return this.$route.name === "Collection";
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

<style scoped>

/* ================= BASE STYLES ================= */

.customer-nav-shell {
  position: relative;
  z-index: 2000;
}

.navbar-fixed {
  position: fixed;
  top: 14px;
  left: 50%;
  width: 91%;
  height: 155px;
  transform: translateX(-50%);
  z-index: 2000;

  border: 1px solid rgba(226, 190, 127, 0.34);

  /* KEEP TRANSPARENCY INITIALLY */
  background: rgba(56, 14, 13, 0.28);

  color: #fff8ee;

  backdrop-filter: blur(14px);

  box-shadow: 0 18px 60px rgba(36, 8, 7, 0.16);

  transition:
    background 320ms ease,
    top 320ms ease,
    box-shadow 320ms ease;
  box-sizing: border-box;
}

.navbar-fixed--scrolled {
  top: 8px;

  background: rgba(255, 250, 244, 0.94);

  color: #3a1511;

  box-shadow: 0 18px 50px rgba(72, 23, 12, 0.18);
}

.navbar-fixed--page {
  background: rgba(255, 250, 244, 0.95);

  color: #3a1511;
}

.nav-ornament {
  height: 3px;

  background:
    linear-gradient(
      90deg,
      transparent,
      #ddb46d,
      transparent
    );
}

.nav-spacer {
  height: 175px;
}

/* ================= TOP NAV ================= */

.navbar-content {
  display: grid;

  grid-template-columns:
    minmax(280px, 1fr)
    auto
    minmax(220px, 1fr);

  align-items: center;

  gap: 28px;

  padding: 20px 34px 1px;
  box-sizing: border-box;
}

.mobile-left-controls {
  justify-self: start;
  display: flex;
  align-items: center;
}

/* ================= LOGO ================= */

.logo {
  display: block;

  width: clamp(165px, 12vw, 220px);

  flex-shrink: 0;

  cursor: pointer;

  filter:
    drop-shadow(
      0 8px 18px rgba(0, 0, 0, 0.12)
    );
}

/* ================= ICON GROUP ================= */

.icon-group {
  display: flex;

  justify-content: flex-end;

  gap: 14px;
  align-items: center;
  min-width: 0;
}

/* ================= COMMON BUTTONS ================= */

.icon-button,
.search-pill,
.nav-link {
  border: 0;

  background: transparent;

  color: inherit;

  cursor: pointer;

  font: inherit;
}

/* ================= ICON BUTTONS ================= */

.icon-button {
  width: 48px;

  height: 48px;
  min-width: 48px;

  display: inline-grid;

  place-items: center;

  border:
    1px solid rgba(226, 190, 127, 0.35);

  border-radius: 50%;

  transition:
    transform 220ms ease,
    background 220ms ease,
    border-color 220ms ease;
}

.icon-button:hover {
  transform: translateY(-2px);

  background:
    rgba(226, 190, 127, 0.13);

  border-color:
    rgba(226, 190, 127, 0.8);
}

/* ================= SEARCH ================= */

.search-pill {
  display: inline-flex;

  align-items: center;

  gap: 12px;

  max-width: 420px;

  padding: 13px 22px;

  border:
    1px solid rgba(226, 190, 127, 0.35);

  border-radius: 999px;

  background: rgba(255,255,255,0.12);

  color: inherit;

  font-size: 14px;

  font-weight: 500;

  letter-spacing: 0.03em;

  transition:
    background 220ms ease,
    transform 220ms ease;
}

.search-pill:hover {
  background:
    rgba(226, 190, 127, 0.12);

  transform: translateY(-1px);
}

/* ================= MENU BAR ================= */

.menu-bar {
  padding: 6px 24px 16px;
}

.menu-wrapper {
  display: flex;

  justify-content: center;

  align-items: center;

  flex-wrap: wrap;

  gap: clamp(16px, 1.8vw, 34px);
}

/* ================= NAV LINKS ================= */

.nav-link {
  position: relative;

  display: inline-flex;

  align-items: center;

  gap: 5px;

  padding: 8px 0;

  font-size: 14px;

  font-weight: 600;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  color: inherit;

  white-space: nowrap;

  transition: color 220ms ease;
}

.nav-link:hover {
  color: #ddb46d;
}

.nav-link::after {
  content: "";

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  height: 1px;

  transform: scaleX(0);

  transform-origin: center;

  background: #ddb46d;

  transition: transform 260ms ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-link--soon {
  gap: 7px;
}

/* ================= COMING SOON ================= */

.coming-soon-badge {
  display: inline-flex;

  align-items: center;

  min-height: 20px;

  padding: 3px 8px;

  border:
    1px solid rgba(194, 148, 78, 0.38);

  border-radius: 999px;

  background:
    rgba(221, 180, 109, 0.12);

  color: #ddb46d;

  font-size: 8px;

  font-weight: 700;

  letter-spacing: 0.08em;

  line-height: 1;

  text-transform: uppercase;
}

/* ================= DROPDOWN ================= */

.dropdown-menu,
.account-menu {
  min-width: 240px;

  padding: 16px;

  border:
    1px solid rgba(121, 59, 31, 0.18);

  background:
    rgba(255, 250, 244, 0.97);

  color: #3a1511;

  box-shadow:
    0 20px 44px rgba(58, 21, 17, 0.16);

  backdrop-filter: blur(10px);
}

.dropdown-item,
.account-menu button {
  display: block;

  width: 100%;

  border: 0;

  background: transparent;

  color: inherit;

  text-align: left;

  padding: 10px 8px;

  cursor: pointer;

  font-size: 13px;

  transition:
    color 200ms ease,
    transform 200ms ease;
}

.dropdown-item:hover,
.account-menu button:hover {
  color: #8b1618;

  transform: translateX(4px);
}

.menu-eyebrow {
  margin: 0 0 8px;

  color: #9b5b2f;

  font-size: 10px;

  letter-spacing: 0.2em;

  text-transform: uppercase;
}

/* ================= SEARCH OVERLAY ================= */

.search-overlay {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 10%, rgba(221, 180, 109, 0.22), transparent 30%),
    radial-gradient(circle at 86% 8%, rgba(111, 29, 24, 0.1), transparent 28%),
    linear-gradient(180deg, #fffaf4 0%, #f8ecdc 100%);
  color: #3a1511;
}

.search-overlay::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(157, 107, 39, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(157, 107, 39, 0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 72%);
}

.search-header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 820px) 48px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 30px clamp(20px, 8vw, 120px) 20px;
  border-bottom: 1px solid rgba(194, 148, 78, 0.18);
  background: rgba(255, 250, 244, 0.82);
  backdrop-filter: blur(18px);
  box-shadow: 0 16px 38px rgba(72, 23, 12, 0.08);
}

.search-input {
  border-radius: 999px;
}

.search-input :deep(.v-field) {
  min-height: 58px;
  border: 1px solid rgba(194, 148, 78, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 14px 36px rgba(72, 23, 12, 0.08);
}

.search-input :deep(.v-field__outline) {
  display: none;
}

.search-input :deep(input) {
  color: #3a1511;
  font-size: 18px;
  letter-spacing: 0.02em;
}

.search-input :deep(input::placeholder) {
  color: rgba(58, 21, 17, 0.48);
}

.close-icon {
  width: 48px;
  height: 48px;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(194, 148, 78, 0.32);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.48);
  color: #6f1d18;
  cursor: pointer;
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
}

.close-icon:hover {
  transform: rotate(90deg);
  background: rgba(221, 180, 109, 0.16);
  border-color: rgba(194, 148, 78, 0.66);
}

.search-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(320px, 1.2fr);
  gap: clamp(22px, 4vw, 56px);
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
  padding: 34px 0 70px;
}

.search-column {
  align-self: start;
  padding: 24px;
  border: 1px solid rgba(194, 148, 78, 0.22);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 18px 44px rgba(72, 23, 12, 0.08);
  backdrop-filter: blur(10px);
}

.section-title {
  margin: 0 0 14px;
  color: #9d6b27;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.suggestion {
  margin: 0 0 8px;
  padding: 11px 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: #4a1a14;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.02em;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, color 200ms ease;
}

.suggestion:hover {
  transform: translateX(4px);
  border-color: rgba(194, 148, 78, 0.22);
  background: rgba(221, 180, 109, 0.12);
  color: #8b1618;
}

.product-row {
  display: grid;
  grid-template-columns: 76px 1fr;
  align-items: center;
  gap: 16px;
  margin-bottom: 13px;
  padding: 11px;
  border: 1px solid rgba(194, 148, 78, 0.18);
  border-radius: 18px;
  background: rgba(255, 250, 244, 0.68);
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(72, 23, 12, 0.06);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease;
}

.product-row:hover {
  transform: translateY(-2px);
  border-color: rgba(194, 148, 78, 0.42);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 18px 36px rgba(72, 23, 12, 0.12);
}

.product-img {
  width: 76px;
  height: 94px;
  border: 1px solid rgba(221, 180, 109, 0.32);
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 12px 24px rgba(36, 8, 7, 0.14);
}

.product-title {
  margin: 0;
  color: #34110e;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.35;
}

/* ================= CART DRAWER ================= */

.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 2600;
  display: flex;
  justify-content: flex-end;
  background:
    radial-gradient(circle at 82% 12%, rgba(221, 180, 109, 0.18), transparent 28%),
    rgba(24, 8, 7, 0.44);
  backdrop-filter: blur(7px);
}

.cart-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(470px, 100%);
  height: 100%;
  padding: 24px;
  border-left: 1px solid rgba(221, 180, 109, 0.46);
  background:
    linear-gradient(180deg, rgba(255, 250, 244, 0.98), rgba(250, 239, 224, 0.98)),
    radial-gradient(circle at 20% 0%, rgba(221, 180, 109, 0.16), transparent 34%);
  color: #3a1511;
  box-shadow: -28px 0 70px rgba(36, 8, 7, 0.24);
  overflow: hidden;
}

.cart-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.52);
  box-shadow: inset 0 0 0 1px rgba(221, 180, 109, 0.12);
}

.cart-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 16px;
}

.cart-eyebrow {
  margin: 0 0 6px;
  color: #a36f2a;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.cart-header h2 {
  margin: 0;
  color: #3a1511;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.close {
  width: 40px;
  height: 40px;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(194, 148, 78, 0.34);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.42);
  color: #6f261c;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
}

.close:hover {
  transform: rotate(90deg);
  background: rgba(221, 180, 109, 0.13);
  border-color: rgba(194, 148, 78, 0.68);
}

.cart-divider {
  position: relative;
  z-index: 1;
  margin: 0 0 18px;
  border-color: rgba(194, 148, 78, 0.24);
  opacity: 1;
}

.cart-content {
  position: relative;
  z-index: 1;
  flex: 1;
  overflow-y: auto;
  padding: 2px 2px 18px;
}

.cart-content::-webkit-scrollbar {
  width: 6px;
}

.cart-content::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(157, 107, 39, 0.34);
}

.cart-item {
  display: grid;
  grid-template-columns: 92px 1fr auto;
  gap: 15px;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 13px;
  border: 1px solid rgba(194, 148, 78, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: 0 12px 30px rgba(72, 23, 12, 0.08);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  border-color: rgba(194, 148, 78, 0.34);
  box-shadow: 0 16px 34px rgba(72, 23, 12, 0.12);
}

.cart-product-img {
  width: 92px;
  height: 122px;
  border-radius: 12px;
  border: 1px solid rgba(221, 180, 109, 0.26);
  object-fit: cover;
  box-shadow: 0 10px 24px rgba(36, 8, 7, 0.12);
}

.product-info {
  min-width: 0;
}

.product-info h4 {
  margin: 2px 0 12px;
  color: #34110e;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.32;
}

.qty {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(194, 148, 78, 0.28);
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.88);
}

.qty button,
.qty span {
  min-width: 32px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #4a1a14;
  font-size: 14px;
}

.qty button {
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease;
}

.qty button:hover:not(:disabled) {
  background: rgba(221, 180, 109, 0.16);
  color: #8b1618;
}

.qty button:disabled {
  cursor: not-allowed;
  opacity: 0.36;
}

.new-price {
  margin: 13px 0 0;
  color: #3a1511;
  font-size: 15px;
  font-weight: 700;
}

.tax {
  display: block;
  margin-top: 4px;
  color: rgba(58, 21, 17, 0.62);
  font-size: 11px;
  font-weight: 400;
  line-height: 1.35;
}

.remove-icon {
  margin-top: 2px;
  color: rgba(111, 38, 28, 0.58);
  cursor: pointer;
  transition: color 200ms ease, transform 200ms ease;
}

.remove-icon:hover {
  color: #8b1618;
  transform: translateY(-1px);
}

.empty-cart {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 18px;
}

.empty-cart-icon {
  color: #9d6b27;
  filter: drop-shadow(0 14px 22px rgba(157, 107, 39, 0.18));
}

.empty-message {
  margin: 18px 0 20px;
  color: #3a1511;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 500;
}

.continue-btn,
.checkout-btn {
  border: 1px solid rgba(221, 180, 109, 0.46);
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.continue-btn {
  padding: 13px 24px;
  background: #6f1d18;
  color: #fff8ee;
  box-shadow: 0 14px 28px rgba(111, 29, 24, 0.2);
}

.continue-btn:hover,
.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(111, 29, 24, 0.24);
}

.cart-footer {
  position: relative;
  z-index: 1;
  margin: 0 -4px -4px;
  padding: 18px;
  border: 1px solid rgba(194, 148, 78, 0.24);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0 -10px 30px rgba(72, 23, 12, 0.08);
}

.subtotal {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.subtotal-label {
  color: #9d6b27;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.subtotal-amount {
  color: #3a1511;
  font-size: 15px;
  text-align: right;
}

.info {
  margin: 0 0 16px;
  color: rgba(58, 21, 17, 0.64);
  font-size: 12px;
  line-height: 1.45;
}

.checkout-btn {
  width: 100%;
  padding: 15px 20px;
  background:
    linear-gradient(135deg, #5e1714, #8b1618 58%, #a36f2a);
  color: #fff8ee;
  box-shadow: 0 14px 28px rgba(111, 29, 24, 0.22);
}

.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: opacity 320ms ease;
}

.cart-slide-enter-active .cart-panel,
.cart-slide-leave-active .cart-panel {
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.cart-slide-enter-from,
.cart-slide-leave-to {
  opacity: 0;
}

.cart-slide-enter-from .cart-panel,
.cart-slide-leave-to .cart-panel {
  transform: translateX(100%);
}

/* ================= MOBILE ================= */

.mobile-only {
  display: none;
}

.desktop-only {
  display: block;
}

/* ================= MOBILE STYLES ================= */

@media (max-width: 768px) {

  .customer-nav-shell {
    padding: 6px 0 8px;
    box-shadow: 0 12px 28px rgba(72, 23, 12, 0.08);
  }

  .mobile-only {
    display: block;
  }

  .desktop-only {
    display: none !important;
  }

  .navbar-fixed {
    top: 8px;
    width: calc(100% - 16px);
    height: auto;
    min-height: 58px;
    border-radius: 0;
    overflow: visible;
  }

  .nav-spacer {
    display: none;
  }

  .navbar-content {
    position: relative;
    display: grid;
    grid-template-columns: minmax(82px, 1fr) auto minmax(82px, 1fr);
    grid-template-areas: "left logo right";
    align-items: center;
    min-height: 54px;
    padding: 7px 10px;
    gap: 6px;
  }

  .mobile-left-controls {
    grid-area: left;
    justify-self: start;
    gap: 6px;
  }

  .logo {
    grid-area: logo;
    position: static;
    width: clamp(102px, 30vw, 126px);
    transform: none;
    justify-self: center;
    max-height: 42px;
    object-fit: contain;
  }

  .search-pill {
    width: 36px;
    height: 36px;
    min-width: 36px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }

  .search-pill span {
    display: none;
  }

  .icon-button {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }

  .icon-button :deep(.v-icon),
  .search-pill :deep(.v-icon) {
    font-size: 20px !important;
    width: 20px;
    height: 20px;
  }

  .icon-group {
    grid-area: right;
    justify-self: end;
    margin-left: 0;
    gap: 6px;
    align-items: center;
    flex-wrap: nowrap;
  }

  .icon-group :deep(.v-badge) {
    display: inline-grid;
    place-items: center;
  }

  .icon-group .desktop-only {
    display: none !important;
  }

  .search-header {
    grid-template-columns: minmax(0, 1fr) 44px;
    gap: 10px;
    padding: 18px 14px 14px;
  }

  .search-input :deep(.v-field) {
    min-height: 50px;
  }

  .search-input :deep(input) {
    font-size: 15px;
  }

  .close-icon {
    width: 44px;
    height: 44px;
  }

  .search-content {
    grid-template-columns: 1fr;
    width: calc(100% - 28px);
    gap: 16px;
    padding: 20px 0 42px;
  }

  .search-column {
    padding: 17px;
    border-radius: 18px;
  }

  .product-row {
    grid-template-columns: 66px 1fr;
    gap: 12px;
    padding: 10px;
  }

  .product-img {
    width: 66px;
    height: 84px;
    border-radius: 12px;
  }

  .product-title {
    font-size: 15px;
  }

  .cart-panel {
    width: 100%;
    padding: 22px 16px;
    border-left: 0;
  }

  .cart-header h2 {
    font-size: 25px;
  }

  .cart-item {
    grid-template-columns: 96px 1fr auto;
    gap: 13px;
    padding: 13px;
    border-radius: 18px;
  }

  .cart-product-img {
    width: 96px;
    height: 128px;
  }

  .product-info h4 {
    font-size: 14px;
  }

  .cart-footer {
    padding: 15px;
  }

  .subtotal {
    flex-direction: column;
    gap: 4px;
  }

  .subtotal-amount {
    text-align: left;
  }

  .mobile-menu-card {
    background:
      radial-gradient(circle at 18% 8%, rgba(221, 180, 109, 0.18), transparent 32%),
      linear-gradient(180deg, #fffaf4, #f7ead9);
    color: #3a1511;
    padding: 22px 24px 28px;
  }

  .mobile-close {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 28px;
  }

  .mobile-close .v-icon {
    width: 44px;
    height: 44px;
    display: inline-grid;
    place-items: center;
    border: 1px solid rgba(194, 148, 78, 0.32);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.52);
    color: #6f1d18;
  }

  .mobile-menu-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mobile-title {
    margin: 0;
    padding: 15px 0;
    border-bottom: 1px solid rgba(194, 148, 78, 0.18);
    color: #3a1511;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .mobile-title--soon {
    justify-content: space-between;
  }

  .mobile-dropdown {
    padding: 12px 16px;
    border: 1px solid rgba(194, 148, 78, 0.2);
    background: rgba(255, 250, 244, 0.96);
  }

  .mobile-dropdown-item {
    padding: 10px 0;
    font-size: 13px;
  }

  .mobile-socials {
    display: flex;
    gap: 14px;
    margin-top: 34px;
    color: #9d6b27;
  }
}

@media (max-width: 380px) {
  .navbar-content {
    grid-template-columns: minmax(76px, 1fr) auto minmax(76px, 1fr);
    min-height: 52px;
    gap: 4px;
    padding: 6px 8px;
  }

  .logo {
    width: 98px;
  }

  .icon-button,
  .search-pill {
    width: 34px;
    height: 34px;
    min-width: 34px;
  }

  .icon-group {
    gap: 4px;
  }
}

@media (max-width: 340px) {
  .navbar-content {
    grid-template-columns: minmax(72px, 1fr) auto minmax(36px, 1fr);
  }

  .account-button {
    display: none;
  }

  .logo {
    width: 90px;
  }
}

/* ================= TABLET ================= */

@media (max-width: 1024px) and (min-width: 769px) {

  .navbar-fixed {
    width: calc(100% - 24px);
    height: auto;
    min-height: 126px;
  }

  .navbar-content {
    grid-template-columns: minmax(200px, 1fr) auto minmax(136px, 1fr);
    gap: 16px;
    padding: 13px 20px 6px;
  }

  .logo {
    width: clamp(145px, 16vw, 178px);
  }

  .search-pill {
    max-width: 280px;
    padding: 10px 16px;
    font-size: 12px;
  }

  .icon-button {
    width: 40px;
    height: 40px;
  }

  .menu-wrapper {
    gap: 12px 18px;
    flex-wrap: wrap;
  }

  .nav-link {
    font-size: 10.5px;
    letter-spacing: 0.12em;
  }
}

</style>

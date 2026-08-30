<template>
  <div class="checkout-page">
    <!-- Header -->
    <header class="checkout-header">
      <div class="logo">
        <img src="@/assets/logo main.png" alt="Ushma" style="width: 120px; height: auto;" />
      </div>
      <button class="cart-icon" @click="$router.back()">
        <v-icon>mdi-close</v-icon>
      </button>
    </header>

    <div class="checkout-container">
      <!-- Left Column - Form -->
      <div class="checkout-form">
        <!-- Contact Section -->
        <section class="form-section">
          <h2 class="section-title">Contact</h2>
          <div class="form-group">
            <input
              v-model="contact.email"
              type="email"
              placeholder="Email or mobile phone number"
              class="form-input"
              readonly
            />
          </div>
          <div class="checkbox-group">
            <input v-model="contact.emailOffers" type="checkbox" id="emailOffers" />
            <label for="emailOffers">Email me with news and offers</label>
          </div>
        </section>

        <!-- Delivery Section -->
        <section class="form-section">
          <h2 class="section-title">Delivery</h2>

          <!-- Country Autocomplete -->
          <div class="form-group">
            <input
              type="text"
              v-model="delivery.countrySearch"
              placeholder="Select Country"
              class="form-input"
              @input="filterCountries"
            />
            <ul v-if="filteredCountries.length" class="autocomplete-list">
              <li 
                v-for="country in filteredCountries" 
                :key="country.isoCode"
                @click="selectCountry(country)"
              >
                {{ country.name }}
              </li>
            </ul>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <input
                v-model="delivery.firstName"
                type="text"
                placeholder="First name"
                class="form-input"
              />
            </div>
            <div class="form-group half">
              <input
                v-model="delivery.lastName"
                type="text"
                placeholder="Last name"
                class="form-input"
              />
            </div>
          </div>

          <!-- <div class="form-group">
            <input
              v-model="delivery.company"
              type="text"
              placeholder="Company (optional)"
              class="form-input"
            />
          </div> -->

          <div class="form-group">
            <input
              v-model="delivery.address"
              type="text"
              placeholder="Address"
              class="form-input"
            />
          </div>

          <div class="form-row three-col">
            <div class="form-group">
              <input
                v-model="delivery.city"
                type="text"
                placeholder="City"
                class="form-input"
              />
            </div>
            <div class="form-group">
  <input
    type="text"
    v-model="delivery.stateSearch"
    placeholder="Select State"
    class="form-input"
    @input="filterStates"
    :disabled="!statesList.length"
  />
  <ul v-if="filteredStates.length && delivery.stateSearch" class="autocomplete-list">
    <li
      v-for="state in filteredStates"
      :key="state.isoCode"
      @click="selectState(state)"
    >
      {{ state.name }}
    </li>
  </ul>
</div>

            <div class="form-group">
              <input
                v-model="delivery.pinCode"
                type="text"
                placeholder="PIN code"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <input
              v-model="delivery.phone"
              type="tel"
              placeholder="Phone"
              class="form-input"
            />
          </div>

          <div class="checkbox-group">
            <input v-model="delivery.saveInfo" type="checkbox" id="saveInfo" />
            <label for="saveInfo">Save this information for next time</label>
          </div>
        </section>

        <!-- Payment Section -->
         <section class="form-section">
          <h2 class="section-title">Payment</h2>
          <p class="payment-info">All transactions are secure and encrypted.</p>

        <div class="payment-method">

  <!-- Razorpay -->
  <div class="payment-option">
    <div class="payment-header">
      <input
        type="radio"
        value="razorpay"
        v-model="paymentMethod"
      />
      <label for="razorpay">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</label>
                <div class="payment-logos">
                 <img src="@/assets/gpay.jpg" alt="gpay" style="width: 20px; height: auto;" />
                  <img src="@/assets/paytm.png" alt="paytm" style="width: 20px; height: auto;" />
                  <img src="@/assets/upi img.png" alt="upi" style="width: 20px; height: auto;" />
                  <span class="more-options">+4</span>
                </div>
    </div>
  </div>

  <!-- COD -->
  <div class="payment-option mt-4">
    <div class="payment-header">
      <input
        type="radio"
        value="cod"
        v-model="paymentMethod"
      />
      <label>Cash on Delivery (COD)</label>
    </div>
  </div>

</div>

        </section>

        <!-- Pay Now Button -->
        <button class="pay-now-btn" @click="payNow">Pay Now</button>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="order-summary">
        <div class="summary-sticky">
          <div class="summary-items">
            <div v-for="item in cartItems" :key="item.id" class="summary-item">
              <div class="item-image-wrapper">
                <img :src="item.image" :alt="item.productName" class="item-image" />
                <span class="item-quantity">{{ item.quantity }}</span>
              </div>
              <div class="item-details">
                <h4 class="item-name">{{ item.productName }}</h4>
                <p style="font-size:12px;color:gray;"><v-icon class="mt-2 me-2">mdi-tag-outline</v-icon>get Rs {{item.offer_price}} discount</p>
              </div>
              <div class="item-price">
              <!-- Original price (strike-through) -->
              <div class="original-price">
                ₹{{ formatPrice(item.price) }}
              </div>

              <!-- Discounted price -->
              <div class="discounted-price">
                ₹{{ formatPrice(item.price - item.offer_price) }}
              </div>
            </div>
            </div>
          </div>

          <div class="price-breakdown">
  <div class="price-row">
     <span>Subtotal</span>
    <span class="strike">
      ₹{{ formatPrice(originalSubtotal) }}
    </span>
    
  </div>
 
  <div class="price-row">
    <span>Discount</span>
    <span class="green">
      - ₹{{ formatPrice(totalDiscount) }}
    </span>
  </div>
   <div class="price-row">
    <span></span>
<span class="bold">
      ₹{{ formatPrice(discountedSubtotal) }}
    </span>
  </div>
  <div class="price-row">
    <span>CGST (2.5%)</span>
    <span>₹{{ formatPrice(ctaxAmount) }}</span>
  </div>
  <div class="price-row">
    <span>SGST (2.5%)</span>
    <span>₹{{ formatPrice(staxAmount) }}</span>
  </div>
   <div class="price-row">
    <span>GST (5%)</span>
    <span>₹{{ formatPrice(taxAmount) }}</span>
  </div>
  <div class="price-row">
    <span>Shipping</span>
    <span>FREE</span>
  </div>
</div>

<div class="total-row">
  <span>Total Amount</span>
  <span>₹{{ formatPrice(total) }}</span>
</div>
          <div class="total-services">
            Includes GST and other services as applicable.    
            </div>
</div>

      </div>
    </div>
  </div>
</template>

<style scoped src="@/adminfolder/admin styles/checkout.css"></style>
<script>
import api from "@/adminfolder/axios";
import { Country, State } from "country-state-city";
import { showToast } from "@/utils/toast";


export default {
  name: "CheckoutPage",
  data() {
    return {
      paymentMethod: "razorpay",
      contact: {
        email: localStorage.getItem("userEmail") || "",
        emailOffers: false,
      },
      delivery: {
      country: "",
      countrySearch: "",
      state: "",
      stateSearch: "",
      firstName: "",
      lastName: "",
      //company: "",
      address: "",
      city: "",
      pinCode: "",
      phone: "",
      saveInfo: false,
      },
      statesList: [],          
      filteredStates: [],      
      countries: [],
      filteredCountries: [],
      cartItems: [],
      subtotal: 0,
      estimatedTaxes: 0.05, // 5% GST for example
      CGST: 0.025, // 2.5% CGST
      SGST: 0.025, // 2.5% SGST
    };
  },
 computed: {
  taxAmount() {
    return Number((this.subtotal * this.estimatedTaxes).toFixed(2));
  },
  ctaxAmount() {
    return Number((this.subtotal * this.CGST).toFixed(2));
  },
  staxAmount() {
    return Number((this.subtotal * this.SGST).toFixed(2));
  },
  total() {
    return Number((this.subtotal + this.taxAmount).toFixed(2));
  },
   originalSubtotal() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },

  // Total discount amount
  totalDiscount() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.offer_price * item.quantity);
    }, 0);
  },

  // Final subtotal after discount
  discountedSubtotal() {
    return this.originalSubtotal - this.totalDiscount;
  }
},
async mounted() {
  const buyNowItem = sessionStorage.getItem("buyNowItem");

  if (buyNowItem) {
    // BUY NOW FLOW
    const item = JSON.parse(buyNowItem);
    this.cartItems = [item];

    this.subtotal =
      ((item.price || 0) - (item.offer_price || 0)) *
      (item.quantity || 1);

  } else {
    // CART FLOW
    this.cartItems = [];
    this.subtotal = 0;
    await this.fetchCart();
  }

  this.countries = Country.getAllCountries();
},
 watch: {
  "delivery.country"(newCountryCode) {
    this.statesList = State.getStatesOfCountry(newCountryCode);
    this.delivery.state = "";
    this.delivery.stateSearch = "";
    this.filteredStates = [];
  },
},
  methods: {
    filterStates() {
    const search = this.delivery.stateSearch.toLowerCase();
    this.filteredStates = this.statesList.filter(s =>
      s.name.toLowerCase().includes(search)
    );
  },

  selectState(state) {
    this.delivery.state = state.isoCode;
    this.delivery.stateSearch = state.name;
    this.filteredStates = [];
  },
    formatPrice(price) {
      return price.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    },
   async fetchCart() {
  try {
    const res = await api.get("/cart");
    this.cartItems = res.data || [];

this.subtotal = this.cartItems.reduce(
  (sum, item) =>
    sum +
    ((item.price || 0) - (item.offer_price || 0)) *
      (item.quantity || 0),
  0
);

  } catch (err) {
    console.error("Cart fetch failed", err);
    this.cartItems = [];
    this.subtotal = 0;
  }
},

    filterCountries() {
      const search = this.delivery.countrySearch.toLowerCase();
      this.filteredCountries = this.countries.filter(c =>
        c.name.toLowerCase().includes(search)
      );
    },
    selectCountry(country) {
      this.delivery.country = country.isoCode;
      this.delivery.countrySearch = country.name;
      this.filteredCountries = [];
    },
    async payNow() {
  if (!this.cartItems.length) {
    showToast("Your cart is empty", "warning");
    return;
  }

  const requiredFields = [
    { value: this.delivery.firstName, name: "First Name" },
    { value: this.delivery.lastName, name: "Last Name" },
    { value: this.delivery.address, name: "Address" },
    { value: this.delivery.city, name: "City" },
    { value: this.delivery.state, name: "State" },
    { value: this.delivery.pinCode, name: "PIN Code" },
    { value: this.delivery.phone, name: "Phone" },
    { value: this.delivery.country, name: "Country" },
    { value: this.contact.email, name: "Email" },
  ];

  const emptyField = requiredFields.find(
    (f) => !f.value || f.value.toString().trim() === ""
  );

  if (emptyField) {
    showToast(
      `Please fill the required field: ${emptyField.name}`,
      "warning"
    );
    return;
  }

  const payload = {
    name: `${this.delivery.firstName} ${this.delivery.lastName}`,
    email: this.contact.email,
    phoneNo: this.delivery.phone,
    address: this.delivery.address,
    city: this.delivery.city,
    state: this.delivery.state,
    pinCode: this.delivery.pinCode,
    country: this.delivery.country || "India",

    items: this.cartItems,

    amount: Number(this.total),

    // Stores either "cod" or "razorpay"
    paymentMethod: this.paymentMethod,
  };

  try {
    const res = await api.post("/create-order", payload);

    showToast(
      `Order placed successfully. Order ID: ${res.data.orderId}`,
      "success"
    );

    const isBuyNow = !!sessionStorage.getItem("buyNowItem");

    if (!isBuyNow) {
      await api.delete("/cart/clear");
    } else {
      sessionStorage.removeItem("buyNowItem");
    }

    this.cartItems = [];
    this.subtotal = 0;

    this.$router.push("/orderStatus");

  } catch (err) {
    console.error(err);

    showToast(
      err.response?.data?.message ||
      "Unable to place order. Please try again.",
      "error"
    );
  }
},

  },
};
</script>



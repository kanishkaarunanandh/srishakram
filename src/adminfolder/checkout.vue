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

<script>
import api from "@/adminfolder/axios";
import { Country, State } from "country-state-city";

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
   razorpayOrderId: null,
},
statesList: [],          
filteredStates: [],      
      countries: [],
      filteredCountries: [],
      statesList: [],
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
    payNow() {
  if (!this.cartItems.length) {
    alert("Your cart is empty");
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

  const emptyField = requiredFields.find(f => !f.value || f.value.toString().trim() === "");
  if (emptyField) {
    alert(`Please fill the required field: ${emptyField.name}`);
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
    paymentMethod: this.paymentMethod, 
  };

  if (this.paymentMethod === "cod") {
    
    api
      .post("/create-order", payload)
      .then((res) => {
        alert("Order placed successfully! Payment method: COD. Order ID: " + res.data.orderId);
        const isBuyNow = !!sessionStorage.getItem("buyNowItem");
        if (!isBuyNow) {
          api.delete("/cart/clear");
        } else {
          sessionStorage.removeItem("buyNowItem");
        }
        this.cartItems = [];
        this.subtotal = 0;
        this.$router.push("/orderStatus");
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert("Please fill all required fields");
      });
  } else {
    // ✅ Razorpay: create order and open Razorpay modal
    api
      .post("/create-order", payload)
      .then((res) => this.openRazorpay(res.data))
      .catch((err) => {
        console.error(err.response?.data);
        alert("Please fill all required fields");
      });
  }
},

    openRazorpay(order) {

  // store order id for failure case
  this.razorpayOrderId = order.razorpayOrderId;

  const options = {
    key: "rzp_test_SBY90j69ONO15o",
    amount: order.amount * 100,
    currency: "INR",
    name: "Sri Shakram",
    order_id: order.razorpayOrderId,

    prefill: {
      name: order.name,
      email: order.email,
      contact: order.phoneNo,
    },

    handler: (response) => {
      this.verifyPayment(response);
    },

    modal: {
      ondismiss: async () => {
        alert("Payment cancelled");

        // 🔥 CALL BACKEND TO MARK FAILED
        if (this.razorpayOrderId) {
await api.post("/handle-payment-callback", {
  razorpay_order_id: this.razorpayOrderId,
  razorpay_payment_id: "",
  razorpay_signature: ""
});
        }

        this.$router.push("/orderStatus");
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
},
 async verifyPayment(response) {
  try {

    const res = await api.post("/handle-payment-callback", response);

    if (res.data.success) {

      alert("Payment Successful! Order ID: " + res.data.orderId);

      const isBuyNow = !!sessionStorage.getItem("buyNowItem");

      if (!isBuyNow) {
        await api.delete("/cart/clear");
      } else {
        sessionStorage.removeItem("buyNowItem");
      }

      this.cartItems = [];
      this.subtotal = 0;
      this.$router.push("/orderStatus");

    } else {

      // 🔥 MARK FAILED
      if (this.razorpayOrderId) {
        await api.post("/handle-payment-callback", {
  razorpay_order_id: this.razorpayOrderId,
  razorpay_payment_id: "",
  razorpay_signature: ""
});

      }

      alert("Payment failed");
    }

  } catch (err) {

    // 🔥 ALSO MARK FAILED ON ERROR
    if (this.razorpayOrderId) {
      await api.post(`/payment-failed/${this.razorpayOrderId}`);
    }

    alert("Payment failed. Please try again.");
  }
}


  },
};
</script>

<style scoped>
.strike {
  text-decoration: line-through;
  color: #888;
}

.green {
  color: #2e7d32;
}

.bold {
  font-weight: 700;
}

.original-price {
  text-decoration: line-through;
  color: red;
  font-size: 14px;
}

.discounted-price {
  color: #000;
  font-weight: 600;
  font-size: 18px;
}

/* Add a simple autocomplete style */
.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  z-index: 10;
  margin-top: 4px;
}

.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background-color: #f0f0f0;
}

/* Global Checkout Styles */
.checkout-page {
  min-height: 100vh;
  background: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Header */
.checkout-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 32px;
  width: auto;
}

.brand-name {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #333;
}

.cart-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #666;
}

/* Main Container */
.checkout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 80px;
}

/* Left Column - Form */
.checkout-form {
  max-width: 600px;
}

.form-section {
  margin-bottom: 40px;
  position: relative;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.sign-in-link {
  position: absolute;
  top: 0;
  right: 0;
  color: #2c6ecb;
  text-decoration: none;
  font-size: 14px;
}

.sign-in-link:hover {
  text-decoration: underline;
}

/* Form Elements */
.form-group {
  margin-bottom: 16px;
  position: relative;
}

.form-group.half {
  flex: 1;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row.three-col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #2c6ecb;
  box-shadow: 0 0 0 2px rgba(44, 110, 203, 0.1);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.search-group {
  position: relative;
}

.search-icon,
.info-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

/* Shipping and Payment */
.shipping-instruction,
.payment-info {
  font-size: 14px;
  color: #666;
  margin-top: 12px;
}

.payment-method {
  margin-top: 16px;
}

.payment-option {
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.payment-option.selected {
  border-color: #2c6ecb;
}

.payment-header {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f7f7f7;
}

.payment-header input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.payment-header label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.payment-logos {
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-logo {
  height: 20px;
  width: auto;
}

.more-options {
  font-size: 12px;
  color: #666;
}

.payment-notice {
  padding: 16px;
  font-size: 13px;
  color: #666;
  background: white;
  margin: 0;
}

/* Billing Options */
.billing-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.billing-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  transition: all 0.2s;
}

.billing-option:hover {
  border-color: #2c6ecb;
}

.billing-option input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.billing-option label {
  font-size: 14px;
  cursor: pointer;
  flex: 1;
}

/* Pay Button */
.pay-now-btn {
  width: 100%;
  padding: 18px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 24px;
}

.pay-now-btn:hover {
  background: #000;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Right Column - Order Summary */
.order-summary {
  background: #fafafa;
}

.summary-sticky {
  position: sticky;
  top: 20px;
}

.summary-items {
  margin-bottom: 24px;
}

.summary-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
}

.summary-item:first-child {
  padding-top: 0;
}

.item-image-wrapper {
  position: relative;
  flex-shrink: 0;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.item-quantity {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #666;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 6px 0;
  color: #1a1a1a;
}

.item-variant {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.item-price {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

/* Discount Section */
.discount-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e5e5;
}

.discount-input-wrapper {
  display: flex;
  gap: 12px;
}

.discount-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 14px;
}

.discount-input:focus {
  outline: none;
  border-color: #2c6ecb;
}

.apply-btn {
  padding: 12px 24px;
  background: #f0f0f0;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.apply-btn:hover {
  background: #e5e5e5;
}

/* Price Breakdown */
.price-breakdown {
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
}

.info-icon-inline {
  margin-left: 4px;
  color: #999;
}

/* Total */
.total-row {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
  font-size: 18px;
  font-weight: 600;
}

.total-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.currency {
  font-size: 12px;
  color: #666;
  font-weight: 400;
}

.total-amount {
  color: #1a1a1a;
}

.total-services {
  font-size: 13px;
  color: #666;
  margin-top: -10px;
}

/* Footer */
.checkout-footer {
  border-top: 1px solid #e5e5e5;
  padding: 24px 40px;
  background: white;
  margin-top: 60px;
}

.footer-links {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.footer-links a {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #2c6ecb;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .checkout-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .order-summary {
    order: -1;
  }

  .summary-sticky {
    position: relative;
    top: 0;
  }
}

@media (max-width: 640px) {
  .checkout-header {
    padding: 16px 20px;
  }

  .checkout-container {
    padding: 24px 16px;
  }

  .form-row.three-col {
    grid-template-columns: 1fr;
  }

  .checkout-footer {
    padding: 20px 16px;
  }

  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}
</style>

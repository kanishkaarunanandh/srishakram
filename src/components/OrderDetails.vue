<template>
  <v-container class="order-details-container py-8">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <!-- Back Button -->
        <v-btn
          text
          class="mb-4 text-caption"
          @click="$router.push('/orderStatus')"
        >
          <v-icon small left>mdi-arrow-left</v-icon>
          Back to Orders
        </v-btn>

        <!-- Order Header -->
        <div class="order-header mb-6">
          <div class="d-flex justify-space-between align-center flex-wrap">
            <div>
              <h1 class="text-h4 font-weight-bold mb-2">Order #{{ order.orderId }}</h1>
              <p class="text-body-2 grey--text text--darken-1">
                Placed on {{ formatDate(new Date()) }}
              </p>
            </div>
            <v-chip
              :color="getStatusColor(order.orderStatus)"
              text-color="white"
              class="px-4 py-2"
              label
            >
              <v-icon small left>{{ getStatusIcon(order.orderStatus) }}</v-icon>
              {{ getDisplayStatus(order.orderStatus) }}
            </v-chip>
          </div>
        </div>

        <v-divider class="mb-6"></v-divider>

        <!-- Main Content Grid -->
        <v-row>
          <!-- Left Column - Products -->
          <v-col cols="12" md="8">
            <div class="products-section">
              <h2 class="text-h6 font-weight-bold mb-4">Items Ordered</h2>
              
              <div
                v-for="item in order.items"
                :key="item.productId"
                class="product-item mb-4"
              >
                <v-card flat class="product-card">
                  <div class="d-flex">
                    <div class="product-image-wrapper">
                      <v-img
                        :src="item.image"
                        :alt="item.productName"
                        class="product-image"
                        cover
                      ></v-img>
                    </div>

                    <div class="product-details flex-grow-1">
                      <h3 class="product-name text-body-1 font-weight-medium mb-2">
                        {{ item.productName }}
                      </h3>
                      
                      <div class="product-meta mb-3">
                        <span class="text-body-2 grey--text">Qty: {{ item.quantity }}</span>
                      </div>

                      <div class="product-price">
                        <span v-if="item.offer_price > 0" class="text-body-2 grey--text text-decoration-line-through mr-2">
                          ₹{{ item.price.toLocaleString('en-IN') }}
                        </span>
                        <span class="text-h6 font-weight-bold">₹{{ getItemPrice(item).toLocaleString('en-IN') }}</span>
                        <v-chip
                          v-if="item.offer_price > 0"
                          x-small
                          color="success"
                          text-color="white"
                          class="ml-2"
                        >
                          Save ₹{{ item.offer_price.toLocaleString('en-IN') }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>

          <!-- Right Column - Summary & Actions -->
          <v-col cols="12" md="4">
            <v-card flat class="summary-card sticky-summary">
              <!-- Order Summary -->
              <div class="summary-section pa-6">
                <h3 class="text-h6 font-weight-bold mb-4">Order Summary</h3>
                
                <div class="summary-row mb-3">
                  <span class="text-body-2">Subtotal ({{ getTotalItems() }} items)</span>
                  <span class="text-body-2 font-weight-medium">₹{{ getSubtotal().toLocaleString('en-IN') }}</span>
                </div>

                <div class="summary-row mb-3">
                  <span class="text-body-2">Shipping</span>
                  <span class="text-body-2 font-weight-medium">₹{{ getShipping().toLocaleString('en-IN') }}</span>
                </div>

                <div class="summary-row mb-3">
                  <span class="text-body-2">Tax (GST 5%)</span>
                  <span class="text-body-2 font-weight-medium">₹{{ getTax().toLocaleString('en-IN') }}</span>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="summary-row total-row">
                  <span class="text-h6 font-weight-bold">Total</span>
                  <span class="text-h6 font-weight-bold primary--text">₹{{ order.amount.toLocaleString('en-IN') }}</span>
                </div>

                <div class="payment-method mt-4 pa-3 grey lighten-4 rounded">
                  <div class="text-caption grey--text text--darken-1 mb-1">Payment Method</div>
                  <div class="text-body-2 font-weight-medium">
                    <v-icon small left>{{ order.paymentMethod === 'COD' ? 'mdi-cash' : 'mdi-credit-card' }}</v-icon>
                    {{ order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment' }}
                  </div>
                </div>

                <!-- Refund Notice - Different content based on refund status -->
                <v-alert
                  v-if="showRefundNotice"
                  dense
                  text
                  :color="getRefundAlertColor()"
                  class="mt-4 mb-0"
                  :icon="getRefundAlertIcon()"
                >
                  <div class="text-caption font-weight-medium">
                    {{ getRefundTitle() }}
                  </div>
                  <div class="text-caption mt-1">
                    {{ getRefundMessage() }}
                  </div>
                  <div v-if="order.orderStatus === 'REFUND COMPLETED'" class="text-caption mt-2 font-weight-medium">
                    <v-icon x-small color="success" class="mr-1">mdi-check</v-icon>
                    Refund Amount: ₹{{ order.amount.toLocaleString('en-IN') }}
                  </div>
                </v-alert>
              </div>

              <v-divider></v-divider>

              <!-- Action Buttons -->
              <div class="actions-section pa-6">
                <v-btn
                  color="primary"
                  block
                  large
                  elevation="0"
                  class="mb-3 text-capitalize font-weight-medium"
                  @click="reorder"
                >
                  <v-icon left>mdi-refresh</v-icon>
                  Reorder Items
                </v-btn>

                <v-btn
                  v-if="canCancelOrder"
                  color="error"
                  block
                  large
                  outlined
                  class="text-capitalize font-weight-medium"
                  @click="confirmCancelDialog = true"
                >
                  <v-icon left>mdi-close-circle-outline</v-icon>
                  Cancel Order
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Cancel Confirmation Dialog -->
    <v-dialog v-model="confirmCancelDialog" max-width="480">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold pa-6 pb-4">
          Cancel Order?
        </v-card-title>
        <v-card-text class="px-6 pb-2">
          <p class="text-body-1 mb-0">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-4">
          <v-spacer></v-spacer>
          <v-btn
            text
            large
            class="text-capitalize"
            @click="confirmCancelDialog = false"
          >
            Keep Order
          </v-btn>
          <v-btn
            color="error"
            large
            elevation="0"
            class="text-capitalize px-6"
            @click="cancelOrder"
            :loading="cancelLoading"
          >
            Yes, Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="4000"
      bottom
      elevation="6"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbarColor === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
        <span>{{ snackbarText }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios"
import api from "@/adminfolder/axios"

export default {
  data() {
    return {
      order: {
        orderId: null,
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        items: [],
        orderStatus: "",
        paymentMethod: "",
        razorpayOrderId: null,
        amount: 0
      },
      confirmCancelDialog: false,
      cancelLoading: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
      token: localStorage.getItem("token") || null
    }
  },

  computed: {
    canCancelOrder() {
      const orderStatus = this.order.orderStatus
      
      // Cannot cancel if:
      // 1. Already cancelled or failed
      // 2. Already delivered
      // 3. Already packed and shipped
      // 4. Refund is completed
      return orderStatus !== "FAILED" && 
             orderStatus !== "CANCELLED" && 
             orderStatus !== "DELIVERED" &&
             orderStatus !== "PACKED_AND_SHIPPED" &&
             orderStatus !== "REFUND COMPLETED"
    },

    showRefundNotice() {
      const isCancelled = this.order.orderStatus === "CANCELLED" || 
                         this.order.orderStatus === "FAILED" ||
                         this.order.orderStatus === "REFUND COMPLETED"
      const isOnlinePayment = this.order.paymentMethod !== "COD"
      return isCancelled && isOnlinePayment
    }
  },

  mounted() {
    const orderId = this.$route.params.id
    this.fetchOrderDetails(orderId)
  },

  methods: {
    fetchOrderDetails(orderId) {
      const customerId = localStorage.getItem("customerId")
      
      axios
        .get(`https://srishakram-backend-v2.onrender.com/orders/customer/${customerId}`)
        .then(res => {
          const foundOrder = res.data.find(o => o.orderId == orderId)
          if (foundOrder) {
            this.order = foundOrder
          } else {
            this.showSnackbar("Order not found", "error")
            this.$router.push("/orderStatus")
          }
        })
        .catch(err => {
          console.error(err)
          this.showSnackbar("Failed to load order details", "error")
        })
    },

    // New methods for different refund content
    getRefundAlertColor() {
      return this.order.orderStatus === "REFUND COMPLETED" ? "success" : "info"
    },

    getRefundAlertIcon() {
      return this.order.orderStatus === "REFUND COMPLETED" ? "mdi-check-circle" : "mdi-information"
    },

    getRefundTitle() {
      return this.order.orderStatus === "REFUND COMPLETED" ? "Refund Successfully Completed" : "Refund In Progress"
    },

    getRefundMessage() {
      if (this.order.orderStatus === "REFUND COMPLETED") {
        return "Your refund has been successfully processed and credited to your original payment method. Amount will be credited to your bank account within 5-7 working days after the refund has processed"
      }
      return "Your refund request is being processed. The refund amount will be credited to your original payment method within 5-7 business days after the refund is processed. We appreciate your patience."
    },

    // Calculate the actual item price after discount
    getItemPrice(item) {
      return item.price - (item.offer_price || 0)
    },

    getTotalItems() {
      return this.order.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    // Subtotal = Sum of (price - offer_price) * quantity for all items
    getSubtotal() {
      return this.order.items.reduce((sum, item) => {
        const discountedPrice = item.price - (item.offer_price || 0)
        return sum + (discountedPrice * item.quantity)
      }, 0)
    },

    getShipping() {
      const subtotal = this.getSubtotal()
      return subtotal > 50000 ? 0 : 350
    },

    // Tax = 5% of subtotal
    // Total = Subtotal + Shipping + Tax
    getTax() {
      const subtotal = this.getSubtotal()
      const tax = Math.round(subtotal * 0.05)
      return tax
    },

    reorder() {
      this.order.items.forEach(item => {
        const cartItem = {
          productId: item.productId,
          quantity: item.quantity,
        }
        
        api.post("/cart", cartItem, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(() => {
          this.showSnackbar("Item added to cart", "success")
        })
        .catch(err => {
          console.error("Cart save failed", err)
          this.showSnackbar("Failed to add item to cart", "error")
        })
      })
    },
      
    cancelOrder() {
      this.cancelLoading = true
      
      api.put(`/orders/${this.order.orderId}/status`, {
        status: "CANCELLED"
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(res => {
          this.order.orderStatus = "CANCELLED"
          this.confirmCancelDialog = false
          this.showSnackbar("Order cancelled successfully", "success")
          this.fetchOrderDetails(this.order.orderId)
        })
        .catch(err => {
          console.error(err)
          if (err.response) {
            if (err.response.status === 401 || err.response.status === 403) {
              this.showSnackbar("Unauthorized: Please login again", "error")
            } else if (err.response.status === 400) {
              this.showSnackbar(err.response.data.message || "Cannot cancel this order", "error")
            } else {
              this.showSnackbar("Failed to cancel order. Please try again.", "error")
            }
          } else {
            this.showSnackbar("Failed to cancel order. Please try again.", "error")
          }
        })
        .finally(() => {
          this.cancelLoading = false
        })
    },

    getDisplayStatus(status) {
      const statusMap = {
        "FAILED": "Cancelled",
        "CANCELLED": "Cancelled",
        "REFUND COMPLETED": "Cancelled",  // Treat REFUND COMPLETED as Cancelled
        "PAID": "Confirmed",
        "COD": "Confirmed",
        "RECEIVED_AND_PROCEEDED": "Processing",
        "PACKED": "Packed",
        "PACKED_AND_SHIPPED": "Shipped",
        "DELIVERED": "Delivered"
      }
      return statusMap[status] || status
    },

    getStatusColor(status) {
      const statusMap = {
        "FAILED": "#F44336",
        "CANCELLED": "#F44336",
        "REFUND COMPLETED": "#F44336",  // Red for cancelled orders
        "PAID": "#4CAF50",
        "COD": "#FF9800",
        "RECEIVED_AND_PROCEEDED": "#2196F3",
        "PACKED": "#9C27B0",
        "PACKED_AND_SHIPPED": "#673AB7",
        "DELIVERED": "#4CAF50"
      }
      return statusMap[status] || "#757575"
    },

    getStatusIcon(status) {
      const iconMap = {
        "FAILED": "mdi-close-circle",
        "CANCELLED": "mdi-close-circle",
        "REFUND COMPLETED": "mdi-close-circle",  // Cancel icon for refunded orders
        "PAID": "mdi-check-circle",
        "COD": "mdi-cash",
        "RECEIVED_AND_PROCEEDED": "mdi-package-variant",
        "PACKED": "mdi-package-variant-closed",
        "PACKED_AND_SHIPPED": "mdi-truck-delivery",
        "DELIVERED": "mdi-check-circle"
      }
      return iconMap[status] || "mdi-information"
    },

    formatDate(date) {
      return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    },

    showSnackbar(text, color = "success") {
      this.snackbarText = text
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.order-details-container {
  background: #fafafa;
  min-height: 100vh;
}

.order-header {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.products-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.product-image-wrapper {
  width: 120px;
  height: 120px;
  min-width: 120px;
  margin-right: 20px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  color: #212121;
  line-height: 1.5;
}

.product-meta {
  color: #757575;
}

.product-price {
  color: #212121;
}

.summary-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  background: white;
}

.sticky-summary {
  position: sticky;
  top: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-row {
  padding-top: 8px;
}

.payment-method {
  border-left: 3px solid #2196F3;
}

.actions-section {
  background: #fafafa;
}

/* Responsive */
@media (max-width: 960px) {
  .sticky-summary {
    position: static;
    margin-top: 24px;
  }
  
  .product-image-wrapper {
    width: 100px;
    height: 100px;
    min-width: 100px;
    margin-right: 16px;
  }
}
</style>
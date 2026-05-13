<template>
  <v-container fluid class="orders-container py-8">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <!-- Page Header -->
        <div class="page-header mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">My Orders</h1>
          <p class="text-body-2 grey--text">View and manage your orders</p>
        </div>

        <!-- Orders List -->
        <div v-if="orders.length === 0" class="empty-state">
          <v-card flat class="text-center pa-12">
            <v-icon size="80" color="grey lighten-1">mdi-package-variant</v-icon>
            <h2 class="text-h6 font-weight-medium mt-4 mb-2">No orders yet</h2>
            <p class="text-body-2 grey--text mb-6">Start shopping to see your orders here</p>
            <v-btn color="primary" large elevation="0" @click="$router.push('/')">
              Start Shopping
            </v-btn>
          </v-card>
        </div>

        <div v-else class="orders-list">
          <v-card
            v-for="order in orders"
            :key="order.orderId"
            flat
            class="order-card mb-4"
            :class="{ 'cancelled-order': isCancelled(order.orderStatus) }"
          >
            <!-- Order Header -->
            <div class="order-card-header pa-4">
              <v-row align="center">
                <v-col cols="12" sm="6" :md="showRefundStatus(order) ? 2 : 3">
                  <div class="text-caption grey--text mb-1">Order Number</div>
                  <div class="text-body-1 font-weight-bold">#{{ order.orderId }}</div>
                </v-col>
                
                <v-col cols="12" sm="6" :md="showRefundStatus(order) ? 2 : 3">
                  <div class="text-caption grey--text mb-1">Total</div>
                  <div class="text-body-1 font-weight-bold">₹{{ order.amount.toLocaleString('en-IN') }}</div>
                </v-col>

                <v-col cols="12" sm="6" :md="showRefundStatus(order) ? 2 : 3">
                  <div class="text-caption grey--text mb-1">Payment</div>
                  <div class="text-body-2">
                    <v-icon small class="mr-1">{{ order.paymentMethod === 'COD' ? 'mdi-cash' : 'mdi-credit-card' }}</v-icon>
                    {{ order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online' }}
                  </div>
                </v-col>

                <!-- Refund Status Column (only for cancelled online payments) -->
                <v-col v-if="showRefundStatus(order)" cols="12" sm="6" md="3">
                  <div class="text-caption grey--text mb-1">Refund Status</div>
                  <div class="text-body-2">
                    <v-chip
                      :color="getRefundStatusColor(order.orderStatus)"
                      text-color="white"
                      x-small
                      label
                    >
                      <v-icon x-small left>{{ getRefundStatusIcon(order.orderStatus) }}</v-icon>
                      {{ getRefundStatusText(order.orderStatus) }}
                    </v-chip>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" :md="showRefundStatus(order) ? 3 : 3" class="text-right">
                  <v-chip
                    :color="getStatusColor(order.orderStatus)"
                    text-color="white"
                    small
                    label
                  >
                    {{ getDisplayStatus(order.orderStatus) }}
                  </v-chip>
                </v-col>
              </v-row>

              <!-- Refund Notice - Different content based on refund status -->
              <v-alert
                v-if="showRefundStatus(order)"
                dense
                text
                :color="getRefundAlertColor(order.orderStatus)"
                class="mt-3 mb-0"
                :icon="getRefundAlertIcon(order.orderStatus)"
              >
                <div class="text-caption font-weight-medium">
                  {{ getRefundAlertTitle(order.orderStatus) }}
                </div>
                <div class="text-caption mt-1">
                  {{ getRefundMessage(order.orderStatus) }}
                </div>
              </v-alert>
            </div>

            <v-divider></v-divider>

            <!-- Order Items -->
            <div class="order-items pa-4">
              <div
                v-for="(item, index) in order.items"
                :key="item.productId"
                class="order-item"
                :class="{ 'mb-3': index < order.items.length - 1 }"
              >
                <div class="d-flex align-center">
                  <div class="item-image-wrapper mr-3">
                    <v-img
                      :src="item.image"
                      :alt="item.productName"
                      class="item-image"
                      cover
                    ></v-img>
                  </div>

                  <div class="item-info flex-grow-1">
                    <div class="item-name text-body-2 font-weight-medium mb-1">
                      {{ item.productName }}
                    </div>
                    <div class="item-meta text-caption grey--text">
                      Qty: {{ item.quantity }} × ₹{{ item.price.toLocaleString('en-IN') }}
                    </div>
                  </div>

                  <div class="item-price text-body-1 font-weight-bold">
                    ₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}
                  </div>
                </div>
              </div>
            </div>

            <v-divider></v-divider>

            <!-- Order Actions -->
            <div class="order-actions pa-4">
              <div class="d-flex justify-end flex-wrap">
                <v-btn
                  text
                  color="primary"
                  class="mr-2 text-capitalize"
                  @click="viewDetails(order.orderId)"
                >
                  <v-icon small left>mdi-file-document-outline</v-icon>
                  View Details
                </v-btn>

                <v-btn
                  v-if="!isCancelled(order.orderStatus)"
                  color="primary"
                  elevation="0"
                  class="text-capitalize"
                  @click="trackOrder(order.orderId)"
                >
                  <v-icon small left>mdi-map-marker-path</v-icon>
                  Track Order
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      orders: [],
      customerId: localStorage.getItem("customerId") || null,
      loading: true
    }
  },

  mounted() {
    this.fetchOrders()
  },

  methods: {
    fetchOrders() {
      this.loading = true
      
      axios
        .get(`https://srishakram-backend-v2.onrender.com/orders/customer/${this.customerId}`)
        .then(res => {
          this.orders = res.data.sort((a, b) => b.orderId - a.orderId) // Sort by newest first
        })
        .catch(err => {
          console.error("Failed to fetch orders:", err)
        })
        .finally(() => {
          this.loading = false
        })
    },

    trackOrder(orderId) {
      this.$router.push(`/tracking/${orderId}`)
    },

    viewDetails(orderId) {
      this.$router.push(`/order-details/${orderId}`)
    },

    // Check if refund status should be shown
    showRefundStatus(order) {
      const isCancelled = this.isCancelled(order.orderStatus)
      const isOnlinePayment = order.paymentMethod !== "COD"
      return isCancelled && isOnlinePayment
    },

    // Get refund status text
    getRefundStatusText(orderStatus) {
      return orderStatus === "Refund Completed" ? "Refunded" : "Pending"
    },

    // Get refund status color
    getRefundStatusColor(orderStatus) {
      return orderStatus === "Refund Completed" ? "#4CAF50" : "#FF9800"
    },

    // Get refund status icon
    getRefundStatusIcon(orderStatus) {
      return orderStatus === "Refund Completed" ? "mdi-check-circle" : "mdi-clock-outline"
    },

    // Get refund alert color based on status
    getRefundAlertColor(orderStatus) {
      return orderStatus === "Refund Completed" ? "success" : "info"
    },

    // Get refund alert icon based on status
    getRefundAlertIcon(orderStatus) {
      return orderStatus === "Refund Completed" ? "mdi-check-circle" : "mdi-information"
    },

    // Get refund alert title based on status
    getRefundAlertTitle(orderStatus) {
      return orderStatus === "Refund Completed" ? "Refund Successfully Completed" : "Refund In Progress"
    },

    // Get refund message - Different content for completed vs pending
    getRefundMessage(orderStatus) {
      if (orderStatus === "Refund Completed") {
        return "Your refund has been successfully processed and credited to your original payment method. Please allow 2-3 business days for the amount to reflect in your account."
      }
      return "Your refund request is being processed. The refund amount will be credited to your original payment method within 5-7 business days."
    },

    getDisplayStatus(status) {
      const statusMap = {
        "FAILED": "Cancelled",
        "CANCELLED": "Cancelled",
        "Refund Completed": "Cancelled",  // Treat Refund Completed as Cancelled
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
        "Refund Completed": "#F44336",  // Red for cancelled orders
        "PAID": "#4CAF50",
        "COD": "#FF9800",
        "RECEIVED_AND_PROCEEDED": "#2196F3",
        "PACKED": "#9C27B0",
        "PACKED_AND_SHIPPED": "#673AB7",
        "DELIVERED": "#4CAF50"
      }
      return statusMap[status] || "#757575"
    },

    isCancelled(orderStatus) {
      // Order is cancelled if orderStatus is FAILED/CANCELLED OR "Refund Completed"
      return orderStatus === "FAILED" || 
             orderStatus === "CANCELLED" || 
             orderStatus === "Refund Completed"
    }
  }
}
</script>

<style scoped>
.orders-container {
  background: #fafafa;
  min-height: 60vh;
  margin-top: 35px;
  margin-bottom: 35px;
  width: 90%;
}

.page-header {
  padding: 0 4px;
}

.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease;
  width: 100%;
}

.order-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.cancelled-order {
  opacity: 0.7;
  background: #fafafa;
}

.order-card-header {
  background: #f9f9f9;
}

.order-items {
  background: white;
}

.order-item {
  padding: 8px 0;
}

.item-image-wrapper {
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.item-image {
  width: 100%;
  height: 100%;
}

.item-name {
  color: #212121;
  line-height: 1.4;
}

.item-meta {
  color: #757575;
}

.item-price {
  color: #212121;
  min-width: 100px;
  text-align: right;
}

.order-actions {
  background: #fafafa;
}

.empty-state {
  margin-top: 60px;
}

/* Responsive */
@media (max-width: 600px) {
  .item-image-wrapper {
    width: 50px;
    height: 50px;
    min-width: 50px;
  }

  .item-price {
    min-width: auto;
    margin-top: 8px;
    width: 100%;
    text-align: left;
  }

  .order-item .d-flex {
    flex-wrap: wrap;
  }

  .order-actions .d-flex {
    flex-direction: column;
  }

  .order-actions .v-btn {
    width: 100%;
    margin-bottom: 8px;
  }

  .order-actions .v-btn:last-child {
    margin-bottom: 0;
  }
}
</style>
<template>
  <v-app>
    <v-container>
      <v-card class="pa-6" elevation="3">

        <v-card-title class="text-h5">
          Update Order Status
        </v-card-title>

        <v-divider class="my-3"></v-divider>

        <v-card-text>
          <div class="mb-4">
            <strong>Order ID:</strong> {{ id }}
          </div>

          <div class="mb-4">
            <strong>Current Status:</strong>
            <v-chip
              :color="getColor(currentStatus)"
              dark
            >
              {{ currentStatus || 'Not Updated Yet' }}
            </v-chip>
          </div>

          <!-- Show refund status if applicable -->
          <div v-if="showRefundStatus" class="mb-4">
            <strong>Refund Status:</strong>
            <v-chip
              :color="isRefundCompleted ? '#4CAF50' : '#FF9800'"
              dark
              small
            >
              <v-icon x-small left>{{ isRefundCompleted ? 'mdi-check-circle' : 'mdi-clock-outline' }}</v-icon>
              {{ isRefundCompleted ? 'Refunded' : 'Pending' }}
            </v-chip>
          </div>

          <!-- Warning if trying to update cancelled/failed order -->
          <v-alert
            v-if="isOrderCancelled"
            dense
            type="error"
            text
            class="mb-4"
          >
            <div class="text-body-2">
              <v-icon small left>mdi-lock</v-icon>
              <strong>Status Update Disabled:</strong> This order has been {{ currentStatus?.toLowerCase() || 'cancelled' }}. Status updates are not allowed for cancelled or refunded orders.
            </div>
          </v-alert>

          <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            label="Select New Status"
            variant="outlined"
            :disabled="isOrderCancelled"
          ></v-select>

          <v-btn
            color="primary"
            class="mt-4"
            @click="updateStatus"
            :disabled="isOrderCancelled"
          >
            Save Status
          </v-btn>

          <v-btn
            variant="text"
            class="mt-4 ml-3"
            @click="goBack"
          >
            Back
          </v-btn>
        </v-card-text>

        <!-- Status History -->
        <v-divider class="my-4"></v-divider>

        <v-card-title>Status History</v-card-title>

        <v-timeline align="start">
          <v-timeline-item
            v-for="(item, index) in history"
            :key="index"
            :dot-color="getColor(item.status)"
            fill-dot
          >
            <v-card class="pa-3">
              <strong>{{ formatStatus(item.status) }}</strong>
              <br />
              <small>{{ formatDate(item.updatedAt) }}</small>
            </v-card>
          </v-timeline-item>
        </v-timeline>

      </v-card>

      <!-- Success Snackbar -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
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
  </v-app>
</template>

<script>
import api from '@/adminfolder/axios.js'
import axios from 'axios'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    }
  },

  data() {
    return {
      selectedStatus: null,
      currentStatus: null,
      orderRefundStatus: null,
      paymentMethod: null,
      history: [],
      snackbar: false,
      snackbarText: "",
      snackbarColor: "green",

      statusOptions: [
        "RECEIVED_AND_PROCEEDED",
        "PACKED",
        "PACKED_AND_SHIPPED",
        "DELIVERED"
      ]
    }
  },

  computed: {
    // Check if order is cancelled or failed
    isOrderCancelled() {
      const normalizedStatus = this.currentStatus?.toUpperCase() || "";
      return normalizedStatus === "CANCELLED" || 
             normalizedStatus === "FAILED" ||
             normalizedStatus === "REFUND COMPLETED";
    },

    // Check if refund is completed
    isRefundCompleted() {
      const normalizedStatus = this.orderRefundStatus?.toUpperCase() || "";
      return normalizedStatus === "REFUND COMPLETED";
    },

    // Show refund status if order is cancelled and payment was online
    showRefundStatus() {
      const normalizedStatus = this.currentStatus?.toUpperCase() || "";
      const isCancelled = normalizedStatus === "CANCELLED" || 
                         normalizedStatus === "FAILED" ||
                         normalizedStatus === "REFUND COMPLETED";
      const isOnlinePayment = this.paymentMethod !== "COD";
      return isCancelled && isOnlinePayment;
    }
  },

  mounted() {
    this.loadOrderDetails()
    this.loadTracking()
  },

  methods: {
    // Load order details to get refund status and payment method
    loadOrderDetails() {
      axios.get(`https://srishakram-backend-v2.onrender.com/orders/${this.id}`)
        .then(res => {
          const normalizedStatus = res.data.orderStatus?.toUpperCase() || "";
          this.orderRefundStatus = normalizedStatus === "REFUND COMPLETED" 
            ? "REFUND COMPLETED" 
            : (res.data.refundStatus || "Pending");
          this.paymentMethod = res.data.paymentMethod;
          
          // Update current status if it's a refund completed order
          if (normalizedStatus === "REFUND COMPLETED") {
            this.currentStatus = res.data.orderStatus;
          }
        })
        .catch(err => {
          console.error("Failed to load order details:", err);
        });
    },

    loadTracking() {
      api.get(`/orders/${this.id}/tracking`)
        .then(res => {
          this.history = res.data

          if (this.history.length > 0) {
            this.currentStatus = this.history[this.history.length - 1].status
          }
        })
        .catch(err => {
          console.error("Failed to load tracking:", err)
        })
    },

    updateStatus() {
      if (!this.selectedStatus) {
        this.showSnackbar("Please select a status", "error")
        return
      }

      // Double check if order is cancelled before allowing update
      if (this.isOrderCancelled) {
        this.showSnackbar("Cannot update status for cancelled or refunded orders", "error")
        return
      }

      api.put(`/orders/${this.id}/status`, {
        status: this.selectedStatus
      })
      .then(() => {
        this.showSnackbar("Status updated successfully", "green")
        this.selectedStatus = null
        this.loadTracking() // reload timeline
        this.loadOrderDetails() // reload order details
      })
      .catch(err => {
        console.error(err)
        this.showSnackbar("Failed to update status", "error")
      })
    },

    getColor(status) {
      const normalizedStatus = status?.toUpperCase() || "";
      if (normalizedStatus === "RECEIVED_AND_PROCEEDED") return "blue"
      if (normalizedStatus === "PACKED") return "orange"
      if (normalizedStatus === "PACKED_AND_SHIPPED") return "green"
      if (normalizedStatus === "DELIVERED") return "purple"
      if (normalizedStatus === "CANCELLED") return "red"
      if (normalizedStatus === "FAILED") return "red"
      if (normalizedStatus === "REFUND COMPLETED") return "red"
      if (normalizedStatus === "PAID") return "green"
      if (normalizedStatus === "COD") return "purple"
      return "grey"
    },

    formatDate(date) {
      return new Date(date).toLocaleString()
    },

    formatStatus(status) {
      return status.replaceAll("_", " ")
    },

    goBack() {
      this.$router.back()
    },

    showSnackbar(text, color = "green") {
      this.snackbarText = text
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.v-timeline {
  padding-top: 0;
}
</style>
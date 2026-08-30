<template>
  <v-container fluid class="tracking-container py-8">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <!-- Back Button -->
        <v-btn
          text
          class="tracking-back-button mb-4"
          @click="$router.push('/orderStatus')"
        >
          <v-icon small left>mdi-arrow-left</v-icon>
          Back to Orders
        </v-btn>

        <!-- Main Tracking Card -->
        <v-card flat class="tracking-card">
          <!-- Header -->
          <div class="tracking-header pa-6">
            <div class="d-flex justify-space-between align-center flex-wrap">
              <div>
                <h1 class="text-h4 font-weight-bold mb-2">Order Tracking</h1>
                <p class="text-body-1 grey--text text--darken-1">Order #{{ orderId }}</p>
              </div>
              <v-chip
                v-if="currentStatus"
                :color="getStatusColor(currentStatus)"
                text-color="white"
                large
                label
                class="px-4"
              >
                <v-icon small left>{{ getStatusIcon(currentStatus) }}</v-icon>
                {{ formatLabel(currentStatus) }}
              </v-chip>
            </div>
          </div>

          <v-divider></v-divider>

          <!-- No Tracking Data State -->
          <div v-if="trackingData.length === 0" class="empty-tracking pa-12 text-center">
            <div class="empty-icon-wrapper mb-4">
              <v-icon size="80" color="grey lighten-1">mdi-package-variant</v-icon>
            </div>
            <h2 class="text-h6 font-weight-medium mb-2">Order Received</h2>
            <p class="text-body-2 grey--text mb-0">
              Your order is being processed. Tracking information will be available soon.
            </p>
          </div>

          <!-- Timeline Section -->
          <div v-else class="timeline-section pa-15 pa-md-8">
            <!-- Progress Indicator -->
            <div class="progress-indicator mb-8">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-caption font-weight-medium grey--text text--darken-1">
                  Order Progress
                </span>
                <span class="text-caption font-weight-bold primary--text">
                  {{ Math.round((currentStep / steps.length) * 100) }}% Complete
                </span>
              </div>
              <v-progress-linear
                :value="(currentStep / steps.length) * 100"
                height="8"
                rounded
                color="primary"
                background-color="grey lighten-3"
              ></v-progress-linear>
            </div>

            <!-- Desktop Timeline -->
            <div class="desktop-timeline d-none d-md-block">
              <div class="timeline-track">
                <div class="timeline-line">
                  <div 
                    class="timeline-progress"
                    :style="{ width: getProgressWidth() }"
                  ></div>
                </div>

                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="timeline-node"
                  :style="{ left: (index / (steps.length - 1)) * 100 + '%' }"
                  :class="{ 
                    'active': index < currentStep,
                    'current': index === currentStep - 1,
                    'pending': index >= currentStep
                  }"
                >
                  <div class="node-circle">
                    <v-icon v-if="index < currentStep" color="white" size="18">
                      mdi-check
                    </v-icon>
                    <span v-else class="node-number">{{ index + 1 }}</span>
                  </div>
                  
                  <div class="node-content">
                    <div class="node-label">{{ formatLabel(step.status) }}</div>
                    <div class="node-time">{{ formatDate(step.updatedAt) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Timeline -->
            <div class="mobile-timeline d-md-none">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="mobile-step"
                :class="{ 
                  'active': index < currentStep,
                  'current': index === currentStep - 1,
                  'pending': index >= currentStep
                }"
              >
                <div class="mobile-step-line">
                  <div class="mobile-step-circle">
                    <v-icon v-if="index < currentStep" color="white" size="16">
                      mdi-check
                    </v-icon>
                    <span v-else class="mobile-step-number">{{ index + 1 }}</span>
                  </div>
                  <div v-if="index < steps.length - 1" class="mobile-connector"></div>
                </div>

                <div class="mobile-step-content">
                  <div class="mobile-step-label">{{ formatLabel(step.status) }}</div>
                  <div class="mobile-step-time">{{ formatDate(step.updatedAt) }}</div>
                </div>
              </div>
            </div>

            <!-- Estimated Delivery -->
            <div v-if="currentStep < steps.length" class="estimated-delivery mt-8 pa-4">
              <div class="d-flex align-center">
                <v-icon color="primary" class="mr-3">mdi-truck-fast</v-icon>
                <div>
                  <div class="text-body-2 font-weight-medium mb-1">Estimated Delivery</div>
                  <div class="text-caption grey--text">
                    {{ getEstimatedDelivery() }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Complete Message -->
            <div v-else class="delivery-complete mt-8 pa-4">
              <div class="d-flex align-center">
                <v-icon color="success" size="32" class="mr-3">mdi-check-circle</v-icon>
                <div>
                  <div class="text-h6 font-weight-bold success--text mb-1">Delivered!</div>
                  <div class="text-body-2 grey--text">
                    Your order has been successfully delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>

        <!-- Additional Info Cards -->
        <v-row class="mt-6" v-if="trackingData.length > 0">
          <v-col cols="12" md="6">
            <v-card flat class="info-card pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon color="primary" class="mr-3">mdi-map-marker</v-icon>
                <h3 class="text-h6 font-weight-medium">Tracking Information</h3>
              </div>
              <div class="text-body-2 grey--text">
                <p class="mb-2">Track your order in real-time as it moves through our fulfillment process.</p>
                <p class="mb-0">You'll receive notifications at each major milestone.</p>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card flat class="info-card pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon color="primary" class="mr-3">mdi-help-circle</v-icon>
                <h3 class="text-h6 font-weight-medium">Need Help?</h3>
              </div>
              <div class="text-body-2 grey--text">
                <p class="mb-3">Questions about your order?</p>
                <v-btn color="primary" small outlined>Contact Support</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped src="@/components/stylesheets/track_status.css"></style>
<script>
import axios from "axios"


export default {
  data() {
    return {
      trackingData: [],
      orderId: this.$route.params.id,
      currentStep: 0,
      steps: [],
      currentStatus: null
    }
  },

  mounted() {
    this.fetchTrackingData()
  },

  methods: {
    fetchTrackingData() {
      axios
        .get(`http://localhost:8080/orders/${this.orderId}/tracking`)
        .then(res => {
          this.trackingData = res.data
          
          const allSteps = [
            "RECEIVED_AND_PROCEEDED",
            "PACKED",
            "PACKED_AND_SHIPPED",
            "DELIVERED"
          ]
          
          this.steps = allSteps.map(status => {
            const found = res.data.find(s => s.status === status)
            return {
              status,
              updatedAt: found ? found.updatedAt : null
            }
          })
          
          if (res.data.length > 0) {
            this.currentStatus = res.data[res.data.length - 1].status
            this.currentStep = allSteps.indexOf(this.currentStatus) + 1
          }
        })
        .catch(err => {
          console.error("Failed to fetch tracking data:", err)
        })
    },

    formatLabel(text) {
      const labels = {
        "RECEIVED_AND_PROCEEDED": "Order Received",
        "PACKED": "Order Packed",
        "PACKED_AND_SHIPPED": "Shipped",
        "DELIVERED": "Delivered"
      }
      return labels[text] || text.replace(/_/g, " ")
    },

    formatDate(date) {
      if (!date) return "Pending"
      
      const d = new Date(date)
      return new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d)
    },

    getProgressWidth() {
      if (this.currentStep === 0) return '0%'
      return ((this.currentStep - 1) / (this.steps.length - 1)) * 100 + '%'
    },

    getEstimatedDelivery() {
      const today = new Date()
      const deliveryDate = new Date(today)
      deliveryDate.setDate(today.getDate() + (4 - this.currentStep))
      
      return new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }).format(deliveryDate)
    },

    getStatusColor(status) {
      const colors = {
        "RECEIVED_AND_PROCEEDED": "#2196F3",
        "PACKED": "#9C27B0",
        "PACKED_AND_SHIPPED": "#FF9800",
        "DELIVERED": "#4CAF50"
      }
      return colors[status] || "#757575"
    },

    getStatusIcon(status) {
      const icons = {
        "RECEIVED_AND_PROCEEDED": "mdi-package-variant",
        "PACKED": "mdi-package-variant-closed",
        "PACKED_AND_SHIPPED": "mdi-truck-delivery",
        "DELIVERED": "mdi-check-circle"
      }
      return icons[status] || "mdi-information"
    }
  }
}
</script>



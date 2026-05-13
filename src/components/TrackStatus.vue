<template>
  <v-container fluid class="tracking-container py-8">
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
        .get(`https://srishakram-backend-v2.onrender.com/orders/${this.orderId}/tracking`)
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

<style scoped>
.tracking-container {
  background: #fafafa;
  min-height: 100vh;
  width: 100%;
}

.tracking-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  overflow: hidden;
}

.tracking-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
}

.empty-tracking {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-section {
  background: white;
}

/* Desktop Timeline */
.desktop-timeline {
  position: relative;
  padding: 60px 0 80px;
}

.timeline-track {
  position: relative;
  width: 80%;
  margin-left: 100px;
}

.timeline-line {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
}

.timeline-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #2196F3 0%, #4CAF50 100%);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.timeline-node {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
}

.node-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.timeline-node.pending .node-circle {
  background: white;
  border: 3px solid #e0e0e0;
}

.timeline-node.pending .node-number {
  color: #9e9e9e;
  font-weight: 600;
  font-size: 14px;
}

.timeline-node.current .node-circle {
  background: #2196F3;
  border: 3px solid #2196F3;
  animation: pulse 2s infinite;
}

.timeline-node.current .node-number {
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.timeline-node.active .node-circle {
  background: #4CAF50;
  border: 3px solid #4CAF50;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
  }
}

.node-content {
  min-width: 120px;
}

.node-label {
  font-size: 13px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 4px;
  line-height: 1.3;
}

.node-time {
  font-size: 11px;
  color: #757575;
}

.timeline-node.pending .node-label,
.timeline-node.pending .node-time {
  color: #9e9e9e;
}

.timeline-node.current .node-label {
  color: #2196F3;
}

/* Mobile Timeline */
.mobile-timeline {
  padding: 20px 0;
}

.mobile-step {
  display: flex;
  padding: 12px 0;
}

.mobile-step-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
}

.mobile-step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.mobile-step.pending .mobile-step-circle {
  background: white;
  border: 3px solid #e0e0e0;
}

.mobile-step.pending .mobile-step-number {
  color: #9e9e9e;
  font-weight: 600;
  font-size: 13px;
}

.mobile-step.current .mobile-step-circle {
  background: #2196F3;
  border: 3px solid #2196F3;
}

.mobile-step.current .mobile-step-number {
  color: white;
  font-weight: 600;
  font-size: 13px;
}

.mobile-step.active .mobile-step-circle {
  background: #4CAF50;
  border: 3px solid #4CAF50;
}

.mobile-connector {
  width: 3px;
  flex: 1;
  min-height: 40px;
  margin: 4px 0;
}

.mobile-step.pending .mobile-connector {
  background: #e0e0e0;
}

.mobile-step.active .mobile-connector,
.mobile-step.current .mobile-connector {
  background: #4CAF50;
}

.mobile-step-content {
  flex: 1;
  padding-top: 6px;
}

.mobile-step-label {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 4px;
}

.mobile-step-time {
  font-size: 12px;
  color: #757575;
}

.mobile-step.pending .mobile-step-label,
.mobile-step.pending .mobile-step-time {
  color: #9e9e9e;
}

.mobile-step.current .mobile-step-label {
  color: #2196F3;
}

/* Info Cards */
.estimated-delivery {
  background: linear-gradient(135deg, #E3F2FD 0%, #F5F5F5 100%);
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.delivery-complete {
  background: linear-gradient(135deg, #E8F5E9 0%, #F5F5F5 100%);
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
}

.info-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  height: 100%;
}

/* Responsive */
@media (max-width: 960px) {
  .tracking-header {
    padding: 20px !important;
  }

  .timeline-section {
    padding: 24px 20px !important;
  }
}
</style>
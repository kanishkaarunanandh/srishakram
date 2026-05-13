<template>
  <v-container fluid class="pa-6">

    <v-card elevation="4">
      <v-card-title>
        <v-row align="center" justify="space-between" class="w-100 pa-5">
          <h2>All Customer Orders</h2>
        </v-row>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="orders"
        :loading="loading"
        class="elevation-1 pa-5"
      >

        <!-- S.NO COLUMN -->
        <template v-slot:item.sno="{ index }">
          {{ index + 1 }}
        </template>

        <!-- STATUS CHIP -->
        <template v-slot:item.orderStatus="{ item }">
          <v-chip
            :color="getStatusColor(item.orderStatus)"
            small
            dark
          >
            {{ item.orderStatus }}
          </v-chip>
        </template>

        <!-- REFUND STATUS CHIP -->
        <template v-slot:item.refundStatus="{ item }">
          <div v-if="needsRefund(item)">
            <v-chip
              :color="getRefundStatusColor(item)"
              small
              dark
            >
              <v-icon x-small left>{{ getRefundStatusIcon(item) }}</v-icon>
              {{ getRefundStatusText(item) }}
            </v-chip>
          </div>
          <div v-else class="grey--text text-caption">
            N/A
          </div>
        </template>

        <!-- ACTIONS COLUMN -->
        <template v-slot:item.actions="{ item }">
          <!-- View Order -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                @click="viewOrder(item.orderId)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-eye
              </v-icon>
            </template>
            <span>View Details</span>
          </v-tooltip>

          <!-- Accept Cancellation Request (only if flag is true) -->
          <v-tooltip top v-if="item.cancellationRequested">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="openCancellationDialog(item)"
                color="orange"
                style="margin-left: 10px;"
                v-bind="attrs"
                v-on="on"
              >
                mdi-hand-okay
              </v-icon>
            </template>
            <span>Review Cancellation</span>
          </v-tooltip>

          <!-- Update Order Status (only for active orders without cancellation request) -->
          <v-tooltip top v-if="!isOrderCancelledOrFailed(item) && !item.cancellationRequested">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="updateStatus(item.orderId)"
                color="success"
                style="margin-left: 10px;"
                v-bind="attrs"
                v-on="on"
              >
                mdi-check
              </v-icon>
            </template>
            <span>Update Status</span>
          </v-tooltip>

          <!-- Update Refund Status (only for cancelled/failed with pending refund) -->
          <v-tooltip top v-if="needsRefund(item) && !isRefundCompleted(item)">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="openRefundDialog(item)"
                color="primary"
                style="margin-left: 10px;"
                v-bind="attrs"
                v-on="on"
              >
                mdi-cash-refund
              </v-icon>
            </template>
            <span>Mark as Refunded</span>
          </v-tooltip>

          <!-- Delete Cancelled/Failed/Refunded/Delivered Order -->
          <v-tooltip top v-if="isOrderCancelledOrFailed(item) || isOrderDelivered(item)">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="red"
                @click="confirmDeleteOrder(item)"
                style="margin-left: 10px;"
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete-outline
              </v-icon>
            </template>
            <span>Delete Order</span>
          </v-tooltip>
        </template>

      </v-data-table>
    </v-card>

    <!-- Refund Confirmation Dialog -->
    <v-dialog v-model="refundDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold pa-6 pb-4">
          <v-icon color="success" left>mdi-cash-refund</v-icon>
          Confirm Refund
        </v-card-title>
        
        <v-card-text class="px-6">
          <div class="mb-4">
            <strong>Order ID:</strong> #{{ selectedOrder?.orderId }}
          </div>
          <div class="mb-4">
            <strong>Customer:</strong> {{ selectedOrder?.name }}
          </div>
          <div class="mb-4">
            <strong>Refund Amount:</strong> 
            <span class="text-h6 success--text font-weight-bold">₹{{ selectedOrder?.amount?.toLocaleString('en-IN') }}</span>
          </div>
          <div class="mb-4">
            <strong>Payment Method:</strong> {{ selectedOrder?.paymentMethod }}
          </div>

          <v-alert
            dense
            type="info"
            text
            class="mt-4"
          >
            <div class="text-body-2">
              Please confirm that you have successfully returned the money to the customer's original payment method.
            </div>
          </v-alert>

          <v-alert
            v-if="isRefundCompleted(selectedOrder)"
            dense
            type="success"
            text
            class="mt-3"
          >
            <div class="text-body-2">
              <v-icon small left>mdi-check-circle</v-icon>
              This order has already been refunded.
            </div>
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closeRefundDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="!isRefundCompleted(selectedOrder)"
            color="success"
            elevation="0"
            @click="markRefundCompleted"
            :loading="refundLoading"
          >
            <v-icon left>mdi-check</v-icon>
            Mark as Refunded
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold pa-6 pb-4">
          <v-icon color="error" left>mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>
        
        <v-card-text class="px-6">
          <div class="mb-4">
            <strong>Order ID:</strong> #{{ orderToDelete?.orderId }}
          </div>
          <div class="mb-4">
            <strong>Customer:</strong> {{ orderToDelete?.name }}
          </div>
          <div class="mb-4">
            <strong>Status:</strong> 
            <v-chip
              :color="getStatusColor(orderToDelete?.orderStatus)"
              small
              dark
            >
              {{ orderToDelete?.orderStatus }}
            </v-chip>
          </div>
          <div class="mb-4">
            <strong>Amount:</strong> ₹{{ orderToDelete?.amount?.toLocaleString('en-IN') }}
          </div>

          <v-alert
            dense
            type="warning"
            text
            class="mt-4"
          >
            <div class="text-body-2">
              <strong>Warning:</strong> This action cannot be undone. The order will be permanently deleted from the database.
            </div>
          </v-alert>

          <v-alert
            v-if="isOrderDelivered(orderToDelete)"
            dense
            type="info"
            text
            class="mt-3"
          >
            <div class="text-body-2">
              <v-icon small left>mdi-information</v-icon>
              <strong>Delivered Order:</strong> This order has been successfully delivered and completed.
            </div>
          </v-alert>

          <v-alert
            v-if="needsRefund(orderToDelete) && !isRefundCompleted(orderToDelete)"
            dense
            type="error"
            text
            class="mt-3"
          >
            <div class="text-body-2">
              <v-icon small left>mdi-alert</v-icon>
              <strong>Refund Pending:</strong> Make sure to refund the customer before deleting this order.
            </div>
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closeDeleteDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            elevation="0"
            @click="deleteOrder"
            :loading="deleteLoading"
          >
            <v-icon left>mdi-delete</v-icon>
            Delete Order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cancellation Request Dialog -->
    <v-dialog v-model="cancellationDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold pa-6 pb-4">
          <v-icon color="orange" left>mdi-alert-circle</v-icon>
          Review Cancellation Request
        </v-card-title>
        
        <v-card-text class="px-6">
          <div class="mb-4">
            <strong>Order ID:</strong> #{{ selectedCancellationOrder?.orderId }}
          </div>
          <div class="mb-4">
            <strong>Customer:</strong> {{ selectedCancellationOrder?.name }}
          </div>
          <div class="mb-4">
            <strong>Email:</strong> {{ selectedCancellationOrder?.email }}
          </div>
          <div class="mb-4">
            <strong>Order Amount:</strong> 
            <span class="text-h6 font-weight-bold">₹{{ selectedCancellationOrder?.amount?.toLocaleString('en-IN') }}</span>
          </div>
          <div class="mb-4">
            <strong>Payment Method:</strong> {{ selectedCancellationOrder?.paymentMethod }}
          </div>

          <v-alert
            dense
            type="warning"
            text
            class="mt-4"
          >
            <div class="text-body-2">
              <strong>Action Required:</strong> The customer has requested to cancel this order. Please review and take appropriate action.
            </div>
          </v-alert>

          <v-alert
            v-if="selectedCancellationOrder?.paymentMethod !== 'COD'"
            dense
            type="info"
            text
            class="mt-3"
          >
            <div class="text-body-2">
              <v-icon small left>mdi-information</v-icon>
              <strong>Refund Required:</strong> This order was paid online. After accepting the cancellation, you'll need to process the refund.
            </div>
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-btn
            color="error"
            outlined
            @click="rejectCancellation"
            :loading="rejectLoading"
          >
            <v-icon left>mdi-close</v-icon>
            Reject Request
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closeCancellationDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="success"
            elevation="0"
            @click="acceptCancellation"
            :loading="acceptLoading"
          >
            <v-icon left>mdi-check</v-icon>
            Accept & Cancel Order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
      bottom
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
import axios from "axios";

export default {
  name: "AdminOrders",

  data() {
    return {
      loading: false,
      orders: [],
      refundDialog: false,
      selectedOrder: null,
      refundLoading: false,
      deleteDialog: false,
      orderToDelete: null,
      deleteLoading: false,
      cancellationDialog: false,
      selectedCancellationOrder: null,
      acceptLoading: false,
      rejectLoading: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",

      headers: [
        { title: "S.No", value: "sno", sortable: false },
        { title: "Order ID", value: "orderId" },
        { title: "Customer Name", value: "name" },
        { title: "Email", value: "email" },
        { title: "City", value: "city" },
        { title: "Amount", value: "amount" },
        { title: "Status", value: "orderStatus" },
        { title: "Refund Status", value: "refundStatus" },
        { title: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  created() {
    this.fetchOrders();
  },

  methods: {
    fetchOrders() {
      this.loading = true;

      axios
        .get("https://srishakram-backend-v2.onrender.com/orders")
        .then((res) => {
          this.orders = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.showSnackbar("Failed to load orders", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    viewOrder(id) {
      this.$router.push(`/orders/${id}`);
    },

    updateStatus(id) {
      this.$router.push(`/update-status/${id}`);
    },

    getStatusColor(status) {
      const normalizedStatus = status?.toUpperCase() || "";
      if (normalizedStatus === "PAID") return "green";
      if (normalizedStatus === "PENDING") return "orange";
      if (normalizedStatus === "FAILED") return "red";
      if (normalizedStatus === "CANCELLED") return "red";
      if (normalizedStatus === "REFUND COMPLETED") return "red";
      if (normalizedStatus === "COD") return "purple";
      return "blue";
    },

    // Check if order is cancelled, failed, or refund completed
    isOrderCancelledOrFailed(order) {
      if (!order) return false;
      const normalizedStatus = order.orderStatus?.toUpperCase() || "";
      return normalizedStatus === "CANCELLED" || 
             normalizedStatus === "FAILED" ||
             normalizedStatus === "REFUND COMPLETED";
    },

    // Check if order is delivered
    isOrderDelivered(order) {
      if (!order) return false;
      const normalizedStatus = order.orderStatus?.toUpperCase() || "";
      return normalizedStatus === "DELIVERED";
    },

    // Open delete confirmation dialog
    confirmDeleteOrder(order) {
      this.orderToDelete = order;
      this.deleteDialog = true;
    },

    // Close delete dialog
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.orderToDelete = null;
    },

    // Delete order
    deleteOrder() {
      if (!this.orderToDelete) return;

      this.deleteLoading = true;

      axios
        .delete(`https://srishakram-backend-v2.onrender.com/orders/${this.orderToDelete.orderId}`)
        .then(() => {
          this.orders = this.orders.filter(order => order.orderId !== this.orderToDelete.orderId);
          this.showSnackbar("Order deleted successfully", "success");
          this.closeDeleteDialog();
        })
        .catch(err => {
          console.error(err);
          this.showSnackbar("Failed to delete order", "error");
        })
        .finally(() => {
          this.deleteLoading = false;
        });
    },

    // Check if order needs refund (cancelled/failed + online payment)
    needsRefund(order) {
      if (!order) return false;
      const normalizedStatus = order.orderStatus?.toUpperCase() || "";
      const isCancelled = normalizedStatus === "CANCELLED" || 
                         normalizedStatus === "FAILED" ||
                         normalizedStatus === "REFUND COMPLETED";
      const isOnlinePayment = order.paymentMethod !== "COD";
      return isCancelled && isOnlinePayment;
    },

    // Check if refund is completed
    isRefundCompleted(order) {
      if (!order) return false;
      const normalizedStatus = order.orderStatus?.toUpperCase() || "";
      return normalizedStatus === "REFUND COMPLETED";
    },

    // Get refund status text
    getRefundStatusText(order) {
      return this.isRefundCompleted(order) ? "Refunded" : "Pending";
    },

    // Get refund status color
    getRefundStatusColor(order) {
      return this.isRefundCompleted(order) ? "#4CAF50" : "#FF9800";
    },

    // Get refund status icon
    getRefundStatusIcon(order) {
      return this.isRefundCompleted(order) ? "mdi-check-circle" : "mdi-clock-outline";
    },

    // Open refund dialog
    openRefundDialog(order) {
      this.selectedOrder = order;
      this.refundDialog = true;
    },

    // Close refund dialog
    closeRefundDialog() {
      this.refundDialog = false;
      this.selectedOrder = null;
    },

    // Mark refund as completed
    markRefundCompleted() {
      if (!this.selectedOrder) return;

      this.refundLoading = true;

      axios
        .put(`https://srishakram-backend-v2.onrender.com/orders/${this.selectedOrder.orderId}/status` , {
          status: "REFUND COMPLETED"
        })
        .then(() => {
          // Update the order in the local array
          const index = this.orders.findIndex(o => o.orderId === this.selectedOrder.orderId);
          if (index !== -1) {
            this.orders[index].orderStatus = "REFUND COMPLETED";
          }

          this.showSnackbar("Refund marked as completed successfully", "success");
          this.closeRefundDialog();
        })
        .catch(err => {
          console.error(err);
          this.showSnackbar("Failed to update refund status", "error");
        })
        .finally(() => {
          this.refundLoading = false;
        });
    },

    // Open cancellation dialog
    openCancellationDialog(order) {
      this.selectedCancellationOrder = order;
      this.cancellationDialog = true;
    },

    // Close cancellation dialog
    closeCancellationDialog() {
      this.cancellationDialog = false;
      this.selectedCancellationOrder = null;
    },

    // Accept cancellation request
    acceptCancellation() {
      if (!this.selectedCancellationOrder) return;

      this.acceptLoading = true;

      axios
        .put(`https://srishakram-backend-v2.onrender.com/orders/${this.selectedCancellationOrder.orderId}/approve-cancel`)
        .then(() => {
          // Update the order in the local array
          const index = this.orders.findIndex(o => o.orderId === this.selectedCancellationOrder.orderId);
          if (index !== -1) {
            this.orders[index].orderStatus = "CANCELLED";
          }

          this.showSnackbar("Order cancellation approved successfully", "success");
          this.closeCancellationDialog();
        })
        .catch(err => {
          console.error(err);
          this.showSnackbar("Failed to approve cancellation", "error");
        })
        .finally(() => {
          this.acceptLoading = false;
        });
    },

    // Reject cancellation request
    rejectCancellation() {
      if (!this.selectedCancellationOrder) return;

      this.rejectLoading = true;

      axios
        .put(`https://srishakram-backend-v2.onrender.com/orders/${this.selectedCancellationOrder.orderId}/reject-cancel`)
        .then((res) => {
          // Update the order in the local array to its previous status
          const index = this.orders.findIndex(o => o.orderId === this.selectedCancellationOrder.orderId);
          if (index !== -1) {
            // Get the previous status from response or default to PAID/COD
            this.orders[index].orderStatus = res.data.orderStatus || this.orders[index].paymentMethod === 'COD' ? 'COD' : 'PAID';
          }

          this.showSnackbar("Cancellation request rejected successfully", "success");
          this.closeCancellationDialog();
        })
        .catch(err => {
          console.error(err);
          this.showSnackbar("Failed to reject cancellation", "error");
        })
        .finally(() => {
          this.rejectLoading = false;
        });
    },

    // Show snackbar notification
    showSnackbar(text, color = "success") {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.v-data-table >>> tbody tr:hover {
  background-color: #f5f5f5 !important;
}
</style>
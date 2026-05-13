<template>
  <v-container fluid class="pa-6 order-bg">

    <!-- ================= LOADING ================= -->
    <v-row justify="center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
    </v-row>

    <!-- ================= ERROR ================= -->
    <v-alert
      type="error"
      v-if="error"
      class="mb-6"
    >
      {{ error }}
    </v-alert>

    <!-- ================= CONTENT ================= -->
    <div v-if="!loading && order">

      <!-- ORDER SUMMARY -->
      <v-card class="pa-9 mb-6" elevation="4">
        <v-row align="center" justify="space-between">
          <div>
            <h2 class="font-weight-bold">
              Order #{{ order.orderId }}
            </h2>

            <v-chip
              class="mt-2"
              :color="statusColor"
              dark
            >
              {{ order.orderStatus }}
            </v-chip>
          </div>

          <div class="text-right">
            <h2>
              ₹ {{ order.amount }}
            </h2>
            <p class="grey--text mb-0">
              Payment: <span style="font-weight:bold; color:skyblue;">{{ order.paymentMethod }}</span>
            </p>
            <small class="grey--text">
                <span style="font-weight:bold ;"> {{ order.razorpayOrderId }}</span>
            </small>
          </div>
        </v-row>
      </v-card>


      <!-- CUSTOMER DETAILS -->
      <v-card class="pa-7 mb-6" elevation="3">
        <h3 class="mb-4">Customer Details</h3>

        <v-row>
          <v-col cols="12" md="6">
            <p><strong>Name:</strong> {{ order.name }}</p>
            <p><strong>Email:</strong> {{ order.email }}</p>
            <p><strong>Phone:</strong> {{ order.phoneNo }}</p>
          </v-col>

          <v-col cols="12" md="6">
            <p><strong>Shipping Address:</strong></p>
            <p>
              {{ order.address }},
              {{ order.city }},
              {{ order.state }} - {{ order.pinCode }},
              {{ order.country }}
            </p>
          </v-col>
        </v-row>
      </v-card>


      <!-- ORDER ITEMS -->
      <v-card elevation="3" class="pa-5">
        <v-card-title>
          Ordered Products
        </v-card-title>

        <v-data-table
  :headers="headers"
  :items="order.items"
  item-key="productId"
  disable-pagination
  hide-default-footer
  class="elevation-1"
>


          <!-- IMAGE COLUMN -->
          <template v-slot:item.image="{ item }">
            <img
                :src="item.image"
                style="cursor:pointer; width: 70px;"
                @click.stop="openImage(item.image)"
              />
          </template>

          <!-- PRICE -->
          <template v-slot:item.price="{ item }">
            ₹ {{ item.price }}
          </template>

          <!-- SUBTOTAL -->
          <template v-slot:item.subtotal="{ item }">
            ₹ {{ item.price * item.quantity }}
          </template>

        </v-data-table>
      </v-card>


      <!-- SHIPPING LABEL -->
      <v-card class="mt-6 pa-10" elevation="3">
        <v-row align="center" justify="space-between">
          <div id="print-section">
            <h3>Shipping Label</h3>
            <p class="mb-0">
             <span>Customer Name: </span> <strong>{{ order.name }}</strong><br>
              <span>Address: </span>{{ order.address }}<br>
              {{ order.city }}, {{ order.state }} - {{ order.pinCode }}<br>
              {{ order.country }}<br>
              Phone: {{ order.phoneNo }}
            </p>
          </div>

          <v-icon left @click="printAddress">mdi-printer</v-icon>
        </v-row>
      </v-card>

    </div>


    <!-- IMAGE PREVIEW DIALOG -->
    <v-dialog v-model="imageDialog" max-width="400">
      <v-card>
        <v-card-title>
         <span>Product Image</span>
        
          <v-btn icon @click="imageDialog = false" variant="flat" style="margin-left: 180px;">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="text-center">
          <v-img
            :src="selectedImage"
            contain
            max-height="600"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminOrderDetails",

  data() {
    return {
      order: null,
      loading: false,
      error: null,
      imageDialog: false,
      selectedImage: "",

      headers: [
        { title: "Product", value: "image" },
        { title: "Product Name", value: "productName" },
        { title: "Quantity", value: "quantity" },
        { title: "Price", value: "price" },
        { title: "Subtotal", value: "subtotal" }
      ]
    };
  },

  computed: {
    statusColor() {
      if (!this.order || !this.order.orderStatus) return "grey";
      if (this.order.orderStatus === "PAID") return "green";
      if (this.order.orderStatus === "PENDING") return "orange";
      if (this.order.orderStatus === "CANCELLED") return "red";
      return "blue";
    }
  },

  created() {
    this.fetchOrder();
  },

  methods: {
    async fetchOrder() {
      const orderId = this.$route.params.id;

      if (!orderId) {
        this.error = "Order ID not found in route.";
        return;
      }

      this.loading = true;

      try {
        const response = await axios.get(
          `https://srishakram-backend-v2.onrender.com/orders/${orderId}`
        );

        this.order = response.data;

        if (!this.order.items) {
          this.order.items = [];
        }

      } catch (err) {
        console.error(err);
        this.error = "Failed to fetch order.";
      } finally {
        this.loading = false;
      }
    },

    openImage(image) {
      this.selectedImage = image;
      this.imageDialog = true;
    },

    printAddress() {
      const content = document.getElementById("print-section").innerHTML;

      const win = window.open("", "", "width=800,height=600");

      win.document.write(`
        <html>
          <head>
            <title>Shipping Label</title>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);

      win.document.close();
      win.print();
    }
  }
};
</script>

<style scoped>
.order-bg {
  background: linear-gradient(135deg, #f5f7fa, #e4e8f0);
  min-height: 100vh;
}

.v-data-table tr:hover {
  background-color: #f3f6ff !important;
  transition: 0.3s;
}
</style>

<template>
  <div>
     <v-navigation-drawer
  v-model="drawer"
  app
  width="260"
  color="#fdfaf7"
>
  <!-- Logo -->
  <div class="d-flex align-center pa-4">
    <img src="@/assets/logo.png" width="45" />
    <h3 class="ml-3  font-weight-bold" style="color: maroon;">Admin</h3>
  </div>

  <v-divider></v-divider>

  <!-- Menu Items -->
  <div nav style="cursor: pointer;">
   
      <v-btn flat style="margin-top: 15px; background-color: transparent;"  @click="$router.push('/')">Dashboard</v-btn>
      <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/order_list')">Customer Orders</v-btn>
      <v-btn flat style="margin-top: 15px; background-color: transparent;"  @click="$router.push('/admin/home_edit')">Add Dashboard</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/add_product')">Add Product</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/add/catelog')">Add Category</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/modify')">Update Product</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/add/saree_jornal')">Add Saree Journal</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/modify-category')">Update Categorry</v-btn>
        <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/modify-journal')">Update Journal</v-btn>
       <v-btn flat style="margin-top: 20px;background-color: transparent;"  @click="$router.push('/admin/auth/register')">Register</v-btn>
  </div>
</v-navigation-drawer>
<v-app-bar app color="white" elevation="1">
  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  <v-toolbar-title class=" font-weight-bold" style="color: maroon;">
    Product Management
  </v-toolbar-title>
</v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar2",
  data()
  {
    return{
       drawer: false,
    }
  }
}
</script>

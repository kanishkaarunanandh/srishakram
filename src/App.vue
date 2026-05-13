<template>
  <v-app>
    <Navbar1 v-if="route.meta.navbar === 'user'" />
    <Navbar2 v-if="route.meta.navbar === 'admin'" />
    <v-main>
      <router-view />
    </v-main>

    <Footer v-if="route.meta.navbar === 'user'" />
    <Toast />
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";
import { startAutoLogout } from "@/utils/auth";
import Navbar1 from "@/Common Files/Navbar1.vue";
import Footer from "@/Common Files/Footer.vue";
import Navbar2 from "./Common Files/Navbar2.vue";
import Toast from "@/components/common/Toast.vue";
const route = useRoute();

const token = localStorage.getItem("token");
if (token) {
  startAutoLogout(token);
}

</script>

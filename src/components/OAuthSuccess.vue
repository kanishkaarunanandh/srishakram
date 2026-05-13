<template>
  <div class="oauth-success">
    Redirecting...
  </div>
</template>

<script>
import { startAutoLogout } from "@/utils/auth";

export default {
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const customerId = params.get("customerId");
    const role = params.get("role");
    const email = params.get("email");

    if (token && customerId) {
      localStorage.setItem("token", token);
      localStorage.setItem("customerId", customerId);
      localStorage.setItem("role", role);
      localStorage.setItem("userEmail", email);

      startAutoLogout(token);

      // Redirect after saving
      this.$router.replace("/");
    } else {
      // If something goes wrong, redirect to login
      this.$router.replace("/login");
    }
  }
};
</script>

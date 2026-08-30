<template>
  <div class="login-wrapper">
    
    <!-- Background Overlay -->
    <div class="overlay"></div>

    <div class="login-card">
      
      <!-- Logo -->
      <img src="@/assets/logo main.png" class="logo" />

      <h2>Admin Sign In</h2>
      <p class="subtitle">Sign in as administrator</p>

      <!-- Google -->
      <button class="google-btn" @click="loginWithGoogle">
        Continue with Google
      </button>

      <div class="divider">
        <span>or</span>
      </div>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Admin Email"
      />

      <!-- Password -->
      <input
        v-model="password"
        type="password"
        placeholder="Password"
      />

      <!-- Login Button -->
      <button class="login-btn" @click="login">
        Login
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="register-text">
        Don’t have an account?
        <span class="register-link" @click="goToRegister">
          Register
        </span>
      </p>

    </div>
  </div>
</template>

<style scoped src=""></style>
<script>
import api from "@/adminfolder/axios";
import { startAutoLogout } from "@/utils/auth";
import '@/adminfolder/admin styles/adminlogin.css';

const backendOrigin = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/";

export default {

  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
  api.post("/auth/verify/login", {
    email: this.email,
    password: this.password,
  })
  .then(response => {
    const token = response.data.token;
    const role = response.data.role.toUpperCase();
    const custom = response.data.custom;
    const orderid = response.data.orderid;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("custom", String(custom));

    startAutoLogout(token);

    if (role === "ROLE_USER") {
      this.$router.replace("/contact");
    } else if (role === "ROLE_ADMIN") {
      this.$router.replace("/admin/home_edit");
    } else {
      alert("Unauthorized role");
    }
  })
  .catch(() => {
    this.error = "Login failed. Please check your credentials.";
  });
},
goToRegister()
{
    this.$router.push('/admin/auth/register');
},
 loginWithGoogle() {
    window.location.href = `${backendOrigin}/oauth2/authorization/google`;
  },

  },
};
</script>


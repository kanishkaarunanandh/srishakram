<template>
  <div class="login-wrapper">
    


    <div class="login-card">
      
      <!-- Logo -->
      <img src="@/assets/logo main.png" class="logo" />

      <h2>Sign in</h2>
      <p class="subtitle">Sign in to continue</p>

      <!-- Google -->
      <!-- <button class="google-btn" @click="loginWithGoogle">
        Continue with Google
      </button> -->

      <div class="divider">
        <span>or</span>
      </div>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
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

<style scoped src="@/components/stylesheets/userLogin.css"></style>
<script>
import api from "@/adminfolder/axios";
import { startAutoLogout } from "@/utils/auth";
import { showToast } from "@/utils/toast";
;

const backendOrigin = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isAuth: false
    };
  },
  methods: {
    loginWithGoogle() {
      window.location.href = `${backendOrigin}/oauth2/authorization/google`;
    },
    login() {
      localStorage.clear();
      api.post("/auth/verify/login", {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        const token = response.data.token;
        const role = response.data.role.toUpperCase();
        const custom = response.data.custom;
        const userEmail = response.data.userEmail;
        const customerId = response.data.customerId;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("custom", String(custom));
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("customerId", customerId);

        startAutoLogout(token);
        showToast("Login successful", "success");

        if (role === "ROLE_USER") {
          this.$router.replace("/");
        } else {
           this.$router.replace("/");
        }
      })
      .catch(() => {
        this.error = "Login failed. Please check your credentials.";
        showToast("Login failed. Please check your credentials.", "error");
      });
    },
    goToRegister() {
      this.$router.push('/register/account');
    }
  }
};
</script>




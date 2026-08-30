<template>
  <div class="login-wrapper">
    
    <!-- Background Overlay -->
    <div class="overlay"></div>

    <div class="login-card">
      
      <!-- Logo (Top) -->
      <img src="@/assets/logo main.png" class="logo" />

      <h2>Register</h2>
      <p class="subtitle">Create your account</p>

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

      <!-- Confirm Password -->
      <input
        v-model="confirm_password"
        type="password"
        placeholder="Confirm Password"
      />

      <!-- Register Button -->
      <button 
        class="login-btn" 
        @click="register"
        :disabled="isRegisterDisabled"
      >
        Register
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <!-- Login Link (Bottom - next to end like login page) -->
      <p class="register-text">
        Already have an account?
        <span class="register-link" @click="goToLogin">
          Sign In
        </span>
      </p>

    </div>
  </div>
</template>
<style scoped src="@/components/stylesheets/userRegister.css"></style>
<script>
import api from '@/adminfolder/axios.js';
import { showToast } from '@/utils/toast';
;

export default {
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      error: null,
    };
  },

  computed: {
    isRegisterDisabled() {
      return (
        !this.email ||
        !this.password ||
        !this.confirm_password ||
        this.password !== this.confirm_password
      );
    }
  },

  methods: {
    async register() {
      this.error = null;

      if (!this.email) {
        this.error = "Email is required";
        showToast("Email is required", "warning");
        return;
      }

      if (!this.password) {
        this.error = "Password is required";
        showToast("Password is required", "warning");
        return;
      }

      if (this.password !== this.confirm_password) {
        this.error = "Passwords do not match";
        showToast("Passwords do not match", "warning");
        return;
      }

      await api.post("/auth/verify/register", {
        email: this.email,
        password: this.password,
      })
      .then(() => {
        showToast("Registration successful. Please sign in.", "success");
        this.$router.push("/login/account");
      })
      .catch(err => {
        this.error = err.response?.data?.message || "Registration failed";
        showToast(this.error, "error");
      });
    },

    goToLogin() {
      this.$router.push('/login/account');
    }
  }
};
</script>


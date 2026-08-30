<template>
  <div class="login-wrapper">
    
    <!-- Background Overlay -->
    <div class="overlay"></div>

    <div class="login-card">
      
      <!-- Logo -->
      <img src="@/assets/logo main.png" class="logo" />

      <h2>Admin Register</h2>
      <p class="subtitle">Create administrator account</p>

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
        :disabled="isRegisterDisabled || uploading"
      >
        {{ uploading ? 'Saving...' : 'Register Admin' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="register-text">
        Already have an account?
        <span class="register-link" @click="goToLogin()">
          Sign In
        </span>
      </p>

    </div>
  </div>
</template>
<style scoped src="@/adminfolder/admin styles/adminregister.css"></style>
<script>
import api from '@/adminfolder/axios.js'

export default {
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      error: null,
      uploading: false,
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
        return;
      }

      if (!this.password) {
        this.error = "Password is required";
        return;
      }

      if (this.password !== this.confirm_password) {
        this.error = "Passwords do not match";
        return;
      }

      this.uploading = true;

      try {
        const role = localStorage.getItem("role");

        let url = "/auth/verify/register";

        if (role === "ROLE_ADMIN") {
          url = "/auth/verify/admin/auth/create-admin";
        }

        await api.post(url, {
          email: this.email,
          password: this.password,
        });

        this.$router.push('/admin/auth/login');

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "Admin registration failed. Please try again.";
      } finally {
        this.uploading = false;
      }
    },
     goToLogin() {
      this.$router.push('/admin/auth/login');
    }
  }
};
</script>


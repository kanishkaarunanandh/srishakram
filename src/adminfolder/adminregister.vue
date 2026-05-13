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
<script>
import api from '@/adminfolder/axios.js';

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
<style scoped>
.register-text {
  margin-top: 18px;
  font-size: 14px;
  color: #666;
}

.register-link {
  color: #9b0000;
  font-weight: 500;
  cursor: pointer;
}

.register-link:hover {
  text-decoration: underline;
}
/* ===== Full Page Background ===== */
.login-wrapper {
  min-height: 100vh;
  background: url('@/assets/background3.png') center center no-repeat;
  background-size: 100%;
  background-color: #f6f6f6; 
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== Overlay ===== */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}

/* ===== Card ===== */
.login-card {
  background: #ffffff;
  padding: 48px 42px;
  width: 500px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  height: 600px;
  position: relative;
}

/* Logo */
.logo {
  width: 160px;
  margin-bottom: 5px;
  margin-left: 27%;
}

/* Title */
.login-card h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 15px;
  color: #6b6b6b;
  margin-bottom: 20px;
}

/* Inputs */
.login-card input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  border: 1px solid #dcdcdc;
  background: #f9f9f9;
  font-size: 14px;
  transition: all 0.3s ease;
}

.login-card input:focus {
  background: #ffffff;
  border-color: #a00000;
  box-shadow: 0 0 0 3px rgba(160, 0, 0, 0.08);
  outline: none;
}

/* Button */
.login-btn {
  width: 100%;
  padding: 14px;
  background-color: #9b0000;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 6px;
}

.login-btn:hover {
  background-color: #7a0000;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(155, 0, 0, 0.25);
}

/* Error */
.error {
  margin-top: 10px;
  color: red;
  font-size: 13px;
}

</style>

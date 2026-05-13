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
<script>
import api from '@/adminfolder/axios.js';
import { showToast } from '@/utils/toast';

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
<style scoped>

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

/* ===== Card ===== */
.login-card {
  background: #ffffff;
  padding: 48px 42px;
  width: 500px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  height: 600px;
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

.error {
  margin-top: 10px;
  color: red;
  font-size: 13px;
}

@media (max-width: 768px) {
  .login-wrapper {
    min-height: 100svh;
    padding: 30px 0;
    background-image:
      linear-gradient(rgba(255, 250, 244, 0.76), rgba(255, 250, 244, 0.9)),
      url('@/assets/background1.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .login-card {
    width: min(90%, 380px);
    height: auto;
    min-height: auto;
    padding: 26px 18px 24px;
    border-radius: 18px;
    box-shadow: 0 16px 36px rgba(72, 23, 12, 0.14);
    box-sizing: border-box;
  }

  .logo {
    display: block;
    width: 112px;
    margin: 0 auto 10px;
  }

  .login-card h2 {
    font-size: 22px;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .subtitle {
    margin-bottom: 14px;
    font-size: 12px;
  }

  .login-btn {
    min-height: 42px;
    padding: 11px 14px;
    border-radius: 12px;
    font-size: 12px;
  }

  .login-card input {
    min-height: 42px;
    padding: 11px 13px;
    margin-bottom: 9px;
    border-radius: 12px;
    font-size: 13px;
    box-sizing: border-box;
  }

  .register-text {
    margin-top: 10px;
    font-size: 11px;
    line-height: 1.5;
  }

  .error {
    margin-top: 8px;
    font-size: 12px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .login-wrapper {
    min-height: 100svh;
    padding: 48px 32px;
    background-image:
      linear-gradient(rgba(255, 250, 244, 0.52), rgba(255, 250, 244, 0.68)),
      url('@/assets/background22.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .login-card {
    width: min(58vw, 560px);
    height: auto;
    min-height: 560px;
    padding: 50px 46px 44px;
    border-radius: 24px;
    box-shadow: 0 24px 70px rgba(72, 23, 12, 0.14);
    box-sizing: border-box;
  }

  .logo {
    display: block;
    width: 150px;
    margin: 0 auto 12px;
  }

  .login-btn,
  .login-card input {
    min-height: 48px;
  }
}

/* Overlay
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
} */

</style>

<template>
  <div class="login-wrapper">
    
    <!-- Background Overlay -->
    <div class="overlay"></div>

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

<script>
import api from "@/adminfolder/axios";
import { startAutoLogout } from "@/utils/auth";

const backendOrigin = import.meta.env.VITE_BACKEND_URL || "https://srishakram-backend-v2.onrender.com";

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

        if (role === "ROLE_USER") {
          this.$router.replace("/");
        } else {
           this.$router.replace("/");
        }
      })
      .catch(() => {
        this.error = "Login failed. Please check your credentials.";
      });
    },
    goToRegister() {
      this.$router.push('/register/account');
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

/* ===== Google Button ===== */
.google-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, #5b2be0, #7b5af8);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(123, 90, 248, 0.3);
}

/* ===== Divider ===== */
.divider {
  display: flex;
  align-items: center;
  margin: 26px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e5e5;
}

.divider span {
  margin: 0 12px;
  font-size: 14px;
  color: #888;
}

/* ===== Inputs ===== */
.login-card input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 10px;
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

/* ===== Continue Button ===== */
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
  margin-top: 3px;
}

.login-btn:hover {
  background-color: #7a0000;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(155, 0, 0, 0.25);
}

/* ===== Register ===== */
.register-text {
  margin-top: 10px;
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

  .google-btn,
  .login-btn {
    min-height: 42px;
    padding: 11px 14px;
    border-radius: 12px;
    font-size: 12px;
  }

  .divider {
    margin: 16px 0;
  }

  .divider span {
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
    margin-top: 9px;
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

  .google-btn,
  .login-btn,
  .login-card input {
    min-height: 48px;
  }
}

</style>


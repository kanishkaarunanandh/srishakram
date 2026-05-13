<template>
  <div class="wrapper">

    <!-- Floating Background Shapes -->
    <div class="circle one"></div>
    <div class="circle two"></div>

    <div class="card">

      <!-- Badge -->
      <div class="badge">Coming Soon</div>

      <!-- Icon -->
      <div class="icon">{{ icon }}</div>

      <!-- Title -->
      <h1 class="title">{{ title }}</h1>

      <!-- Message -->
      <p class="message">{{ message }}</p>

      <!-- Features Preview -->
      <div class="features" v-if="type === 'customization'">
        <span>🎨 Choose Color</span>
        <span>🧵 Select Fabric</span>
        <span>✨ Custom Design</span>
      </div>

      <!-- Notify Section -->
      <div class="notify">
        <input type="email" placeholder="Enter your email" />
        <button>Notify Me</button>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Back Button -->
      <button class="back-btn" @click="$router.back()">← Go Back</button>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    type() {
      return this.$route.query.type;
    },
    title() {
      return this.type === "customization"
        ? "Design Your Own Saree"
        : "Tussar Silks Collection";
    },
    message() {
      return this.type === "customization"
        ? "We’re building a feature that lets you personalize your saree with your favorite fabric, color, and design."
        : "Our premium Tussar silk collection is being prepared and will be available soon.";
    },
    icon() {
      return this.type === "customization" ? "🧵" : "🛍️";
    }
  }
};
</script>

<style scoped>

/* Background */
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f9fc;
  position: relative;
  overflow: hidden;
}

/* Floating shapes */
.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
}

.circle.one {
  width: 300px;
  height: 300px;
  background: #ff7a18;
  top: -50px;
  left: -50px;
}

.circle.two {
  width: 250px;
  height: 250px;
  background: #4facfe;
  bottom: -60px;
  right: -60px;
}

/* Card */
.card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  animation: fadeUp 0.8s ease;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Badge */
.badge {
  display: inline-block;
  background: #e8f0fe;
  color: #3b82f6;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 15px;
}

/* Icon */
.icon {
  font-size: 50px;
  margin-bottom: 10px;
}

/* Title */
.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

/* Message */
.message {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

/* Features */
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.features span {
  background: #f1f5f9;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
}

/* Notify */
.notify {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.notify input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
}

.notify button {
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.notify button:hover {
  transform: scale(1.05);
}

/* Divider */
.divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

/* Back button */
.back-btn {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
}

.back-btn:hover {
  text-decoration: underline;
}

</style>
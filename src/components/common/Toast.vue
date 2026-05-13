<template>
  <teleport to="body">
    <transition-group name="toast" tag="div" class="toast-stack">
      <div
        v-for="toast in toastState.items"
        :key="toast.id"
        class="toast-card"
        :class="`toast-card--${toast.type}`"
        role="status"
      >
        <v-icon class="toast-icon" size="22">{{ toast.icon }}</v-icon>
        <p>{{ toast.message }}</p>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup>
import { toastState } from '@/utils/toast'
</script>

<style scoped>
.toast-stack {
  position: fixed;
  right: clamp(14px, 3vw, 28px);
  bottom: clamp(18px, 4vw, 34px);
  z-index: 5000;
  display: grid;
  gap: 12px;
  width: min(380px, calc(100vw - 28px));
  pointer-events: none;
}

.toast-card {
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(194, 148, 78, 0.42);
  border-left: 4px solid #6f1d18;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(255, 250, 244, 0.98), rgba(247, 234, 217, 0.98));
  color: #35120f;
  box-shadow: 0 18px 44px rgba(58, 21, 17, 0.2);
  backdrop-filter: blur(14px);
  pointer-events: auto;
}

.toast-card--success {
  border-left-color: #7a5a12;
}

.toast-card--error {
  border-left-color: #8b1618;
}

.toast-card--warning {
  border-left-color: #b17923;
}

.toast-card--info {
  border-left-color: #6f1d18;
}

.toast-icon {
  color: #8b1618;
}

.toast-card--success .toast-icon {
  color: #7a5a12;
}

.toast-card p {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

@media (max-width: 599px) {
  .toast-stack {
    right: 12px;
    bottom: 16px;
    width: calc(100vw - 24px);
  }

  .toast-card {
    border-radius: 16px;
    padding: 13px 14px;
  }

  .toast-card p {
    font-size: 13px;
  }
}
</style>


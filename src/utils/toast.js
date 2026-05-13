import { reactive } from 'vue'

export const toastState = reactive({
  items: [],
})

const toastIcons = {
  success: 'mdi-check-circle-outline',
  error: 'mdi-alert-circle-outline',
  warning: 'mdi-alert-outline',
  info: 'mdi-information-outline',
}

export function showToast(message, type = 'info', duration = 2800) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`

  toastState.items.push({
    id,
    message,
    type,
    icon: toastIcons[type] || toastIcons.info,
  })

  window.setTimeout(() => {
    const index = toastState.items.findIndex((item) => item.id === id)
    if (index !== -1) {
      toastState.items.splice(index, 1)
    }
  }, duration)
}


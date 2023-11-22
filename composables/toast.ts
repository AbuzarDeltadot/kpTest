import { useToast as toasty } from 'vue-toastification'

export const useToast = () => {
  if (process.client) {
    const toast = toasty()
    return toast
  }
}

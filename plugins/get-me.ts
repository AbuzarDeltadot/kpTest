export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  if (!authStore.authenticated){
    await authStore.getMe()
  }
})

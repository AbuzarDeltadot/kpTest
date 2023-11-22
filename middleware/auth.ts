export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  if (!authStore.authenticated)
    return navigateTo('/login', { replace: true })
})

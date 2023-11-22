<template>
  <AuthBox>
    <template #heading>
      Reset Password
    </template>
    <form
      class="space-y-4"
      @submit.prevent="resetPassword"
    >
      <div class="space-y-3">
        <BaseInput
          v-model="form.email"
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <BaseInput
          v-model="form.password"
          name="password"
          placeholder="Enter your password"
          required
          type="password"
        />
        <BaseInput
          v-model="form.password_confirmation"
          name="password_confirmation"
          placeholder="Confirm your password"
          required
          type="password"
        />
      </div>
      <BaseLoadingButton
        :loading="loading"
        primary
        class="px-6 py-4 w-full text-center py-3"
        size="xl"
      >
        Send Reset Password Link
      </BaseLoadingButton>
    </form>
  </AuthBox>
</template>

<script setup>
useHead({
  title: 'Reset',
})
definePageMeta({
  middleware: 'guest',
})
const route = useRoute()
const form = reactive({
  email: route.query.email || null,
  password: null,
  password_confirmation: null,
  token: route.params.token || null,
})
const loading = ref(false)
const authStore = useAuthStore()
async function resetPassword() {
  loading.value = true
  const { success } = await usePost('/password/reset', {
    body: form,
  })
  loading.value = false
  if (success)
    await authStore.login(form)
}
</script>

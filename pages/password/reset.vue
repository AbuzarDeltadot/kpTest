<template>
  <AuthBox>
    <template #heading>
      Forgot your password?
    </template>
    <form
      :id="formId"
      class="space-y-4"
      @submit.prevent="sendLink"
    >
      <BaseInput
        v-model="form.email"
        label="Email"
        name="email"
        placeholder="Enter your email"
        required
        type="email"
      />
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

const form = reactive({
  email: null,
})
const loading = ref(false)
const formId = 'reset-password-form'
const errorStore = useErrorStore()
async function sendLink() {
  loading.value = true
  errorStore.setFormId(formId)
  const { success } = await usePost('/password/email', {
    body: form,
  })
  loading.value = false
  if (success)
    navigateTo('/login')
}
</script>

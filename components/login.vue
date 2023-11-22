<template>
  <form
    :id="formId"
    class="space-y-4"
    @submit.prevent="login"
  >
    <div class="w-full space-y-3">
      <BaseInput
        v-model="form.email"
        label="Email"
        name="email"
        placeholder="Enter your email"
        required
        type="email"
        autofocus
      />

      <BaseInput
        v-model="form.password"
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        required
      />

      <div class="flex items-center justify-between">
        <BaseInput
          :checked="form.remember_me"
          :full="false"
          padding-class=""
          type="checkbox"
          name="remember_me"
          @change="form.remember_me = $event.target.checked"
        >
          <span class="text-gray-600 text-sm">Remember me</span>
        </BaseInput>
        <NuxtLink
          to="/password/reset"
          class="text-sm text-gray-600 font-semibold"
        >
          Forgot your password?
        </NuxtLink>
      </div>
    </div>
    <BaseLoadingButton
      :loading="loading"
      primary
      class="px-6 py-4 w-full text-center py-3"
      size="xl"
    >
      Login
    </BaseLoadingButton>
  </form>
</template>

<script setup>
const props = defineProps({
  navigate: {
    type: [String, Boolean],
    // default: '/account',
  },
})
const emit = defineEmits(['loggedIn'])
const authStore = useAuthStore()
const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  remember_me: false,
})
const formId = 'login-form'
const errorStore = useErrorStore()
async function login() {
  loading.value = true
  errorStore.setFormId(formId)
  const success = await authStore.login(form, props.navigate)
  loading.value = false
  if (success)
    emit('loggedIn')
}
</script>

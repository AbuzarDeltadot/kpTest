<template>
  <ModalDefault :show="show">
    <div class="flex items-center justify-center p-4 space-x-2">
      <button
        v-for="(headerButton, headerButtonIndex) in headerButtons"
        :key="headerButtonIndex"
        :aria-label="`${headerButton.name} Button`"
        class="text-2xl px-4 py-2 text-gray-600"
        :class="{
          'border-b-2 border-gray-600': (showLogin && headerButton.key === 'login')
            || (!showLogin && headerButton.key === 'register'),
        }"
        @click="showLogin = headerButton.key === 'login'"
      >
        {{ headerButton.name }}
      </button>
    </div>
    <div
      class="p-4 mx-auto mb-6"
      :class="{
        'max-w-sm': showLogin,
        'max-w-lg': !showLogin,
      }"
    >
      <Login
        v-if="showLogin"
        :navigate="false"
      />
      <Register
        v-else
        :navigate="false"
      />

      <p class="text-sm text-gray-600 font-semibold text-center mt-2 underline-offset-4">
        <span>{{ showLogin ? 'Don\'t have an account?' : 'Already have an account?' }}</span>
        <button
          :aria-label="showLogin ? 'Register' : 'Login'"
          class="underline ml-2"
          @click="showLogin = !showLogin"
        >
          {{ showLogin ? 'Register' : 'Login' }} here
        </button>
      </p>
    </div>
  </ModalDefault>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const headerButtons = ref([
  {
    name: 'Login',
    key: 'login',
  },
  {
    name: 'Register',
    key: 'register',
  },
])
const showLogin = ref(true)
</script>

<template>
  <AuthBox size="lg">
    <template #heading>
      Register
    </template>
    <Register />
    <p class="text-sm text-gray-600 font-semibold text-right mt-2 underline-offset-4">
      <span>Already have an account?</span>
      <NuxtLink
        to="/checkout"
        class="underline"
      >
        Login here
      </NuxtLink>
    </p>
  </AuthBox>
</template>

<script setup>
useHead({
  title: 'Register',
})
// definePageMeta({
//   middleware: 'guest',
// })
</script>

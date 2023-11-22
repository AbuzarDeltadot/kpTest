<template>
  <AuthBox>
    <template #heading>
      Log In
    </template>
    <Login />
    <div class="text-sm font-semibold text-center">
      OR
    </div>
    <NuxtLink
      to="/register"
      type="button"
      class="px-6 py-4 w-full text-center py-3 mt-4 h-12 rounded text-sm font-bold ring-secondary border hover:border-gray-500 focus:outline-none focus:ring"
    >
      Register
    </NuxtLink>
  </AuthBox>
</template>

<script setup>
useHead({
  title: 'Login',
})
definePageMeta({
  middleware: 'guest',
})
</script>

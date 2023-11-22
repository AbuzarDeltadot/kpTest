<template>
  <div class="min-h-[400px] flex flex-col items-center justify-center py-[80px] gap-3">
    <img
      src="/images/tick.svg"
      alt="check mark"
    >
    <p>Thank your for Shopping with us. You order has been received.</p>
    <p>Your order no is</p>
    <p class="font-bold text-[30px] text-primary">
      {{ order }}
    </p>
    <NuxtLink
      to="/"
      class="py-3 px-8 mt-4 bg-primary rounded-full text-white hover:bg-secondary transition"
    >
      Back to home
    </NuxtLink>
  </div>
</template>

<script setup>
const order = ref('')
onMounted(() => {
  const orderId = localStorage.getItem('orderId')
  order.value = orderId
  useShopStore().clearCart()
})
</script>

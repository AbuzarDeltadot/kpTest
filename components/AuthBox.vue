<template>
  <div
    class="mx-auto bg-white px-6 py-8 rounded-md shadow-md sm:my-4"
    :class="[
      `max-w-${size}`,
    ]"
  >
    <h2
      class="text-2xl text-center font-normal mb-6 text-gray-600"
    >
      <slot name="heading" />
    </h2>
    <IconsBorder class="text-gray-300" />
    <div class="space-y-2 ">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'sm',
  },
})
</script>

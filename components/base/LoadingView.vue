<template>
  <div
    class="relative"
    :class="{ 'overflow-hidden': loading }"
  >
    <div
      v-if="loading"
      class="flex items-center justify-center z-30 p-6"
      style="min-height: 150px"
    >
      <IconsLoader class="text-gray-300" />
    </div>

    <slot v-else />
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>

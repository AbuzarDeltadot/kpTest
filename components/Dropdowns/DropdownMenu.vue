<template>
  <div
    ref="menu"
    :style="styles"
    class="select-none overflow-hidden bg-white shadow-lg rounded-lg border border-gray-200"
    :class="{ 'max-w-sm lg:max-w-lg': width === 'auto' }"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    default: 120,
  },
})

const styles = computed(() => {
  return {
    width: props.width === 'auto' ? 'auto' : `${props.width}px`,
  }
})
</script>


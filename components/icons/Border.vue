<template>
  <svg
    :class="[
      defaultClass,
    ]"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 100 2"
  >
    <path
      d="M0 0h100v2H0z"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  defaultClass: {
    type: String,
    default: 'block mx-auto mb-6 fill-current',
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 2,
  },
})
</script>

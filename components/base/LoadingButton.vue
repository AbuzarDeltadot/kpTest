<template>
  <BaseButton
    :class="position"
    v-bind="{ ...$props, ...$attrs }"
    :disabled="processing || loading"
  >
    <span :class="{ invisible: processing || loading }">
      <slot />
    </span>

    <span
      v-if="processing || loading"
      class="absolute"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      <IconsLoader
        width="32"
      />
    </span>
  </BaseButton>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'relative',
  },
})
</script>

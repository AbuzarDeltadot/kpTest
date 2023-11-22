<template>
  <BaseInput
    :checked="value"
    :full="false"
    padding-class=""
    type="checkbox"
    :name="name"
    @change="emit('change', $event.target.checked)"
  >
    <span class="text-gray-600 text-sm">
      I have read and agree to the
      <NuxtLink
        to="privacy-policy"
        class="underline"
      >
        privacy policy
      </NuxtLink>
      &
      <NuxtLink
        to="terms-of-use"
        class="underline"
      >
        terms of use
      </NuxtLink>
      <span
        class="text-red-500"
      >
        *
      </span>
    </span>
  </BaseInput>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['change'])
</script>

<template>
  <component
    :is="component"
    v-bind="$attrs"
    class="hover:bg-gray-50 block w-full text-left cursor-pointer py-2 px-3 focus:outline-none focus:ring rounded truncate whitespace-nowrap"
    :class="{
      'text-red-500 hover:text-red-400 active:text-red-600 focus:ring-red-300':
        destructive,
      'text-gray-500 active:text-gray-600 ':
        !destructive,
    }"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  as: {
    type: String,
    default: 'external',
    validator: v => ['button', 'external', 'form-button', 'link'].includes(v),
  },

  destructive: {
    type: Boolean,
    default: false,
  },
})

const component = computed(() => {
  return {
    'button': 'button',
    'external': 'a',
    'link': 'Link',
    'form-button': 'FormButton',
  }[props.as]
})
</script>

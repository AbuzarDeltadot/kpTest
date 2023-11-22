<template>
  <component
    v-bind="{ ...$props, ...$attrs }"
    :is="component"
    ref="button"
    class="cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-secondary border"
    :class="[
      hoverClass,
      primary ? 'text-white' : colorClass,
      btnSize,
      {
        'bg-primary': primary,
        'inline-flex items-center justify-center': align === 'center',
        'inline-flex items-center justify-start': align === 'left',
      },
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'lg',
  },

  align: {
    type: String,
    default: 'center',
    validator: v => ['left', 'center'].includes(v),
  },

  component: {
    type: String,
    default: 'button',
  },

  colorClass: {
    type: String,
    default: 'text-gray-600',
  },

  hoverClass: {
    type: String,
    default: 'hover:border-gray-500',
  },

  primary: {
    type: Boolean,
    default: false,
  },
})

const btnSize = computed(() => {
  let sizeClass = props.size
  switch (sizeClass) {
    case 'xl':
      sizeClass = 'h-12 px-5'
      break
    case 'lg':
      sizeClass = 'h-9 px-3'
      break
    case 'sm':
      sizeClass = 'h-8 px-3'
      break
    case 'xs':
      sizeClass = 'h-7 px-1 md:px-3'
      break
  }
  return sizeClass
})

const button = ref(null)

const focus = () => button.value.focus()

defineExpose({ focus })
</script>

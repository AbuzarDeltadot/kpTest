<template>
  <Teleport to="body">
    <div v-if="show">
      <div
        v-bind="{ ...$attrs }"
        class="modal fixed inset-0 z-[60]"
        :class="{
          'px-3 md:px-0 py-3 md:py-6 overflow-x-hidden overflow-y-auto':
            modalStyle === 'window',
          'h-full': modalStyle === 'fullscreen',
        }"
        :tabindex="tabIndex"
        :role="role"
        :data-modal-open="show"
        :aria-modal="show"
      >
        <div
          ref="modalContent"
          class="bg-white relative mx-auto z-20 overflow-hidden rounded-lg"
          style="min-height: 5rem;"
          :class="contentClasses"
        >
          <slot />
          <button
            aria-label="Close Modal"
            class="absolute top-0 right-0 p-2 mr-2 text-gray-400 hover:text-gray-600"
            @click="emit('close')"
          >
            <Icon
              name="ion:close-round"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
      <div
        class="fixed inset-0 z-[55] bg-gray-500 dark:bg-gray-900 opacity-75"
        dusk="modal-backdrop"
      />
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  size: {
    type: String,
    default: 'xl',
    validator: v =>
      [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ].includes(v),
  },

  modalStyle: {
    type: String,
    default: 'window',
  },

  role: {
    type: String,
    default: 'dialog',
  },
})

const emit = defineEmits(['close'])

const sizeClasses = ref({
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
})

const attrs = useAttrs()
const tabIndex = computed(() => {
  return props.show ? 0 : -1
})
const contentClasses = computed(() => {
  const windowedClasses = props.modalStyle === 'window' ? sizeClasses.value : {}
  const classes = [
    windowedClasses[props.size] ?? null,
    props.modalStyle === 'fullscreen' ? 'h-full' : '',
    attrs.class,
  ]
  return classes.join(' ')
})

onMounted(() => {
  if (props.show === true)
    handleVisibilityChange(true)
})

onBeforeUnmount(() => {
  handleVisibilityChange(false)
})

watch(() => props.show, (showing) => {
  handleVisibilityChange(showing)
})

const modalContent = ref(null)

async function handleVisibilityChange(showing) {
  await nextTick()
  if (showing === true) {
    document.body.classList.add('overflow-hidden')
    trapFocus(modalContent.value)
  }
  else {
    document.body.classList.remove('overflow-hidden')
  }
}
</script>

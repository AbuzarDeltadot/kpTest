<template>
  <Teleport to="body">
    <div v-if="show">
      <!-- overflow-x-hidden overflow-y-auto -->
      <div
        v-bind="{ ...$attrs }"
        class="modal fixed inset-0 z-[60]"
        :class="{
          'px-3 md:px-0 py-3 md:py-6': modalStyle === 'window',
          'h-full': modalStyle === 'fullscreen'
        }"
        :tabindex="tabIndex"
        :role="role"
        :data-modal-open="show"
        :aria-modal="show"
        @click="$emit('close-modal')"
      >
        <div
          ref="modalContent"
          class="bg-white relative mx-auto z-20 overflow-hidden rounded-lg"
          :class="contentClasses"
        >
          <slot />
        </div>
      </div>

      <div
        class="fixed inset-0 z-[55] bg-gray-500 dark:bg-gray-900 opacity-75"
        dusk="modal-backdrop"
      />
    </div>
  </Teleport>
</template>

<script>
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'xl',
      validator: (v) =>
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
          '7xl'
        ].includes(v)
    },

    modalStyle: {
      type: String,
      default: 'window'
    },

    role: {
      type: String,
      default: 'dialog'
    }
  },
  emits: ['showing', 'closing', 'close-modal','close-via-escape'],
  setup() {
    return {}
  },
  computed: {
    tabIndex() {
      return this.show ? 0 : -1
    },

    sizeClasses() {
      return {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl'
      }
    },

    contentClasses() {
      const windowedClasses =
        this.modalStyle === 'window' ? this.sizeClasses : {}
      const classes = [
        windowedClasses[this.size] ?? null,
        this.modalStyle === 'fullscreen' ? 'h-full' : '',
        this.$attrs.class
      ]
      return classes.join(' ')
    }
  },
  watch: {
    show(showing) {
      this.handleVisibilityChange(showing)
    }
  },

  mounted() {
    if (this.show === true) this.handleVisibilityChange(true)
  },
  methods: {
    handleVisibilityChange(showing) {
      this.$nextTick(() => {
        if (showing === true) this.$emit('showing')
        else this.$emit('closing')
      })
    },
    closeModal() {
      this.$emit('close-modal'); 
    },
    closeOnEscape(event) {
      if (event.key === 'Escape' && this.show === true)
        this.$emit('closeViaEscape')
    }
  }
})
</script>

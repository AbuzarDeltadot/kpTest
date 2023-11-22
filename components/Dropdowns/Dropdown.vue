<template>
  <div>
    <button
      ref="trigger"
      :aria-expanded="show === true ? 'true' : 'false'"
      class="rounded active:outline-none active:ring focus:outline-none focus:ring focus:ring-primary-200"
      type="button"
      @click.stop="showMenu"
    >
      <slot />
    </button>

    <teleport to="body">
      <div
        v-show="show"
        ref="menu"
        class="relative z-[100]"
        :data-menu-open="show"
        @click="handleClick"
      >
        <slot name="menu" />
      </div>
    </teleport>

    <Teleport to="body">
      <div
        v-if="show"
        class="z-[80] fixed inset-0"
        dusk="dropdown-overlay"
        @click="() => hideMenu()"
      />
    </Teleport>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { createPopper } from '@popperjs/core'

export default {

  props: {
    offset: {
      type: [Number, String],
      default: 5,
    },

    placement: {
      type: String,
      default: 'bottom-start',
    },

    boundary: {
      type: String,
      default: 'viewPort',
    },

    autoHide: {
      type: Boolean,
      default: true,
    },

    handleInternalClicks: {
      type: Boolean,
      default: true,
    },

    triggerOverrideFunction: {
      type: Function,
    },
  },
  emits: ['menuOpened', 'menuClosed'],

  data: () => ({
    show: false,
    popper: null,
    debouncedHideMenu: null,
  }),

  computed: {
    resolvedPlacement() {
      return {
        'auto-start': 'auto-end',
        'auto-end': 'auto-start',
        'top-start': 'top-end',
        'top-end': 'top-start',
        'bottom-start': 'bottom-end',
        'bottom-end': 'bottom-start',
        'right-start': 'right-end',
        'right-end': 'right-start',
        'left-start': 'left-end',
        'left-end': 'left-start',
      }[this.placement]
    },
  },

  methods: {
    handleClick() {
      if (this.handleInternalClicks)
        this.hideMenu()
    },

    createPopper() {
      /**
       * Create the popper for the containing element.
       */
      this.popper = createPopper(this.$refs.trigger, this.$refs.menu, {
        placement: this.resolvedPlacement,
        boundary: this.boundary,
        modifiers: {
          name: 'offset',
          options: {
            offset: [0, this.offset],
          },
        },
      })
    },

    /**
     * Show the dropdown menu.
     */
    showMenu() {
      if (this.triggerOverrideFunction) {
        this.triggerOverrideFunction()
        return
      }

      if (this.debouncedHideMenu) {
        this.debouncedHideMenu.cancel()
        this.debouncedHideMenu = null
      }

      this.show = true

      this.$emit('menuOpened')

      this.createPopper()
    },

    /**
     * Hide the dropdown menu.
     */
    hideMenu() {
      if (this.show === true && this.debouncedHideMenu)
        this.debouncedHideMenu = null

      this.show = false

      this.$emit('menuClosed')

      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
    },

    delayedHideMenu() {
      if (this.debouncedHideMenu === null)
        this.debouncedHideMenu = debounce(() => this.hideMenu(), 500)

      this.debouncedHideMenu()
    },
  },
}
</script>

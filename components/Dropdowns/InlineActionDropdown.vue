<template>
  <div v-if="actions.length">
    <DropdownsDropdown>
      <span class="sr-only">Actions Dropdown</span>
      <DropdownsDropdownTrigger
        :show-arrow="false"
      >
        <span class="py-0.5 px-2 rounded">
          <Icon
            name="heroicons-solid:dots-horizontal"
            class="w-6 h-6"
          />
        </span>
      </DropdownsDropdownTrigger>

      <template #menu>
        <DropdownsDropdownMenu
          width="auto"
          class="px-1"
        >
          <ScrollWrap
            :height="250"
            class="divide-y divide-gray-100 divide-solid"
          >
            <div
              v-if="actions.length > 0"
              class="py-1"
            >
              <!-- User Actions -->
              <DropdownsDropdownMenuItem
                v-for="action in actions"
                :key="action.uriKey"
                as="button"
                :title="action.name"
                :destructive="action.destructive"
                @click="() => handleActionClick(action.uriKey)"
              >
                {{ action.name }}
              </DropdownsDropdownMenuItem>
            </div>
          </ScrollWrap>
        </DropdownsDropdownMenu>
      </template>
    </DropdownsDropdown>
  </div>
</template>

<script setup>
const props = defineProps({
  actions: {
    type: Array,
    default() {
      return []
    },
  },
})
const emit = defineEmits(['action'])

function handleActionClick(key) {
  emit('action', key)
}
</script>


<template>
  <div
    ref="inputContent"
    class="flex flex-col justify-center"
    :class="{
      'w-full': full,
    }"
  >
    <div class="flex flex-col space-y-1">
      <label
        v-if="label"
        :for="name"
        class="font-semibold text-sm"
      >
        {{ label }}
        <span
          v-if="required"
          class="text-red-500"
        >
          *
        </span>
      </label>
      <select
        v-bind="{ ...$props, ...$attrs }"
        class="form-select rounded focus:ring"
        :class="[
          paddingClass,
          valid ? 'border-gray-300 focus:ring-secondary focus:border-secondary focus:ring-opacity-50' : 'border-red-500 focus:ring-red-200 focus:border-red-600',
        ]"
      >
        <option
          v-if="showPlaceholder"
          value=""
        >
          Please select
        </option>
        <slot />
      </select>
    </div>

    <div
      v-if="!valid"
      class="text-xs text-red-500 mt-1"
    >
      {{ errorStore.errors[props.name][0] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  showPlaceholder: {
    type: Boolean,
    default: true,
  },
  full: {
    type: Boolean,
    default: true,
  },
  paddingClass: {
    type: String,
    default: 'p-3 pr-6',
  },
})

const errorStore = useErrorStore()
const inputContent = ref(null)
const valid = computed(() => {
  const validated = !(errorStore.errors && errorStore.errors[props.name])
  const formId = inputContent.value?.parentElement?.closest('form')?.getAttribute('id')
  const errorFormId = errorStore.formId
  if (errorFormId)
    return errorFormId === formId ? validated : true
  else
    return validated
})
</script>

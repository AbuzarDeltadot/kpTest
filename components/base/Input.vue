<template>
  <div
    ref="inputContent"
    class="flex flex-col justify-center"
    :class="{
      'w-full': full,
    }"
  >
    <label
      class="flex items-center select-none space-x-2"
      :class="{
        'w-full': full,
      }"
    >
      <div
        class="space-y-1"
        :class="{
          'w-full': type !== 'checkbox',
        }"
      >
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
        <input
          v-bind="{ ...$props, ...$attrs }"
          :type="type"
          :class="[
            {
              'w-full': full,
            },
            typeClass,
            paddingClass,
            valid ? 'border-gray-300 focus:ring-secondary focus:border-secondary focus:ring-opacity-50' : 'border-red-500 focus:ring-red-200 focus:border-red-600',
          ]"
          class="rounded focus:ring"
          :value="modelValue"
          :name="name"
          @input="$emit('update:modelValue', $event.target.value)"
        >
      </div>
      <slot />
    </label>

    <div
      v-if="helperText"
      class="text-xs text-gray-500 mt-1"
    >
      {{ helperText }}
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
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
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
  full: {
    type: Boolean,
    default: true,
  },
  paddingClass: {
    type: String,
    default: 'p-3',
  },
  helperText: {
    type: String,
    default: '',
  },
})
const typeClass = computed(() => {
  let formClass = 'form-input'
  switch (props.type) {
    case 'checkbox':
      formClass = 'form-checkbox text-primary'
      break
  }
  return formClass
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

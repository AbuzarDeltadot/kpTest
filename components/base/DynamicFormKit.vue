<template>
  <div
    class="lg:w-1/2 pb-7 w-full"
    v-if="props.dynamicFormFields?.type === 'dynamic_form'"
  >
    <FormKit
      v-if="!formSubmitted"
      type="form"
      id="myForm"
      ref="myForm"
      v-model="data"
      @submit="handleSubmit"
      :actions="false"
    >
      <FormKitMessages :node="input?.node" />
      <FormKitSchema :schema="dynamicSchema" ref="input"> </FormKitSchema>

      <button
        :disabled="isFormInvalid"
        :class="{ 'disabled-button': isFormInvalid }"
        v-if="submitField"
        type="submit"
        class="pointer-events-auto mt-6 mb-6 rounded-lg py-2 mt-8 text-lg w-full bg-primary text-white hover:border-secondary hover:bg-secondary"
      >
        <span>{{ submitField.name || 'Submit' }}</span>
      </button>
    </FormKit>
  </div>
</template> 

<script setup>
import { ref, computed } from 'vue'
import { FormKitMessages } from '@formkit/vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const props = defineProps(['dynamicFormFields'])

// Reactive data
const data = ref({})
const input = ref()
const formSubmitted = ref(false)

const isFormInvalid = computed(() => {
  const formValues = Object.values(data.value)
  // console.log(formValues, 'formvaluee')
  return formValues.every((value) => !value)
})

const dynamicSchema = computed(() => {
  const fields = props.dynamicFormFields?.dynamic_form_fields || []

  const filteredFields = fields.filter(
    (field) =>
      field.field_type !== 'submit' &&
      field.field_type !== 'radio' &&
      field.field_type !== 'checkbox'
  )

  return filteredFields.map((field) => {
    const optionsArray = field?.options
      ? field.options.split(',').map((option) => option.trim())
      : null
    const required = field?.is_required ? 'required' : null

    let inputClass = 'input'
    if (field.field_type === 'text') {
      inputClass = 'text-input'
    } else if (field.field_type === 'email') {
      inputClass = 'text-input'
    }

    return {
      $formkit: field?.field_type,
      name: field?.name,
      label: field?.label,
      placeholder: field?.placeholder,
      validation: required,
      options: optionsArray,
      classes: {
        fieldset: 'fieldset',
        outer: inputClass,
        input: 'input',
        message: 'message',
        actions: 'action',
        submit: 'submit-button',
        wrapper: 'wrapper'
      }
    }
  })
})

const submitField = computed(() => {
  const submitFields = props.dynamicFormFields?.dynamic_form_fields.filter(
    (field) => field.field_type === 'submit'
  )
  return submitFields.length > 0 ? submitFields[0] : null
})

const handleSubmit = async () => {
  try {
    const { success, error } = await usePost('/products-dynamic-form', {
      body: JSON.stringify({
        ...data.value,
        product_details_id: props.dynamicFormFields.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (success) {
      data.value = {}
      formSubmitted.value = true
      Swal.fire({
        title: 'Thanks Submitted The Form',
        icon: 'success',
        confirmButtonText: 'back to form',
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
        }
      }).then((result) => {
        if (result.isConfirmed) {
          formSubmitted.value = false
        } else if (result.isDenied) {
          formSubmitted.value = false
        } else {
          formSubmitted.value = false
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to submit the form',
        text: error.message || 'An error occurred while submitting the form',
        showConfirmButton: true
      })
      console.error('Failed to submit the form:', error)
    }
  } catch (error) {
    console.error('Error submitting the form:', error.message)
  }
}
</script>

<style >
.formkit-outer.outer {
  padding: 10px;
}

.submit-button {
  width: 100%;
  border: 1px solid #163a92;
  border-radius: 4px;
  background: #163a92;
  color: white;
  padding: 10px;
  display: none;
}

.submit-button:hover {
  border: 1px solid #30c4c2;
  background: #30c4c2;
  color: white;
  padding: 10px;
  display: none;
}
.disabled-button {
  background: #f6f6f6;
  cursor: pointer;
  color: black;
}
.disabled-button:hover {
  opacity: 0.2;
  filter: grayscale(1);
  opacity: 0.2;
  filter: grayscale(1);
}

.formkit-input.input {
  background: #f8f8f8 !important;
  width: 100%;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
}

.formkit-message {
  color: red !important;
  margin-top: -4px;
}
ul.formkit-messages {
  position: absolute;
}

[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

[data-complete] .formkit-inner {
  border-color: red;
  /* box-shadow: 0 0 0 1px green; */
}
.formkit-wrapper.wrapper {
  padding-top: 10px;
}

.text-input {
  display: inline-block;
  padding: 10px 8px 10px 0px;
  box-sizing: border-box;
  width: 50%;
}
@media screen and (max-width: 767px) {
  .text-input,
  .email-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
}

.text-input {
  display: inline-block;
  padding: 10px 8px 10px 0px;
  box-sizing: border-box;
  width: 50%;
}
@media screen and (max-width: 767px) {
  .text-input,
  .email-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>

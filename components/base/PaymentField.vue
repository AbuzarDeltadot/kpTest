<template>
  <label
    v-for="(option, i) in props.context.attrs.options"
    :key="i"
    :class="`customRadio-input block p-3 border rounded-lg transition mb-2 cursor-pointer flex flex-wrap gap-[15px] justify-start items-start hover:bg-[#1660CF]/[.1] hover:border-[#1660CF] ${activeItem === option.value ? 'active border-[#1660CF] bg-[#1660CF]/[.1]' : ''}`"
  >
    <input
      v-model="activeItem"
      type="radio"
      :name="props.context.attrs.key"
      :value="option?.value"
      class="mt-[5px] accent-[#1660CF]"
      @input="handleInput"
    >
    <div
      class="font-semibold min-w-[50px] leading-[20px]"
      v-html="option?.label"
    />
    <div
      v-if="option?.help"
      class="text-sm text-[#4B5563] leading-[20px]"
      v-html="option?.help"
    />
    <div
      v-if="option.icon"
      class="ml-auto"
    ><img
      :src="option.icon"
      alt="payment_methods"
    ></div>
    <div v-if="option.value === `credit` && activeItem === `credit`">

      <div

        class="flex flex-row gap-3 w-full mt-5"
      >
        <!-- <FormKit
          type="text"
          label="Card Number"
          name="card_number"
          placeholder="1234 5678 9101 3456"
          validation="required"
          :classes="{ outer: 'w-1/2 card-field', input: 'bg-[#e7effa]' }"
        /> -->
        <FormKit
          type="text"
          name="card_number"
          label="*Card Number"
          placeholder="1234 5678 9101 3456"
          validation="required"
          :classes="{ outer: 'w-1/2 card-field', input: 'bg-[#e7effa]' }"
        >
          <template #input="context">
            <input
              :id="context?.id"
              v-model="maskedCreditCardNumber"
              :class="context.classes.input"
              :type="context.type"
              :name="context.node.name"
              :placeholder="context.attrs.placeholder"
              maxlength="19"
              @input="(e) => { handleCNInput(e, context) }"
            >
          </template>
        </FormKit>
        <!-- <FormKit
          type="text"
          label="Expiration Date"
          name="expiration_date"
          placeholder="MM/YY"
          validation="required"
          :classes="{ outer: 'w-1/2 card-field', input: 'bg-[#e7effa]' }"
        /> -->
        <FormKit
          type="text"
          name="expiration_date"
          label="*Expiration Date"
          placeholder="MM/YY"
          validation="required"
          :classes="{ outer: 'w-1/2 card-field', input: 'bg-[#e7effa]' }"
        >
          <template #input="context">
            <input
              :id="context?.id"
              v-model="maskedExpirationDate"
              :class="context.classes.input"
              :type="context.type"
              :name="context.node.name"
              :placeholder="context.attrs.placeholder"
              maxlength="5"
              @input="(e) => { handleExpInput(e, context) }"
            >
          </template>
        </FormKit>
      </div>
      <FormKit
        type="password"
        label="*Card Security Code"
        name="security_code"
        placeholder="***"
        validation="required"
        :classes="{ outer: 'w-1/2 card-field', input: 'bg-[#e7effa]' }"
      />

    </div>
  </label>
</template>

<script setup>
const props = defineProps({
  context: Object,
})

const maskedCreditCardNumber = ref('')
const maskedExpirationDate = ref('')

const handleCNInput = (event, context) => {
  const input = event.target
  const value = input.value.replace(/\D/g, '')
  const formattedValue = formatCreditCardNumber(value)
  maskedCreditCardNumber.value = formattedValue
  context.node.input(formattedValue)
}
const formatCreditCardNumber = (value) => {
  const parts = []
  for (let i = 0; i < value.length; i += 4)
    parts.push(value.slice(i, i + 4))

  return parts.join(' ')
}
const handleExpInput = (event, context) => {
  const input = event.target
  const value = input.value.replace(/\D/g, '')
  const formattedValue = formatExpirationDate(value)
  maskedExpirationDate.value = formattedValue
  context.node.input(formattedValue)
}

const formatExpirationDate = (value) => {
  const month = value.slice(0, 2)
  const year = value.slice(2, 4)
  return `${month}/${year}`
}

const activeItem = ref('')
const checkActive = (option) => {
  if (option?.checked) {
    props.context.node.input(option.value)
    activeItem.value = option.value
    return true
  }

  return false
}
props.context.attrs.options.forEach((element) => {
  if (element.checked) {
    props.context.node.input(element.value)
    activeItem.value = element.value
    // useShopStore().updateShippingFee(element.value))
  }
})
function handleInput(e) {
  props.context.node.input(e.target.value)
  activeItem.value = e.target.value
  // useShopStore().updateShippingFee(parseFloat(e.target.value).toFixed(2))
}
</script>

<template>
  <label
    v-for="(option, i) in props?.context?.attrs?.options"
    :key="i"
    :class="`customRadio-input block p-3 border rounded-lg transition mb-2 cursor-pointer flex gap-[15px] justify-start items-start hover:bg-[#1660CF]/[.1] hover:border-[#1660CF] ${activeItem === option.id ? 'active border-[#1660CF] bg-[#1660CF]/[.1]' : ''}`"
  >
    <input
      v-model="activeItem"
      type="radio"
      :name="props.context.attrs.key"
      :value="option.id"
      class="mt-[5px] accent-[#1660CF]"
      @input="handleInput"
    >
    <div
      class="font-semibold min-w-[50px] leading-[20px]"
      v-html="$config.CURRENCY + option.price"
    />
    <div
      class="text-sm text-[#4B5563] leading-[20px]"
    >{{ option.label }}<br>{{ option.description }}</div>
  </label>
</template>

<script setup>
const props = defineProps({
  context: Object,
})

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
    useShopStore().updateShippingFee(parseFloat(element.value).toFixed(2))
  }
})
function handleInput(e) {
  const itemFilter = props?.context?.attrs?.options.filter(item => parseInt(item.id) === parseInt(e.target.value))[0]
  const price = parseFloat(itemFilter.price).toFixed(2)
  props.context.node.input(price)
  activeItem.value = price
  useShopStore().updateShippingFee(price)
  useShopStore().selectShipping(itemFilter)
}
</script>

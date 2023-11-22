<template>
  <div :class="baseClass">
    <div class="flex flex-row gap-3">
      <!-- <FormKit
        v-model="postCode"
        type="text"
        label="Post Code"
        name="post_code"
        placeholder=""
        validation="required"
        :classes="{ outer: 'w-1/2', input: 'post_code' }"
      /> -->
    </div>
    <FormKit
      v-model="street"
      type="text"
      label="*Street Address"
      validation="required|length:3"
      name="street_address"
      placeholder=""
      :classes="{ input: 'street_address' }"
    />
    <FormKit
      type="text"
      name="street_address_2"
    />
    <div class="flex flex-row gap-3">
      <FormKit
        v-model="state"
        type="text"
        label="*State/Province"
        name="state_province"
        placeholder=""
        validation="required|length:3"
        :classes="{ outer: 'w-1/2', input: 'state_province' }"
      />
      <FormKit
        v-model="city"
        type="text"
        label="*City"
        name="city"
        placeholder=""
        validation="required|length:3"
        :classes="{ outer: 'w-1/2', input: 'city' }"
      />
    </div>
    <div class="flex flex-row gap-3">
      <FormKit
        v-model="postCode"
        type="text"
        label="*Post Code"
        name="post_code"
        placeholder=""
        validation="required"
        :classes="{ outer: 'w-1/2', input: 'post_code' }"
      />
      <FormKit
        v-model="country"
        type="text"
        label="*Country"
        name="country"
        validation="required|length:3"
        placeholder=""
        :classes="{ outer: 'w-1/2', input: 'country' }"
        @input="(e) => handleCountryCode(e)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCountryCode } from '~~/utils/useCountryCode'
const props = defineProps({
  baseClass: String,
  prefill: Object,
})

const shop = useShopStore().data
const address = ref('')
const postCode = ref('')
const phone = ref('')
const street = ref('')
const streetAddress2 = ref('')
const state = ref('')
const city = ref('')
const country = ref('')
const countryCode = ref('')

watch(shop, (shopData) => {

  if (!street.value)
    street.value = shopData.prefillData[props.baseClass].address_line_one
  if (!streetAddress2.value)
    streetAddress2.value = shopData.prefillData[props.baseClass].address_line_two
  if (!postCode.value)
    postCode.value = shopData.prefillData[props.baseClass].post_code
  if (!city.value)
    city.value = shopData.prefillData[props.baseClass].city
  if (!state.value)
    state.value = shopData.prefillData[props.baseClass].state
  if (!country.value)
    country.value = shopData.prefillData[props.baseClass].country


})

onMounted(() => {
  // initializeAutocomplete(document.querySelector(`.${props.baseClass} .post_code`), 'postal_code')
  initializeAutocomplete(document.querySelector(`.${props.baseClass} .street_address`), 'street_address')

  if (!street.value)
    street.value = shop.prefillData[props.baseClass].address_line_one
  if (!streetAddress2.value)
    streetAddress2.value = shop.prefillData[props.baseClass].address_line_two
  if (!postCode.value)
    postCode.value = shop.prefillData[props.baseClass].post_code
  if (!city.value)
    city.value = shop.prefillData[props.baseClass].city
  if (!state.value)
    state.value = shop.prefillData[props.baseClass].state
  if (!country.value)
    country.value = shop.prefillData[props.baseClass].country

  // initializeAutocomplete(document.querySelector(`.${props.baseClass} .state_province`), 'administrative_area_level_1')
  // initializeAutocomplete(document.querySelector(`.${props.baseClass} .city`), 'locality')
  // initializeAutocomplete(document.querySelector(`.${props.baseClass} .country`), 'country')
})
function capitalizeWords(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
const handleCountryCode = (value) => {
  if (props.baseClass === 'shipping') {
    const code = useCountryCode[capitalizeWords(value)]
    if (code)
      useShopStore().getShippingDetails(code)
    else
      useShopStore().clearShippingDetails()
  }
}

const initializeAutocomplete = (element, type) => {
  const autocomplete = new google.maps.places.Autocomplete(element, {})
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    address.value = place
    if (place.formatted_address)
      updateField(place, place.address_components)
  })
}

const updateField = (place, addressComponents) => {
  const countryObj = addressComponents.filter(item => item.types.includes('country'))[0]
  const stateObj = addressComponents.filter(item => item.types.includes('administrative_area_level_1'))[0]
  const postalObj = addressComponents.filter(item => item.types.includes('postal_code'))[0]
  const cityObj = addressComponents.filter(item => item.types.includes('locality'))[0]
  countryCode.value = countryObj?.short_name
  country.value = countryObj?.long_name
  state.value = stateObj?.long_name
  city.value = cityObj?.long_name
  postCode.value = postalObj?.long_name
  street.value = place?.formatted_address

  if (countryCode.value && props.baseClass === 'shipping')
    useShopStore().getShippingDetails(countryCode.value)
}
</script>

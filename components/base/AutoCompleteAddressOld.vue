<template>
  <!-- <div>
    <input
      ref="addressInput"
      v-model="address"
      type="text"
      placeholder="Enter your address"
      @input="handleInput"
    >
    <ul v-if="predictions.length">
      <li
        v-for="(prediction, index) in predictions"
        :key="index"
        @click="selectPrediction(prediction)"
      >
        {{ prediction.display_name }}
      </li>
    </ul>
  </div> -->
  <div
    class="formkit-outer w-1/2"
    data-family="text"
    data-type="text"
    data-empty="true"
    data-complete="true"
  >
    <div class="formkit-wrapper">
      <label
        class="formkit-label"
        for="addressField"
      >State/Province</label><div class="formkit-inner">
        <input
          id="addressField"
          ref="addressInput"
          v-model="address"
          type="text"
          placeholder="Enter your address"
          class="formkit-input"
          @input="handleInput"
        >
        <ul v-if="predictions.length">
          <li
            v-for="(prediction, index) in predictions"
            :key="index"
            @click="selectPrediction(prediction)"
          >
            {{ prediction.display_name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCountryCode } from '@/utils/useCountryCode'

const address = ref('')
const predictions = ref([])
const debounceTimer = ref(null)

const handleInput = () => {
  clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(fetchPredictions, 300)
}

const fetchPredictions = async () => {
  if (!address.value) {
    predictions.value = []
    return
  }

  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address.value)}&addressdetails=1&format=json&limit=5`)
  // const response = await fetch(`https://nominatim.openstreetmap.org/search/${address.value}?format=json&addressdetails=1&limit=1&polygon_svg=1`)
  const data = await response.json()
  predictions.value = data
}

const selectPrediction = (prediction) => {
  address.value = prediction.display_name
  predictions.value = []

  // Extract the country code from the display name
  const displayParts = prediction.display_name.split(', ')
  const countryCode = displayParts[displayParts.length - 1]
  const cCode = useCountryCode[countryCode]

  if (cCode)
    useShopStore().getShippingDetails(cCode)


}

onMounted(() => {
  // Cleanup
  return () => clearTimeout(debounceTimer.value)
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
}

li {
  padding: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>

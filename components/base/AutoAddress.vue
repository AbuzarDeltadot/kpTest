<template>
  <div>
    <input
      ref="autocompleteInput"
      type="text"
      placeholder="Enter a location"
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const autocompleteInput = ref < HTMLInputElement | null > (null)

onMounted(() => {
  if (typeof google !== 'undefined' && google.maps) {
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) {
      }
    })
  }
})
</script>

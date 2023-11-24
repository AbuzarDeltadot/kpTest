<template>
  <section
    v-if="features?.length > 0"
    class="bg-white py-10"
  >
    <div class="max-w-7xl mx-auto grid min-[650px]:grid-cols-2 px-4 lg:grid-cols-4 gap-6">
      <div
        v-for="(item, index) in features"
        :key="index"
        class="p-4 border rounded-lg flex items-center gap-3 relative"
        :style="`border-color: ${item.color}50;`"
      >
        <div class="w-12 h-12">
          <img
            :src="$config.public.IMAGE_URL + item.image"
            class="w-full h-full object-contain object-center"
          >
        </div>
        <span class="border-l-2 h-12 bg-primary" />
        <div>
          <p
            class="font-semibold"
            :style="`color: ${item.color};`"
          >
            {{ item.heading }}
          </p>
          <p
            class="text-xs"
            :style="`color: ${item.color};`"
          >
            {{ item.description }}
          </p>
        </div>
        <span
          class="block absolute right-0 top-1/2 -translate-y-1/2 h-12 border-r-8"
          :style="`border-color: ${item.color};`"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

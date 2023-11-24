<template>
  <a :class="`${className}`" :href="detail.link" target="_blank">
    <div
      class="h-full border-2 border-gray-200 border-opacity-60 rounded-xl overflow-hidden lg:p-1"
    >
      <img
        class="group-[.first]:aspect-square aspect-[16/14] w-full object-cover rounded-xl object-center bg-gray"
        :src="$config.public.IMAGE_URL + detail.image"
        alt="blog"
      />
      <div class="p-3 flex items-center justify-center">
        <h1 class="text-[15px] text-center font-medium">
          {{ detail.label }}
        </h1>
      </div>
    </div>
  </a>
</template>

<script setup>

const props = defineProps({
  detail: Object,
  className: String
})
</script>

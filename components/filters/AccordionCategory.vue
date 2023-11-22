<template>
  <div class="category border-b">
    <div
      class="flex items-center justify-between pr-2"
      :class="{ 'bg-blue-200': isAccordionOpen, 'bg-[#FCFCFC] hover:bg-blue-100': !isAccordionOpen }"
    >
      <label
        :class="{ 'bg-blue-200': isAccordionOpen, '': !isAccordionOpen }"
        class="w-full text-left px-4 py-2 "
      >
        <span class="flex items-center cursor-pointer"><input
          type="checkbox"
          class="mr-3 cursor-pointer outline-0 focus:ring-0 rounded"
          :value="category.slug"
          :name="type"
        > {{ category.name }} <img
          v-if="type === 'brands' && category.image"
          class="h-5 w-16 object-contain object-right ml-auto"
          :src="$config.IMAGE_URL + category.image"
        ></span>

      </label>
      <svg
        v-if="category?.sub_categories?.length > 0"
        data-accordion-icon
        :class="`w-6 h-6 p-2 rounded cursor-pointer transition ${isAccordionOpen ? 'rotate-0 hover:bg-white' : 'rotate-180 hover:bg-blue-200'}`"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        @click="(e) => { if (category?.sub_categories?.length > 0) toggleAccordion() }"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </div>
    <div

      class="pl-4"
      :class="{ hidden: !isAccordionOpen }"
    >
      <AccordionCategory
        v-for="subcategory in category.sub_categories"
        :key="subcategory.id"
        :category="subcategory"
        :type="`sub_${type}`"
        :prefilled-obj="prefilledObj"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  category: Object,
  type: String,
  action: Function,
  prefilledObj: ref(Object),
})

const isAccordionOpen = ref(false)

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value
}
const prefilledDataValue = computed(() => useShopPageStore().urlQueryObj)

watch(prefilledDataValue, (newValue, oldValue) => {
  props?.category?.sub_categories?.forEach((category) => {
    if (newValue?.sub_categories?.includes(category.slug))
      isAccordionOpen.value = true
  })
})
</script>

<style scoped>
</style>

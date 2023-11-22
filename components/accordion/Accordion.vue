<template>
  <h2 :id="`${unique}-heading`">
    <button
      type="button"
      class="flex items-center bg-[#C7C7C7] justify-between w-full py-3 px-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl outline-0 "
      :data-accordion-target="`#${unique}`"
      aria-expanded="true"
      :aria-controls="unique"
    >
      <span>{{ title }}</span>
      <svg
        v-if="childs"
        data-accordion-icon
        class="w-3 h-3 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>
  <div
    :id="unique"
    class="hidden"
    :aria-labelledby="`${unique}-heading`"
  >
    <div class="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  unique: String,
  childs: Boolean,
  desc: String,
})
</script>

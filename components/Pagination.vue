<template>
  <nav class="rounded-b-lg font-bold flex items-center justify-center">
    <div class="flex text-xs md:text-sm">
      <!-- First Link -->
      <button
        :disabled="meta.current_page === 1"
        class="px-4 py-2 focus:outline-none focus:ring ring-secondary"
        :class="{
          'hover:bg-gray-200': meta.current_page !== 1,
          'cursor-not-allowed bg-gray-100': meta.current_page === 1,
        }"
        @click.prevent="selectPage(1)"
      >
        &laquo; First
      </button>

      <!-- Pages Links -->
      <button
        v-for="(link, linkIndex) in meta.links"
        :key="linkIndex"
        :disabled="!link.url"
        class="px-4 py-2 focus:outline-none focus:ring ring-secondary"
        :class="{
          'bg-secondary text-white': link.active,
          'hover:bg-gray-200': !link.active && link.url,
          'cursor-not-allowed bg-gray-100': !link.url,
        }"
        @click.prevent="selectPage(link.label, linkIndex)"
        v-html="link.label"
      />

      <!-- Last Link -->
      <button
        :disabled="meta.current_page === meta.last_page"
        class="px-4 py-2 focus:outline-none focus:ring ring-secondary"
        :class="{
          'hover:bg-gray-200': meta.current_page !== meta.last_page,
          'cursor-not-allowed bg-gray-100': meta.current_page === meta.last_page,
        }"
        @click.prevent="selectPage(meta.last_page)"
      >
        Last &raquo;
      </button>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  meta: {
    type: Object,
    default() {
      return {}
    },
  },
})

const emit = defineEmits(['updated'])
function selectPage(page, index) {
  page = parseInt(page)
  if (isNaN(page))
    page = index === 0 ? props.meta.current_page - 1 : props.meta.current_page + 1
  updatePageQuery(page)
  emit('updated', page)
}

function updatePageQuery(page) {
  const route = useRoute()
  useRouter().push({
    path: route.path,
    query: {
      ...route.query,
      page,
    },
  })
}
</script>

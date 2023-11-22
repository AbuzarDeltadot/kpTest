<template>
  <BaseLoadingView :loading="loading">
    <div
      class="max-w-screen-lg mx-auto prose prose-slate mx-auto rounded-lg px-6 py-8 bg-white my-2 md:my-4 lg:prose-md"
      v-html="content"
    />
  </BaseLoadingView>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <BaseLoadingView
    v-if="content"
    :loading="loading"
  >
    <div

      :class="`flex flex-wrap gap-2 items-center justify-center w-full min-w-full mx-auto prose prose-slate mx-auto px-6 py-3 text-center lg:prose-md ${className}`"
    >
      <Icon
        name="material-symbols:info"
        class="w-6 h-6 text-primary"
      /><span
        class="block"
        v-html="content"
      />
    </div>
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
  className: {
    type: String,
    default: '',
  },
})
</script>

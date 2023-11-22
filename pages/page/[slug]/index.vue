<template>
  <Template_1 :data="brandData" v-if="brandData?.data?.template_layout === 1" />
  <Template_2 :data="brandData" v-if="brandData?.data?.template_layout === 2" />
  
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Template_1 from '../../../components/templates/Template_1.vue';
import Template_2 from '../../../components/templates/Template_2.vue';
const currentRount = useRoute()
const brandData = ref()
const slug = currentRount.params.slug

await useBrandStore().getPage(slug)

const brand = useBrandStore().pageData

brandData.value = brand

</script>

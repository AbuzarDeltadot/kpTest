<template>
  <BasePageLoader :loader="loading">
    <SingleProductDetail
      :detail="data?.product"
      v-if="Object.keys(data?.product)?.length > 0"
    />
    <div v-else class="min-h-[300px] flex flex-col items-center justify-center">
      <p class="text-gray-500 text-2xl">Product Removed or Doesn't Exists!</p>
      <p>
        <NuxtLink to="/shop"
          ><Icon name="ph:arrow-bend-down-left-thin" /> Back to Shop</NuxtLink
        >
      </p>
    </div>
    <!-- <CollectionSection
      :title="homeData.collection.heading"
      :categories="homeData.collection.categories"
      :products="homeData.collection.products"
    /> -->
  </BasePageLoader>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import CollectionSection from '~~/components/sections/CollectionSection.vue'
import SingleProductDetail from '~~/components/sections/SingleProductDetail.vue'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const currentRount = useRoute()
const homeData = useHomeStore().data.data
const loading = ref(true)
const product = ref({})

const slug = currentRount.params.slug
await useProductStore().getProduct(slug)
const data = useProductStore().data

// console.log(data, 'data')
onBeforeMount(async () => {
  try {
    await useProductStore().getProduct(slug)
    product.value = useProductStore().data
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})





useHead(() => ({
  title: data?.product?.name,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${data?.product?.name}",
        "description": "${data?.product?.plan_description}",
        "sku": "${data?.product?.attributes[Object.keys(data?.product?.attributes)[0]][0].sku}",
        "mpn": "${data?.product?.attributes[Object.keys(data?.product?.attributes)[0]][0].sku}",
        "image": [
          ${data?.product?.attributes[Object.keys(data?.product?.attributes)[0]][0].imageUrls
            .map((image) => `"${config.IMAGE_URL + image}"`)
            .join(',\n')}
        ],
        "brand": {
          "@type": "Brand",
          "name": "${data?.product?.brand?.name}"
        },
        "offers": {
          "@type": "Offer",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "${data?.product?.attributes[Object.keys(data?.product?.attributes)[0]][0].price}",
            "priceCurrency": "GBP"
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "UK",
          "returnPolicyCategory": "https://kp-pharma.co.uk/shipping-&-return",
          "merchantReturnDays": 14,
          "returnMethod": "https://kp-pharma.co.uk/sales@kp-pharma.co.uk",
          "returnFees": "https://kp-pharma.co.uk/shipping-&-return"
        }
      }`
    }
  ]
}))

function formatDate(dateString) {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return formattedDate
}
</script>

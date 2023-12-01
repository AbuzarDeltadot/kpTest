<template>
  <BasePageLoader :loader="data.loading" v-if="!homeData?.error">
    <NotificationBar
      :content="notificationContent"
      v-if="notificationContent && products && products.length > 0"
      :loading="false"
      class-name="bg-azure"
    />

    <!-- Top Banner -->
    <ShopBanner :banner-data="homeData?.banners" />

    <!-- Features -->
    <FeatureSection :features="homeData?.features" />

    <!-- Brands Section -->
    <BrandSection
      :title="homeData?.brand?.heading"
      :brands="homeData?.brand?.brands"
      v-if="homeData?.brand?.brands && homeData?.brand?.brands.length > 0"
    />

    <!-- Always Here For You -->
    <AlwaysForYouSection
      :title="homeData?.Always_for_you?.heading"
      :desc="homeData?.Always_for_you?.subHeading"
      :content="homeData?.Always_for_you?.items"
    />

    <!-- Special Collections -->
    <!-- :categories="homeData?.collection?.categories"  -->
    <!-- <CollectionSection
      title="Collections"
      :products="products "
    /> -->
    <div class="py-[20px] bg-white">
      <div
        :ref="loadMoreButtonWrapper"
        class="lg:col-span-3 bg-white p-5 max-w-7xl mx-auto transition"
        :class="{ 'opacity-20 pointer-events-none': isLoading }"
      >
        <div
          v-if="products?.length > 0"
          class="grid md:grid-cols-4 gap-4 self-start"
        >
          <template v-if="products?.length > 0">
            <ProductArchive
              v-for="(product, index) in products"
              :key="index"
              :detail="product"
            />
          </template>
        </div>
        <!-- <div
          v-else
          class="min-h-[300px] flex flex-col items-center w-full justify-center text-2xl p-4 text-gray-300"
        >
          <Icon name="bi:box2" class="w-8 h-12 block text-gray-300" />
          No Product found!
        </div> -->
        <button
          v-show="products?.length > 0"
          ref="loadMoreButton"
          :disabled="!loadMore"
          class="w-fit demo mx-auto block mt-5 text-white hover:bg-secondary transition px-6 py-3 rounded-full bg-primary"
          :class="{ 'pointer-events-none opacity-40 bg-gray-300': !loadMore }"
          @click="(e) => handleLoadMore()"
        >
          Load More
        </button>
      </div>
    </div>
    <!-- Blogs Section -->
    <BlogSection
      :title="homeData?.blog?.heading"
      :desc="homeData?.blog?.subHeading"
      :content="homeData?.blog?.blogs"
    />

    <!-- Feedback Button -->
    <button
      class="bg-primary py-1 text-xs rounded-b-lg shadow-lg hover:bg-secondary transition px-4 fixed md:top-1/2 top-[90%] left-0 -translate-y-1/2 text-white z-10 -rotate-90 origin-top-left"
    >
      Feedback
    </button>
  </BasePageLoader>
  <!-- <div v-else></div> -->
</template>

<script setup>
import ShopBanner from '~~/components/ShopBanner.vue'
import NotificationBar from '~~/components/base/NotificationBar.vue'
import CollectionSection from '~~/components/sections/CollectionSection.vue'
import FeatureSection from '~~/components/sections/FeatureSection.vue'
import BrandSection from '~~/components/sections/BrandSection.vue'
import ProductArchive from '~~/components/base/ProductArchive.vue'
import AlwaysForYouSection from '~~/components/sections/AlwaysForYouSection.vue'
import ConsultationSection from '~~/components/sections/ConsultationSection.vue'
import BlogSection from '~~/components/sections/BlogSection.vue'
import YouMayLikeSection from '~~/components/sections/YouMayLikeSection.vue'
// const bannerData = ['a', 'b']
// import { ref } from 'vue'
const products = computed(() => useBrandStore().productBrand)
const loadMore = computed(() => useBrandStore().loadMoreUrl)
const isLoading = computed(() => useBrandStore().isLoading)
const loadMoreButton = ref(null)
// console.log(products,"template")
const props = defineProps({
  data: Object
})

const notificationContent = ''
useHead({
  title: props.data.title
})

const homeData = ref({})
const chunk = ref(1)
const route = useRoute()
// const slug = currentRount.params.slug
// const products = ref([])
// const shop = useHomeStore().data
// const shop = {loading: true}
// homeData.value = props.data
homeData.value = props.data.data
// products.value = props.data.products
// console.log(props.data.data,"product data")

const handleLoadMore = () => {
  if (loadMore.value) {
    chunk.value = chunk.value + 1
    useBrandStore().getBrandProduct(route?.params?.slug, chunk.value)
  }
}


const loadMoreButtonWrapper = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!loadMore.value || isLoading.value) {
            return
          } else {
            handleLoadMore()
          }
        }
      })
      // }
    },
    {
      threshold: 0.5
    }
  )
  if (loadMoreButton.value) {
    observer.observe(loadMoreButton.value)
  }
})
</script>
<style scoped>
</style>

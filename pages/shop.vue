<template>
  <section class="md:py-[70px] py-[20px] bg-white">
    <div class="grid gap-7 lg:grid-cols-4 max-w-7xl mx-auto px-3">
      <div class="lg:hidden flex justify-between items-center px-4">
        <!-- Right side - Filter icon -->

        <button
          aria-label="Hamburger Menu"
          class="flex items-center rounded"
          @click="showMobileMenu = !showMobileMenu"
        >
          <Icon
            v-if="!showMobileMenu"
            :name="'fluent-filter-add-20-filled'"
            class="w-8 h-8 text-gray-500"
          />
          <span class="text-[25px] px-4">Filter by</span>

          <!-- <span
            v-else
            class="text-[25px]"
            @click="showMobileMenu = !showMobileMenu"
            >Filter by</span -->
        </button>
        <!-- Left side - Cross icon -->
        <button
          aria-label="Filter"
          class="flex items-center rounded"
          @click="showMobileMenu = !showMobileMenu"
        >
          <Icon
            v-if="showMobileMenu"
            :name="'gridicons:cross'"
            class="w-8 h-8 text-gray-500"
          />
        </button>
      </div>
      <hr class="horizontal lg:hidden" />

      <!-- Filters Component - Displayed only on smaller screens -->
      <div class="lg:hidden" v-show="showMobileMenu">
        <Filters :changeEvent="(e) => filterChangeHandle()" />
      </div>

      <!-- Filters Component - Displayed on larger screens -->
      <div class="hidden lg:block">
        <Filters :changeEvent="(e) => filterChangeHandle()" />
      </div>
      <div
        class="lg:col-span-3 p-5 transition"
        :class="{ 'opacity-20 pointer-events-none': isLoading }"
      >
        <div
          v-if="products?.length > 0"
          class="grid md:grid-cols-3 gap-4 self-start"
        >
          <template v-if="products?.length > 0">
            <ProductArchive
              v-for="(product, index) in products"
              :key="index"
              :detail="product"
            />
          </template>
        </div>

        <div
          v-else
          class="min-h-[300px] flex flex-col items-center w-full justify-center text-2xl p-4 text-gray-300"
        >
          <Icon name="bi:box2" class="w-8 h-12 block text-gray-300" />
          No Product found!
        </div>

        <button
          ref="loadMoreButton"
          v-show="products?.length > 0"
          :disabled="!loadMore"
          class="w-fit s mx-auto block mt-5 text-white hover:bg-secondary transition px-6 py-3 rounded-full bg-primary"
          :class="{ 'pointer-events-none opacity-40 bg-gray-300': !loadMore }"
          @click="(e) => handleLoadMore()"
        >
          Load More
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Accordions from '~~/components/accordion/Accordions.vue'
import Accordion from '~~/components/accordion/Accordion.vue'
import ProductArchive from '~~/components/base/ProductArchive.vue'
const loadMoreButton = ref(null)

const products = computed(() => useShopPageStore().productsList)
const loadMore = computed(() => useShopPageStore().loadMoreUrl)
const isLoading = computed(() => useShopPageStore().isLoading)
const searchCount = computed(() => useShopPageStore().getSearchCount)
const chunk = ref(1)
const showMobileMenu = ref(false)
const route = useRoute()
const handleLoadMore = (onScroll) => {
  if (loadMore.value) {
    chunk.value = chunk.value + 1
    // console.log(null, chunk.value, 'chunkk value')
    useShopPageStore().getProducts(null, chunk.value, onScroll)
  }
}
const filterChangeHandle = () => {
  chunk.value = 1
}
// const handleLoadMoreOnScroll = () => {
// window.onscroll = function () {

//   const windowHeight = window.innerHeight
//   const scrollHeight = document.documentElement.scrollHeight - windowHeight
//   const scrollTop = window.scrollY

//   const percentage = (scrollTop / scrollHeight) * 100
//   if (percentage > 60) {
//     if (!loadMore.value || isLoading.value) {
//     } else {
//         if (route?.path === '/shop') {
//         handleLoadMore(true)
//         }
//       }
//     }
//   }

// }
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!loadMore.value || isLoading.value) {
            return
          } else {
            handleLoadMore(true)
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
  // console.log(loadMoreButton.value)
})

// onMounted(() => {
// window.addEventListener('onscroll', handleLoadMoreOnScroll())
// handleLoadMoreOnScroll
// })

// Watch for changes in the URL query parameter
onMounted(() => {
  watch(searchCount, (newVal, oldVal) => {
    if (newVal) {
      // console.log(newVal)
      chunk.value = 1
    }
  })
})

// onUnmounted(() => {
// window.removeEventListener('onscroll', handleLoadMoreOnScroll())
// })
</script>

<style scoped>
.horizontal {
  color: #e9e9e4;
  border: 1px solid #e9e9e4;
}
</style>

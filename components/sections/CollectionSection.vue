<template>
  <section

    class="py-8 px-3 bg-white overflow-hidden"
  >
    <div class="max-w-7xl mx-auto">
      <h2 class="text-center md:text-[40px] text-[24px]">
        {{ title }}
      </h2>
      <div class="relative">
        <div
          v-if="categories"

          class="flex md:flex-wrap md:justify-center pb-[15px] px-[25px] md:px-0 justify-start flex-nowrap overflow-scroll md:overflow-hidden items-center mt-4 gap-3 relative"
        >
          <div
            :class="`py-2 ${currentCategory === null ? 'bg-primary border-primary text-white pointer-events-none' : 'border-[#5A5A5A] text-[#5A5A5A]'} whitespace-nowrap md:text-base text-sm text-center px-6 border hover:border-secondary hover:bg-secondary transition hover:text-white cursor-pointer rounded-full `"
            @click="(e) => filterProducts(e, null, null)"
          >
            New
          </div>
          <div
            v-for="(category, index) in categories"
            :key="index"
            :class="`py-2 ${currentCategory === category.id ? 'bg-primary border-primary text-white pointer-events-none' : 'border-[#5A5A5A] text-[#5A5A5A]'} whitespace-nowrap text-center md:text-base text-sm px-6 border hover:border-secondary hover:bg-secondary transition hover:text-white cursor-pointer rounded-full `"
            @click="(e) => filterProducts(e, category.id, category.slug)"
          >
            {{ category.name }}
          </div>
        </div>
        <span class="md:hidden block h-full w-14 pointer-events-none bg-gradient-to-r from-transparent to-white absolute top-0 right-0" />
        <span class="md:hidden block h-full w-14 pointer-events-none bg-gradient-to-r from-white to-transparent absolute top-0 left-0" />
      </div>
      <div
        class="flex gap-3 mt-12 relative md:flex-row flex-col"
      >
        <div class="lg:w-1/4 md:w-1/2 w-full bg-primary rounded-xl overflow-hidden">
          <a class="block relative h-[260px] overflow-hidden">
            <img
              alt="ecommerce"
              class="object-cover object-center w-full h-full block"
              :src="ctaBannerImage"
            >
          </a>
          <div class="p-8 text-white text-center">
            <!-- <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3> -->
            <h2 class="title-font text-lg font-medium">
              New Arrival
            </h2>
            <p class="mb-8 px-4">
              Explore our latest products
              across all categories
            </p>
            <NuxtLink
              :href="shopLink"
              class="py-2 px-6 bg-secondary hover:bg-white hover:text-primary transition text-sm text-center block w-fit mx-auto rounded-full uppercase"
            >
              shop all
            </NuxtLink>
          </div>
        </div>
        <div
          id="productsList"
          ref="productsList"
          class=" md:w-9/12 w-full relative transition"
          :class="{ 'opacity-20 pointer-events-none': collectionLoading.loading }"
        >
          <i
            id="prev-product"
            class="absolute slide-btn -left-4 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
          ><Icon
            name="octicon:chevron-left-24"
            class="w-6 h-8"
          /></i>
          <Swiper
            :space-between="15"

            :navigation="{ nextEl: '#next-product', prevEl: '#prev-product' }"
            :modules="modules"
            :breakpoints="{
              '@0.00': {
                slidesPerView: 1,
              },
              '@0.75': {
                slidesPerView: 1,
              },
              '@1.00': {
                slidesPerView: 3,
              },
              '@1.50': {
                slidesPerView: 3,
              },
            }"
            class="productslider"
          >
            <template
              v-for="(product, index) in currentProducts"
              :key="index"
            >
              <SwiperSlide v-if="product.attributes.length !== 0 ">
                <ProductArchive
                  :detail="product"
                />
              </SwiperSlide>
            </template>
          </Swiper>
          <div
            v-if="currentProducts.length < 1"
            class="flex flex-col w-full h-full items-center justify-center text-gray-300"
          >
            <Icon
              name="bi:box2"
              class="w-8 h-12 block text-gray-300"
            />
            No Items
          </div>
          <i
            id="next-product"
            class="absolute slide-btn -right-4 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
          ><Icon
            name="octicon:chevron-right-24"
            class="w-6 h-8"
          /></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import ctaBannerImage from '/images/productbanner.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Navigation, Pagination } from 'swiper'
import ProductArchive from '../base/ProductArchive.vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  categories: {
    type: Array,
    default: [],
  },
  products: {
    type: Array,
    default: [],
  },
})
const productsList = ref(null)
const modules = [Navigation, Pagination]

const collectionLoading = useHomeStore().getGollections

const shopLink = ref('/shop')

const currentCategory = ref(null)
const currentProducts = ref([])
const { categories, products } = toRefs(props)
// const categoriesProp = computed(() => props.categories)
const filterProducts = async (e, category, slug) => {
  currentCategory.value = category

  if (slug) {
    shopLink.value = `/shop?categories=${slug}`
    const categorisedItems = await useHomeStore().getCategorisedProducts(slug)
    currentProducts.value = categorisedItems
  }
  else { currentProducts.value = products.value; shopLink.value = '/shop' }

  // if (category) {
  //   const results = products.value.filter((item) => {
  //     return item.category_product && item.category_product.some(catProduct => catProduct.category_id === category)
  //   })
  //   currentProducts.value = results
  // }
  // else {
  //   currentProducts.value = products.value
  // }
  const docWidth = window.innerWidth
  if (e && productsList.value && docWidth < 768) {
    productsList.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      top: 20,
    })
  }
}
onMounted(async () => {
  filterProducts(null, null)
  // blogPost.value = { title: 'abc', content: 'def' } // Replace with your actual data fetching logic
})
// watch(categories, (newData) => {
//   // if (newData.length > 0)
//   filterProducts(null, null)
// })
</script>

<style>
#prev-product.swiper-button-disabled, #next-product.swiper-button-disabled {
    display: none !important;
}
</style>

<template>
  <section v-if="brands" class="py-[70px] bg-[#F6F6F6]">
    <div class="max-w-7xl mx-auto px-3">
      <div class="flex items-center justify-between">
        <h2 class="sm:text-[40px] text-[24px]">
          {{ title }}
        </h2>
        <span v-if="brands?.length > 8" class="flex gap-2">
          <i
            id="prev-brand"
            class="text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
            ><Icon name="octicon:chevron-left-24" class="w-6 h-8"
          /></i>
          <i
            id="next-brand"
            class="text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
            ><Icon name="octicon:chevron-right-24" class="w-6 h-8" /></i
        ></span>
      </div>
      <Swiper
        :breakpoints="{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 10,
            grid: {
              rows: brands?.length > 4 ? 2 : 1
            }
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: brands?.length > 4 ? 2 : 1
            }
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 20,

            grid: {
              rows: brands?.length > 4 ? 2 : 1
            }
          },
          '@1.50': {
            slidesPerView: brands?.length <= 6 && brands?.length > 4 ? 3 : 4,
            spaceBetween: 30,
            grid: {
              rows: brands?.length > 4 ? 2 : 1
            }
          }
        }"
        :navigation="{ nextEl: '#next-brand', prevEl: '#prev-brand' }"
        :modules="modules"
        :class="`brandSlider ${
          brands?.length !== 4 && brands?.length < 8 ? 'slidercenter' : ''
        }`"
      >
        <SwiperSlide v-for="(brand, index) in brands" :key="index">
          <NuxtLink
            :href="
              brand?.template_layout === 0 || !brand?.template_layout
                ? `${
                    !brand.link || brand.link === '#'
                      ? `/shop?brands=${brand.slug}`
                      : brand.link
                  }`
                : `/brand/${brand.slug}`
            "
            class="p-4 border border-[#cccccc] rounded-lg sm:h-[120px] h-[80px] flex items-center justify-center"
            target="_self"
          >
            <!-- :target="brand.link && brand.link !== '#' ? '_blank' : '_self'" -->
            <!-- :target="brand.link && brand.link !== '#' ? '_blank' : ''" -->
            <img
              :src="$config.public.IMAGE_URL + brand.image"
              alt="brand"
              class="h-full object-contain"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/grid'
import 'swiper/css/pagination'

// import './style.css'

// import required modules
import { Grid, Navigation, Pagination } from 'swiper'
import { setTokenSourceMapRange } from 'typescript'

const props = defineProps({
  title: String,
  brands: {
    type: Array,
    default: null
  }
})
const modules = [Grid, Pagination, Navigation]
// export default {
//   components: {
//     Swiper,
//     SwiperSlide,
//   },
// setup() {
//   return {
//     modules: [Grid, Pagination],
//   }
// },
// }
</script>

<style>
.brandSlider .swiper-wrapper {
  flex-direction: row !important;
  .swiper-slide {
    margin-top: 20px !important;
  }
}
.slidercenter .swiper-wrapper {
  justify-content: center;
}
</style>

<template>
  <section class="py-8 bg-white">
    <div class="max-w-7xl mx-auto px-3">
      <h2 class="text-[40px] text-center">
        {{ title }}
      </h2>
      <p class="max-w-xl mx-auto text-center">
        {{ desc }}
      </p>
      <div class="relative mx-auto mt-8 mb-12">
        <i
          id="prev-like"
          class="absolute slide-btn -left-12 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition "
        ><Icon
          name="ic:round-arrow-back"
          class="w-6 h-8 text-[#5A5A5A]"
        /></i>
        <Swiper
          slides-per-view="5"
          :space-between="10"
          :pagination="{
            clickable: true,
          }"
          :navigation="{ nextEl: '#next-like', prevEl: '#prev-like' }"
          :modules="modules"
          class="likeSlider"
        >
          <SwiperSlide
            v-for="(item, index) in content"
            :key="index"
            class="auto-width-slide"
          >
            <a class="py-2 px-2 bg-[#F6F6F6] rounded-full block w-full flex items-center gap-2">
              <span
                v-if="item.icon"
                class="h-8 w-8 rounded-full block flex items-center justify-center"
                :style="`background-color: ${item.color};`"
              >
                <Icon
                  :name="item.icon"
                  class="text-white"
                />
              </span>
              <span class="text-sm">
                {{ item.title }}
              </span>
            </a>
          </SwiperSlide>
        </Swiper>
        <i
          id="next-like"
          class="absolute slide-btn -right-12 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition "
        ><Icon
          name="ic:round-arrow-forward"
          class="w-6 h-8 text-[#5A5A5A]"
        /></i>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Navigation, Pagination } from 'swiper'

const props = defineProps({
  title: String,
  desc: String,
})

const modules = [Navigation, Pagination]

const content = [
  { title: 'Multivitamins', link: '#', icon: 'fluent:pill-28-regular', color: '#30C4C2' },
  { title: 'Manuka Honey', link: '#', icon: 'emojione-monotone:honeybee', color: '#163A92' },
  { title: 'Plant Sourced Supplements', link: '#', icon: 'fluent:pill-28-regular', color: '#C2DAD1' },
  { title: 'Hair, Skin & Nails', link: '#', icon: 'fluent:pill-28-regular', color: '#FFB7AE' },
  { title: 'Natural Face Care', link: '#', icon: 'solar:cosmetic-linear', color: '#AACAE6' },
  { title: 'Natural Face Care', link: '#', icon: 'solar:cosmetic-linear', color: '#AACAE6' },
]
</script>

<style>

</style>

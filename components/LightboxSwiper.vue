<template>
  <div class="fixed flex items-center justify-center w-[100vw] h-[100vh] top-1/2 -translate-y-1/2 z-10 ">
    <div
      class="h-full w-full absolute top-0 left-0 bg-black/75 backdrop-blur"
      @click="close()"
    />
    <Swiper
      v-if="images.length > 0"
      class="productgalleryzoomed h-[100vh]"
      :navigation="{ nextEl: '#next-itemZoom', prevEl: '#prev-itemZoom' }"
      :modules="modules"
      :zoom="true"
      :virtual="true"
      :pagination="{
        type: 'fraction',
      }"
      :initial-slide="index"
    >
      <SwiperSlide
        v-for="(image, index) in images"
        :key="index"
        :virtual-index="index"
      >
        <div class="swiper-zoom-container">
          <img
            alt="ecommerce"
            class="max-h-[100vh] object-contain object-center mx-auto"
            :src="$config.public.IMAGE_URL + image"
          >
        </div>
      </SwiperSlide>
    </Swiper>

    <div
      class="z-10 h-14 w-14 rounded-lg shadow-lg absolute top-5 left-5 bg-white flex items-center justify-center cursor-pointer group/zoom"
      @click="(e) => close()"
    >
      <Icon
        name="akar-icons:cross"
        class="text-xl text-primary scale-100 group-hover/zoom:scale-125 ease-in-out duration-300 origin-center"
      />
    </div>
    <div
      v-if="images.length > 1"
      class="z-10 h-14 w-14 rounded-lg shadow-lg absolute top-5 gap-0 right-5 bg-white flex items-center justify-center"
    >
      <span
        id="prev-itemZoom"
        class="ease-in-out duration-300"
      >
        <Icon
          name="majesticons:chevron-left"
          class="text-xl text-primary scale-100 hover:scale-125 ease-in-out duration-300 origin-center cursor-pointer"
        />
      </span>
      <span
        id="next-itemZoom"
        class="ease-in-out duration-300"
      >
        <Icon
          name="majesticons:chevron-right"
          class="text-xl text-primary scale-100 hover:scale-125 ease-in-out duration-300 origin-center cursor-pointer"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Virtual, Zoom } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/pagination'

const props = defineProps({
  images: Object,
  index: Number,
  close: Function,
})
const modules = [Navigation, Pagination, Virtual, Zoom]

</script>

<style>
span#prev-itemZoom.swiper-button-disabled,
span#next-itemZoom.swiper-button-disabled {
  filter: grayscale(1);
  opacity: 0.3;
  pointer-events: none;
}
</style>

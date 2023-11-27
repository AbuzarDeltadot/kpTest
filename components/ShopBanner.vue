<template>
  <!-- <div v-for="slide in bannerData" v-bind:key="slide" >{{slide}}</div> -->

  <section v-if="bannerData.length > 0" class="banner relative">
    <Swiper
      :autoHeight="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :navigation="{ nextEl: '#next-icon', prevEl: '#prev-icon' }"
      :modules="modules"
      :pagination="pagination"
      class="bannerSlider"
      >
      <!-- :controller="{ control: controlledSwiper }" -->
      <SwiperSlide
        v-for="(slide, index) in bannerData"
        :key="index"
        class="md:aspect-[16/6.5] bg-no-repeat b-slide bg-[#fcfcfc]"
        :class="{
          'bg-cover bg-center':
            !slide.sub_heading &&
            !slide.heading &&
            !slide.description &&
            !slide.button_text_one &&
            !slide.button_text_two,
          'max-[500px]:min-h-[650px] md:bg-cover md:bg-center bg-[length:140%] bg-right-bottom':
            slide.sub_heading ||
            slide.heading ||
            slide.description ||
            slide.button_text_one ||
            slide.button_text_two
        }"
        :style="`background-image: url(${
          $config.public.IMAGE_URL + slide.banner_image
        });`"
      >
      <!-- e.preventDefault(); -->
        <div
        @click="redirectBanner(slide?.banner_link)"
        class="aspect-[16/6.5] block w-full h-auto"
        >
        <!-- :href="slide?.banner_link" -->
          <!-- target="_blank" -->
          <!-- <div v-if="!slide.sub_heading && !slide.heading && !slide.description && !slide.button_text_one && !slide.button_text_two" class="aspect-[16/6.5] w-full h-auto"></div> -->
          <div
            class="max-w-7xl mx-auto"
            v-if="
              slide.sub_heading ||
              slide.heading ||
              slide.description ||
              slide.button_text_one ||
              slide.button_text_two
            "
          >
            <div
              class="banner-content-wrap lg:py-32 px-4 pt-14 pb-12 max-w-lg block"
            >
              <div
                v-if="slide.sub_heading || slide.heading || slide.description"
                class="p-5 bg-bannerdark rounded-xl"
              >
                <p
                  v-if="slide.sub_heading"
                  class="subheading text-white text-[15px] md:text-2xl"
                >
                  {{ slide.sub_heading }}
                </p>
                <h1
                  v-if="slide.heading"
                  class="heading font-bold md:text-4xl text-primary text-2xl md:first-line:text-4xl first-line:font-light"
                >
                  {{ slide.heading }}
                </h1>
                <p
                  v-if="slide.description"
                  class="description my-5 pl-3 border-l text-white border-l-4 border-l-secondary md:text-base text-sm"
                >
                  {{ slide.description }}
                </p>
              </div>
              <div class="flex flex-wrap pt-3 gap-3">
                <NuxtLink
                  v-if="slide?.button_text_one"
                  :href="
                    slide?.link_button_one
                      ? slide?.link_button_one
                      : 'javascript:void(0)'
                  "
                  :target="slide?.link_button_one ? '_blank' : ''"
                  class="b-btn-1 px-6 py-3 border rounded-full bg-primary border-2 border-primary text-white text-xs md:text-base uppercase hover:bg-secondary hover:border-secondary transition-colors"
                >
                  {{ slide?.button_text_one }}
                </NuxtLink>
                <NuxtLink
                  v-if="slide?.button_text_two"
                  :href="
                    slide.link_button_two
                      ? slide.link_button_two
                      : 'javascript:void(0)'
                  "
                  :target="slide.link_button_two ? '_blank' : ''"
                  class="b-btn-2 bg-white px-6 py-3 border rounded-full border-2 border-primary text-primary text-xs md:text-base uppercase hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                >
                  {{ slide.button_text_two }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div
      v-if="bannerData.length > 1"
      class="aspect-square hidden h-20 md:flex items-center justify-center shadow-lg rounded-lg w-fit absolute top-1/2 right-12 z-10 bg-white"
    >
      <i
        id="prev-icon"
        class="text-primary cursor-pointer hover:scale-110 transition"
        ><Icon name="octicon:chevron-left-24" class="w-6 h-8"
      /></i>
      <i
        id="next-icon"
        class="text-primary cursor-pointer hover:scale-110 transition"
        ><Icon name="octicon:chevron-right-24" class="w-6 h-8"
      /></i>
    </div>
  </section>
</template>

<script setup>
// Import Swiper Vue.js components

import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { ref } from 'vue'
// import { Controller } from 'swiper/modules'
// import required modules
// import { Navigation } from 'swiper/modules';

const props = defineProps({
  bannerData: {
    type: Array,
    default() {
      return []
    }
  }
})

const router = useRouter()

const redirectBanner = (link)=>{
  if(link)window.open(router.resolve(link).href, '_blank');

}

// const swipe = useSwiper()

// Importing the necessary modules and components
const pagination = {
  clickable: true,
  renderBullet(index, className) {
    return `<span class="${className}"><span></span></span>`
  }
}

const modules = [Autoplay, Pagination, Navigation]

// const onSwiper = (swiper) => {}
// const onSlideChange = () => {}
</script>

<style>
.swiper-button-disabled {
  color: darkgray;
  pointer-events: none;
}
.b-slide {
  opacity: 0;
}

span.swiper-pagination-bullet {
  height: 14px;
  width: 14px;
  border: 1px solid #dbdbdb;
  background: transparent;
  opacity: 1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;
}
.swiper-pagination {
  bottom: 18px !important;
  left: 20px !important;
  width: fit-content;
  display: flex;
  justify-content: center !important;
  gap: 5px;
  flex-wrap: wrap;
}
span.swiper-pagination-bullet.swiper-pagination-bullet-active span {
  display: block;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  background: #30c4c2;
}

@media (min-width: 768px) {
  .swiper-pagination {
    display: none !important;
  }
}
@media (max-width: 500px) {
  .bannerSlider {
    .swiper-slide:before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 30%;
      top: 56%;
      transform: translateY(-50%);
      /*background: linear-gradient(to bottom, #fff, #fff 60%, transparent);*/
    }
    .swiper-slide {
      position: relative;
      background-color: #ffffff;
    }
  }
}
.swiper-slide-active {
  &.b-slide {
    animation: fadeIn forwards ease 2s;
  }
  .subheading {
    animation: anime forwards ease 1s;
    animation-delay: 0.8s;
    transform-origin: center;
    transform: translateY(-30px);
    opacity: 0;
  }
  .heading {
    animation: anime forwards ease 1s;
    animation-delay: 0.4s;
    transform-origin: center;
    transform: translateY(-30px);
    opacity: 0;
  }
  .description {
    animation: anime forwards ease 1s;
    animation-delay: 1.2s;
    transform-origin: center;
    transform: translateY(-30px);
    opacity: 0;
  }
  .b-btn-1 {
    animation: anime forwards ease 1s;
    animation-delay: 1.6s;
    transform-origin: center;
    transform: translateY(-30px);
    opacity: 0;
  }
  .b-btn-2 {
    animation: anime forwards ease 1s;
    animation-delay: 1.8s;
    transform-origin: center;
    transform: translateY(-30px);
    opacity: 0;
  }
}
@keyframes anime {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

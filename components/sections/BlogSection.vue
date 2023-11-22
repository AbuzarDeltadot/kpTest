<template>
  <section
    v-show="content"
    class="bg-white pt-[20px] pb-[70px]"
  >
    <div class="max-w-7xl mx-auto px-3 ">
      <h2
        v-if="title"
        class="md:text-[40px] text-[24px] text-center "
      >
        {{ title }}
      </h2>
      <p
        v-if="desc"
        class="max-w-xl mx-auto text-center mb-14"
      >
        {{ desc }}
      </p>
      <div>
        <Swiper
          :slides-per-view="3"
          :space-between="30"
          :pagination="{
            clickable: true,
          }"
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
          class="mySwiperBlog"
        >
          <SwiperSlide
            v-for="(blog, index) in content"
            :key="index"
          >
            <NuxtLink
              :to="`/blog/${blog.slug}`"
              class="group/blog archive-link"
            >
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-xl overflow-hidden group-hover/blog:border-secondary ease-in-out duration-500">
                <!-- <NuxtLink :to="`/blog/${blog.slug}`"> -->
                  <img
                    class="md:h-[300px] w-full object-cover object-center"
                    :src="$config.IMAGE_URL + blog.featured_image"
                    alt="blog"
                  >
                <!-- </NuxtLink> -->
                <div class="p-6">
                  <h2 class="flex items-center tracking-widest text-xs title-font font-medium text-secondary mb-1">
                    <template>
                    <Icon
                      name="bi:dash"
                      class="text-lg middle"
                    /> <span >{{ blog?.blog_category?.name }}</span></template>
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    <!-- <NuxtLink :to="`/blog/${blog.slug}`"> -->
                      {{ blog.title }}
                    <!-- </NuxtLink> -->
                  </h1>
                  <p
                    class="text-sm mb-4 line-clamp-3"
                    v-html="blog.short_description"
                  />
                </div>
                <div class="flex items-center justify-between flex-wrap border-t border-t-gray p-6">
                  <span class="inline-flex items-center">
                    <span class="text-[#5A5A5A] inline-flex items-center leading-none text-xs pr-2 py-1">
                      <Icon
                        name="material-symbols:calendar-month"
                        class="text-base"
                      /> &nbsp;
                      {{ formatDate(blog?.published_date) }}
                    </span>
                    <Icon
                      name="radix-icons:dot-filled"
                      class="text-gray-400"
                    />
                    <span class="text-[#5A5A5A] inline-flex items-center leading-none text-xs pl-2">
                      <Icon
                        name="material-symbols:person-2-outline-rounded"
                        class="text-base"
                      /> &nbsp;
                      By {{ blog?.owner }}
                    </span>
                  </span>
                  <!-- :to="`/blog/${blog.slug}`" -->
                  <span
                    class="text-primary text-sm inline-flex items-center md:mb-2 lg:mb-0 hover:text-secondary transition"
                  >
                    <span>Read More</span>
                    <Icon
                      name="ci:chevron-right-md"
                      class="text-xl"
                    />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination } from 'swiper'
const props = defineProps({
  title: String,
  desc: String,
  content: Array,
})

function formatDate(dateString) {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return formattedDate
}
</script>

<style>
.line-clamp-3{
  display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
}
</style>

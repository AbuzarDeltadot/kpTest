<template>
  <BasePageLoader :loader="data.loading">
    <section
      v-if="data.blog"
      class="bg-white md:py-[80px] py-[40px]"
    >
      <div class="max-w-7xl mx-auto px-3">
        <!-- Display the content of the blog post -->
        <div class="max-w-5xl mx-auto text-center mb-10">
          <h1 class="md:text-[45px] font-bold md:mb-8 mb-3 text-[22px]">
            {{ data.blog.title }}
          </h1>
          <p>{{ data.blog.sub_title }}</p>
        </div>
        <div>
          <img
            :src="$config.public.IMAGE_URL + data.blog.featured_image"
            :alt="data.blog.title"
            class="w-full md:rounded-[60px] rounded-2xl"
          >
        </div>
        <div class="md:py-10 py-5 flex flex-wrap md:flex-row flex-col justify-between gap-3 md:gap-0 items-center">
          <a
            v-if="data.blog?.blog_category?.name"
            class="text-secondary"
          >
            {{ data.blog?.blog_category?.name }}
          </a>
          <span class="inline-flex md:flex-row flex-wrap md:justify-end justify-center items-center gap-3 md:gap-0 ">
            <span class="text-[#5A5A5A] inline-flex items-center leading-none pr-2 py-1">
              <Icon
                name="material-symbols:calendar-month"
                class="text-base"
              /> &nbsp;
              {{ formatDate(data.blog.published_date) }}
            </span>
            <Icon
              name="radix-icons:dot-filled"
              class="text-gray-400"
            />
            <span class="text-[#5A5A5A] inline-flex items-center leading-none pl-2">
              <Icon
                name="material-symbols:person-2-outline-rounded"
                class="text-base"
              /> &nbsp;
              By {{ data.blog.owner }}
            </span>
            <span class="border-collapse md:ml-4 flex">
              <a
                href="#"
                class="py-2 px-6 border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition"
              >
                <Icon
                  name="ic:baseline-facebook"
                  class="text-xl"
                />
              </a>
              <a
                href="#"
                class="py-2 px-6 border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition"
              ><Icon
                name="mdi:twitter"
                class="text-xl"
              /></a>
            </span>
          </span>
        </div>
        <div
          class="mb-10 text-[14px] md:text-[16px]"
          v-html="data.blog.description"
        />
        <div class="max-w-xl mx-auto">
          <span class="border-collapse flex md:flex-row flex-col justify-center">
            <a
              href="#"
              class="py-2 px-6 border flex gap-2 items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition"
            >
              <Icon
                name="ic:baseline-facebook"
                class="text-xl"
              /> Share on Facebook
            </a>
            <a
              href="#"
              class="py-2 px-6 border flex gap-2 items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition"
            ><Icon
              name="mdi:twitter"
              class="text-xl"
            /> Share on Twitter</a>
          </span>
        </div>
      </div>
    </section>
    <BlogSection
      :content="data.relatedBlogs"
    />
  </BasePageLoader>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BlogSection from '~~/components/sections/BlogSection.vue'
const currentRount = useRoute()

const slug = currentRount.params.slug
useBlogStore().getBlog(slug)
const data = useBlogStore().data

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

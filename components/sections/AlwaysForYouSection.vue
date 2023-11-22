<template>
  <section v-if="content" class="py-[70px] bg-white">
    <div class="max-w-7xl mx-auto">
      <h2 class="md:text-[40px] text-[24px] text-center">
        {{ title }}
      </h2>
      <p class="max-w-xl mx-auto text-center">
        {{ desc }}
      </p>
      <div class="mt-12 relative">
        <i
          id="prev-foryou"
          class="absolute slide-btn -left-4 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
          ><Icon name="octicon:chevron-left-24" class="w-6 h-8"
        /></i>
        <Swiper
          :autoHeight="true"
          :modules="modules"
          :navigation="{ nextEl: '#next-foryou', prevEl: '#prev-foryou' }"
        >
          <template v-for="(items, index) in slidesArray" :key="index">
            <SwiperSlide>
              <div class="foryoulayoutParent">
                <Card
                  v-for="(item, i) in items"
                  :key="i"
                  :detail="item"
                  :class-name="getItemClass(i)"
                />
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
        <i
          id="next-foryou"
          class="absolute slide-btn -right-4 top-1/2 z-10 -translate-y-1/2 text-primary cursor-pointer hover:scale-110 transition h-[47px] w-[47px] flex items-center justify-center border bg-white rounded-full"
          ><Icon name="octicon:chevron-right-24" class="w-6 h-8"
        /></i>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import Card from '../base/Card.vue'
import 'swiper/swiper-bundle.css'
const props = defineProps({
  title: String,
  desc: String,
  content: Array
})
const { content } = toRefs(props)
const slidesArray = ref([])
const modules = [Navigation]

onMounted(async () => {
  const originalArray = content.value
  const chunkSize = 7
  const chunkedArray = originalArray.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)
    if (!result[chunkIndex]) result[chunkIndex] = []

    result[chunkIndex].push(item)
    return result
  }, [])

  slidesArray.value = chunkedArray
})

const getItemClass = (index) => {
  if (index === 0) return 'group first'
  else return ''
}
const swiperOptions = {
  // Add your swiper options here
}
</script>

<style>
.foryoulayoutParent {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 1rem;

  & > a:nth-child(1) {
    grid-column: span 1.8;
    grid-row: span 2;
  }
}
@media (max-width: 767px) {
  .foryoulayoutParent {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 0fr);
    gap: 10px;

    & > a:nth-child(1) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
  /* .mobile-view .foryoulayoutParent {
    display: grid;
    grid-template-columns: 1fr; 
    grid-template-rows: auto; 
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 0fr);
    gap: 10px;
  } */
}
.slide-btn.swiper-button-disabled {
  display: none;
}
</style>

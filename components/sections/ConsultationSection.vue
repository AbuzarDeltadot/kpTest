<!-- <template>
  <section class="pt-[70px] bg-[#163A92] relative">
    <div class="max-w-7xl mx-auto px-3 flex flex-wrap">
      <div class="md:w-[70%] w-full text-white">
        <h2 class="md:text-[40px] text-[26px] mb-4">
          Online consultation with a pharmacist/doctor
        </h2>
        <p class="md:text-[25px] text-[18px]">
          with all the health essentisls you need for you and your family
        </p>
        <div class="flex flex-wrap items-center mt-16 md:-mb-16 group/teamitem">
          <div class="md:w-[50%] w-full z-80 relative">
            <img
              :src="dermatologist"
              alt="dermatoligist profile"
              class="rounded-tl-[100px] mb-8 rounded-bl-[100px] rounded-[15px] w-full h-auto border-2 border-transparent group-hover/teamitem:border-secondary ease-in-out duration-500"
            >
            <span class="block w-fit px-14 rounded-tl-[100px] rounded-br-[100px] py-3 bg-secondary absolute bottom-20 right-[2px]">
              <h3 class="text-base leading-6 font-medium">
                Pullen Jeck
              </h3>
              <p class="text-sm">
                Skincare Expert
              </p></span>
          </div><div class="md:w-[50%] w-full md:px-[55px]">
            <h3 class="md:text-[32px] text-[24px]">
              Get Expert Advice From The Professional Dermatologist
            </h3>
            <p class="my-4">
              Book a 15 minute consultation with our
              expert&nbsp;advisors
            </p>
            <a
              href="#"
              class="relative group/linkbtn min-h-[50px] w-fit pl-3 pr-5 flex items-center"
            >
              <span class="z-0 h-full w-[50px] bg-[#00000070] group-hover/linkbtn:w-full group-hover/teamitem:bg-secondary transition-all ease-in-out duration-500 bg-secondary block absolute left-0 top-0 rounded-full" />
              <Icon
                name="material-symbols:arrow-right-alt-rounded"
                class="z-10 text-xl mr-1"
              /> <span class="z-10">Speak to a wellness expert</span>
            </a>
          </div>
        </div>
      </div>
      <div class="md:w-[30%] md:mt-0 mt-10 w-full text-white relative md:mb-0 mb-10 fix-width-slide">
        <Swiper
          direction="vertical"
          space-between="15"
          :modules="modules"
          class="doctorslider"
          :breakpoints="{
            '@0.00': {
              slidesPerView: 1,
            },
            '@0.75': {
              slidesPerView: 1,
              spaceBetween: 25,
            },
            '@1.00': {
              slidesPerView: 3,
            },
            '@1.50': {
              slidesPerView: 3,
            },
          }"
          :navigation="{ nextEl: '#next-doctor', prevEl: '#prev-doctor' }"
        >
          <template
            v-for="(doctor, i) in doctors"
            :key="i"
          >
            <SwiperSlide>
              <div class="flex flex-wrap items-center group/teamitem">
                <div class="w-[50%]">
                  <img
                    :src="doctor.image"
                    alt="dermatoligist profile"
                    class="rounded-tl-[50px] border-2 border-transparent group-hover/teamitem:border-secondary ease-in-out duration-500 rounded-bl-[50px] rounded-[15px] w-full h-auto"
                  >
                </div>
                <div class="w-[50%] pl-[25px] pt-[30px]">
                  <div class="pl-0 group-hover/teamitem:pl-3 delay-200 ease-in-out duration-500 relative">
                    <span class="absolute block h-0 w-[5px] bg-transparent rounded-[15px] bg-secondary top-1/2 -translate-y-1/2 group-hover/teamitem:bg-secondary group-hover/teamitem:delay-500 left-0 ease-in-out duration-500 group-hover/teamitem:h-full" />
                    <h3 class="text-base leading-6 font-medium text-secondary group-hover/teamitem:text-white ease-in-out duration-500 delay-500">
                      {{ doctor.name }}
                    </h3>
                    <p class="text-sm">
                      {{ doctor.title }}
                    </p>
                  </div>
                  <a
                    :href="doctor.link"
                    class="relative group/linkbtn min-h-[50px] w-fit pl-3 pr-5 flex items-center mt-4"
                  >
                    <span class="z-0 h-full w-[50px] bg-[#00000070] group-hover/linkbtn:w-full group-hover/teamitem:bg-secondary transition-all ease-in-out duration-500 bg-secondary block absolute left-0 top-0 rounded-full" />
                    <Icon
                      name="material-symbols:arrow-right-alt-rounded"
                      class="z-10 text-xl mr-1"
                    /> <span class="z-10 text-xs">Talk to the Expert</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
        <span
          v-if="doctors?.length > 1"
          class="flex gap-2 absolute right-[15px] md:hidden z-10 top-0"
        >
          <i
            id="prev-doctor"
            class="text-primary cursor-pointer hover:scale-110 transition h-[30px] w-[30px] flex items-center justify-center border bg-white rounded-full"
          ><Icon
            name="octicon:chevron-left-24"
            class="w-6 h-8"
          /></i>
          <i
            id="next-doctor"
            class="text-primary cursor-pointer hover:scale-110 transition h-[30px] w-[30px] flex items-center justify-center border bg-white rounded-full"
          ><Icon
            name="octicon:chevron-right-24"
            class="w-6 h-8"
          /></i></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import dermatologist from '/images/dermatologist.jpg'
import doctor1 from '/images/doctor-1.jpg'
import doctor2 from '/images/doctor-2.jpg'
import doctor3 from '/images/doctor-3.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

const modules = [Navigation]

const doctors = [
  { name: 'Heine Jolly', title: 'Pharmacist', link: '#', image: doctor1 },
  { name: 'Jhone twin', title: 'Dental Hygienist', link: '#', image: doctor2 },
  { name: 'Grains bills', title: 'Hair Care Specialist', link: '#', image: doctor3 },
]
</script>

<style>
.doctorslider .swiper-slide{
height: fit-content !important;
}
.doctorslider .swiper-wrapper {
  height: 620px;
}
@media (max-width: 767px) {
  .fix-width-slide{
    max-width: 352px;
    margin-left: auto;
    margin-right: auto;
  }
  .doctorslider .swiper-wrapper {
    height: 180px;

  }
}
</style> -->
<template>abc</template>

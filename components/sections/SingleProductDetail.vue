<template>
  <BasePageLoader>
    <section class="text-gray-600 body-font overflow-hidden bg-white">
      <div class="container px-5 md:pt-24 pt-10 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap items-start">
          <div class="lg:w-1/2 w-full relative box-border overflow-hidden">
            <div class="relative border rounded-lg">
              <Swiper
                v-if="images?.length > 0"
                ref="mySwiper"
                class="productgallery"
                :loop="true"
                :slidesPerView="1"
                :centeredSlides="true"
                :thumbs="{ multipleActiveThumbs: true, swiper: thumbsSwiper }"
                :navigation="{ nextEl: '#next-item', prevEl: '#prev-item' }"
                :modules="modules"
                :zoom="true"
                :virtual="true"
                :on-update="(swipe) => setIndex(swipe.activeIndex)"
                @swiper="
                  (swipe) => {
                    setSwiperRef(swipe)
                    setIndex(swipe.activeIndex)
                  }
                "
                @slideChange="(swipe) => setIndex(swipe.activeIndex)"
              >
                <SwiperSlide
                  v-for="(image, ii) in images"
                  :key="ii"
                  :virtual-index="ii"
                >
                  <img
                    alt="ecommerce"
                    class="w-full md:h-[500px] bg-[#f3f3f3] aspect-square object-cover object-center rounded-lg cursor-grab"
                    :src="$config.IMAGE_URL + image"
                    @click="(e) => zoomImage(index)"
                  />
                </SwiperSlide>
              </Swiper>

              <div
                class="z-10 h-14 w-14 rounded-lg shadow-lg absolute bottom-5 left-5 bg-white flex items-center justify-center cursor-pointer group/zoom"
                @click="(e) => zoomImage(index)"
              >
                <Icon
                  name="carbon:zoom-in"
                  class="text-xl text-primary scale-100 group-hover/zoom:scale-125 ease-in-out duration-300 origin-center"
                />
              </div>
              <div
                v-if="images.length > 1"
                class="z-10 h-14 w-14 rounded-lg shadow-lg absolute bottom-5 gap-0 right-5 bg-white flex items-center justify-center"
              >
                <span id="prev-item" class="ease-in-out duration-300">
                  <Icon
                    name="majesticons:chevron-left"
                    class="text-xl text-primary scale-100 hover:scale-125 ease-in-out duration-300 origin-center cursor-pointer"
                  />
                </span>
                <span id="next-item" class="ease-in-out duration-300">
                  <Icon
                    name="majesticons:chevron-right"
                    class="text-xl text-primary scale-100 hover:scale-125 ease-in-out duration-300 origin-center cursor-pointer"
                  />
                </span>
              </div>
            </div>
            <div class="swiper px-5 mt-5">
              <swiper
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="5"
                :freeMode="true"
                :scrollbar="true"
                :navigation="false"
                :mousewheel="true"
                :modules="modules"
                class="thumbnailSwiper pb-5"
              >
                <!-- :loop="true"
                :watchSlidesProgress="true"
                :centeredSlides="false" -->
                <SwiperSlide
                  v-for="(image, ii) in images"
                  :key="ii"
                  :virtual-index="ii"
                  class="border rounded-lg overflow-hidden"
                  :class="{ 'border-primary': ii === slideIndex - 1 }"
                >
                  <img
                    alt="ecommerce"
                    class="md:h-[100px] rounded w-32 bg-[#f3f3f3] aspect-square object-cover"
                    :src="$config.IMAGE_URL + image"
                  />
                </SwiperSlide>
              </swiper>
            </div>
          </div>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <!-- <h2 class="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2> -->
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {{ detail.name }}
            </h1>
            <span class="block mb-1 title-font text-2xl text-primary"
              >{{ $config.CURRENCY + parseFloat(productCartPrice).toFixed(2) }}
              &nbsp;
              <!-- <span class="text-lg text-gray-400 line-through">$100.00</span> -->
            </span>
            <span class="text-primary mb-3 block"
              >SKU:
              <span class="text-gray-500">{{ currentAttr?.sku }}</span></span
            >
            <!-- <span class="text-primary block mb-3">EIN: <span class="text-gray-500">{{ currentAttr?.barcode }}</span></span> -->

            <div
              class="text-sm mb-4 product-desc short"
              v-html="detail.description"
            />
            <FormKit type="form" :actions="false" @submit="addToCartHandler">
              <FormKit
                id="productCart"
                v-model="groupValues"
                name="productCart"
                type="group"
              >
                <FormKit :value="detail.id" type="hidden" name="productId" />
                <FormKit v-model="productPrice" type="hidden" name="price" />
                <FormKit
                  v-model="productCartPrice"
                  type="hidden"
                  name="itemTotal"
                />
                <!-- <template v-if="detail?.attributes?.length || Object.keys(detail?.attributes).length"> -->
                <FormKit
                  id="attributes"
                  name="attributes"
                  type="group"
                  v-if="Object.keys(detail?.attributes)?.length > 0"
                >
                  <FormKit
                    v-for="(options, index) in Object.keys(detail?.attributes)"
                    :key="index"
                    v-model="currentAttr.value"
                    type="radio"
                    :name="options"
                    :label="options"
                    :options="attr(detail?.attributes[options])"
                    outer-class="product-options mb-3"
                    @input="(value) => handleAttributeChange(value, options)"
                  />
                </FormKit>
                <!-- </template> -->
                <FormKit
                  v-model="qtyModel"
                  :type="sum"
                  name="qty"
                  label="Quantity"
                  :classes="{
                    label: 'text-primary font-bold',
                    wrapper: {
                      'flex gap-2 items-center qty-check': true,
                      disabled: maxQuantity === 0
                    },
                    inner: {
                      flex: true
                    }
                  }"
                  @input="(e) => qtyHandle(e)"
                />
                <p v-if="maxQuantity > 0" class="text-primary text-xs mt-2">
                  Available Stock: {{ maxQuantity }}
                </p>
                <p v-else class="text-red-500 text-xs mt-2">Out of Stock</p>
                <p
                  v-if="maxQuantity > 0 && quantity > maxQuantity"
                  class="text-red-500 text-xs mt-2"
                >
                  Limit Exceed!
                </p>
              </FormKit>
              <FormKit
                type="submit"
                label="Add to basket"
                :disabled="quantity > maxQuantity"
                :classes="{
                  input: `flex border border-primary hover:border-secondary py-2 px-6 focus:outline-none bg-primary hover:bg-secondary text-white hover:text-white rounded-full mt-4 transition ${
                    quantity < 1 || quantity > maxQuantity ? 'disabled' : ''
                  } ${
                    maxQuantity > 0
                      ? 'text-white'
                      : 'qty-check disabled border-gray-500 text-gray-500'
                  }`
                }"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="{1.5}"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                &nbsp; Add to basket</FormKit
              >
            </FormKit>
            <div class="mt-8 text-xs text-gray-500 text-base leading-4">
              <div v-if="Object.keys(detail?.product_information)?.length > 0">
                <div
                  class="mt-3 flex"
                  v-for="(info, index) in detail?.product_information"
                  :key="index"
                >
                  <span class="pr-3" v-if="info?.type === 'text'">
                    <Icon :name="info.icon" width="20" height="20" alt="Icon" />
                  </span>
                  <span v-if="info?.type === 'text'">
                    <span :style="{ color: info?.text_color }">{{
                      info?.text
                    }}</span>
                  </span>
                </div>
                <div
                  v-for="(info, index) in detail?.product_information"
                  :key="index"
                >
                  <button
                    @click="openModal(info)"
                    v-if="info?.type === 'accordion'"
                    :style="{
                      width: '258px',
                      backgroundColor: info?.background_color
                    }"
                    :class="`modal-btn border-4 flex border-primary py-2 px-6 focus:outline-none hover:bg-primary text-white hover:text-white transition px-3 py-4 border-transparent mt-1  `"
                  >
                    <span
                      style="width: 100%"
                      class="flex justify-between"
                    >
                      <span
                        class=""
                        :style="{
                          color: info.text_color
                        }"
                        >{{ info?.text }}</span
                      >

                      <Icon
                        :style="{
                          color: info.text_color
                        }"
                        :name="info.icon"
                        class=""
                        alt="Icon"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <!--Modal-->

            <!-- @closing="onModalClose" -->
            <BaseModal
              @click="onHide"
              :show="showModal"
              size="5xl"
              placement="center"
              class="flex justify-center flex-col"
            >
              <div
                class="flex items-baseline justify-between py-0 px-5 rounded-t dark:border-gray-600"
              >
                <h3
                  class="text-xl py-8 font-semibold text-gray-900 dark:text-white"
                  v-html="modalContent.text"
                ></h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35ZM23.0164 11.4065C23.2897 11.1331 23.733 11.1331 24.0063 11.4065C24.2797 11.6799 24.2797 12.1231 24.0063 12.3964L18.4906 17.9122L24.0051 23.4267C24.2784 23.7 24.2784 24.1432 24.0051 24.4166C23.7317 24.69 23.2885 24.69 23.0151 24.4166L17.5006 18.9021L12.3962 24.0066C12.1228 24.2799 11.6796 24.2799 11.4063 24.0066C11.1329 23.7332 11.1329 23.29 11.4063 23.0166L16.5107 17.9122L11.405 12.8065C11.1316 12.5331 11.1316 12.0899 11.405 11.8165C11.6784 11.5432 12.1216 11.5432 12.3949 11.8165L17.5006 16.9222L23.0164 11.4065Z"
                      fill="#D9D9D9"
                    />
                  </svg>

                  <!-- <span class="sr-only" @click="onModalClose">Close modal</span> -->
                </button>
              </div>
              <hr
                style="width: 57%"
                class="h-px border-2 mx-5 bg-gray-400 border-1 dark:bg-gray-700"
              />
              <!-- Modal body -->
              <div class="p-5 overflow-x-hidden overflow-y-auto space-y-5">
                <span
                  class="text-base leading-relaxed hover:snap-x text-gray-500 dark:text-gray-400"
                  v-html="modalContent.content"
                ></span>
              </div>
            </BaseModal>

            <!-- <div class="mt-6 ml-4 text-gray-500 text-base leading-4">
             
            </div>
            <div class="mt-6 ml-4 text-gray-500 text-base leading-4">
             
            </div> -->
            <!-- <NuxtLink

              class="cursor-pointer flex w-fit text-white bg-transparent border-primary border hover:border-secondary py-2 px-6 focus:outline-none hover:bg-secondary text-primary hover:text-white rounded-full mt-4 transition"
              @click="proceedCheckout()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg> &nbsp;
  Proceed to Checkout
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white overflow-hidden">
      <div
        v-if="isMobile"
        class="container mx-auto py-5 pl:10 px-4 lg:w-4/5 pt-10"
      >
        <!-- Render the accordion component for mobile -->
        <button
          :id="'profile-tab-'"
          :data-tabs-target="'#profile-'"
          type="button"
          role="tab"
          :aria-controls="'profile-'"
          @click="toggleAccordion('desc')"
          class="accordion"
          :class="{
            ' active': currentTabIndex === 'desc'
          }"
        >
          <div class="flex justify-between">
            <h3 class="text-xl">Product Detail</h3>
            <Icon
              v-if="currentTabIndex === 'desc'"
              name="ic:twotone-minus"
            ></Icon>
            <Icon v-else name="material-symbols:add"></Icon>
          </div>
        </button>
        <div
          :class="{
            hidden: currentTabIndex !== 'desc'
          }"
          class="container lg:w-4/5 flex pl-5 mx-auto"
        >
          <div class="p-4 rounded-lg" role="tabpanel">
            <div
              class="text-sm mb-4 product-desc"
              v-html="detail?.description"
            ></div>
          </div>
        </div>
        <div v-for="(desc, index) in detail?.product_details" :key="index">
          <button
            :class="{ active: index === currentTabIndex }"
            class="accordion"
            @click="toggleAccordion(index)"
          >
            <div class="flex justify-between">
              <h3 class="text-xl">{{ desc.title }}</h3>
              <Icon
                v-if="index === currentTabIndex"
                name="ic:twotone-minus"
              ></Icon>
              <Icon v-else name="material-symbols:add"></Icon>
            </div>
          </button>
          <div
            class="panel"
            :class="{
              hidden: index !== currentTabIndex
            }"
            v-html="desc.content"
          ></div>
          <div
            class="flex items-center mb-1 mt-1"
            :class="{
              hidden: index !== currentTabIndex
            }"
          >
            <iframe
              width="560"
              v-if="desc?.url && getVideoIdFromUrl(desc?.url)"
              height="315"
              :src="getVideoIdFromUrl(desc?.url)"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture "
              allowfullscreen
            ></iframe>
          </div>
          <div
            :class="{
              hidden: index !== currentTabIndex
            }"
            class="container lg:w-4/5 flex items-center lg:pl-5 mx-auto"
          >
            <BaseDynamicFormKit :dynamicFormFields="desc" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container mx-auto flex items-start lg:w-4/5 pt-10">
          <div class="flex mb-4 border-gray-200 dark:border-gray-700">
            <ul
              class="-mb-px text-sm lg:text-sm font-medium text-center"
              role="tablist"
            >
              <li class="mr-2" role="presentation">
                <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :id="'profile-tab-'"
                  :data-tabs-target="'#profile-'"
                  type="button"
                  role="tab"
                  :aria-controls="'profile-'"
                  @click="currentTabIndex = 'desc'"
                  :class="{
                    'border-primary text-primary': currentTabIndex === 'desc'
                  }"
                >
                  <h3 class="text-xl">Product Detail</h3>
                </button>
              </li>
            </ul>
          </div>
          <div v-for="(desc, index) in detail?.product_details" :key="index">
            <div
              class="flex mb-4 flex-wrap border-gray-200 dark:border-gray-700"
            >
              <ul class="-mb-px text-sm font-medium text-center" role="tablist">
                <li class="mr-2" role="presentation">
                  <button
                    class="inline-block p-4 border-b-2 rounded-t-lg"
                    type="button"
                    role="tab"
                    :aria-controls="'profile-' + index"
                    :aria-selected="currentTabIndex === index"
                    @click="currentTabIndex = index"
                    :class="{
                      'border-primary text-primary': currentTabIndex === index
                    }"
                  >
                    <h3 class="text-xl" v-html="desc.title"></h3>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="container lg:w-4/5 flex pl-5 mx-auto"
          :class="{
            hidden: currentTabIndex !== 'desc'
          }"
        >
          <div class="p-4 rounded-lg" role="tabpanel">
            <div
              class="text-sm mb-4 product-desc"
              v-html="detail?.description"
            ></div>
          </div>
        </div>
        <div
          v-for="(desc, index) in detail?.product_details"
          :key="index"
          :class="{
            hidden: index !== currentTabIndex
          }"
          :id="'profile-' + index"
          class="container lg:w-4/5 flex mx-auto"
        >
          <div
            class="p-4 rounded-lg"
            v-if="desc?.type === 'textarea'"
            role="tabpanel"
            :aria-labelledby="'profile-tab-' + index"
          >
            <div class="text-sm mb-4 product-desc" v-html="desc?.content"></div>

            <!-- :productsDetailsId="desc.id" -->
            <div class="flex items-center mb-5 mt-4">
              <iframe
                width="560"
                v-if="desc?.url && getVideoIdFromUrl(desc?.url)"
                height="315"
                :src="getVideoIdFromUrl(desc?.url)"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture "
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <!-- <BaseDynamicFormKit :dynamicFormFields="desc" /> -->
        </div>
        <div
          v-for="(desc, index) in detail?.product_details"
          :key="index"
          :class="{
            hidden: index !== currentTabIndex
          }"
          class="container lg:w-4/5 flex items-center lg:pl-5 mx-auto"
        >
          <BaseDynamicFormKit :dynamicFormFields="desc" />
        </div>
      </div>
    </section>
    <LightboxSwiper
      v-if="showLightbox"
      :images="images"
      :index="slideIndex"
      :close="closeLightbox"
    />
  </BasePageLoader>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Navigation,
  Pagination,
  Virtual,
  Zoom,
  Thumbs,
  FreeMode,
  Scrollbar,
  Mousewheel
} from 'swiper'
import { createInput } from '@formkit/vue'
import { useToast } from '~~/composables/toast'
import { onMounted } from 'vue'
// import { initFlowbite } from 'flowbite'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/swiper-bundle.css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/scrollbar'
import dummy from '/images/dummy.jpg'
const props = defineProps({
  detail: Object
})

const bgClass = (bg) => {
  const myClass = `bg-[${bg}]`
  return myClass
}

const modules = [
  Navigation,
  Pagination,
  Virtual,
  Zoom,
  Thumbs,
  FreeMode,
  Scrollbar,
  Mousewheel
]
// const images = [dummy, dummy, dummy]
const packaging = null
const currentAttr = ref(undefined)
const images = ref([])
const slideIndex = ref(0)
const showLightbox = ref(false)
const maxQuantity = ref(null)
const reachedMax = ref(false)
const index = 0
let currentIndex = 0
let swiperRef = null
const shop = useShopStore().data
const quantity = ref()
const qtyModel = ref(1)
let qtyRef = null
const productPrice = ref()
const productCartPrice = ref()
const Toast = useToast()
const activeTab = ref(0)
const thumbsSwiper = ref(null)
const currentTabIndex = ref('desc')
const showModal = ref(false)
const modalContent = ref('')

const setSwiperRef = (ref) => {
  swiperRef = ref
}
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}
const getVideoIdFromUrl = (url) => {
  const match = url.match(/[?&]v=([^&]+)/)
  return match
    ? `https://www.youtube.com/embed/${match[1]}?si=3Gs57da5HVAjyyMy`
    : null
}

const screenWidth = ref(window.innerWidth)
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const isMobile = computed(() => screenWidth.value < 1000)
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

const toggleAccordion = (index) => {
  if (currentTabIndex.value === index) {
    currentTabIndex.value = null
  } else {
    currentTabIndex.value = index
  }
}

watch(screenWidth, (newValue, oldValue) => {
  if (newValue > 1000 && !currentTabIndex.value) {
    toggleAccordion('desc')
  }
})

const openModal = (content) => {
  showModal.value = true
  modalContent.value = content
}
// const onModalClose = () => {
//   showModal.value = false
// }
const onHide = () => {
  showModal.value = false
}

const priceHandle = (price, qty) => {
  productCartPrice.value = price * qty
}

function proceedCheckout() {
  if (shop.cartItems.length > 0) navigateTo('/checkout')
  else Toast.error('No Items in Cart!')
}
function qtyHandle(e) {
  // if (e > maxQuantity.value) {
  //   qtyRef.value = maxQuantity.value
  //   reachedMax.value = true
  // }
  // else if (e === 0 || e === '' || !e) {
  //   qtyRef.value = 1
  //   reachedMax.value = false
  // }
  // else {
  //   reachedMax.value = true
  // }
  if (e === 0) reachedMax.value = true

  priceHandle(productPrice.value, e)
  // alert(qtyRef.value)
}

const sum = createInput(
  [
    {
      $el: 'a',
      children: ['-'],

      attrs: {
        class:
          'border px-2 text-lg block flex items-center justify-center rounded-l cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition',
        onClick: '$handlers.decrement'
      }
    },
    {
      $el: 'input',
      attrs: {
        // readOnly: true,
        value: '$_value',
        id: 'qtyf',
        class: 'w-14 text-center appearance-none border border-gray-200  py-1',
        type: 'number',
        require: true,
        min: 1,
        onInput: '$handlers.inputHandle',
        onLoad: '$handlers.setNode'
        // onchange: handleQuantity()
      }
    },
    {
      $el: 'a',
      children: ['+'],

      attrs: {
        class:
          'border px-2 text-lg block flex items-center justify-center rounded-r cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition',
        onClick: '$handlers.increment'
      }
    }
  ],
  {
    features: [addHandlers]
  }
)
function addHandlers(node) {
  const qty = 1

  node.input(maxQuantity.value > 0 ? 1 : 1)
  quantity.value = qty
  qtyRef = node
  // priceHandle(productPrice.value, qty)

  node.on('created', () => {
    node.context.handlers.setNode = (event) => {
      qtyRef = node
      priceHandle(productPrice.value, node.value || 1)
    }
    node.context.handlers.increment = (event) => {
      node.input(
        node.value < maxQuantity.value
          ? parseInt(node.value) + 1
          : parseInt(node.value)
      )
      quantity.value = node.value
      // priceHandle(productPrice.value, node.value)
    }
    node.context.handlers.decrement = (event) => {
      node.input(node.value > 1 ? node.value - 1 : node.value)
      quantity.value = node.value
      // priceHandle(productPrice.value, node.value)
    }
    node.context.handlers.inputHandle = (event) => {
      let val = 1
      // if (parseInt(event.target.value) >= parseInt(maxQuantity.value))
      //   val = Number(maxQuantity.value)
      // else
      //   val = Number(node.value)
      if (event.target.value && event.target.value > 0) {
        if (event.target.value > maxQuantity.value) {
          event.target.value = maxQuantity.value
          node.input(parseInt(event.target.value))
          quantity.value = Number(node.value)
        } else {
          event.target.value = event.target.value
          node.input(parseInt(event.target.value))

          quantity.value = Number(node.value)
        }
      } else {
        event.target.value = 1
        node.input(parseInt(event.target.value))
        quantity.value = Number(node.value)
      }
    }
  })
}

if (images?.value?.length === 0) {
  const attributeOption =
    props?.detail?.attributes[Object.keys(props?.detail?.attributes)[0]]
  const selectedOption = attributeOption?.filter(
    (item) => item.is_default === 1
  )[0]
  currentAttr.value = selectedOption || {}
  maxQuantity.value = selectedOption?.quantity
  quantity.value =
    qtyRef?.value && qtyRef?.value > maxQuantity.value
      ? maxQuantity.value
      : qtyRef?.value
  const collection = [
    selectedOption?.defaultImage,
    ...selectedOption?.imageUrls
  ]
  images.value = collection
  slideIndex.value = 0
  productPrice.value = selectedOption?.price
  // priceHandle(selectedOption.price, quantity.value)
}
const handleAttributeChange = (value, option) => {
  const attributeOption = props?.detail?.attributes[option]
  const selectedOption = attributeOption?.filter(
    (item) => item.value === value
  )[0]
  const collection = [
    selectedOption?.defaultImage,
    ...selectedOption?.imageUrls
  ]
  images.value = collection
  slideIndex.value = 0
  currentAttr.value = selectedOption
  maxQuantity.value = selectedOption?.quantity
  swiperRef.slideTo(0, 0)
  quantity.value =
    qtyRef?.value > maxQuantity?.value ? maxQuantity?.value : qtyRef?.value
  qtyModel.value = 1
  qtyRef.value = quantity?.value
  productPrice.value = selectedOption?.price
  priceHandle(selectedOption?.price, qtyRef?.value || 1)
}

const attr = (array) => {
  const arr = []
  array?.forEach((item) => {
    arr.push({ ...item, label: item.value })
  })
  return arr
}

const setIndex = (i) => {
  slideIndex.value = i
}
const zoomImage = (i) => {
  currentIndex = i
  showLightbox.value = true
}
const closeLightbox = (bool) => {
  showLightbox.value = false
}

const addToCartHandler = async (data) => {
  const formData = data.productCart
  const fullProduct = { ...props.detail, cartData: formData }
  useShopStore().addProduct(fullProduct)
  // Toast.success('Added to Cart!')
  useHomeStore().setShowCart(true)
}

const groupValues = ref({})
</script>

<style >
span#prev-item.swiper-button-disabled,
span#next-item.swiper-button-disabled {
  filter: grayscale(1);
  opacity: 0.3;
  pointer-events: none;
}

/* Form Styling */
.product-options fieldset > * {
  float: left;
  margin-right: 20px;
}
.accordion.active {
  background-color: #163a92 !important;
  color: white;
}
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 16px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  border-radius: 5px;
  margin-bottom: 5px;
}

.product-options fieldset {
  display: block;
  float: none;
}
.product-options ul.formkit-options {
  display: flex;
  gap: 10px;
}
.product-options .formkit-inner {
  visibility: hidden;
  position: absolute;
  left: -9999%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

label,
legend {
  text-transform: capitalize;
}

.product-desc ul li p {
  margin-bottom: 10px;
}

.main-image.active {
  filter: none; /* Remove blur effect when active */
}
.borderhorizontal {
  border-bottom: black;
  border-bottom: 1px solid;
}

.product-desc ul li {
  margin-bottom: 10px;
}
.product-desc ul {
  padding-left: 16px;
  list-style: disc !important;
}

.product-desc.short {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 4;
}
.product-desc.short > *:not(:first-child) {
  display: none;
}
/* /* .accordion , */
/* .active {
    background-color: #163a92 !important;
    color: white;
  }  */

.product-desc p {
  margin-bottom: 5px;
  min-height: 12px;
}
.thumbnailSwiper {
  padding-bottom: 15px;
}
.thumbnailSwiper .swiper-scrollbar.swiper-scrollbar-horizontal {
  bottom: 0;
}
.modal-btn:hover {
  background-color: #163a92 !important;
}
.modal-btn:hover * {
  color: #ffffff !important;
}
.qty-check.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

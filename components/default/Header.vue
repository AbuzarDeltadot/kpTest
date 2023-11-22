<template>
  <nav class="bg-white drop-shadow relative z-10">
    <div class="container mx-auto py-4 px-4 md:pb-0">
      <div class="flex items-center justify-between w-full">
        <NuxtLink to="/" class="flex items-center">
          <img
            :src="headerLogo ? headerLogo : logo"
            class="h-10 w-auto md:h-12"
            alt="KP Pharma"
          />
        </NuxtLink>

        <form
          method="post"
          @submit="(e) => submitSearch(e)"
          class="block max-[768px]:hidden relative bg-white w-2/5 md:flex"
        >
          <button
            class="absolute whitespace-nowrap overflow-hidden w-[120px] inset-0 left-0 my-3 ml-4 pr-3 w-fit border-r-2 text-sm text-gray-600 flex items-center flex-shrink-0"
            type="button"
            @click="dropdown = !dropdown"
          >
            {{
              selectedCategory?.name ? selectedCategory?.name : 'All categories'
            }}
            <svg
              aria-hidden="true"
              class="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              :class="{
                'absolute right-2': true,
                '-rotate-90': dropdown
              }"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            v-if="dropdown"
            class="absolute overflow-hidden max-w-[300px] w-full bg-white shadow-lg rounded-lg top-[100%] z-[99999]"
          >
            <div
              @click="
                () => {
                  selectedCategory = {}
                  dropdown = false
                }
              "
              class="hover:bg-secondary py-2 px-4 hover:text-white transition-all cursor-pointer"
            >
              All Categories
            </div>
            <div
              v-for="(item, index) in filters?.categories"
              :key="index"
              @click="
                () => {
                  selectedCategory = item
                  dropdown = false
                }
              "
              class="hover:bg-secondary py-2 px-4 hover:text-white transition-all cursor-pointer"
            >
              {{ item?.name }}
            </div>
          </div>
          <input
            type="search"
            @input="
              (e) => {
                keyword = e.target.value
              }
            "
            class="base block py-2 pl-36 pr-10 w-full text-sm border border-gray-400 border-2 text-gray-600 rounded-full focus:border-secondary focus:outline-none"
            placeholder="Search for 45000+ Products..."
          />
          <button
            @click="(e) => submitSearch(e)"
            class="absolute inset-y-0 right-0 flex items-center text-primary pr-3"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>

        <div class="hidden items-center space-x-6 md:flex">
          <NuxtLink
            v-for="(item, itemIndex) in menus?.header_top_right?.items ?? []"
            :key="itemIndex"
            :rel="item?.url ? '' : 'nofollow'"
            :to="
              item?.name === 'cart' || item?.name === 'Basket'
                ? ''
                : item?.url === '/account'
                ? ''
                : item?.url
            "
            :target="item?.target"
            :aria-label="item.name"
            class="relative text-gray-400 group/menu cursor-pointer"
            @click="
              (e) => {
                if (item?.name === 'cart' || item?.name === 'Basket') {
                  handleCartBasket(true)
                }
              }
            "
          >
            <Icon :name="item.icon" class="w-6 h-6" />
            <span
              v-if="
                shop?.cartLength > 0 &&
                (item.icon.includes('cart') || item.icon.includes('basket'))
              "
              style="font-size: 12px; right: -10px; top: -2px"
              class="absolute top-0 right-0 bg-secondary text-white rounded-full text-xs w-4 h-4 font-semibold ml-1 flex items-center justify-center"
              >{{ cartItems > 9 ? '9+' : cartItems }}</span
            >

            <!-- <div
              v-if="showAccountDropdown && item?.url === '/account'"
              class="relative"
            > -->
            <span
              v-if="item?.url === '/account' && shop?.user?.email"
              class="absolute transition-all group-hover/menu:opacity-100 opacity-0 top-full left-0 mt-2 p-2 bg-white border border-gray-300 shadow-md rounded"
            >
              <span
                class="relative text-gray-400 cursor-pointer"
                aria-label="Account"
                @click="
                  (e) => {
                    useAuthStore().logout()
                  }
                "
              >
                Logout
              </span>
            </span>
            <!-- </div> -->
          </NuxtLink>
        </div>

        <div class="md:hidden flex items-center">
          <button
            aria-label="Hamburger Menu"
            class="flex items-center rounded"
            @click="showMobileMenu = !showMobileMenu"
          >
            <Icon
              :name="showMobileMenu ? 'gridicons:cross' : 'lucide:menu'"
              class="w-8 h-8 text-gray-500"
            />
          </button>
        </div>
      </div>
      <form
        method="post"
        :class="[
          {
            hidden: showMobileMenu
          }
        ]"
        @submit="(e) => submitSearch(e)"
        class="block mt-5 md:hidden relative bg-white md:flex"
      >
        <button
          class="absolute whitespace-nowrap overflow-hidden w-[120px] inset-0 left-0 my-3 ml-4 pr-3 w-fit border-r-2 text-sm text-gray-600 flex items-center flex-shrink-0"
          type="button"
          @click="dropdown = !dropdown"
        >
          {{
            selectedCategory?.name ? selectedCategory?.name : 'All categories'
          }}
          <svg
            aria-hidden="true"
            class="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            :class="{
              'absolute right-2': true,
              '-rotate-90': dropdown
            }"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          v-if="dropdown"
          class="absolute overflow-hidden max-w-[300px] w-full bg-white shadow-lg rounded-lg top-[100%] z-[99999]"
        >
          <div
            @click="
              () => {
                selectedCategory = {}
                dropdown = false
              }
            "
            class="hover:bg-secondary py-2 px-4 hover:text-white transition-all cursor-pointer"
          >
            All Categories
          </div>
          <div
            v-for="(item, index) in filters?.categories"
            :key="index"
            @click="
              () => {
                selectedCategory = item
                dropdown = false
              }
            "
            class="hover:bg-secondary py-2 px-4 hover:text-white transition-all cursor-pointer"
          >
            {{ item?.name }}
          </div>
        </div>
        <input
          type="search"
          @input="
            (e) => {
              keyword = e.target.value
            }
          "
          class="base block py-2 pl-36 pr-10 w-full text-sm border border-gray-400 border-2 text-gray-600 rounded-full focus:border-secondary focus:outline-none"
          placeholder="Search for 45000+ Products..."
        />
        <button
          @click="(e) => submitSearch(e)"
          class="absolute inset-y-0 right-0 flex items-center text-primary pr-3"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
      <ul
        class="items-center justify-center w-full mt-2 lg:text-base md:text-sm mb-1 md:flex"
        :class="[
          {
            hidden: !showMobileMenu
          }
        ]"
      >
        <li
          v-for="(item, itemIndex) in menus?.navigation ?? []"
          :key="itemIndex"
        >
          <NuxtLink
            active-class="text-primary"
            class="block text-gray-600 px-6 py-2 font-semibold rounded-lg hover:bg-gray-100"
            :rel="item?.url ? '' : 'nofollow'"
            :to="
              item?.template_layout === 0
                ? `/${item?.url}`
                : item?.template_layout
                ? `${item?.url ? '/page/' + item.url : ''}`
                : ''
            "
            :target="item?.target"
            :aria-label="item.name"
            @click="
              () => {
                showMobileMenu = !showMobileMenu
                 if(item?.name === 'Shop'){

                   resetSearch(item)
                }
              }
            "
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import { ref, watch } from 'vue'
// import { Scrollama } from 'vue-scrollama'
import { check } from 'prettier'
import logo from '/images/header_logo.png'
import { Dropdown } from 'flowbite'
const router = useRouter()

const props = defineProps({
  menus: {
    type: Object
  }
})
const headerLogo = ref('')
const showAccountDropdown = ref(false)
const dropdown = ref(false)
const selectedCategory = ref({})
const keyword = ref('')
const filters = computed(() => useShopPageStore().filtersList)
const route = useRoute()

const resetSearch = (item) => {
    selectedCategory.value = {}
    useShopPageStore().getProducts({}, 1, false, true)
}
const submitSearch = (e) => {
  e.preventDefault()

  dropdown.value = false
  const query = {}

  if (selectedCategory?.value?.slug) {
    query['categories'] = [selectedCategory?.value?.slug]
  }

  if (keyword?.value && keyword?.value !== '') {
    query['keyword'] = keyword?.value
  }
  //  console.log(query,'queryyy')

  useShopPageStore().getProducts(query, 1, false, true)

  router.push(
    `/shop?${keyword?.value ? 'keyword=' + keyword?.value : ''}${
      keyword?.value && selectedCategory?.value?.slug ? '&' : ''
    }${
      selectedCategory?.value?.slug
        ? 'categories=' + selectedCategory?.value?.slug
        : ''
    }`
  )
}
// Define a ref to track the scroll direction
// const scrollDirection = ref('down')

// // Define a ref to track the scroll position
// const scrollPosition = ref(0)

// // Define a ref to track whether the header is hidden
// const headerHidden = ref(false)

// // Watch the scroll position to update the header visibility
// watch(scrollPosition, (newValue, oldValue) => {
//   if (newValue > oldValue) {
//     // Scrolling down
//     scrollDirection.value = 'down'
//     headerHidden.value = true
//   }
//   else {
//     // Scrolling up
//     scrollDirection.value = 'up'
//     headerHidden.value = false
//   }
// })

// // Initialize the scrollama instance
// const scrollama = new Scrollama()

// // Handle the scroll event and update the scroll position
// scrollama.on('stepEnter', ({ element }) => {
//   scrollPosition.value = element.scrollPosition.y
// })
// onMounted(()=>{
//   console.log(route.path)
// })
// console.log(route.path)

const showMobileMenu = ref(false)
const settings = useSettingsStore().data
const header = settings?.header
const shop = useShopStore().data

const cartItems = ref(0)

const checkLogo = (url) => {
  if (url) {
    const regex =
      /https:\/\/regen-verse-local\.ams3\.digitaloceanspaces\.com\/0/i
    const test = regex.test(url)
    if (test) {
      headerLogo.value = ''
    } else {
      if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg'))
        headerLogo.value = url
      else headerLogo.value = ''
    }
  }
}

checkLogo(header?.logo?.src)
watch(shop, (newShopData, oldShopData) => {
  cartItems.value = newShopData?.cartItems?.length || 0
})

const handleCartBasket = (bool) => {
  useHomeStore().setShowCart(bool)
}
</script>

<style>
/* Add styles to hide the header when headerHidden is true */
/*.header-hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}*/
</style>

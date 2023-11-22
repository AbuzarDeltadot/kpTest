<template>
  <form @change="(e) => { changeEvent(); handleFilterSelection(e)}">
    <div class="flex items-center justify-between mb-5">
      <h5 class="text-[25px] hidden lg:block">
        Filter by
      </h5>
      <input
        class="bg-gray-300/[30%] px-6 py-1 rounded-full cursor-pointer transition"
        :class="{ 'opacity-20 pointer-events-none': prefilledObj?.categories?.length === 0 && prefilledObj?.sub_categories?.length === 0 && prefilledObj?.brands?.length === 0 && !prefilledObj?.keyword }"
        type="reset"
        value="Reset"
        @click="(e) => handleFilterSelection()"
      >
    </div>
    <div class="container mx-auto mt-8">
      <h1
        class="text-[20px] font-semibold bg-[#C7C7C7]/[40%] rounded-t-md px-5 py-3 flex items-center justify-between cursor-pointer"
        :class="{ 'rounded-md': !categoryCollapse }"
        @click="(e) => handleParentCollapse('categories')"
      >
        <span>Categories</span>
        <svg
          :class="`h-3 w-3 transition ${categoryCollapse ? 'rotate-0' : 'rotate-180'}`"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </h1>
      <div
        :class="{ hidden: !categoryCollapse }"
      >
        <div
          v-for="category in filters.categories"
          :key="category.id"
        >
          <AccordionCategory
            :category="category"
            :prefilled-obj="prefilledObj"
            type="categories"
          />
        </div>
      </div>
    </div>
    <hr class="horizontal lg:hidden"  />
    <div class="container mx-auto mt-8">
      <h1
        class="text-[20px] font-semibold bg-[#C7C7C7]/[40%] rounded-t-md px-5 py-3 flex items-center justify-between cursor-pointer"
        :class="{ 'rounded-md': !brandsCollapse }"
        @click="(e) => handleParentCollapse('brands')"
      >
        <span>Brands</span>
        <svg
          :class="`h-3 w-3 transition ${brandsCollapse ? 'rotate-0' : 'rotate-180'}`"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </h1>
      <div
        :class="{ hidden: !brandsCollapse }"
      >
        <div
          v-for="brand in filters.brands"
          :key="brand.id"
        >
          <AccordionCategory

            :category="brand"
            type="brands"
            :prefilled-obj="prefilledObj"
          />
        </div>
      </div>
    </div>
    <hr class="horizontal lg:hidden"  />

    <!-- <div class="container mx-auto mt-8">
      <h1
        class="text-lg font-semibold mb-4"
        @click="(e) => handleParentCollapse('brands')"
      >
        Brands
      </h1>

      <AccordionCategory
        v-for="brand in filters.brands"
        :key="brand.id"
        :category="brand"
        type="brands"
        :prefilled-obj="prefilledObj"
      />
    </div> -->
  </form>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AccordionCategory from './AccordionCategory'
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
  changeEvent: Function
})

const categoryCollapse = ref(true)
const brandsCollapse = ref(true)

const handleParentCollapse = (item) => {
  if (item === 'categories')
    categoryCollapse.value = !categoryCollapse.value

  else if (item === 'brands')
    brandsCollapse.value = !brandsCollapse.value
}

const route = useRoute()
const brandsQueryParam = ref(route.query.brands)
const catsQueryParam = ref(route.query.categories)
const subCatsQueryParam = ref(route.query.sub_categories)
const keywordQueryParam = ref(route.query.keyword)

const categories = ref([])
const sub_categories = ref([])
const brands = ref([])
const keyword = ref('')
const prefilledObj = ref({})
function getCheckboxesValues(name) {
  return [].slice.apply(document.querySelectorAll(`input[name=${name}]`))
    .filter((c) => { return c.checked })
    .map((c) => { return c.value })
}
function preCheckedValues(name, queryArray) {
  const checkboxes = document.querySelectorAll(`input[name=${name}]`)

  checkboxes.forEach((checkbox) => {
    if (queryArray.includes(checkbox.value))
      checkbox.checked = true
  })
}
function uncheckPreCheckedValues(name, queryArray) {
  const checkboxes = document.querySelectorAll(`input[name=${name}]`)

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false
    if (queryArray.includes(checkbox.value))
      checkbox.checked = true
  })
}


const applyFilter = (filterOption) => {
  // Update the URL without a full page reload
  router.push({ query: { brands: brands.value, categories: categories.value, sub_categories: sub_categories.value, keyword: keyword.value } });
};

const handleFilterSelection = (e) => {
  
  if (e) {
    if (e.target.name === 'categories')
      categories.value = getCheckboxesValues(e.target.name)
    else if (e.target.name === 'sub_categories')
      sub_categories.value = getCheckboxesValues(e.target.name)
    else if (e.target.name === 'brands')
      brands.value = getCheckboxesValues(e.target.name)
    applyFilter(e.target.name)
  }
  else {
    categories.value = []
    sub_categories.value = []
    brands.value = []
    keyword.value = null
    router.push({ query: { } });
  }

  setProducts()
}
onMounted(() => {
  if (brandsQueryParam.value !== undefined) {
    if (Array.isArray(brandsQueryParam.value) && !brandsQueryParam.value?.includes(',')) {
      brands.value = brandsQueryParam.value

    } else {

      const list = brandsQueryParam.value.split(',').map(item => item.replace(/ /g, '+'))
      brands.value = list
    }
    preCheckedValues('brands', brands.value)
  }

  if (catsQueryParam.value !== undefined) {
    if(Array.isArray(catsQueryParam.value) && !catsQueryParam.value?.includes(',')){
    categories.value = catsQueryParam.value

    }else{

      categories.value = catsQueryParam?.value?.split(',')?.map(item => item.replace(/ /g, '+'))
    }
    preCheckedValues('categories', categories.value)
  }

  if (subCatsQueryParam.value !== undefined) {
    if (Array.isArray(subCatsQueryParam.value) && !subCatsQueryParam.value?.includes(',')) {
      sub_categories.value = subCatsQueryParam.value

    } else {
      sub_categories.value = subCatsQueryParam.value.split(',').map(item => item.replace(/ /g, '+'))
    }
    preCheckedValues('sub_categories', sub_categories.value)
  }

  if (keywordQueryParam.value !== undefined) {
    keyword.value = keywordQueryParam.value
  }

  // prefilledObj.value =

  useShopPageStore().setUrlQuery({
    brands: brands.value,
    categories: categories.value,
    sub_categories: sub_categories.value,
    keyword: keyword.value || '',
  })
  setProducts()
  window.addEventListener('resize', screenSizeAdjust());
  screenSizeAdjust()
 
})
function screenSizeAdjust() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 900) {
    categoryCollapse.value = false
    brandsCollapse.value = false
  }else{
    categoryCollapse.value = true
    brandsCollapse.value = true

  }
}

const setProducts = () => {
  prefilledObj.value = {
    brands: brands.value,
    categories: categories.value,
    sub_categories: sub_categories.value,
    keyword: keyword.value || ''
  }
  useShopPageStore().getProducts({
    brands: brands.value,
    categories: categories.value,
    sub_categories: sub_categories.value,
    keyword: keyword.value || ''
  })
}

const watchCategoryParam = () => {
  return route.query.categories;
};

const watchKeywordParam = () => {
  return route.query.keyword;
};

// Watch for changes in the URL query parameter
onMounted(() => {
  watch(watchCategoryParam, (newVal) => {
    if(!Array.isArray(newVal)){

      const slug = newVal?.replace(/ /g, '+')
      categories.value = [slug]
      prefilledObj.value = {
        brands: brands.value,
        categories: categories.value,
        sub_categories: sub_categories.value,
        keyword: keyword.value || ''
      }
      uncheckPreCheckedValues('categories', categories.value)
    }
  });
  watch(watchKeywordParam, (newVal) => {
    if (!Array.isArray(newVal)) {
      keyword.value = newVal
      prefilledObj.value = {
        brands: brands.value,
        categories: categories.value,
        sub_categories: sub_categories.value,
        keyword: keyword.value || ''
      }
    }
  });
})

const filters = computed(() => useShopPageStore().filtersList)
</script>
<style scoped>
.horizontal{
  color: #E9E9E4;
  border: 1px solid #E9E9E4;
  margin-top: 10px;
}
</style>

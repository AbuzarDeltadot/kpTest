<template>
  <div class="group/product md:min-h-[468px] w-full rounded-xl border border-gray-200 overflow-hidden">
    <NuxtLink
      :to="`/product/${detail?.slug}`"
      class="block relative h-[260px] overflow-hidden z-0"
    >
      <img
        alt="ecommerce"
        class="object-cover object-center w-full h-full block hover:scale-125 ease-in-out duration-500"
        :src="$config.IMAGE_URL + detail.featured_image"
      >
      <span class="flex flex-col gap-2 absolute z-10 block right-3 bottom-6">
        <span class="h-8 w-8 cursor-pointer group/icon bg-white/50 hover:bg-secondary hover:border-secondary border rounded-full border-primary flex items-center justify-center backdrop-blur translate-y-8 opacity-0 group-hover/product:translate-y-0 group-hover/product:opacity-100 ease-in-out duration-500">
          <Icon
            name="ic:baseline-favorite-border"
            class="text-primary group-hover/icon:text-white ease-in-out duration-500"
          />
        </span>
        <span class="h-8 w-8 cursor-pointer group/icon bg-white/50 hover:bg-secondary hover:border-secondary border rounded-full border-primary flex items-center justify-center backdrop-blur translate-y-8 opacity-0 group-hover/product:translate-y-0 group-hover/product:opacity-100 ease-in-out duration-500 group-hover/product:delay-200">
          <Icon
            name="akar-icons:enlarge"
            class="text-primary group-hover/icon:text-white ease-in-out duration-500"
          />
        </span>
      </span>
    </NuxtLink>
    <div class="p-6 text-center">
      <!-- <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
      CATEGORY
    </h3> -->
      <h2 class="title-font text-lg font-medium line-clamp-2">
        <NuxtLink :to="`/product/${detail?.slug}`">
          {{ detail.name }}
        </NuxtLink>
      </h2>
      <span class="mb-8 px-4">
        <p
          v-for="(attr, i) in Object.keys(detail.attributes)"
          :key="i"
        >
          <span class="line-clamp-2 text-gray-400"><span class="text-primary font-bold">{{ attr }}:</span> &nbsp;
            <span
              v-for="(item, index) in detail.attributes[attr]"
              :key="index"
              class="text-gray-400 text-sm font-normal"
            ><span v-if="index < 3">{{ item.value }} <span v-if="index < detail.attributes.length > 3 ? 2 : detail.attributes.length"> | </span></span> </span>
          </span>
        </p>
        <!-- <p>
          <span class="text-primary font-bold">Size: &nbsp;<span class="text-gray-400 text-sm font-normal">100ml | 1litre | 5litre</span></span>
        </p>
        <p>
          <span class="text-primary font-bold">Packaging: &nbsp;<span class="text-gray-400 text-sm font-normal">Bottle | Pump | Container</span></span>
        </p> -->
      </span>
      <div class="flex flex-wrap items-center justify-between">
        <span class="price-wrap block w-fit">
          <span class="text-primary text-sm font-semibold"><span v-if="getAttributePrice(detail?.attributes)">{{ $config.CURRENCY + getAttributePrice(detail?.attributes) }}</span><span v-else>Free</span> &nbsp;</span>
          <span
            v-if="detail.regularPrice"
            class="text-xs text-gray-500 line-through"
          > $24.45</span>
        </span>
        <NuxtLink
          :to="`/product/${detail?.slug}`"
          class="relative group/linkbtn min-h-[50px] w-fit pl-3 pr-5 flex items-center"
        >
          <span class="z-0 h-full w-[50px] bg-[#00000070] group-hover/linkbtn:w-full group-hover/linkbtn:bg-primary bg-azure transition-all ease-in-out duration-500 block absolute left-0 top-0 rounded-full" />
          <Icon
            name="material-symbols:arrow-right-alt-rounded"
            class="z-10 text-xl mr-1 text-primary group-hover/linkbtn:text-white ease-in-out duration-500"
          /> <span class="z-10 text-xs uppercase font-semibold text-primary group-hover/linkbtn:text-white ease-in-out duration-500">Add to basket</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import dummy from '/images/dummy.jpg'
const props = defineProps({
  detail: Object,
})
function getAttributePrice(list) {
  const defaultAttr = list[Object.keys(list)[0]]?.filter(item => item.is_default)[0]
  if (defaultAttr)
    return defaultAttr?.price

  return list[Object.keys(list)[0]]?.price
}
</script>

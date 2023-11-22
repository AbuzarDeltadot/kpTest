<template>
  <BasePageLoader :loader="data.loading" v-if="!homeData?.error">
    <NotificationBar v-if="notificationContent" :loading="false" :content="notificationContent" class-name="bg-azure" />

    <!-- Top Banner -->
    <ShopBanner :banner-data="homeData?.banners" />

    <!-- Features -->
    <FeatureSection :features="homeData?.features" />

    <!-- Brands Section -->
    <BrandSection :title="homeData?.brand?.heading" :brands="homeData?.brand?.brands" v-if="homeData?.brand?.brands && homeData?.brand?.brands.length > 0"/>

    <!-- Always Here For You -->
    <AlwaysForYouSection :title="homeData?.Always_for_you?.heading" :desc="homeData?.Always_for_you?.subHeading"
      :content="homeData?.Always_for_you?.items" />

    <!-- Blogs Section -->
    <BlogSection :title="homeData?.blog?.heading" :desc="homeData?.blog?.subHeading" :content="homeData?.blog?.blogs" />

    <!-- Feedback Button -->
    <button
      class="bg-primary py-1 text-xs rounded-b-lg shadow-lg hover:bg-secondary transition px-4 fixed md:top-1/2 top-[90%] left-0 -translate-y-1/2 text-white z-10 -rotate-90 origin-top-left">
      Feedback
    </button>
  </BasePageLoader>
  <div v-else></div>
</template>

<script setup>
import ShopBanner from '~~/components/ShopBanner.vue'
import NotificationBar from '~~/components/base/NotificationBar.vue'
import CollectionSection from '~~/components/sections/CollectionSection.vue'
import FeatureSection from '~~/components/sections/FeatureSection.vue'
import BrandSection from '~~/components/sections/BrandSection.vue'
import AlwaysForYouSection from '~~/components/sections/AlwaysForYouSection.vue'
import ConsultationSection from '~~/components/sections/ConsultationSection.vue'
import BlogSection from '~~/components/sections/BlogSection.vue'
import YouMayLikeSection from '~~/components/sections/YouMayLikeSection.vue'
// const bannerData = ['a', 'b']

const props = defineProps({
  data: Object,
})

const notificationContent = ''
useHead({
  title: props.data.title,
})


const homeData = ref({})
// const shop = useHomeStore().data
// const shop = {loading: true}
// homeData.value = props.data
homeData.value = props.data.data
</script>

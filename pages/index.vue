<template>
  <BasePageLoader :loader="shop.loading">
    <NotificationBar
      v-if="notificationContent"
      :loading="false"
      :content="notificationContent"
      class-name="bg-azure"
    />

    <!-- https://jsonblob.com/1128287320167170048 -->
    <ShopBanner :banner-data="homeData?.banners" />

    <!-- Features -->
    <FeatureSection :features="homeData?.features" />

    <!-- Special Collections -->
    <!-- <CollectionSection
      :title="homeData.collection.heading"
      :categories="homeData.collection.categories"
      :products="homeData.collection.products"
    /> -->

    <!-- You May Like -->
    <!-- <YouMayLikeSection title="You May Like" /> -->

    <!-- Brands Section -->
    <BrandSection
      :title="homeData?.brand?.heading"
      :brands="homeData?.brand?.brands"
    />

    <!-- Always Here For You -->
    <AlwaysForYouSection
      :title="homeData?.Always_for_you?.heading"
      :desc="homeData?.Always_for_you?.subHeading"
      :content="homeData?.Always_for_you?.items"
    />

    <!-- Consultation Section -->
    <!-- <ConsultationSection /> -->

    <!-- Blogs Section -->
    <BlogSection
      :title="homeData?.blog?.heading"
      :desc="homeData?.blog?.subHeading"
      :content="homeData?.blog?.blogs"
    />

    <!-- Feedback Button -->
    <button class="bg-primary py-1 text-xs rounded-b-lg shadow-lg hover:bg-secondary transition px-4 fixed md:top-1/2 top-[90%] left-0 -translate-y-1/2 text-white z-10 -rotate-90 origin-top-left">
      Feedback
    </button>
  </BasePageLoader>
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
const notificationContent = ''
useHead({
  title: 'Shop',
})

const homeData = ref({})
const shop = useHomeStore().data
homeData.value = shop.data
</script>

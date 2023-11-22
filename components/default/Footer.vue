<template>
  <footer class="bg-primary">
    <!-- <div class="container mx-auto px-3">
      <div>as</div>
    </div> -->
    <div class="container mx-auto pt-6 px-4">
      <div class="flex-col flex md:flex-row md:items-center md:space-x-12">
        <div class="flex-shrink-0 mb-4 md:mb-0">
          <NuxtLink
            to="/"
            class="flex items-center"
          >
            <img
              :src="footerLogo ? footerLogo : logo"
              class="h-12 w-auto md:h-16"
              sizes="sm:100vw md:70vw lg:400px"
              alt="KP Pharma"
            >
          </NuxtLink>
        </div>
        <div class="flex flex-col items-start w-full space-y-4">
          <h3 class="text-secondary text-lg">
            Get In Touch
          </h3>
          <ul class="flex-col flex space-y-3 md:flex-row md:items-center md:space-x-8 md:space-y-0">
            <li
              v-for="(item, itemIndex) in menus?.get_in_touch?.items ?? []"
              :key="itemIndex"
            >
              <NuxtLink
                class="flex items-center space-x-2"
                :rel="item?.url ? '' : 'nofollow'"
                :to="item?.url"
                :target="item?.target"
              >
                <Icon
                  :name="item.icon"
                  class="w-6 h-6 text-secondary flex-shrink-0"
                />
                <span class="text-white">{{ item.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-col flex text-white my-8 space-y-6 md:space-y-0 md:my-12 md:flex-row">
        <div class="flex flex-col justify-between flex-grow md:pr-8 md:w-1/4">
          <div
            v-if="footer"
            class="flex flex-col space-y-3 md:space-y-6"
          >
            <h4 class="text-lg font-semibold">
              {{ footer?.about_title }}
            </h4>
            <div
              class="text-sm leading-7 mb-6"
              v-html="footer?.about_description "
            />
          </div>
          <div class="flex mt-4 flex-col space-x-0 items-start space-y-3 xl:flex-row xl:items-center xl:space-x-8">
            <!-- <h4 class="font-semibold">
              Connect With Us
            </h4>
            <ul class="flex space-x-4">
              <li
                v-for="(item, itemIndex) in menus?.socials?.items ?? []"
                :key="itemIndex"
              >
                <NuxtLink
                  :rel="item?.url ? '' : 'nofollow'"
                  :to="item?.url"
                  :target="item?.target"
                  :aria-label="item.name"
                  :style="`background-color: ${item.color};`"
                  class="flex items-center justify-center rounded-full w-10 h-10"
                >
                  <Icon
                    :name="item.icon"
                    class="w-6 h-6"
                  />
                </NuxtLink>
              </li>
            </ul> -->
          </div>
        </div>
        <div class="flex-col flex items-start justify-evenly space-y-4 md:space-y-0 md:flex-row md:border-r md:border-l md:w-1/2">
          <div
            v-for="(link, linkIndex) in links"
            :key="linkIndex"
          >
            <h4 class="mb-3 md:mb-6 text-lg font-semibold">
              {{ link?.name }}
            </h4>
            <ul class="space-y-3 md:space-y-6">
              <li
                v-for="(item, itemIndex) in link?.items ?? []"
                :key="itemIndex"
                class="text-sm"
              >
                <NuxtLink
                  :rel="item?.url ? '' : 'nofollow'"
                  :to="item?.url"
                  :target="item?.target"
                  >
                  <!-- :aria-label="item?.name" -->
                  {{ item?.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col justify-between md:pl-8 md:w-1/4">
          <div>
            <h4 class="mb-3 md:mb-6 text-lg font-semibold">
              Country Settings
            </h4>
            <div
              v-if="defaultCountry"
              class="flex items-center space-x-2"
            >
              <Icon
              v-if="defaultCountry?.icon"
                :name="defaultCountry?.icon"
                class="w-6 h-6"
              />
              <span>{{ defaultCountry?.name }}</span>
            </div>
          </div>
          <div class="mt-4">
            <h4 class="font-semibold">
              Shop with confidence
            </h4>
          </div>
        </div>
      </div>
      <hr class="my-2 border-dashed border-gray-200 mx-auto">
      <ul class="text-white flex flex-wrap items-center justify-center space-x-6 leading-10 mb-2 md:space-x-12">
        <li
          v-for="(item, itemIndex) in menus?.countries?.items ?? []"
          :key="itemIndex"
          class="flex items-center space-x-2"
        >
          <Icon
          v-if="item?.icon"
            :name="item?.icon"
            class="w-6 h-6"
          />
          <span>{{ item?.name }}</span>
        </li>
      </ul>
    </div>
    <div
      class="bg-primary-dark text-white text-center py-4 text-xs"
      v-html="footer?.copyright ? footer?.copyright : 'All Rights Reserved'"
    />
  </footer>
</template>

<script setup>
import logo from '/images/footer_logo.png'
const props = defineProps({
  menus: {
    type: Object,
  },
})
const footerLogo = ref('')
const footer = useSettingsStore()?.data?.footer
const checkLogo = (url) => {
  if (url) {
    const regex = /https:\/\/regen-verse-local\.ams3\.digitaloceanspaces\.com\/0/i
    const test = regex.test(url)
    if (test) { footerLogo.value = '' }
    else {
      if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg'))
        footerLogo.value = url

      else
        footerLogo.value = ''
    }
  }
}

checkLogo(footer?.logo?.src)
const links = computed(() => {
  const footerLinks = []
  if (props.menus?.categories)
    footerLinks.push(props.menus.categories)

  if (props.menus?.useful_links)
    footerLinks.push(props.menus.useful_links)

  if (props.menus?.help_center)
    footerLinks.push(props.menus.help_center)

  return footerLinks
})
const defaultCountry = computed(() => {
  if (props.menus?.countries)
    return props.menus.countries.items.find(c => c.name.toLowerCase().includes('united kingdom'))

  return null
})
</script>

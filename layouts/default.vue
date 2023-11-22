<template>
  <div
    class="flex flex-col min-h-screen justify-between bg-azure antialiased scroll-smooth text-slate-900 overflow-x-hidden"
  >
    <NuxtLoadingIndicator color="#30c4c2" />
    <!-- Google Tag Manager (noscript) -->
    <noscript v-html="iframe"></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <DefaultHeader :menus="data?.menus" />

    <div class="w-full h-full flex-1">
      <slot />
    </div>

    <LazyDefaultFooter :menus="data?.menus" />
    
  </div>
  <CartSidebar />
  
</template>

<script setup>
const { data } = useAsyncData(
  'menus',
  async () =>
    await useGet('/menus', {
      query: {
        labels: [
          'main_header',
          'navigation',
          'header_top_right',
          'get_in_touch',
          'categories',
          'useful_links',
          'help_center',
          'socials',
          'countries'
        ].join(',')
      }
    })
)

const iframe = `<iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-K3G6WNL5"
    height="0"
    width="0"
    style="display: none; visibility: hidden"
  ></iframe>`


// onMounted(() => {
//   const script = document.createElement('script')
//   script.async = true
//   script.src = 'https://www.googletagmanager.com/gtag/js?id=GT-MQX86JS'
//   document.head.appendChild(script)

//   window.dataLayer = window.dataLayer || []
//   function gtag() {
//     window.dataLayer.push(arguments)
//   }
//   gtag('js', new Date())
//   gtag('config', 'GT-MQX86JS')

//   gtag('event', 'purchase', {
//     transaction_id: 'T_12345_1',
//     affiliation: 'Google Merchandise Store',
//     value: 25.42,
//     tax: 4.9,
//     shipping: 3.99,
//     currency: 'USD',
//     coupon: 'SUMMER_SALE',
//     items: [
//       {
//         item_id: 'SKU_12345',
//         item_name: 'Stan and Friends Tee',
//         affiliation: 'Google Merchandise Store',
//         coupon: 'SUMMER_FUN',
//         discount: 2.22,
//         index: 0,
//         item_brand: 'Google',
//         item_category: 'Clothing',
//         item_category2: 'Adult',
//         item_category3: 'Shirts',
//         item_category4: 'Crew',
//         item_category5: 'Short sleeve',
//         item_list_id: 'related_products',
//         item_list_name: 'Related products',
//         item_variant: 'green',
//         location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
//         price: 9.99,
//         quantity: 1
//       }
//     ]
//   })
// })
</script>

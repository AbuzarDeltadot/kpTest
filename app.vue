<template>
  <div>
    <Head>
      <Link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <Link rel="manifest" href="/site.webmanifest" />
      <Meta name="msapplication-TileColor" content="#da532c" />
      <Meta name="theme-color" content="#ffffff" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  title: '',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - KP Pharma` : 'KP Pharma'
  },
  meta: [
    { name: 'description', content: 'KP Pharma site' },
    {
      name: 'google-site-verification',
      content: 'rTIM03xS6tREUVAYVDrNL4BOG5dFd9KXNUCOvfI5N0s'
    }
  ],
  script: [
    {
      innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K3G6WNL5');
          `
    },
    {
      innerHTML: `function initMap(){console.log('Maps Initialized')}`
    },
    {
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDR0GpXTjXKd0izp0dh5xEor6j1vlaHzv0&libraries=places&callback=initMap',
      async: true,
      defer: true
    },
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=GT-MQX86JS',
      async: true,
      defer: true
    },
    {
      hid: 'gtag',
      innerHTML: `
      window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GT-MQX86JS');
          `
    },
    {
      async: true,
      defer: true,
      'data-domain': 'kp-pharma.vercel.app',
      src: 'https://plausible.io/js/plausible.js'
    }
  ]
})

// onMounted(() => {
//   const script = document.createElement('script')
//   script.async = true
//   script.src = 'https://www.googletagmanager.com/gtag/js?id=GT-MQX86JS'
//   document.head.appendChild(script)

// window.dataLayer = window.dataLayer || []
// function gtag() {
//   window.dataLayer.push(arguments)
// }
// gtag('js', new Date())
// gtag('config', 'GT-MQX86JS')

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

onMounted(() => {
  initFlowbite()
  // Cart Check and Fill
  setTimeout(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('customer'))
    useAuthStore().setUser(isLoggedIn)
    useShopStore().setLoggedinUser(isLoggedIn)
  }, 100)

  const previousCart = JSON.parse(localStorage.getItem('cart'))
  useShopStore().checkPreviousCart(previousCart)
  // obtain plugin
  const cc = initCookieConsent()

  // run plugin with your configuration
  cc.run({
    current_lang: 'en',
    autoclear_cookies: true, // default: false
    page_scripts: true, // default: false

    // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
    // delay: 0,                               // default: 0
    // auto_language: null                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                          // default: true
    // force_consent: false,                   // default: false
    // hide_from_bots: true,                   // default: true
    // remove_cookie_tables: false             // default: false
    // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
    // cookie_expiration: 182,                 // default: 182 (days)
    // cookie_necessary_only_expiration: 182   // default: disabled
    // cookie_domain: location.hostname,       // default: current domain
    // cookie_path: '/',                       // default: root
    // cookie_same_site: 'Lax',                // default: 'Lax'
    // use_rfc_cookie: false,                  // default: false
    // revision: 0,                            // default: 0

    onFirstAction(user_preferences, cookie) {
      // callback triggered only once
    },

    onAccept(cookie) {
      // ...
    },

    onChange(cookie, changed_preferences) {
      // ...
    },

    languages: {
      en: {
        consent_modal: {
          title: 'We use cookies!',
          description:
            'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
          primary_btn: {
            text: 'Accept all',
            role: 'accept_all' // 'accept_selected' or 'accept_all'
          },
          secondary_btn: {
            text: 'Reject all',
            role: 'accept_necessary' // 'settings' or 'accept_necessary'
          }
        },
        settings_modal: {
          title: 'Cookie preferences',
          save_settings_btn: 'Save settings',
          accept_all_btn: 'Accept all',
          reject_all_btn: 'Reject all',
          close_btn_label: 'Close',
          cookie_table_headers: [
            { col1: 'Name' },
            { col2: 'Domain' },
            { col3: 'Expiration' }
            // { col4: 'Description' },
          ],
          blocks: [
            {
              title: 'Cookie usage 📢',
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
            },
            {
              title: 'Strictly necessary cookies',
              description:
                'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true // cookie categories with readonly=true are all treated as "necessary cookies"
              }
            },
            {
              title: 'Performance and Analytics cookies',
              description:
                'These cookies allow the website to remember the choices you have made in the past',
              toggle: {
                value: 'analytics', // your cookie category
                enabled: false,
                readonly: false
              },
              cookie_table: [
                // list of all expected cookies
                {
                  col1: '^_ga', // match all cookies starting with "_ga"
                  col2: 'google.com',
                  col3: '2 years',
                  // col4: 'description ...',
                  is_regex: true
                },
                {
                  col1: '_gid',
                  col2: 'google.com',
                  col3: '1 day'
                  // col4: 'description ...',
                }
              ]
            },
            {
              title: 'Advertisement and Targeting cookies',
              description:
                'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
              toggle: {
                value: 'targeting',
                enabled: false,
                readonly: false
              }
            }
            // {
            //   title: 'More information',
            //   description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact-us">contact us</a>.',
            // },
          ]
        }
      }
    }
  })
})
</script>

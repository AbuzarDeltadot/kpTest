// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  mode: 'universal',
  // head: {

    // script: [
      // {
      //   src: `https://www.googletagmanager.com/gtag/js?id=GT-MQX86JS`,
      //   async: true
      // },
      // {
      //   hid: 'gtag',
      //   innerHTML: `
      //     window.dataLayer = window.dataLayer || [];
      //     function gtag(){dataLayer.push(arguments);}
      //     gtag('js', new Date());
      //     gtag('config', 'GT-MQX86JS');
      //   `
      // }
    // ]
    // script: [
    //   {
    //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDR0GpXTjXKd0izp0dh5xEor6j1vlaHzv0',
    //     async: true,
    //     defer: true,
    //   },
    // ],
  // },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'storeToRefs'
        ],
      },
    ],
    '@formkit/nuxt',
  ],
  // gtag: {
  //   id: 'GT-MQX86JS',
  //   config: {
  //     page_title: 'checkpout page',
  //   },
  // },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  css: [
    '~/assets/css/global.css',
  ],
  runtimeConfig: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
    API_PREFIX: process.env.API_PREFIX,
    IMAGE_URL: process.env.IMAGE_URL,
    CURRENCY: process.env.APP_CURRENCY,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC_KEY,
    public: {
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL,
      API_PREFIX: process.env.API_PREFIX,
      IMAGE_URL: process.env.IMAGE_URL,
      CURRENCY: process.env.APP_CURRENCY,
      STRIPE_PUBLIC: process.env.STRIPE_PUBLIC_KEY,
    },
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition)
        return savedPosition

      else
        return { x: 0, y: 0 }
    },
  },
})

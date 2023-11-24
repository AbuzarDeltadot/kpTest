// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  mode: 'universal',
  
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
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  css: [
    '~/assets/css/global.css',
  ],
  serverMiddleware: [
    'compression', // Enable server-side compression
  ],
  http: {
    middleware: ['compression'],
  },
  buildModules: ['@nuxt/http', '@nuxtjs/webpack-bundle-analyzer', '@nuxtjs/analyz'],
  build: {
    // Enable modern mode for better performance in modern browsers
    target: 'static',
    modern: 'server',
    // Minify CSS and JS
    optimizeCSS: true, // Minify CSS
    minifyJS: true,   // Minify JS
    terser: {
      extractComments: false,
    },
    // Enable Brotli compression
    extend(config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.optimization.splitChunks.maxSize = 250000;
      }
    },
  },
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

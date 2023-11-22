import CookieConsent from 'vue-cookieconsent'

export default defineNuxtPlugin((app) => {
  if (!process.server) {
    app.vueApp.use(CookieConsent, {
      gui_options: {
        consent_modal: {
          layout: 'cloud', // box/cloud/bar
          position: 'bottom center', // bottom/middle/top + left/right/center
          transition: 'zoom', // zoom/slide
        },
      },
    })
  }
})

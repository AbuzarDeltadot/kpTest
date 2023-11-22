import type { PluginOptions } from 'vue-toastification'
import Toast, { POSITION } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((app) => {
  if (!process.server) {
    app.vueApp.use(Toast, {
      position: POSITION.TOP_RIGHT,
      timeout: 7000,
    } as PluginOptions)
  }
})

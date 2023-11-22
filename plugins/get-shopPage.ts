import { useShopPageStore } from '../stores/shopPage'

export default defineNuxtPlugin(async () => {
  useShopPageStore().getFilters()
})

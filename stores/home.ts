export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
    home: {
      loading: true,
      data: {},
    },
    collections: {
      loading: false,
      items: [],
    },
    showCart: false,
  }),
  getters: {
    data(state) {
      return state.home
    },
    getGollections(state) {
      return state.collections
    },
    getShowCart(state){
      return state.showCart
    }
  },
  actions: {
    async getHome() {
      this.home.loading = true
      try {
        const home = await useGet('/home')
        if (home) {
          this.home.data = home
          this.home.loading = false
        }
      }
      catch (error) {
      }
    },
    async getCategorisedProducts(slug) {
      this.collections.loading = true
      try {
        const items = await useGet(`/products-by-category/${slug}`)
        if (items)
          this.collections.items = items
        this.collections.loading = false
        return items
      }
      catch (error) {
        this.collections.loading = false
      }
    },
    async setShowCart(bool){
      this.showCart = bool;
    }
  },
})

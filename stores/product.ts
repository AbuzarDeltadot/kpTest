export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    product: {
      loading: true,
      product: {},
      relatedProducts: [],
    },
  }),
  getters: {
    data(state) {
      return state.product
    },
  },
  actions: {
    async getProduct(slug) {
      this.product.loading = true
      try {
        const product = await useGet(`/product/${slug}`)
        if (product) {
          this.product.product = product
          // this.product.relatedProducts = blog.related_blogs
          this.product.loading = false
        }
      }
      catch (error) {
      }
    },
  },
})

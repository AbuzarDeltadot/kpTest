export const useBrandStore = defineStore({
  id: 'brand',
  state: () => ({
    brand: {
      loading: true,
      data: {},
    },
    page: {
      loading: true,
      data: {},
    },
    collections: {
      loading: false,
      items: [],
    },
  }),
  getters: {
    brandData(state) {
      return state.brand
    },
    pageData(state) {
      return state.page
    },
    getGollections(state) {
      return state.collections
    },
  },
  actions: {
    async getBrand(brandSlug) {
      this.brand.loading = true
      try {
        const brand = await useGet(`/brand/${brandSlug}`)
        if (brand) {
          this.brand.data = brand
          this.brand.loading = false
        }
      }
      catch (error) {
      }
    },
    async getPage(brandSlug) {
      this.page.loading = true
      try {
        const page = await useGet(`/navigation/${brandSlug}`)
        if (page) {
          this.page.data = page
          this.page.loading = false
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
  },
})

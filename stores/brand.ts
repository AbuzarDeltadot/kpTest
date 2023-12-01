export const useBrandStore = defineStore({
  id: 'brand',
  state: () => ({
    brand: {
      // loading: true,
      // loading: true,
      data: {},
      products: {},
      loadMore: ref(false),
      loading: ref(false),

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
    loadMoreUrl(state) {
      return state.brand.loadMore
    },
    isLoading(state) {
      return state.page.loading
    },
    productBrand(state) {
      return state.brand.products
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

    async getBrandProduct(brandSlug, pageNo) {
      // console.log(pageNo,brandSlug,'pageno')
      this.page.loading = true
      // console.log(this.brand.loading,'1')
      try {
        const product = await useGet(`/brand/${brandSlug}/products?page=${pageNo || 1}`)
        if (pageNo > 1)
          this.brand.products.push(...product.data)
        else
          this.brand.products = product.data

        if (product?.next_page_url)
          this.brand.loadMore = true

        else
          this.brand.loadMore = false
        this.page.loading = false
        // console.log(this.brand.loading)

      }
      catch (error) {
        this.brand.loading = false
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

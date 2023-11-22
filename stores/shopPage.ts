export const useShopPageStore = defineStore({
  id: 'shopPage',
  state: () => ({
    products: ref([]),
    filters: ref({}),
    urlQuery: ref({}),
    chunk: ref(1),
    searchCount: ref(0),
    loadMore: ref(false),
    loading: ref(false),
  }),
  getters: {
    productsList(state) {
      return state.products
    },
    filtersList(state) {
      return state.filters
    },
    urlQueryObj(state) {
      return state.urlQuery
    },
    loadMoreUrl(state) {
      return state.loadMore
    },
    isLoading(state) {
      return state.loading
    },
    getSearchCount(state){
      return state.searchCount
    }
  },
  actions: {
    async getProducts(queryObject, pageNo, onScroll, onSearch) {
      // debugger
      // console.log(pageNo,'pageno')
      this.loading = true
      if (queryObject)
        this.urlQuery = queryObject

      const formData = new FormData()
      formData.append('records', 9)

      for (const key in this.urlQuery) {
        if (Array.isArray(this.urlQuery[key])) {
          // If the value is an array, iterate through it and append each item
          this.urlQuery[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        }
        else {
          // If the value is not an array, simply append it
          formData.append(key, this.urlQuery[key])
        }
      }
      

      usePost(`/shop/get-filtered-products?page=${pageNo || 1}`, { body: formData }).then((resp) => {
        if (pageNo > 1)
          this.products.push(...resp.data)
        else
          this.products = resp.data

        if (resp?.next_page_url)
          this.loadMore = true
        else
          this.loadMore = false
    
    // this.chunk = this.chunk + 1
    if(onSearch){

      this.searchCount = this.searchCount + 1
    }
        this.loading = false
      }).catch((err) => {
        this.loading = false
      })

      // this.products = products
    },
    async getFilters() {
      useGet('/shop/filters').then((resp) => { this.filters = resp })
    },
    async setUrlQuery(object) {
      this.urlQuery = object
    },
  },
})

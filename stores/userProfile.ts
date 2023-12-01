
export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    order: {
      // loading: true,
      // loading: true,
      data: {},
      orders: {},
      loadMore: ref(false),
      loading: ref(false),

    },
    page: {
      loading: true,
      data: {},
    },
  }),
  getters: {

    loadMoreUrl(state) {
      return state.order.loadMore
    },
    isLoading(state) {
      return state.page.loading
    },
    getorder(state){
      return state.order.orders
    }

    // pageData(state) {
    //   return state.page
    // },

  },
  actions: {
    async getOrder(token,pageNo) {
      // this.page.loading = true;
      console.log(token,'pinia')
      try {
        const headers = {
          Authorization: `Bearer ${token}`
          // Add other headers if needed: 'Content-Type', etc.
        };
        const order = await useGet(`/customers/customer-orders`, { headers });
        // this.order.orders = order.orders.data
        if (pageNo > 1)
        this.order.orders.push(...order.orders.data)
        else
        this.order.orders = order.orders.data

        if (order?.next_page_url)
          this.order.loadMore = true

        else
          this.order.loadMore = false
        this.page.loading = false
      } catch (error) {
        // Handle errors
      } finally {
        this.page.loading = false;
      }
    },

  }
})


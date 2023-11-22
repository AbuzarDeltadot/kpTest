export const useBlogStore = defineStore({
  id: 'blog',
  state: () => ({
    blog: {
      loading: true,
      blog: {},
      relatedBlogs: [],
    },
  }),
  getters: {
    data(state) {
      return state.blog
    },
  },
  actions: {
    async getBlog(slug) {
      this.blog.loading = true
      try {
        const blog = await useGet(`/blog/${slug}`)
        if (blog) {
          this.blog.blog = blog.blog
          this.blog.relatedBlogs = blog.related_blogs
          this.blog.loading = false
        }
      }
      catch (error) {
      }
    },
  },
})

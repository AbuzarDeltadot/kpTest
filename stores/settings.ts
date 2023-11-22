export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    settings: {},
  }),
  getters: {
    data(state) {
      return state.settings
    },
  },
  actions: {
    async getSettings() {
      try {
        const { settings, error } = await useGet('/settings')
        if (!error)
          this.settings = settings
      }
      catch (error) {

      }
    },
  },
})

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    diagnosticUser: null,
    user: {},
  }),
  getters: {
    authenticated(state) {
      return state.diagnosticUser !== null && (state.diagnosticUser && Object.keys(state.diagnosticUser).length !== 0)
    },
    getDiagnosticUser(state) {
      return state.diagnosticUser
    },
    getUser(state) {
      return state.user
    },
  },
  actions: {
    async getMe() {
      // try {
      //   const { user, error } = await useGet('/me')
      //   if (!error)
      //     this.diagnosticUser = user
      // }
      // catch (error) {

      // }
    },
    async setUser(user: any) {
      this.user = user
      this.setUserGlobally(user)
    },
    async login(loginForm: any, navigate = '/account') {
      const { success } = await usePost('/login', {
        body: loginForm,
      })
      if (success) {
        await this.getMe()
        if (navigate)
          navigateTo(navigate)
      }
      return success
    },
    async customerlogin(loginForm: any) {
      const user = await usePost('/customers/login', {
        body: loginForm,
      })
      await this.setUserGlobally(user)
      return user
    },

    async setUserGlobally(user) {
      if (user) {
        localStorage.setItem('customer', JSON.stringify(user))
        this.user = user
        useShopStore().setLoggedinUser(user)
      }

      if (user?.user?.email) {
        const prefillData = await useGet(`/customers/auto-complete-address/${user.user.email}`, {}, 'no')

        if (!prefillData?.data?.message) {
          const shipping = prefillData?.filter(item => item.type === 1)[0]
          const billing = prefillData?.filter(item => item.type === 2)[0]
          const data = {
            shipping,
            billing,
          }
          useShopStore().setPrefillData(data)
        }
      }
      return user
    },

    async logout(navigate = '/') {
      const { success } = await usePost('/logout')
      // if (success) {
      this.user = {}
      localStorage.removeItem('customer')
      useShopStore().setLoggedinUser({})

      navigateTo('/')
      setTimeout(() => {
        location.reload()
      }, 200)

      return success

      // return success
    },

    async register(registerForm: any, navigate = '/checkout') {
      if (registerForm.role !== 'customer') {
        const { success } = await usePost('/register', {
          body: registerForm,
        })
        if (success)
          await this.login(registerForm, navigate)
        return success
      }
      else {
        const data = await usePost('/customers/register', {
          body: registerForm,
        })
        if (!data.user?.is_guest) {
        // await this.customerlogin(registerForm)
          this.setUserGlobally(data)
          navigateTo(navigate)
        }
        else {
          this.setUserGlobally(data)
        }

        return data
      }
    },
  },

})

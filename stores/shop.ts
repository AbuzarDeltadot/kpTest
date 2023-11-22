export const useShopStore = defineStore({
  id: 'shop',
  state: () => ({
    shop: {
      cartItems: [],
      cartLength: 0,
      cartSummary: {
        products: 0,
        totalQty: 0,
        subTotalPrice: 0,
        shippingFee: 0,
        deliveryFee: 0,
        tax: 0,
        totalPrice: 0,
        discount: 0,
        coupon: {
          code: '',
          discount: 0
        }
      },
      shipping: [],
      selectedShipping: {},
      user: {},
      token: '',
      prefillData: {
        shipping: {},
        billing: {},
      },
    },
  }),
  getters: {
    data(state) {
      return state.shop
    },
  },
  actions: {
    async addProduct(product) {
      try {
        if (product) {
          const isSameAttributes = (attributes1, attributes2) => {
            const keys1 = Object.keys(attributes1)
            const keys2 = Object.keys(attributes2)

            if (keys1.length !== keys2.length)
              return false

            for (const key of keys1) {
              if (attributes1[key] !== attributes2[key])
                return false
            }

            return true
          }

          const manageStock = (updatedCart) => {
            updatedCart.cartData.itemTotal = updatedCart.cartData.price * updatedCart.cartData.qty
            return updatedCart
          }

          const addToCart = (cart, newItem) => {
            const existingItemIndex = cart.findIndex(
              item =>
                item.cartData.productId === newItem.cartData.productId
                && isSameAttributes(item.cartData.attributes, newItem.cartData.attributes),
            )

            if (existingItemIndex !== -1) {
              // If the item already exists in the cart with the same attributes, update the quantity
              const updatedCart = [...cart]
              // const updatedProduct = manageStock(updatedCart)
              updatedCart[existingItemIndex] = manageStock(newItem)
              localStorage.setItem('cart', JSON.stringify(updatedCart))
              this.updateCartSummary(updatedCart)
              return updatedCart
            }

            // If the item does not exist in the cart with the same attributes, add it as a new item
            return [...cart, newItem]
          }

          const updatedCart = addToCart(this.shop.cartItems, product)
          this.shop.cartItems = updatedCart
          this.updateCartSummary()
          localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    async updateCartSummary(updatedCart) {
      const cartItems = updatedCart || this.shop.cartItems

      let qty = 0
      let subTotal = 0
      cartItems.map((item) => {
        qty = qty + item.cartData.qty
        subTotal = subTotal + (item.cartData.price * item.cartData.qty)
      })

      this.shop.cartLength = cartItems?.length

      this.shop.cartSummary.subTotalPrice = subTotal

      const coupon = this.shop?.cartSummary?.coupon

      if (coupon?.type === 'percentage') {
        const discountAmount = ((subTotal / 100) * parseInt(coupon?.value)).toFixed(2);
        this.shop.cartSummary.discount = discountAmount
      } else if (coupon?.type === 'amount') {
        let discountAmount = parseInt(coupon?.value).toFixed(2);
        if (discountAmount < 0) {
          discountAmount = discountAmount * -1
        }
        this.shop.cartSummary.discount = discountAmount
      }
      if (subTotal > 40) {
        // this.shipping = [{
        //   "label": "Default Standard Shipping",
        //   "description": "6-7 Days of delivery",
        //   "price": 3.99,
        //   "id": 999,
        //   "shipping_zone_id": 9999
        // }]
        // this.selectShipping({
        //   "label": "Default Standard Shipping",
        //   "description": "6-7 Days of delivery",
        //   "price": 3.99,
        //   "id": 999,
        //   "shipping_zone_id": 9999
        // })
        this.shop.cartSummary.shippingFee = 0
        this.shipping = []
        this.selectShipping({})
      } else {
        this.shop.cartSummary.shippingFee = 3.99
      }

      let discountedTotalAmount = subTotal - this.shop.cartSummary.discount

      if (discountedTotalAmount < 0) {
        discountedTotalAmount = 0;
      }

      const totalAmount = (discountedTotalAmount + (this.shop.cartSummary.shippingFee + this.shop.cartSummary.deliveryFee))

      this.shop.cartSummary = { ...this.shop.cartSummary, products: cartItems.length, totalPrice: totalAmount < 0 ? 0 : totalAmount, totalQty: qty, subTotalPrice: subTotal }
    },
    async updateShippingFee(price) {
      const stringPrice = price
      const cleanedStringPrice = stringPrice.replace(/[^0-9.]/g, '') // Remove non-numeric characters
      const floatPrice = parseFloat(cleanedStringPrice)
      this.shop.cartSummary.shippingFee = floatPrice
      this.updateCartSummary()
    },
    async selectShipping(object) {
      this.shop.selectedShipping = object
    },
    async deleteFromCart(product) {
      try {
        if (product) {
          const isSameAttributes = (attributes1, attributes2) => {
            const keys1 = Object.keys(attributes1)
            const keys2 = Object.keys(attributes2)

            if (keys1.length !== keys2.length)
              return false

            for (const key of keys1) {
              if (attributes1[key] !== attributes2[key])
                return false
            }

            return true
          }

          const removeFromCart = (cart, itemToRemove) => {
            const updatedCart = cart.filter(
              item =>
                item.cartData.productId !== itemToRemove.cartData.productId
                || !isSameAttributes(item.cartData.attributes, itemToRemove.cartData.attributes),
            )

            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
          }

          const updatedCart = removeFromCart(this.shop.cartItems, product)
          this.shop.cartItems = updatedCart
          if (!this.shop.cartItems.length > 0) {
            this.clearCoupon()
          }
          this.updateCartSummary()
        }
      }
      catch (error) {
        console.log(error)
      }
    },
    async getShippingDetails(countryCode) {
      // try {
      //   const data = await useGet(`/shipping-method/${countryCode}`, {}, 'no')
      //   if (data?.data?.message) {
      //     this.shop.shipping = []
      //     this.shop.cartSummary.shippingFee = 0
      //   }
      //   if (!data?.message)
      //     this.shop.shipping = data
      // }
      // catch (error) {
      // }
    },
    async applyCoupon(codeObj) {
      const code = codeObj
      code['totalAmount'] = this?.shop?.cartSummary?.subTotalPrice
      try {
        const data = await usePost(`/customers/discount-code/verify`, {
          body: code
        })
        if (data?.discount_type) {

          this.shop.cartSummary.coupon = { code: code?.code, discount: data?.discount_amount, type: data?.discount_type, value: data?.discount_value }
          // this.shop.cartSummary.discount = data?.discount_amount
          // const price = this.shop.cartSummary.totalPrice - this.shop.cartSummary.coupon.discount
          // this.shop.cartSummary.totalPrice = price < 1 ? 0 : price
          this.updateCartSummary()
        }
      }
      catch (error) {
      }
    },
    async clearCoupon() {
      this.shop.cartSummary.coupon = { code: '', discount: 0 }
      this.shop.cartSummary.discount = 0
      this.updateCartSummary()
    },
    async clearShippingDetails() {
      this.shop.shipping = []
      this.shop.cartSummary.shippingFee = 0
    },
    async clearCart() {
      this.shop.cartLength = 0
      this.shop.cartItems = []
      this.shop = {
        user: this.shop.user,
        token: '',
        prefillData: this.shop.prefillData,
        cartItems: [],
        cartLength: 0,
        cartSummary: {
          products: 0,
          totalQty: 0,
          subTotalPrice: 0,
          shippingFee: 0,
          deliveryFee: 0,
          tax: 0,
          totalPrice: 0,
          discount: 0,
          coupon: {
            code: "",
            discount: 0,
          }
        },
        shipping: [],
        selectedShipping: {},
      }
      this.updateCartSummary()
    },
    async setPrefillData(data) {
      this.shop.prefillData = data
    },
    async checkPreviousCart(previousCart) {
      this.shop.cartItems = previousCart || []
      this.updateCartSummary()
    },
    async setLoggedinUser(response) {
      this.shop.user = response?.user
      this.shop.token = response?.token
    },
  },
})

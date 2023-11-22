<template>
  <section

    class="py-10 px-3 bg-white"
  >
    <div class="max-w-7xl mx-auto">
      <h1 class="text-center block text-3xl mb-10">
        Review Cart
      </h1>
      <div
        v-if="shop.cartItems.length > 0"
        class="flex items-stretch lg:flex-row flex-col gap-4 relative"
      >
        <div class="relative overflow-x-auto lg:w-3/4">
          <table

            class="w-full text-sm text-left text-gray-500"
          >
            <thead class="text-xs text-gray-700 uppercase border-b border-[#E0E0E0]">
              <tr>
                <th
                  scope="col"
                  class="px-2 py-3"
                >
                  Product
                </th>
                <th
                  scope="col"
                  class="px-6 py-3"
                >
                  Detail
                </th>
                <th
                  scope="col"
                  class="px-6 py-3"
                >
                  SKU
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                >
                  QTY
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in shop.cartItems"
                :key="i"
                class="bg-white border-b"
              >
                <th
                  scope="row"
                  class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <img
                    :src="$config.IMAGE_URL + item.featured_image"
                    alt="product"
                    class="rounded-lg bg-gray-500 h-[70px] w-[70px] object-cover"
                  >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900"
                >
                  <p class="max-w-[220px] line-clamp-2">{{ item.name }}</p>
                  <div class=" text-xs text-gray-500 mt-1">
                    {{ Object.keys(item.cartData.attributes)[0] }}: <span class="font-normal">{{ item.cartData.attributes[Object.keys(item.cartData.attributes)[0]] }}</span>
                  </div>
                </th>
                <td class="px-6 py-4">
                  {{ getSKU(item) }}
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  {{ $config.CURRENCY + parseFloat(item.cartData.price).toFixed(2) }}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  <div class="flex items-center justify-center flex-row ">
                    <button
                      class="bg-gray-200 px-2 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
                      @click="(e) => decrementItem(item)"
                    >
                      -
                    </button>
                    <div class="w-[40px] border border-gray-200">
                      {{ item.cartData.qty }}
                    </div>
                    <button
                      class="bg-gray-200 px-2 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
                      @click="(e) => incrementItem(item)"
                    >
                      +
                    </button>
                  </div>
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  {{ $config.CURRENCY + parseFloat(item.cartData.itemTotal).toFixed(2) }}
                </th>
                <td class="px-6 py-4 text-center">
                  <Icon
                    name="solar:trash-bin-minimalistic-broken"
                    class="text-lg cursor-pointer transition hover:text-red-500"
                    @click="(e) => handleDeleteItem(item)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="lg:w-1/4 max-w-[400px] mx-auto w-full relative"
        >
          <div
            class="px-8 py-10 bg-gray-100 rounded-lg sticky top-5 overflow-hidden"
          >
            <h1 class="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div class="flex justify-between mt-2 mb-2">
              <span class="font-semibold text-sm">Total Items </span>
              <span class="font-semibold text-sm">{{ shop.cartSummary.totalQty }}</span>
            </div>
            <div
              v-if="shop.cartSummary.subTotalPrice"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">SubTotal</span>
              <span class="font-semibold text-sm">{{ $config.CURRENCY + parseFloat(shop.cartSummary.subTotalPrice).toFixed(2) }}</span>
            </div>
            <div
              v-if="shop.cartSummary.shippingFee"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Shipping</span>
              <span class="font-semibold text-sm">{{ $config.CURRENCY + parseFloat(shop.cartSummary.shippingFee).toFixed(2) }}</span>
            </div>
            <div
              v-if="shop.cartSummary.deliveryFee"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Delivery</span>
              <span class="font-semibold text-sm">{{ $config.CURRENCY + parseFloat(shop.cartSummary.deliveryFee).toFixed(2) }}</span>
            </div>
            <div
              v-if="shop.cartSummary.discount"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Discount</span>
              <span class="font-semibold text-sm">-{{ $config.CURRENCY + parseFloat(shop.cartSummary.discount).toFixed(2) }}</span>
            </div>
            <BaseCouponField/>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase items-center">
                <span>Payable</span>
                <span class="text-lg text-primary">{{ $config.CURRENCY + parseFloat(shop.cartSummary.totalPrice).toFixed(2) }}</span>
              </div>
              <NuxtLink
                to="/checkout"
                class="block text-center bg-primary font-semibold hover:bg-secondary py-3 text-sm text-white uppercase w-full rounded-lg transition"
              >
                Checkout
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="min-h-[300px] flex items-center justify-center bg-gray-100 text-gray-500"
      >
        <div class="text-center">
          No Items in Cart
          <NuxtLink
            to="/"
            class="text-primary cursor-pointer text-sm block"
          >
            Return to home
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const shop = useShopStore().data
useHead({
  title: 'Cart',
})
const getSKU = (product) => {
  const attributeName = Object.keys(product.cartData.attributes)[0]
  const filteredAttribute = product.attributes[attributeName].filter(item => item.value === product.cartData.attributes[Object.keys(product.cartData.attributes)[0]])[0]
  return filteredAttribute.sku
}

const decrementItem = (item) => {
  item.cartData.qty = item.cartData.qty < 2 || item.cartData.qty === 0 ? 1 : item.cartData.qty - 1
  useShopStore().addProduct(item)
}
const incrementItem = (item) => {
  const object = item
  const attrKey = Object.keys(object.attributes)[0]
  const maxQuantity = object.attributes[attrKey].filter(itm => itm.value === object.cartData.attributes[attrKey])[0]
  const increment = object.cartData.qty + 1
  const qty = increment > maxQuantity.quantity || increment === maxQuantity.quantity ? maxQuantity.quantity : increment
  object.cartData.qty = qty
  useShopStore().addProduct(object)
}

const handleDeleteItem = (itemData) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#163a92',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed)
      useShopStore().deleteFromCart(itemData)
  })
}
</script>

<style>
overflow-y-auto {
  overflow-y: auto;
}
</style>


import { createIncrementalCompilerHost } from 'typescript';
<template>
  <Transition name="fade">
  <div v-if="showCart" class="fixed top-0 bottom-0 left-0 right-0 bg-[#ffffff]/70 z-50">
    <div class="h-full w-full absolute" @click="handleHideCart(false)"></div>
    <div
      :class="`max-w-[428px] w-full h-full bg-white right-0 absolute shadow-2xl`">
      <div class="flex bg-primary justify-between p-4 shadow-lg items-center">
        <h2 class="font-semibold text-white">Shopping Cart</h2>
        <icon name="akar-icons:cross" class="text-white cursor-pointer" @click="(e) => handleHideCart(false)" />
      </div>
      <div class="overflow-scroll h-full pt-2 pb-[200px] cart-list-section">
        <div v-if="shop?.cartItems?.length > 0" v-for="(item, i) in shop?.cartItems" :key="i">
          <div class="flex px-4 py-4 gap-4 flex-row relative">
            <Icon name="solar:trash-bin-minimalistic-broken"
              class="text-lg cursor-pointer transition hover:text-red-500 absolute right-5"
              @click="(e) => handleDeleteItem(item)" />
            <div class="w-full max-w-[80px]">
              <img :src="$config.IMAGE_URL + item.featured_image" alt="product image"
                class="rounded-lg text-[0] bg-gray-400 h-[120px] w-[80px] object-cover">
            </div>
            <div class="w-full">
              <p class="max-w-[220px] line-clamp-2 font-semibold">{{ item.name }}</p>
              <p class="text-xs text-gray-400">SKU: {{ getSKU(item) }}</p>
              <div class=" text-xs text-gray-600 mt-1">
                {{ Object.keys(item.cartData.attributes)[0] }}: <span class="font-normal">{{
                  item.cartData.attributes[Object.keys(item.cartData.attributes)[0]] }}</span>
              </div>
              <div class="flex flex-row mt-4 justify-between w-full">
                <div class="flex items-center gap-2">
                  <p>QTY:</p>
                  <div class="flex w-fit">
                    <button
                      class="bg-gray-200 flex items-center justify-center leading-4 rounded-l px-2 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
                      @click="(e) => decrementItem(item)">
                      <icon name="ic:sharp-minus" class="w-3"/>
                    </button>
                    <div class="w-[40px] border border-gray-200 text-center">
                      {{ item.cartData.qty }}
                    </div>
                    <button
                      class="bg-gray-200 rounded-r px-2 flex items-center justify-center border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
                      @click="(e) => incrementItem(item)">
                      <icon name="material-symbols:add-rounded" class="h-3"/>
                    </button>
                  </div>
                </div>
                <h5 class="w-fit">{{ $config.CURRENCY + parseFloat(item.cartData.itemTotal).toFixed(2) }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="py-4 flex flex-col items-center">
          <p>No Items In Cart</p>
        </div>
      </div>
      <div class="p-4 bg-white border-t absolute w-full bottom-0">
        <div class="flex justify-between">
          <h5 class="text-xl">Subtotal</h5>
          <h6 class="text-xl text-primary font-semibold">{{ $config.CURRENCY + parseFloat(shop.cartSummary.subTotalPrice).toFixed(2) }}</h6>
        </div>
        <p class="text-center text-xs my-3 text-secondary">Shipping, taxes, and discount codes calculated at checkout.</p>
        <NuxtLink href="/checkout" @click="handleHideCart(false)" class="py-4 px-6 text-center w-full bg-primary text-white rounded-lg block hover:bg-secondary transition-all">CHECKOUT</NuxtLink>
      </div>
    </div>
  </div>

  </Transition>
</template>
<script setup>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const showCart = computed(() => useHomeStore().getShowCart)

const handleHideCart = (bool) => {
  useHomeStore().setShowCart(bool)
}

const shop =  computed(() => useShopStore().data)


const getSKU = (product) => {
  const attributeName = Object.keys(product.cartData.attributes)[0]
  console.log(product)
  const filteredAttribute = product?.attributes[attributeName]?.filter(item => item.value === product.cartData.attributes[Object.keys(product.cartData.attributes)[0]])[0]
  // console.log(filteredAttribute)
  return filteredAttribute?.sku
}

const decrementItem = (item) => {
  item.cartData.qty = item.cartData.qty < 2 || item.cartData.qty === 0 ? 1 : item.cartData.qty - 1
  useShopStore().addProduct(item)
}
const incrementItem = (item) => {
  const object = item
  const attrKey = Object.keys(object.attributes)[0]
  const maxQuantity = object.attributes[attrKey].filter(itm => itm.value === object.cartData.attributes[attrKey])[0]
  const increment = parseInt(object.cartData.qty) + 1
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

<style scoped>

.slide-enter-active,
.slide-leave-active {
  transition: all ease 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}



.cart-list-section {
  /* Hide both vertical and horizontal scrollbars */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.cart-list-section::-webkit-scrollbar {
  width: 0.5rem;
  /* Set scrollbar width to a small value */
}

.cart-list-section::-webkit-scrollbar-track {
  background: transparent;
  /* Set the track color to transparent */
}

.cart-list-section::-webkit-scrollbar-thumb {
  background-color: transparent;
  /* Set the thumb color to transparent */
  border: none;
  /* Remove the border for the thumb */
}
</style>

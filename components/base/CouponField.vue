<template>
  <div class="mb-3 mt-8 py-4 relative">
    <div class="absolute w-[130%] bg-gray-300 h-full left-1/2 top-0 -translate-x-1/2"></div>
    <div class="border-0 pb-0 relative">
      <h5 class="mb-2">Have a Coupon Code?</h5>
    </div>
    <div class="card-body pt-0 mb-1">
      <form @submit="(e)=>{getApplyCoupon(e)}">
        <div class="input-group">
          <div class="relative">
            <input type="text" id="coupon"
            :value="coupon?.cartSummary?.coupon?.discount > 0 ? coupon?.cartSummary?.coupon?.code: ''"
            :readonly="coupon?.cartSummary?.coupon?.discount > 0 ? true : false"
            name="coupon"
              class="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pr-24 p-2.5"
              placeholder="VOUCHER-CODE">
            <div class="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
              :disabled="coupon?.cartSummary?.coupon?.discount > 0 ? true : false"
              :class="{
                'pointer-events-none bg-gray-500': coupon?.cartSummary?.coupon?.discount > 0 ? true : false,
              }"
                class="lg:mt-2 text-xs xl:mt-0 flex-shrink-0 inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary transition-all rounded">Verify</button>
            </div>
          </div>
          <div v-if="coupon?.cartSummary?.coupon?.discount > 0" class="flex justify-between">
            <p class="relative text-xs mt-2 text-green-500">Coupon Applied!</p>
            <p class="relative text-xs mt-2 text-red-500 cursor-pointer" @click="(e)=>{clearCoupon()}" >Try another code</p>
            
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
const coupon = useShopStore().data
const getApplyCoupon = async (e)=>{
  e.preventDefault()
  const data = {
    "code" : e.target.coupon.value,
  }
  const coupon = await useShopStore().applyCoupon(data)
}
const clearCoupon = ()=>{
  useShopStore().clearCoupon()
}
</script>

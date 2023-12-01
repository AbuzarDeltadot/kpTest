<template>
  <section class="py-10 px-3 bg-white">
    <div class="max-w-5xl mx-auto">
      <div
        v-if="shop.cartItems.length > 0"
        class="md:flex items-stretch lg:flex-row flex-col mx-auto lg:max-w-full max-w-[600px] gap-16 relative"
      >
      <!-- overflow-x-auto -->
        <div class="relative  w-full lg:w-3/5 checkout-form">
          <FormKit
            v-slot="{ value, state: { valid } }"
            type="form"
            :plugins="[stepPlugin]"
            :actions="false"
            @submit="
              (e) => {
                e.preventDefault()
                return null
              }
            "
            @keydown.enter.prevent
          >
            <ul class="steps flex justify-between gap-7 md:gap-5 ">
              <li
                v-for="(step, stepName) in steps"
                :key="stepName"
                :class="`step font-medium ${
                  activeStep === stepName
                    ? 'active text-primary'
                    : 'text-[#4B5563]'
                } ${checkStepValidity(stepName) ? 'has-errors' : ''}`"
                :data-step-valid="step.valid && step.errorCount === 0"
                :data-step-active="activeStep === stepName"
              >
                <!-- @click="activeStep = stepName" -->

                {{ camel2title(stepName) }}

                <span class="tabTitleCheck"
                  ><Icon name="charm:tick" class="text-sm" />
                </span>
              </li>
            </ul>

            <!-- .form-body solely for styling -->
            <div class="form-body py-10 max-w-[460px] mx-auto md:mx-0">
              <section v-show="activeStep === 'account'">
                <FormKit id="account" type="group" name="account">
                  <div v-if="!guestMode && !shop.user?.email">
                    <h3 class="text-[20px] font-medium mb-5">
                      Account Details
                    </h3>

                    <FormKit
                      type="email"
                      name="email"
                      label="*Email address"
                      placeholder="Email@myemail.com"
                      validation="required|email"
                    />

                    <FormKit
                      type="password"
                      name="password"
                      label="*Password"
                      placeholder="********"
                      validation="required|password"
                    />
                  </div>
                  <div v-else-if="shop.user?.email" class="text-center">
                    <h3 class="text-[20px] font-medium mb-5">
                      Already Logged in
                    </h3>
                    <FormKit v-model="user_email" type="hidden" name="email" />
                    <FormKit
                      v-model="user_fName"
                      type="hidden"
                      name="first_name"
                    />
                    <FormKit
                      v-model="user_lName"
                      type="hidden"
                      name="last_name"
                    />
                    <button
                      :disabled="
                        !steps?.account?.valid &&
                        steps?.account?.errorCount === 0
                      "
                      class="py-4 px-10 bg-primary rounded-full text-white my-[30px]"
                      @click="
                        (e) => {
                          e.preventDefault()
                          setStep(1)
                        }
                      "
                    >
                      Continue as {{ shop.user.first_name }}
                      {{ shop.user.last_name }}
                    </button>
                  </div>
                  <div v-else>
                    <h3 class="text-[20px] font-medium mb-5">Guest Details</h3>
                    <div class="flex flex-row gap-3">
                      <FormKit
                        type="text"
                        label="*First Name"
                        name="first_name"
                        placeholder="John"
                        validation="required"
                        :classes="{ outer: 'w-1/2' }"
                      />
                      <FormKit
                        type="text"
                        label="*Last Name"
                        name="last_name"
                        placeholder="Doe"
                        validation="required"
                        :classes="{ outer: 'w-1/2' }"
                      />
                    </div>
                    <FormKit
                      type="email"
                      name="email"
                      label="*Email address"
                      placeholder="Email@myemail.com"
                      validation="required|email"
                    />
                    <FormKit
                      type="radio"
                      name="gender"
                      label="*Gender"
                      :options="['male', 'female', 'other']"
                      validation="required"
                      :classes="{
                        wrapper: 'flex gap-2 cursor-pointer',
                        options: 'flex gap-5',
                        fieldset: 'border border-[#cccccc] rounded-lg p-[15px]',
                        legend: 'text-[12px] text-[#777777]',
                        label: 'text-[#555]'
                      }"
                    />
                    <FormKit type="hidden" name="guest" value="true" />
                    <FormKit
                      v-model="notify"
                      type="checkbox"
                      label="Wish to receive the marketing email"
                      name="marketing_acceptance"
                      :classes="{
                        inner: 'w-fit',
                        wrapper: 'flex items-center gap-2 cursor-pointer',
                        input: 'flex cursor-pointer'
                      }"
                    />
                  </div>
                </FormKit>
                <div
                  v-if="!shop.user?.email"
                  class="flex items-center md:flex-row flex-col-reverse justify-end md:gap-8 gap-2 mb-10"
                >
                  <NuxtLink to="/register?role=customer" class="h-fit block">
                    Register for account
                  </NuxtLink>
                  <button
                    :disabled="
                      !steps?.account?.valid &&
                      steps?.account?.errorCount === 0 &&
                      !guestMode
                    "
                    type="submit"
                    :class="`${
                      guestMode
                        ? ''
                        : 'py-4 px-10 bg-primary rounded-full text-white'
                    }`"
                    @click="
                      (e) => {
                        e.preventDefault()
                        if (guestMode) {
                          checkoutAsGuest(false)
                        } else {
                          loginAction(value)
                        }
                      }
                    "
                  >
                    Login
                  </button>
                  <button
                    v-if="guestMode"
                    :disabled="
                      !steps?.account?.valid && steps?.account?.errorCount === 0
                    "
                    class="py-4 px-10 bg-primary rounded-full text-white"
                    @click="
                      (e) => {
                        e.preventDefault()
                        guestRegister(value)
                      }
                    "
                  >
                    Continue
                  </button>
                </div>
                <hr v-if="!guestMode && !shop.user?.email" />
                <button
                  v-if="!guestMode && !shop.user?.email"
                  class="py-4 px-10 bg-primary rounded-full text-white mx-auto block w-fit mt-10"
                  @click="
                    (e) => {
                      e.preventDefault()
                      checkoutAsGuest(true)
                    }
                  "
                >
                  Checkout as Guest
                </button>
              </section>

              <section v-show="activeStep === 'shipping'">
                <h3 class="text-[20px] font-medium mb-5">Shipping Address</h3>
                <FormKit id="shipping" type="group" name="shipping">
                  <div class="flex flex-row gap-3">
                    <FormKit
                      v-model="user_fName"
                      type="text"
                      label="*First Name"
                      name="first_name"
                      placeholder="John"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                    <FormKit
                      v-model="user_lName"
                      type="text"
                      label="*Last Name"
                      name="last_name"
                      placeholder="Doe"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                  </div>
                  <div class="flex flex-row gap-3">
                    <FormKit
                      v-model="user_email"
                      type="email"
                      label="*Email Address"
                      name="email_address"
                      placeholder="username@email.com"
                      validation="required|email"
                      :classes="{ outer: 'w-1/2' }"
                    />
                    <FormKit
                      v-model="user_phone"
                      type="tel"
                      label="*Phone"
                      name="phone"
                      placeholder="+17 202 2090 231"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                  </div>
                  <BaseAutoCompleteAddress
                    v-model="selectedAddress"
                    base-class="shipping"
                    :prefill="shop.prefillData.shipping"
                  />
                  <!-- <BaseAutoAddress /> -->
                </FormKit>
                <FormKit
                  type="checkbox"
                  label="My billing and shipping address are the same"
                  name="same_as_shipping"
                  :value="true"
                  :classes="{
                    inner: 'w-fit',
                    wrapper: 'flex items-center gap-2 cursor-pointer',
                    input: 'flex cursor-pointer'
                  }"
                />
                <FormKit
                  v-if="!value.same_as_shipping"
                  id="billing"
                  type="group"
                  name="billing"
                  :exclude="true"
                >
                  <h3 class="text-[20px] font-medium mb-5">Billing Address</h3>
                  <div class="flex flex-row gap-3">
                    <FormKit
                      v-model="user_fName"
                      type="text"
                      label="*First Name"
                      name="first_name"
                      placeholder="John"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                    <FormKit
                      v-model="user_lName"
                      type="text"
                      label="*Last Name"
                      name="last_name"
                      placeholder="Doe"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                  </div>

                  <div class="flex flex-row gap-3">
                    <FormKit
                      v-model="user_email"
                      type="email"
                      label="*Email Address"
                      name="email_address"
                      placeholder="username@email.com"
                      validation="required|email"
                      :classes="{ outer: 'w-1/2' }"
                    />
                    <FormKit
                      v-model="user_phone"
                      type="tel"
                      label="*Phone"
                      name="phone"
                      placeholder="+17 202 2090 231"
                      validation="required"
                      :classes="{ outer: 'w-1/2' }"
                    />
                  </div>
                  <BaseAutoCompleteAddress
                    v-model="selectedAddress"
                    base-class="billing"
                    :prefill="shop.prefillData.billing"
                  />
                </FormKit>
                <h3
                  v-if="shop.shipping.length > 0"
                  class="text-[20px] font-medium mb-5"
                >
                  Shipping Method*
                </h3>
                <FormKit
                  v-if="shop.shipping.length > 0"
                  :type="customRadio"
                  name="shipping_method"
                  :options="shop.shipping"
                  validation="required"
                />
                <button
                  :disabled="
                    !steps?.shipping?.valid && steps?.shipping?.errorCount === 0
                  "
                  class="py-4 px-10 bg-primary rounded-full text-white"
                  :class="{
                    disabled:
                      shop?.shipping?.length > 0 &&
                      Object.keys(shop?.selectedShipping)?.length === 0
                  }"
                  @click="handleButtonClick"
                >
                  <!-- (e) => {
                  e.preventDefault()
                  setStep(1)
                } -->
                  Proceed to payment
                </button>
              </section>

              <section v-show="activeStep === 'payment'">
                <FormKit id="payment" type="group" name="payment">
                  <FormKit
                    :type="payment"
                    name="payment_method"
                    :options="paymentMethods"
                    validation="required"
                  />
                  <div v-if="messages" class="mb-5 text-red-500">
                    {{ messages }}
                  </div>
                  <p class="flex text-[11px] gap-2">
                    <img
                      src="/images/lock.svg"
                      alt="privacy"
                      class="w-[20px] mb-5"
                    />
                    We protect your payment information using encryption to
                    provide bank-level security.
                  </p>
                  <FormKit
                    type="checkbox"
                    name="acceptance"
                    validation="accepted"
                    :classes="{
                      inner: 'w-fit',
                      wrapper: 'flex items-center gap-2 cursor-pointer',
                      input: 'flex cursor-pointer'
                    }"
                  >
                    <template #label="context">
                      <span :class="context.classes.label"
                        >I agree to
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          class="text-primary"
                          >Privacy Policy</a
                        >
                        &
                        <a
                          href="/terms-of-use"
                          class="text-primary"
                          target="_blank"
                          >Terms and Condition</a
                        ></span
                      >
                    </template>
                  </FormKit>
                </FormKit>
                <FormKit
                  type="button"
                  :disabled="
                    (!steps?.payment?.valid &&
                      steps?.payment?.errorCount === 0) ||
                    (loader && steps?.payment?.valid && !messages)
                  "
                  :classes="{
                    input:
                      'py-4 px-10 bg-primary rounded-full text-white w-fit border-0 submit-btn'
                  }"
                  @click="submitApp(value)"
                >
                  <div v-if="loader && !messages" class="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <span v-else
                    >Make Payment of
                    {{
                      $config.CURRENCY +
                      parseFloat(shop.cartSummary.totalPrice).toFixed(2)
                    }}</span
                  >
                </FormKit>
              </section>

              <!-- <details>
                <summary>Form data</summary>
                <pre>{{ value }}</pre>
                <pre>{{ steps }}</pre>
              </details> -->
            </div>
          </FormKit>
        </div>
        <div class="lg:w-2/5 w-full relative max-w-[400px] mx-auto">
          <div
            class="px-8 py-10 bg-gray-100 rounded-lg sticky top-5 overflow-hidden"
          >
            <h1 class="font-semibold text-2xl border-b pb-8">
              Billing Summary
            </h1>
            <div class="flex justify-between mt-2 mb-2">
              <span class="font-semibold text-sm">Total Items </span>
              <span class="font-semibold text-sm">{{
                shop.cartSummary.totalQty
              }}</span>
            </div>
            <div
              v-if="shop.cartSummary.subTotalPrice"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">SubTotal</span>
              <span class="font-semibold text-sm">{{
                $config.CURRENCY +
                parseFloat(shop.cartSummary.subTotalPrice).toFixed(2)
              }}</span>
            </div>
            <div
              v-if="shop.cartSummary.shippingFee"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Shipping</span>
              <span class="font-semibold text-sm">{{
                $config.CURRENCY +
                parseFloat(shop.cartSummary.shippingFee).toFixed(2)
              }}</span>
            </div>
            <div
              v-if="shop.cartSummary.deliveryFee"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Delivery</span>
              <span class="font-semibold text-sm">{{
                $config.CURRENCY +
                parseFloat(shop.cartSummary.deliveryFee).toFixed(2)
              }}</span>
            </div>
            <div
              v-if="shop.cartSummary.discount"
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Discount</span>
              <span class="font-semibold text-sm"
                >-{{
                  $config.CURRENCY +
                  parseFloat(shop.cartSummary.discount).toFixed(2)
                }}</span
              >
            </div>
            <!-- v-if="shop.cartSummary.discount" -->
            <div
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Actual price</span>
              <span class="font-semibold text-sm"
                >-{{
                  $config.CURRENCY +
                  parseFloat(shop.cartSummary.actualPriceTotal).toFixed(2)
                }}</span
              >
            </div>
            <!-- v-if="shop.cartSummary.discount" -->
            <div
              class="flex justify-between mt-2 mb-2"
            >
              <span class="font-semibold text-sm">Vat price</span>
              <span class="font-semibold text-sm"
                >-{{
                  $config.CURRENCY +
                  parseFloat(shop.cartSummary.vatvalue).toFixed(2)
                }}</span
              >
            </div>

            <BaseCouponField />
            <div class="border-t mt-8">
              <div
                class="flex font-semibold justify-between pt-6 text-sm uppercase items-center"
              >
                <span>Payable</span>
                <span class="text-lg text-primary">{{
                  $config.CURRENCY +
                  parseFloat(shop.cartSummary.totalPrice).toFixed(2)
                }}</span>
              </div>
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
          <NuxtLink to="/" class="text-primary cursor-pointer text-sm block">
            Return to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { createInput } from '@formkit/vue'
import Stripe from 'stripe'
import { getValidationMessages } from '@formkit/validation'
import { useToast } from '~~/composables/toast'
import RadioButton from '~~/components/base/RadioButton.vue'
import PaymentField from '~~/components/base/PaymentField.vue'
import paymentIcon from '/images/payments.svg'

import { camel2title } from '@/utils/utils'
import useSteps from '@/utils/useSteps'
// import { useGtag } from '@/nuxt.config'
const messages = ref('')
const notify = ref(false)
// const gtag = useGtag()

useHead({
  title: 'Checkout'
})
const Toast = useToast()
const selectedAddress = ref('')
const loader = ref(false)

const customRadio = createInput(RadioButton)
const payment = createInput(PaymentField)

const shop = useShopStore().data
// trackPurchaseEvent(shop)

function handleButtonClick(event) {
  event.preventDefault()
  setStep(1)
  trackPurchaseEvent()
}

const trackPurchaseEvent = () => {
  const items = productSschema()
  // console.log(items)
  gtag('event', 'purchase', {
    transaction_id: 'T_12345_2',
    affiliation: 'Google Merchandise Store',
    value: 25.42,
    tax: 4.9,
    shipping: 3.99,
    currency: 'USD',
    coupon: 'SUMMER_SALE',
    items: items
  })
}
// onMounted(() => {
//   const productSchemaResult = productSschema()
//   console.log(productSchemaResult)
// })

const productSschema = () => {
  const array = []
  shop.cartItems.forEach((item) => {
    const attribute_id = item.attributes[
      Object.keys(item.cartData.attributes)[0]
    ].filter(
      (att) =>
        att.value ===
        item?.cartData?.attributes[Object.keys(item?.cartData?.attributes)[0]]
    )[0]
    const obj = {
      item_id: `SKU_${attribute_id?.sku}`,
      // attribute_id: attribute_id.id,
      quantity: item?.cartData.qty,
      discount: 0,
      price: item?.cartData.price,
      item_name: item?.name,
      item_brand: item?.brand.name,
      coupon: 'SUMMER_FUN',
      item_variant: attribute_id.value
    }
    array.push(obj)
  })

  return array
}

// const tempShipping = ref([])

// const checkAndUpdateShipping = (price)=>{
//   if(price < 40){
//     tempShipping = [{

//     }]
//   }
// }

// onMounted(() => {
//   watch(shop, (newVal, oldVal) => {
//     if(newVal){
//       checkAndUpdateShipping(newVal?.cartSummary?.subTotalPrice)
//     }
//   })
// })

// Prefilled Filelds
const user_email = ref('')
const user_fName = ref('')
const user_lName = ref('')
const user_phone = ref('')

const user_b_email = ref('')
const user_b_fName = ref('')
const user_b_lName = ref('')
const user_b_phone = ref('')

// const shippingValue = ref('')
// const hasShippingAndSelected = ref(false)
// const checkShipping = (e)=>{

//   shippingValue.value = e
//   console.log(shippingValue.value)
// }

// watch(shop, (newValue, oldValue) => {
//   // This function will be called when someValue changes
//   // console.log('someValue has changed:', newValue);
//   if (newValue.shipping?.length > 0 &&  Object.keys(newValue?.selectedShipping)?.length > 0) {
//     hasShippingAndSelected.value = true
//   }else if(newValue.shipping?.length === 0){
//     hasShippingAndSelected.value = true
//   }else{
//     hasShippingAndSelected.value = false
//   }
//   // You can perform additional actions here
//   console.log(newValue?.selectedShipping)
// });

const guestMode = ref(false)
const checkoutAsGuest = (bool) => {
  guestMode.value = bool
}

const paymentMethods = [
  {
    label: 'Pay with Credit Card',
    value: 'credit',
    help: '',
    icon: paymentIcon,
    checked: true
  }
]

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()

onMounted(async () => {
  setTimeout(() => {
    if (shop.user?.email) {
      updatePrefillFields()
      setStep(1)
    }
  }, 300)
})

// NEW: submit handler, which posts to our fake backend.
const token = ref({})
const orderId = ref('')
const config = useRuntimeConfig()
const submitApp = async (formData, node) => {
  messages.value = null
  const stripe = Stripe(config.STRIPE_PUBLIC)
  loader.value = true
  const stripeData = {
    number: null,
    cvc: null,
    exp_month: null,
    exp_year: null
  }

  const productStructure = () => {
    const array = []
    shop.cartItems.forEach((item) => {
      const attribute_id = item.attributes[
        Object.keys(item.cartData.attributes)[0]
      ].filter(
        (att) =>
          att.value ===
          item.cartData.attributes[Object.keys(item.cartData.attributes)[0]]
      )[0]
      const obj = {
        id: item.id,
        attribute_id: attribute_id.id,
        quantity: item.cartData.qty,
        discount: 0
      }
      array.push(obj)
    })
    return array
  }

  const orderData = {
    shipping: {
      first_name: formData.shipping?.first_name || 'N/A',
      last_name: formData.shipping?.last_name || 'N/A',
      email: formData.shipping?.email_address || 'N/A',
      gender: 'Male',
      phone_number: formData.shipping?.phone || 'N/A',
      address_line_one: formData.shipping?.street_address || 'N/A',
      address_line_two: formData.shipping?.street_address_2 || 'N/A',
      state: formData.shipping?.state_province || 'N/A',
      city: formData.shipping?.city || 'N/A',
      country: formData.shipping?.country || 'N/A',
      post_code: formData.shipping?.post_code || 'N/A'
    },
    billing: {
      first_name:
        formData?.billing?.first_name ||
        formData?.shipping?.first_name ||
        'N/A',
      last_name:
        formData?.billing?.last_name || formData?.shipping?.last_name || 'N/A',
      email:
        formData?.billing?.email_address ||
        formData?.shipping?.email_address ||
        'N/A',
      gender: 'Male',
      phone_number:
        formData?.billing?.phone || formData?.shipping?.phone || 'N/A',
      address_line_one:
        formData?.billing?.street_address ||
        formData?.shipping?.street_address ||
        'N/A',
      address_line_two:
        formData?.billing?.street_address_2 ||
        formData?.shipping?.street_address_2 ||
        'N/A',
      state:
        formData.billing?.state_province ||
        formData?.shipping?.state_province ||
        'N/A',
      city: formData?.billing?.city || formData?.shipping?.city || 'N/A',
      country:
        formData?.billing?.country || formData?.shipping?.country || 'N/A',
      post_code:
        formData?.billing?.post_code || formData?.shipping?.post_code || 'N/A'
    },
    is_email_subscribed: formData?.account?.marketing_acceptance || false,

    products: productStructure()
  }
  if (shop?.selectedShipping?.shipping_zone_id)
    orderData.shipping_zone_id = shop?.selectedShipping?.shipping_zone_id
  if (shop?.selectedShipping?.id)
    orderData.shipping_id = shop?.selectedShipping?.id

  stripeData.number = formData?.payment?.card_number?.replace(/ /g, '')
  stripeData.cvc = formData.payment.security_code
  const expDate = formData.payment.expiration_date
  if (expDate) {
    const date = expDate.split('/')

    stripeData.exp_month = date[0]
    stripeData.exp_year = date[1]
  }
  if (!token.value?.id) {
    try {
      const stripeReq = await stripe.tokens.create({ card: stripeData })
      token.value = stripeReq
    } catch (error) {
      // Catch any unexpected errors
      console.error('Error creating token:', error)
      messages.value = error
    }
  }

  const user = useAuthStore().getUser
  if (!orderId.value) {
    const reqOrder = await usePost('/customers/order', {
      headers: { Authorization: `Bearer ${user.token}` },
      body: orderData
    })
    if (reqOrder?.order_id) orderId.value = reqOrder?.order_id
    else loader.value = true
  }
  if (token.value?.id && orderId.value) {
    const checkoutNow = await usePost('/customers/charge', {
      headers: { Authorization: `Bearer ${user.token}` },
      body: {
        stripeToken: token.value.id,
        order_id: orderId.value,
        code: shop?.cartSummary?.coupon?.code || ''
      }
    })
    if (checkoutNow) {
      loader.value = false
      Toast.success(checkoutNow.message)
      localStorage.removeItem('cart')
      await useShopStore().clearCart()
      localStorage.setItem('orderId', orderId.value)
      navigateTo('/order-confirm')
    }
  }
}
const loginAction = async (value) => {
  const account = await useAuthStore().customerlogin(value.account)
  if (account?.data?.message === 'Invalid credentials') {
  } else {
    useShopStore().setLoggedinUser(account)

    updatePrefillFields(shop.prefillData)

    setStep(1)
  }
  // localStorage.setItem('user', JSON.stringify(account))
}

async function guestRegister(value) {
  const detail = value.account
  detail.is_email_subscribed = detail.marketing_acceptance
  detail.is_guest = detail.guest === 'true'
  detail.phone_number = '0000000000'
  detail.password = '0000000000'
  detail.role = 'customer'

  const account = await useAuthStore().register(detail)
  if (account.token) {
    updatePrefillFields()
    setStep(1)
  }
}

function updatePrefillFields(detail) {
  if (detail) {
    const shipping = detail.shipping
    const billing = detail.billing

    user_email.value = shipping.email
    user_fName.value = shipping.first_name
    user_lName.value = shipping.last_name
    user_phone.value = shipping.phone_number

    user_b_email.value = billing.email
    user_b_fName.value = billing.first_name
    user_b_lName.value = billing.last_name
    user_b_phone.value = billing.phone_number
  } else {
    user_email.value = shop.user.email
    user_fName.value = shop.user.first_name
    user_lName.value = shop.user.last_name
    user_phone.value = shop.user.phone_number
  }
}

const checkStepValidity = (stepName) => {
  return (
    (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) &&
    visitedSteps.value.includes(stepName)
  )
}
</script>

<style>
overflow-y-auto {
  overflow-y: auto;
}
li.step:not(:last-child) .tabTitleCheck {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 99px;
  background: #000000;
  border: 10px solid #ffffff;
  box-sizing: content-box;
  top: 50%;
  transform: translate(0, -50%);
  right: 14%;
  z-index: 9;
}
li.step:last-child .tabTitleCheck {
  display: none;
}
li.step:not(:last-child):after {
  content: '';
  width: 50%;
  height: 1px;
  display: block;
  background: #163a92;
  position: absolute;
  transform: translate(0, -50%);
  left: 50%;
  top: 50%;
}
li.step {
  position: relative;
  width: 100%;
}
li.step[data-step-valid='true'] .tabTitleCheck {
  background: #163a92;
}

li.step[data-step-valid='true'] {
  color: #163a92;
}

/*Fields Stylings*/
.checkout-form .formkit-input:not([type='radio'], [type='checkbox']) {
  min-height: 45px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 0 15px;
  width: 100%;
}
.checkout-form label.formkit-label {
  background: #ffffff;
  padding: 2px 7px;
  position: absolute;
  transform: translateY(-50%) translateX(10px);
  font-size: 12px;
  color: #777;
}
.checkout-form .card-field label.formkit-label {
  background: #e7effa;
}
.checkout-form label.formkit-wrapper {
  position: relative;
}
.checkout-form .formkit-outer {
  margin-bottom: 20px;
}
.checkout-form li.formkit-message {
  font-size: 12px;
  color: red;
  padding: 5px;
}

.checkout-form input[type='checkbox'] {
  height: 15px;
  width: 15px;
}
.customRadio-input :has(input:checked) {
  background-color: red;
}
.checkout-form button[disabled],
.checkout-form button.disabled {
  filter: grayscale(1);
  opacity: 0.2;
}

.submit-btn {
  width: -moz-fit-content !important;
  width: fit-content !important;
  border-radius: 2000px !important;
  padding-left: 2.5rem !important;
  padding-right: 2.5rem !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

/* Loader Css */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 13px;
}
.lds-ellipsis div {
  position: absolute;
  top: 0px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

@media (max-width: 767px) {
  li.step:not(:last-child):after {
    left: 65%;
  }
  li.step:not(:last-child) .tabTitleCheck {
    border: 3px solid #ffffff;
    right: -3px;
  }
  li.step {
    font-size: 12px;
  }
}
</style>

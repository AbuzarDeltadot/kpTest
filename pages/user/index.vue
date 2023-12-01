<template>
  <BasePageLoader :loader="loading">
    <section class="text-gray-600 body-font overflow-hidden bg-white">
      <div class="containe min-h-screen py-5 px-5 pt-5 mx-auto">
        <div
          class="lg:px-10 lg:w-4/5 lg:ml-9 items-start flex justify-between mb-10"
        >
          <div class="lg:pl-[10%]">
            <span class="text-gray-500"
              ><router-link to="/">Home</router-link> </span
            ><span class="text-blue-800">/ My Account</span>
          </div>
          <div>
            <span class="text-gray-500">Welcome&nbsp;</span>
            <span class="text-blue-800">{{ username }}</span>
          </div>
        </div>
        <div class="mx-auto lg:w-4/5 flex flex-wrap items-start">
          <div
            class="pl-10 lg:w-1/4 w-full max-w-[460px] mx-auto md:mx-0 lg:border-r-2 box-border overflow-hidden"
          >
            <h1 class="text-xl font-medium pt-1">Manage My Account</h1>
            <ul class="pl-7 pt-2">
              <li class="pb-3">
                <button
                  :class="{ 'text-blue-800': tab === 'profile' }"
                  @click="currentTab('profile')"
                >
                  Profile
                </button>
              </li>
              <li class="pb-3">
                <button
                  :class="{ 'text-blue-800': tab === 'Address' }"
                  @click="currentTab('Address')"
                >
                  Address
                </button>
              </li>
              <li class="pb-3">
                <button
                  :class="{ 'text-blue-800': tab === 'Password' }"
                  @click="currentTab('Password')"
                >
                  Change Password
                </button>
              </li>
            </ul>
            <h1 class="text-xl font-medium pt-1">My Orders</h1>
            <ul class="pl-7 pt-2">
              <li class="pb-3">
                <button
                  :class="{ 'text-blue-800': tab === 'order' }"
                  @click="currentTab('order')"
                >
                  Order History
                </button>
              </li>
            </ul>
            <h1 class="text-xl font-medium pt-1">Logout</h1>
          </div>
          <div class="lg:w-[74%] w-full lg:pl-10 lg:py-2 lg:mt-0">
            <div v-if="tab === 'Address'" class="">
              <div class="user-form">
                <div v-if="!isEditMode">
                  <div class="form-body py-1 max-w-[460px] mx-auto md:mx-0">
                    <section>
                      <h3 class="text-[20px] font-medium mb-5">
                        Shipping Address
                      </h3>
                      <FormKit id="shipping" type="group" name="shipping">
                        <BaseAutoCompleteAddrassDiisabled
                          v-model="selectedAddress"
                          base-class="shipping"
                        />
                        <!-- <BaseAutoAddress /> -->
                      </FormKit>
                      <FormKit
                        type="checkbox"
                        :disabled="true"
                        style="display: none"
                        label=""
                        name="same_as_shipping"
                        :value="true"
                        :classes="{
                          inner: 'w-fit',
                          wrapper: 'flex items-center gap-2 cursor-pointer',
                          input: 'flex cursor-pointer'
                        }"
                      />
                      <!-- v-if="!value.same_as_shipping" -->
                      <FormKit
                        id="billing"
                        type="group"
                        name="billing"
                        :exclude="true"
                      >
                        <h3
                          style="display: none"
                          class="text-[20px] font-medium mb-5"
                        >
                          Billing Address
                        </h3>

                        <!-- v-model="selectedAddress" -->
                        <!-- :prefill="shop.prefillData.billing" -->
                        <BaseAutoCompleteAddrassDiisabled
                          v-model="selectedAddress"
                          base-class="billing"
                        />
                      </FormKit>
                      <!-- v-if="shop.shipping.length > 0" -->
                      <!-- <h3 class="text-[20px] font-medium mb-5">Shipping Method*</h3> -->
                      <!-- v-if="shop.shipping.length > 0"
                  :type="customRadio" -->
                      <!-- :options="shop.shipping" -->
                      <!-- <FormKit name="shipping_method" validation="required" /> -->
                      <button
                        class="py-4 px-10 bg-primary rounded-full text-white"
                        @click="handleButtonClick"
                      >
                        <!-- (e) => {
                    e.preventDefault()
                    setStep(1)
                  } -->
                        Edit Address
                      </button>
                      <!-- </FormKit> -->
                    </section>
                  </div>
                </div>
                <div
                  v-else
                  class="form-body checkout-form py-1 max-w-[460px] mx-auto md:mx-0"
                >
                  <!-- v-show="activeStep === 'shipping'" -->
                  <section>
                    <FormKit v-model="formData" :actions="false" type="form">
                      <h3 class="text-[20px] font-medium mb-5">
                        Shipping Address
                      </h3>
                      <FormKit id="shipping" type="group" name="shipping">
                        <!-- v-model="selectedAddress"
                      base-class="shipping"
                      :prefill="shop.prefillData.shipping" -->
                        <BaseAutoCompleteAddress
                          v-model="selectedAddress"
                          base-class="shipping"
                        />
                        <div class="flex flex-row gap-3">
                          <FormKit
                            v-model="user_phone"
                            type="tel"
                            label="Phone"
                            name="phone"
                            placeholder="+17 202 2090 231"
                            validation="required"
                            :classes="{ outer: 'w-1/2' }"
                          />
                        </div>
                        <!-- <BaseAutoAddress /> -->
                      </FormKit>
                      <FormKit
                        type="checkbox"
                        v-model="showShip"
                        @click="shiping"
                        label="My billing and shipping address are the same"
                        name="same_as_shipping"
                        :classes="{
                          inner: 'w-fit',
                          wrapper: 'flex items-center gap-2 cursor-pointer',
                          input: 'flex cursor-pointer'
                        }"
                      />
                      <!-- v-if="!value.same_as_shipping" -->

                      <FormKit
                        v-if="!showShip"
                        id="billing"
                        type="group"
                        name="billing"
                        :exclude="true"
                      >
                        <h3 class="text-[20px] font-medium mb-5">
                          Billing Address
                        </h3>

                        <!-- v-model="selectedAddress" -->
                        <!-- :prefill="shop.prefillData.billing" -->
                        <BaseAutoCompleteAddress
                          v-model="selectedAddress"
                          base-class="billing"
                        />
                        <div class="flex flex-row gap-3">
                          <FormKit
                            v-model="user_phone"
                            type="tel"
                            label="Phone"
                            name="phone"
                            placeholder="+17 202 2090 231"
                            validation="required"
                            :classes="{ outer: 'w-1/2' }"
                          />
                        </div>
                      </FormKit>

                      <!-- v-if="shop.shipping.length > 0" -->
                      <!-- <h3 class="text-[20px] font-medium mb-5">Shipping Method*</h3> -->
                      <!-- v-if="shop.shipping.length > 0"
                    :type="customRadio" -->
                      <!-- :options="shop.shipping" -->
                      <!-- <FormKit name="shipping_method" validation="required" /> -->
                      <button
                        class="py-4 px-10 bg-primary rounded-full text-white"
                        @click="handleProfileUpdate"
                      >
                        <!-- (e) => {
                      e.preventDefault()
                      setStep(1)
                    } -->
                        Save Changes
                      </button>
                      <button
                        class="py-3 px-12 mt-3 bg-white rounded-full text-black"
                        @click="canselProfile"
                      >
                        Cancel
                      </button>
                    </FormKit>
                  </section>

                  <!-- <details>
                    <summary>Form data</summary>
                    <pre>{{ value }}</pre>
                    <pre>{{ steps }}</pre>
                  </details> -->
                </div>
              </div>
            </div>
            <div v-if="tab === 'profile'">
              <div class="lg:w-1/2 md:w-1/2">
                <h1 class="mb-3 text-3xl font-normal">Profile</h1>
                <div class="user-form">
                  <div v-if="!isEditMode">
                    <div class="flex flex-row gap-3">
                      <FormKit
                        :disabled="true"
                        v-model="user_fName"
                        type="text"
                        label="First Name"
                        name="first_name"
                        placeholder="John"
                        class="borderNone"
                        :classes="{ outer: 'w-1/2' }"
                      />
                      <FormKit
                        :disabled="true"
                        v-model="user_lName"
                        type="text"
                        label="Last Name"
                        name="last_name"
                        placeholder="Doe"
                        :classes="{ outer: 'w-1/2' }"
                      />
                    </div>
                    <div class="flex flex-row gap-3">
                      <FormKit
                        v-model="user_email"
                        :disabled="true"
                        type="email"
                        label="Email Address"
                        name="email_address"
                        placeholder="username@email.com"
                        :classes="{ outer: 'w-1/2' }"
                      />
                      <FormKit
                        v-model="user_phone"
                        :disabled="true"
                        type="tel"
                        label="Phone"
                        name="phone"
                        placeholder="+17 202 2090 231"
                        :classes="{ outer: 'w-1/2' }"
                      />
                    </div>
                    <div class="flex flex-row gap-3">
                      <FormKit
                        type="text"
                        :disabled="true"
                        value-format="MMM DD YYYY"
                        value-locale="en"
                        :value="usershowdate"
                        label="Dtae Of Birth"
                        help=""
                        :classes="{ outer: 'w-1/2' }"
                      />
                      <FormKit
                        v-model="gender"
                        :disabled="true"
                        type="text"
                        label="Gender"
                        name="gender"
                        placeholder="Male"
                        :classes="{ outer: 'w-1/2' }"
                      />
                    </div>
                    <button
                      class="py-3 px-12 mt-3 bg-primary rounded-full text-white"
                      @click="toggleEditMode"
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div v-else class="checkout-form">
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
                    <div class="flex flex-row gap-3">
                      <FormKit
                        type="date"
                        v-model="user_dateOfBirth"
                        validation="required"
                        value="2011-01-01"
                        label="Dtae Of Birth"
                        help=""
                        validation-visibility="live"
                        :classes="{ outer: 'w-1/2' }"
                      />
                      <FormKit
                        v-model="gender"
                        type="email"
                        label="*Gender"
                        name="gender"
                        placeholder="Male"
                        validation="required"
                        :classes="{ outer: 'w-1/2' }"
                      />
                    </div>

                    <button
                      class="py-3 px-12 mt-3 bg-primary rounded-full text-white"
                      @click="updateProfile"
                    >
                      Save Changes
                    </button>
                    <button
                      class="py-3 px-12 mt-3 bg-white rounded-full text-black"
                      @click="canselProfile"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="tab === 'Password'"
              class="max-w-[460px] mx-auto md:mx-0"
            >
              <h1 class="mb-3 text-3xl font-normal">Change Password</h1>
              <div class="checkout-form md:w-6/12">
                <FormKit
                  type="password"
                  v-model="form.currentPass"
                  name="CurrentPassword"
                  label="*CurrentPassword"
                  suffix-icon="eyeClosed"
                  @suffix-icon-click="handleIconClick"
                  placeholder="********"
                  validation="required|password"
                />
                <FormKit type="group">
                  <FormKit
                    type="password"
                    v-model="form.newPass"
                    name="password"
                    label="*NewPassword"
                    suffix-icon="eyeClosed"
                    @suffix-icon-click="handleIconClick"
                    placeholder="********"
                    validation="required|password|length:8"
                  />
                  <!-- validation-visibility="live" -->

                  <FormKit
                    type="password"
                    name="password_confirm"
                    v-model="form.confirmPass"
                    label="*ConfirmPassword"
                    suffix-icon="eyeClosed"
                    @suffix-icon-click="handleIconClick"
                    placeholder="********"
                    validation="required|confirm"
                    validation-label="Password confirmation"
                  />
                </FormKit>
                <button
                  class="py-3 px-12 mt-3 bg-primary rounded-full text-white"
                  @click="handlePassword"
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div v-if="tab === 'order'">
              <div v-if="!isEditMode">
                <BaseOrderHistory @slectId="handleSelectedId" />
              </div>
              <div v-else>
                <button
                  class="py-3 px-12 mt-3 bg-primary rounded-full text-white"
                  @click="canselProfile"
                >
                  Back
                </button>
                <BaseOrderDetail :receivedData="receivedData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BasePageLoader>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { createInput } from '@formkit/vue'
import Stripe from 'stripe'
import { getValidationMessages } from '@formkit/validation'
import { useToast } from '~~/composables/toast'
import RadioButton from '~~/components/base/RadioButton.vue'
import PaymentField from '~~/components/base/PaymentField.vue'
import paymentIcon from '/images/payments.svg'
const customRadio = createInput(RadioButton)
const payment = createInput(PaymentField)
const Toast = useToast()
const loading = ref(false)
const formData = ref()
const selectedAddress = ref('')
const showShip = ref(true)
const shiping = () => console.log(showShip)

useHead({
  title: 'My Account'
})

// definePageMeta({
//   middleware: 'auth'
// })
// Prefilled Filelds
const user_email = ref('')
const user_fName = ref('')
const user_lName = ref('')
const user_phone = ref('')
const gender = ref('')
const user_dateOfBirth = ref('')
const user_b_email = ref('')
const user_b_fName = ref('')
const user_b_lName = ref('')
const user_b_phone = ref('')
const responseData = ref('')
const tab = ref('profile')
const isEditMode = ref(false)
const shop = useShopStore().data
const userTokens = ref('')
const username = ref('')
const usershowdate =  ref('') 
const form = reactive({
  confirmPass: '',
  currentPass: '',
  newPass: ''
})

const currentTab = (tabNumber) => {
  console.log(tabNumber)
  tab.value = tabNumber
}

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value

  if (isEditMode.value) {
    fetchData()
  }
}
const receivedData = ref(null)
console.log(receivedData, 'refff')
const handleSelectedId = (id) => {
  receivedData.value = id
  isEditMode.value = !isEditMode.value

  console.log(id, 'recived')
}

const handleButtonClick = () => {
  isEditMode.value = !isEditMode.value

  if (isEditMode.value) {
    fetchData()
  }
}

//get user form
loading.value = true
const fetchData = async (tokens) => {
  try {
    const token = userTokens
    const response = await useGet('customers/customer-profile', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    if (response) {
      loading.value = false
      username.value = response.first_name
      user_fName.value = response.first_name
      user_lName.value = response.last_name
      user_email.value = response.email
      user_phone.value = response.phone_number
      gender.value = response.gender
      user_dateOfBirth.value = response.date_of_birth
      usershowdate.value = response.date_of_birth
    } else {
      console.error('Error fetching data:', response.statusText)
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const canselProfile = async () => {
  isEditMode.value = false
}
const same_as_shipping = true

// Function to construct the data object to be sent to the API
const handleProfileUpdate = (e) => {
  e.preventDefault()

  const token = userTokens
  usePut('/customers/customer-addresses', {
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      shipping_address: {
        phone_number: formData.value.shipping.phone,
        address_line_one: formData.value.shipping.street_address,
        address_line_two: formData.value.shipping.street_address_2,
        city: formData.value.shipping.city,
        state: formData.value.shipping.state_province,
        post_code: formData.value.shipping.post_code,
        country: formData.value.shipping.country
      },
      billing_address: {
        phone_number: formData.value.shipping.phone,
        address_line_one: formData.value.shipping.street_address,
        address_line_two: formData.value.shipping.street_address_2,
        city: formData.value.shipping.city,
        state: formData.value.shipping.state_province,
        post_code: formData.value.shipping.post_code,
        country: formData.value.shipping.country
      },
      is_billing_address_same: showShip.value
    })
  })
    .then((response) => {
      isEditMode.value = false
      if (response && response.error) {
        const errorMessages = response.error
        errorMessages.forEach((errorMessage) => {
          console.log(errorMessage) //
        })
      } else {
        Toast.success('Address updated successfully')
      }
    })
    .catch((error) => {
      console.log(error)
      Toast.error('Error during API call:', error)
    })
}
// Function to update user profile data
const updateProfile = async () => {
  isEditMode.value = false
  try {
    const token = userTokens
    const response = await usePut('customers/customer-profile', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: user_fName.value,
        last_name: user_lName.value,
        email: user_email.value,
        phone_number: user_phone.value,
        gender: gender.value,
        date_of_birth: user_dateOfBirth.value
      })
    })

    if (response) {
      Toast.success('Profile updated successfully')
    } else {
      Toast.error('Error updating profile:')
    }
  } catch (error) {
    Toast.error('Error updating profile:', error)
  }
}

//funct handle password

const handlePassword = async () => {
  // isEditMode.value = false
  try {
    const token = userTokens
    const response = await usePut('customers/customer-password', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        current_password: form.currentPass,
        new_password: form.newPass,
        confirm_password: form.confirmPass
      })
    })
    if (response) {
      Toast.error(response.data[0])
    } else {
      Toast.success('password update')
    }
  } catch (error) {
    // console.log(error.error)
    Toast.success('password update')
  }
}

// onMounted(async () => {
//   setUserGlobally()
// })
onMounted(async () => {
  const token = localStorage.getItem('customer')
  const customerData = JSON.parse(token)
  userTokens.value = customerData.token
  fetchData()
})

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>
<style>
span.formkit-suffix-icon.formkit-icon {
  width: 20px;
  position: relative;
  float: right;
  bottom: 34px;
  right: 10px;
  cursor: pointer;
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

.checkout-form .formkit-wrapper {
  padding-top: 7px;
}
.user-form .formkit-wrapper {
  padding-top: 7px;
}
.user-form .formkit-input:not([type='radio'], [type='checkbox']) {
  border: none;
  width: 100%;
}

.user-form label.formkit-label {
  background: #ffffff;
  /* padding: 2px 7px; */
  position: absolute;
  transform: translateY(-50%) translateX(10px);
  font-size: 12px;
  color: #777;
}

.user-form .formkit-outer {
  margin-bottom: 20px;
}

.user-form .card-field label.formkit-label {
  background: #e7effa;
}
.user-form label.formkit-wrapper {
  position: relative;
}
.checkout-form .formkit-input:not([type='radio'], [type='checkbox']) {
  min-height: 45px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 0 15px;
  width: 100%;
}
.ser-form,
fo .checkout-form label.formkit-label {
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


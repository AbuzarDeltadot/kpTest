<template>
  <form :id="formId" class="space-y-4" @submit.prevent="register">
    <div class="w-full space-y-3">
      <div
        class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row"
      >
        <BaseInput
          v-model="form.first_name"
          label="First Name"
          name="first_name"
          placeholder="Enter your first name"
          required
          autofocus
        />

        <BaseInput
          v-model="form.last_name"
          label="Last Name"
          name="last_name"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div
        class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row"
      >
        <BaseInput
          v-model="form.email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <BaseInput
          v-model="form.phone_number"
          label="Phone"
          name="phone"
          placeholder="Enter your phone"
          required
          @change="
            (e) => {
              form.phone = $event.target.value
            }
          "
        />
      </div>
      <!-- <BaseSelect
        v-model="form.gender"
        label="Gender"
        name="gender"
        required
        @change="form.gender = $event.target.value"
      >
        <option value="Male">
          Male
        </option>
        <option value="Female">
          Female
        </option>
      </BaseSelect> -->
      <div
        class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row"
      >
        <!-- <BaseInput
          v-model="form.phone"
          label="Phone"
          name="phone"
          placeholder="Enter your phone"
          required
        /> -->

        <BaseInput
          v-model="form.date_of_birth"
          label="Date Of Birth"
          name="date_of_birth"
          placeholder="Select Date"
          required
        />
      </div>

      <BaseInput
        v-model="form.address"
        label="Home Address"
        name="address"
        placeholder="Enter your address"
        required
      />

      <div
        class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row"
      >
        <BaseInput
          v-model="form.postcode"
          label="Postcode"
          name="postcode"
          placeholder="Enter your postcode"
          required
        />

        <BaseSelect
          v-model="form.gender"
          label="Gender"
          name="gender"
          required
          @change="form.gender = $event.target.value"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </BaseSelect>
      </div>
      <div
        class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row"
      >
        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          
        />

        <BaseInput
          v-model="form.password_confirmation"
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          placeholder="Confirm your password"
          :class="{ error: passwordConfirmationError }"
          
        />
      </div>
      <div class="error-container">
        <span v-if="passwordError" class="error-message text-xs"
        >Password should be at least 8 characters</span
      >
      <span v-if="passwordConfirmationError" class="error-message text-xs">Passwords do not match</span>
      </div>


      <BaseInput
        :checked="form.confirm_data"
        :full="false"
        padding-class=""
        required
        type="checkbox"
        name="confirm_data"
        @change="form.confirm_data = $event.target.checked"
      >
        <span class="text-gray-600 text-sm">
          Please check this box to confirm all of the above data is accurate and
          true
          <span class="text-red-500"> * </span>
        </span>
      </BaseInput>

      <PolicyCheck
        :value="form.healthcare_agreement"
        name="healthcare_agreement"
        @change="form.healthcare_agreement = $event"
      />

      <BaseInput
        :checked="form.notify_me"
        :full="false"
        padding-class=""
        type="checkbox"
        name="notify_me"
        @change="
          (e) => {
            form.is_email_subscribed = $event.target.checked
          }
        "
      >
        <span class="text-gray-600 text-sm"
          >I would like to receive offers and pre-booking notifications</span
        >
      </BaseInput>
    </div>
    <!-- :disabled="isFormInvalid"
      -->
    <BaseLoadingButton
      :class="{ 'disabled-button': isRegisterButtonDisabled }"
      :loading="loading"
      :disabled="isRegisterButtonDisabled"
      primary
      class="px-6 py-4 w-full text-center py-3"
      size="xl"
    >
      Register
    </BaseLoadingButton>
  </form>
</template>

<script setup>
import { useRoute } from 'vue-router'
import flatpickr from 'flatpickr'
const props = defineProps({
  // navigate: {
  //   type: [String, Boolean],
  //   default: '/account',
  // },
})
const emit = defineEmits(['registered'])
const route = useRoute()
const roleQueryParam = ref(route.query.role)

const authStore = useAuthStore()
const loading = ref(false)
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  date_of_birth: '',
  address: '',
  postcode: '',
  gender: '',
  is_guest: false,
  password: '',
  password_confirmation: '',
  confirm_data: false,
  healthcare_agreement: false,
  is_email_subscribed: false,
  notify_me: false,
  role: roleQueryParam.value
})

const formId = 'register-form'
const errorStore = useErrorStore()
async function register() {
  loading.value = true
  errorStore.setFormId(formId)
  await authStore.register(form, '/checkout')
  loading.value = false
}

// const isFormInvalid = computed(() => {
//   const formValues = Object.values(form.value)
//   console.log(formValues, 'formvaluee')
//   return formValues.every((value) => !value)
// })

const passwordError = computed(() => {
  return form.password.length > 0 && form.password.length < 8
})

const passwordConfirmationError = computed(() => {
  return (
    form.password_confirmation.length > 0 &&
    form.password !== form.password_confirmation
  )
})


const isRegisterButtonDisabled = computed(() => {
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'address',
    'postcode',
    'gender',
    'password',
    'date_of_birth',
    'confirm_data',
    'healthcare_agreement'
    // 'is_email_subscribed'
  ]
  return requiredFields.some((field) => !form[field])
})

onMounted(() => {
  flatpickr('[name=date_of_birth]', {
    dateFormat: 'd-m-Y'
  })

  if (roleQueryParam === 'customer') form.value.role = 'customer'
})
</script>

<style scoped>
.disabled-button {
  opacity: 0.2;
  filter: grayscale(1);;
}
/* .disabled-button:hover {
  background: #f6f6f6;
  border: 1px solid #f6f6f6;
  color: darkgrey;
} */
.error {
  border-color: red;

}
.error-container{
  display: flex;
  flex-direction: column;
}
.error-message {
  --tw-text-opacity: 1;
    color: rgb(240 82 82 / 1);
    color: rgb(240 82 82 / var(--tw-text-opacity));
}
</style>

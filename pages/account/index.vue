<template>
  <div class="flex flex-col space-y-6">
    <div class="flex flex-col space-y-4">
      <BaseHeading
        :level="1"
        class="border-b border-gray-300 pb-2"
      >
        Account Details
      </BaseHeading>
      <form @submit.prevent="update">
        <div class="grid gap-4 md:grid-cols-3">
          <BaseInput
            v-model="form.first_name"
            label="First Name"
            name="first_name"
            placeholder="Enter your first name"
            required
          />
          <BaseInput
            v-model="form.last_name"
            label="Last Name"
            name="last_name"
            placeholder="Enter your last name"
            required
          />
          <BaseInput
            v-model="form.email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            required
            type="email"
          />
          <BaseInput
            v-model="form.phone"
            label="Phone"
            name="phone"
            placeholder="Enter your phone"
            required
          />
          <BaseInput
            v-model="form.date_of_birth"
            label="Date Of Birth"
            name="date_of_birth"
            placeholder="Select Date"
            required
          />
          <BaseInput
            v-model="form.address"
            label="Home Address"
            name="address"
            placeholder="Enter your address"
            required
          />
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
            <option
              value="male"
              :selected="form.gender === 'male'"
            >
              Male
            </option>
            <option
              value="female"
              :selected="form.gender === 'female'"
            >
              Female
            </option>
          </BaseSelect>
        </div>
        <div class="flex mt-4">
          <BaseLoadingButton
            :loading="loading"
            primary
            class="px-6 py-4 text-center py-3 ml-auto w-full mb-4 md:w-auto"
            size="xl"
          >
            Update Profile
          </BaseLoadingButton>
        </div>
      </form>
    </div>
    <div class="flex flex-col space-y-4">
      <button
        type="button"
        class="flex items-center justify-between border-b border-gray-300 pb-2"
        @click.prevent="changePassword = !changePassword"
      >
        <BaseHeading :level="1">
          Change Password
        </BaseHeading>
        <Icon
          name="ic-sharp-keyboard-arrow-down"
          class="w-6 h-6"
        />
      </button>
      <form
        class="transition-all delay-150 duration-300 overflow-hidden w-full"
        :class="{
          'h-0': !changePassword,
          'h-96 md:h-40': changePassword,
        }"
        @submit.prevent="updatePassword"
      >
        <div class="grid gap-4 md:grid-cols-3">
          <BaseInput
            v-model="pForm.old_password"
            label="Old Password"
            type="password"
            name="old_password"
            placeholder="Enter your old password"
            required
          />
          <BaseInput
            v-model="pForm.password"
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <BaseInput
            v-model="pForm.password_confirmation"
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div class="flex mt-4">
          <BaseLoadingButton
            :loading="loading"
            primary
            class="px-6 py-4 text-center py-3 ml-auto w-full mb-4 md:w-auto"
            size="xl"
          >
            Change Password
          </BaseLoadingButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import flatpickr from 'flatpickr'
useHead({
  title: 'My Account',
})
definePageMeta({
  middleware: 'auth',
})
const user = useAuthStore().getDiagnosticUser

const changePassword = ref(false)

const form = reactive({
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  phone: user.phone,
  date_of_birth: user.date_of_birth,
  address: user.address,
  postcode: user.postcode,
  gender: user.gender,
})

const pForm = reactive({
  old_password: '',
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
async function update() {
  loading.value = true
  await usePost('/user', {
    body: form,
  })
  loading.value = false
}

async function updatePassword() {
  loading.value = true
  await usePost('/user/password', {
    body: pForm,
  })
  pForm.old_password = ''
  pForm.password = ''
  pForm.password_confirmation = ''
  loading.value = false
}

onMounted(() => {
  flatpickr('[name=date_of_birth]', {
    dateFormat: 'd-m-Y',
  })
})
</script>

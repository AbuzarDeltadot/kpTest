<template>
  <div class="flex flex-col items-center justify-center w-full space-y-6 py-6 max-w-screen-xl m-auto">
    <div
      class="grid gap-4"
      :class="{
        'grid-cols-3': locations?.location,
        'grid-cols-4': !locations?.location,
      }"
    >
      <div
        v-for="(step, stepIndex) in steps.filter((s, sIndex) => {
          return locations?.location ? sIndex !== 0 : true
        })"
        :key="stepIndex"
      >
        <div class="relative mb-2">
          <div
            v-if="stepIndex !== 0"
            class="absolute flex align-center items-center align-middle content-center"
            style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
          >
            <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
              <div
                class="w-0 bg-secondary py-1 rounded"
                :style="currentStep >= stepIndex ? 'width: 100%;' : ''"
              />
            </div>
          </div>
          <div
            :class="[
              currentStep >= stepIndex ? 'bg-primary' : 'bg-white',
            ]"
            class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center justify-center"
          >
            <span
              class="flex items-center justify-center"
              :class="[
                currentStep >= stepIndex ? 'text-white' : 'text-gray-600',
              ]"
            >
              <Icon
                :name="step.icon"
                class="w-6 h-6"
              />
            </span>
          </div>
        </div>

        <div class="text-xs px-1 font-semibold text-center md:text-lg">
          {{ step.name }}
        </div>
        <div class="hidden text-center md:block">
          {{ step.description }}
        </div>
      </div>
    </div>

    <BaseLoadingView
      :loading="pending"
      class="bg-white rounded-lg w-full max-w-screen-lg my-6 mx-4 shadow-md"
    >
      <div
        v-if="!locations?.data?.length"
        class="text-lg font-semibold p-4 text-center"
      >
        No locations found
      </div>

      <!-- Locations -->
      <div
        v-if="currentStep === 0 && locations?.data?.length && !locations?.location"
        class="grid gap-4 p-4 md:grid-cols-2"
      >
        <BaseButton
          v-for="(location, locationIndex) in locations.data"
          :key="locationIndex"
          class="flex flex-col items-center justify-center space-y-2"
          :color-class="selectedLocationId === location.id ? 'text-white' : 'text-gray-600'"
          :hover-class="selectedLocationId === location.id ? 'hover:bg-primary-dark' : 'border-gray-400 hover:border-gray-600'"
          :class="[
            selectedLocationId === location.id ? 'bg-primary' : 'bg-white',
          ]"
          size="py-4 px-6"
          @click="selectedLocationId = (selectedLocationId === location.id ? null : location.id)"
        >
          <span class="font-semibold text-lg">{{ location.name }}</span>
          <span
            class="text-xs"
            :class="[
              selectedLocationId === location.id ? 'text-white' : 'text-gray-500',
            ]"
          >
            {{ location.formatted_address }}
          </span>
        </BaseButton>
      </div>

      <!-- Tests -->
      <div
        v-if="currentStep === 1 && selectedLocation"
        class="flex flex-col items-center justify-center w-full"
      >
        <div
          v-if="selectedLocation.tests.length"
          class="grid grid-cols-2 gap-4 p-4 w-full"
        >
          <BaseButton
            v-for="(test, testIndex) in selectedLocation.tests"
            :key="testIndex"
            class="flex flex-col items-center justify-center space-y-1"
            :color-class="selectedTestIds.includes(test.id) ? 'text-white' : 'text-gray-600'"
            :hover-class="selectedTestIds.includes(test.id) ? 'hover:bg-primary-dark' : 'border-gray-400 hover:border-gray-600'"
            :class="[
              selectedTestIds.includes(test.id) ? 'bg-primary' : 'bg-white',
            ]"
            size="py-4 px-6"
            @click="toggleTest(test.id)"
          >
            <span class="font-semibold text-lg">{{ test.name }}</span>
            <span class="font-semibold">{{ useCurrency(test.price).format() }}</span>
          </BaseButton>
        </div>
        <div
          v-else
          class="text-lg font-semibold p-4"
        >
          No test found
        </div>
      </div>

      <!-- Slots -->
      <BaseLoadingView
        v-if="currentStep === 2"
        :loading="loadingSlots"
        class="flex flex-col items-center justify-center w-full"
      >
        <div class="flex flex-col items-center justify-between w-full pt-4 px-4 space-y-4 md:flex-row md:space-y-0">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <h6 class="font-semibold text-xs">
                BOOKED
              </h6>
              <div class="w-4 h-4 rounded-sm bg-secondary shadow" />
            </div>
            <div class="flex items-center space-x-2">
              <h6 class="font-semibold text-xs">
                SELECTED
              </h6>
              <div class="w-4 h-4 rounded-sm bg-primary shadow" />
            </div>
            <div class="flex items-center space-x-2">
              <h6 class="font-semibold text-xs">
                EMPTY
              </h6>
              <div class="w-4 h-4 rounded-sm bg-white border border-gray-400 shadow" />
            </div>
          </div>

          <BaseSelect
            v-model="startDay"
            :full="false"
            :show-placeholder="false"
            label="Date"
            name="start_day"
            @change="startDay = $event.target.value"
          >
            <option
              v-for="(week, weekIndex) in weeks"
              :key="weekIndex"
              :value="week.value"
              :selected="startDay === week.value"
            >
              {{ week.name }}
            </option>
          </BaseSelect>
        </div>
        <div class="flex flex-col w-full mt-4 px-4 md:flex-row">
          <div
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            class="md:w-[14.28%]"
          >
            <div
              class="relative sticky top-0 py-6 text-center bg-neutral-100 z-50 shadow md:shadow-none"
              :class="{
                'rounded-tl-md rounded-bl-md': dayIndex === 0,
                'rounded-tr-md rounded-br-md': dayIndex === 6,
              }"
            >
              <p class="absolute inset-0 mt-2 text-secondary tracking-wider font-semibold text-xs">
                {{ day.today ? 'TODAY' : '' }}
                {{ day.tomorrow ? 'TOMORROW' : '' }}
              </p>
              <p class="font-semibold">
                {{ day.day }}
              </p>
              <p class="text-neutral-600 font-semibold text-sm">
                {{ day.date }}
              </p>
            </div>
            <div
              class="relative my-4"
              :class="{ 'mb-16': day.slots.length === 0 }"
            >
              <div
                v-if="day.slots.length"
                class="grid gap-2 grid-cols-2 mt-2 mx-1 md:space-y-2 md:grid-cols-1"
              >
                <BaseButton
                  v-for="(slot, slotIndex) in day.slots"
                  :key="slotIndex"
                  class="flex flex-col items-center justify-center space-y-2 w-full"
                  :color-class="selectedSlot === slot.start_time.value || slot.booked ? 'text-white' : 'text-gray-600'"
                  :hover-class="selectedSlot === slot.start_time.value ? 'hover:bg-primary-dark' : 'border-gray-400 hover:border-gray-600'"
                  :class="[
                    {
                      'cursor-not-allowed': slot.booked,
                    },
                    slot.booked ? 'bg-secondary' : (selectedSlot === slot.start_time.value ? 'bg-primary' : 'bg-white'),
                  ]"
                  :disabled="slot.booked"
                  size="py-4 px-6"
                  @click="selectedSlot = (selectedSlot === slot.start_time.value ? null : slot.start_time.value)"
                >
                  <span class="font-semibold">{{ slot.start_time.text }}</span>
                </BaseButton>
              </div>
              <div
                v-else
                class="md:absolute inset-0 text-center text-sm font-semibold p-4"
              >
                No slot found
              </div>
            </div>
          </div>
        </div>
      </BaseLoadingView>

      <!-- Booking Information -->
      <div
        v-if="currentStep === 3"
        class="p-4 max-w-xl m-auto"
      >
        <div
          v-if="booked"
          class="flex flex-col items-center justify-center space-y-4"
        >
          <button
            type="button"
            class="flex items-center justify-center bg-green-600 text-white rounded-full p-2"
          >
            <Icon
              name="ic:baseline-check"
              class="w-10 h-10"
            />
          </button>
          <BaseHeading
            :level="1"
            class="text-center"
          >
            Appointment Booked Successfully
          </BaseHeading>
        </div>
        <div v-else>
          <h4 class="font-semibold text-2xl text-center">
            Are you sure?
          </h4>
          <p class="text-center my-2 text-sm">
            Please check you information carefully and book the appointment.
          </p>
        </div>
        <div class="mt-4 space-y-2">
          <table class="table-auto">
            <tbody>
              <tr>
                <th
                  align="left"
                  width="50%"
                  class="p-2 font-semibold md:text-lg"
                >
                  Selected Location:
                </th>
                <td
                  align="left"
                  class="p-2"
                >
                  {{ selectedLocation.name }}, {{ selectedLocation.formatted_address }}
                </td>
              </tr>
              <tr>
                <th
                  align="left"
                  width="50%"
                  class="p-2 font-semibold md:text-lg"
                >
                  Selected Test{{ selectedTestIds.length > 1 ? 's' : '' }}:
                </th>
                <td
                  align="left"
                  class="p-2"
                >
                  {{ selectedTests.map((t) => `${t.name} - ${useCurrency(t.price).format()}`).join(', ') }}
                </td>
              </tr>
              <tr>
                <th
                  align="left"
                  width="50%"
                  class="p-2 font-semibold md:text-lg"
                >
                  Selected Date & Time:
                </th>
                <td
                  align="left"
                  class="p-2"
                >
                  {{ selectedTimeSlot.date_time }}
                </td>
              </tr>
              <tr>
                <th
                  align="left"
                  width="50%"
                  class="p-2 font-semibold md:text-lg"
                >
                  {{ discountAmount ? 'Discount Applied' : 'Apply Discount' }}
                </th>
                <td
                  align="left"
                  class="p-2"
                >
                  <div
                    v-if="discountAmount"
                    class="flex items-center justify-center"
                  >
                    <span class="mr-1">-{{ useCurrency(discountAmount).format() }} ({{ discountCode }})</span>
                    <button
                      type="button"
                      class="text-red-600 flex items-center justify-center w-8 h-8 rounded-full focus:outline-none focus:ring ring-secondary"
                      @click="discountAmount = 0"
                    >
                      <Icon
                        name="maki:cross-11"
                        class="w-4 h-4"
                      />
                    </button>
                  </div>
                  <form
                    v-else
                    @submit.prevent="applyDiscount"
                  >
                    <BaseInput
                      v-model="discountCode"
                      placeholder="Discount Code"
                      name="code"
                      padding-class="p-3 pr-16"
                      class="relative"
                    >
                      <BaseLoadingButton
                        v-if="discountCode"
                        :loading="loading"
                        primary
                        position="absolute"
                        class="right-0 p-1 text-xs !mr-2 md:p-2 md:text-sm"
                      >
                        Apply
                      </BaseLoadingButton>
                    </BaseInput>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Buttons -->
      <div
        v-if="locations?.data?.length"
        class="flex flex-col items-center space-y-4 p-4 sticky bottom-0 bg-white z-50"
      >
        <PolicyCheck
          v-if="currentStep === 3"
          :value="policyChecked"
          @change="policyChecked = $event"
        />
        <div class="flex items-center justify-center space-x-6">
          <BaseButton
            v-if="locations?.location ? currentStep >= 2 : currentStep >= 1"
            class="px-6 py-4"
            size="xl"
            :disabled="loading"
            @click="currentStep--"
          >
            Back
          </BaseButton>
          <BaseLoadingButton
            primary
            class="md:px-20 md:py-4"
            size="xl"
            :loading="loading"
            @click="next"
          >
            {{ currentStep === (steps.length - 1) ? (authenticated ? (totalPrice < .5 ? 'Book Now' : `Pay Now (${useCurrency(totalPrice).format()})`) : 'Login / Register') : 'Next' }}
          </BaseLoadingButton>
        </div>
      </div>
    </BaseLoadingView>

    <!-- Login Modal -->
    <ModalAuth
      :show="!authenticated && showAuthModal"
      @close="showAuthModal = false"
    />
  </div>
</template>

<script setup>
useHead({
  title: 'Diagnostics',
})
const route = useRoute()
const policyChecked = ref(false)
const discountCode = ref(null)
const discountAmount = ref(0)
const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore);
const booked = ref(false)
const currentStep = ref(0)
const selectedLocationId = ref(null)
const selectedTestIds = ref([])
const selectedSlot = ref(null)
const startDay = ref(null)
const weeks = ref([])
const days = ref([])
const showAuthModal = ref(false)

if (route.query.location) {
  selectedLocationId.value = parseInt(route.query.location)
  currentStep.value = 1
}

const { data: locations, pending } = useAsyncData(
  'locations',
  async () => await useGet('/locations', {
    all: true,
    query: route.query,
  }),
)

const steps = ref([
  {
    name: 'Select Location',
    description: 'Select a location near you',
    icon: 'ph:map-pin-fill',
  },
  {
    name: 'Select Tests',
    description: 'Select tests you want to book',
    icon: 'ri:test-tube-fill',
  },
  {
    name: 'Choose Date & Time',
    description: 'Choose your desired date and time',
    icon: 'material-symbols:date-range-sharp',
  },
  {
    name: 'Book Appointment',
    description: 'Successfully book an appointment',
    icon: 'ic:baseline-check',
  },
])

const selectedLocation = computed(() => {
  if (selectedLocationId.value) {
    return locations.value.data.find((location) => {
      return location.id === selectedLocationId.value
    })
  }
  return null
})

const selectedTimeSlot = computed(() => {
  if (selectedSlot.value) {
    let foundedSlot = null
    days.value.every((day) => {
      foundedSlot = day.slots.find((slot) => {
        return slot.start_time.value === selectedSlot.value
      })
      if (foundedSlot)
        return false
      else
        return true
    })
    return foundedSlot
  }
  return null
})

const selectedTests = computed(() => {
  return selectedLocation.value.tests.filter(test => selectedTestIds.value.includes(test.id))
})

const totalPrice = computed(() => {
  let total = useCurrency(0)
  selectedTests.value.forEach((test) => {
    total = total.add(test.price)
  })
  if (discountAmount.value)
    total = total.subtract(discountAmount.value)

  return total.value
})

function toggleTest(id) {
  if (selectedTestIds.value.includes(id))
    selectedTestIds.value = []
    // const index = selectedTestIds.value.findIndex((testId) => {
    //   return testId === id
    // })
    // selectedTestIds.value.splice(index, 1)

  else
    selectedTestIds.value = [id]
}

function next() {
  switch (currentStep.value) {
    case 0:
      if (!selectedLocationId.value)
        useToast().info('Please select a location')
      else
        currentStep.value++
      break
    case 1:
      if (selectedTestIds.value.length === 0)
        useToast().info('Please select a test')
      else
        currentStep.value++
      break
    case 2:
      if (!selectedSlot.value)
        useToast().info('Please select a time slot')
      else
        currentStep.value++
      break
    case 3:
      if (authenticated.value)
        bookAppointment()
      else
        showAuthModal.value = true
      break
  }
}

const loading = ref(false)
async function applyDiscount() {
  loading.value = true
  const { success, data } = await usePost('/discount-code/verify', {
    all: true,
    body: {
      location_id: selectedLocationId.value,
      test_ids: selectedTestIds.value,
      code: discountCode.value,
    },
  })
  if (success)
    discountAmount.value = data.discount_amount

  loading.value = false
}

async function bookAppointment() {
  if (!policyChecked.value) {
    useToast().info('You must agree to have read our privacy policy and terms of service')
    return
  }
  loading.value = true
  const { success, data, error } = await usePost('/book', {
    all: true,
    body: {
      location_id: selectedLocationId.value,
      test_ids: selectedTestIds.value,
      slot: selectedSlot.value,
      code: discountAmount.value ? discountCode.value : null,
    },
  })
  if (!error) {
    if (success) {
      if (data.booked) {
        navigateTo('/account/appointments')
      }
      else {
        useToast().success('Redirecting...')
        window.location = data.url
      }
    }
    else {
      loading.value = false
    }
  }
  else {
    loading.value = false
  }
}

const loadingSlots = ref(true)
async function getTimeSlots() {
  loadingSlots.value = true
  selectedSlot.value = null
  if (selectedLocationId.value) {
    const response = await useGet('/time-slots', {
      query: {
        location_id: selectedLocationId.value,
        start_day: startDay.value,
      },
    })
    weeks.value = response.weeks
    days.value = response.days
  }
  loadingSlots.value = false
}

watch(startDay, () => {
  getTimeSlots()
})
watch(selectedLocationId, () => {
  getTimeSlots()
})
onMounted(() => {
  if (locations?.value?.location)
    getTimeSlots()
})
</script>

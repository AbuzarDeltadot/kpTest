<template>
  <div class="bg-white rounded-lg w-full max-w-screen-lg px-6 py-8 my-6 shadow-md mx-auto">
    <div
      class="flex flex-col items-center justify-center space-y-4"
    >
      <button
        type="button"
        tabindex="-1"
        class="flex items-center justify-center text-white rounded-full p-2"
        :class="[
          !appointment?.id || !paymentDone ? 'bg-red-600' : 'bg-green-600',
        ]"
      >
        <Icon
          :name="!appointment?.id || !paymentDone ? 'ion:close-round' : 'ic:baseline-check'"
          class="w-10 h-10"
        />
      </button>
      <BaseHeading
        :level="1"
        class="text-center"
      >
        {{ appointment?.id ? (paymentDone ? 'Appointment booked successfully!' : 'Payment Failed!') : 'Appointment not found' }}
      </BaseHeading>
    </div>

    <table
      v-if="paymentDone"
      class="divide-y divide-gray-100 p-4 my-4 max-w-lg mx-auto"
    >
      <tr>
        <th
          :class="[
            headerClasses,
          ]"
        >
          Selected Location
        </th>
        <td class="p-2">
          {{ appointment.location }}
        </td>
      </tr>
      <tr>
        <th
          :class="[
            headerClasses,
          ]"
        >
          Selected Date & Time
        </th>
        <td class="p-2">
          {{ appointment.date }}, {{ appointment.start_time }}
        </td>
      </tr>
      <tr>
        <th
          :class="[
            headerClasses,
          ]"
          class="text-center"
          colspan="2"
        >
          Test{{ appointment.tests.length > 1 ? 's' : '' }}
        </th>
      </tr>
      <tr>
        <th
          :class="[
            headerClasses,
          ]"
        >
          Name
        </th>
        <th
          :class="[
            headerClasses,
          ]"
          class="text-right"
        >
          Price
        </th>
      </tr>
      <tr
        v-for="(test, testIndex) in appointment.tests"
        :key="testIndex"
      >
        <td class="px-6 py-2 w-1/2">
          {{ test.name }}
        </td>
        <td class="text-right px-6 py-2">
          {{ test.price }}
        </td>
      </tr>
      <tr v-if="appointment.discount_amount">
        <th
          :class="[
            headerClasses,
          ]"
          class="text-right"
          colspan="2"
        >
          Discount Amount
        </th>
      </tr>
      <tr v-if="appointment.discount_amount">
        <td
          class="text-right px-6 py-2"
          colspan="2"
        >
          -{{ appointment.discount_amount }}
        </td>
      </tr>
      <tr>
        <th
          :class="[
            headerClasses,
          ]"
          class="text-right"
          colspan="2"
        >
          Total
        </th>
      </tr>
      <tr>
        <td
          class="text-right px-6 py-2"
          colspan="2"
        >
          {{ appointment.total_price }}
        </td>
      </tr>
    </table>

    <div class="flex items-center justify-center space-x-4 mt-4">
      <NuxtLink
        to="/account"
        class="px-6 py-4 rounded text-sm text-gray-700 font-bold ring-secondary border border-gray-400 hover:border-gray-600 focus:outline-none focus:ring"
      >
        View My Account
      </NuxtLink>
      <NuxtLink
        to="/diagnostics"
        class="bg-primary text-white rounded text-sm font-bold px-6 py-4 ring-secondary focus:outline-none focus:ring"
      >
        Book New Appointment
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Checkout',
})
const route = useRoute()
const headerClasses = 'text-left px-6 uppercase text-gray-500 text-xs tracking-wide py-2'
const { data: appointment, error } = await useAsyncData('appointment', async () => {
  return await useGet(`/appointments/${route.query.id}`, {
    query: {
      cancelled: route.query.cancelled,
    },
  })
})

const paymentDone = computed(() => {
  return appointment.value && (appointment.value.payment_status === 'processing' || appointment.value.payment_status === 'completed')
})
</script>

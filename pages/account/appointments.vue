<template>
  <BaseLoadingView
    class="w-full"
    :loading="loading"
  >
    <div
      v-if="appointments && appointments?.data?.length"
      class="relative sm:rounded-lg"
    >
      <table class="w-full divide-y divide-gray-100 text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
              scope="col"
              class="py-3 px-6"
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(appointment, appointmentIndex) in appointments.data"
            :key="appointmentIndex"
            class="bg-white border-b"
          >
            <td
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
              :class="[
                {
                  'py-4 px-2 text-center': header.key === 'actions',
                  'py-4 px-6': header.key !== 'actions',
                },
              ]"
            >
              <a
                v-if="header.key === 'qr_code'"
                :href="appointment.qr_code"
                target="_blank"
              >
                <img
                  :src="appointment.qr_code"
                  :alt="`Location ${appointment.id}`"
                  class="inline-block h-auto w-16"
                >
              </a>
              <div v-else-if="header.key === 'test'">
                {{ appointment.tests.map(t => t.name).join(', ') }}
              </div>
              <div v-else-if="header.key === 'date_time'">
                {{ appointment.date }}
                <br>
                <span class="whitespace-nowrap text-xs">{{ appointment.start_time }}</span>
              </div>
              <div v-else-if="header.key === 'status'">
                <button
                  type="button"
                  class="text-white  focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  :class="{
                    'bg-sky-500 hover:bg-sky-700 focus:ring-sky-300': appointment.status === 'booked',
                    'bg-green-500 hover:bg-green-700 focus:ring-green-300': appointment.status === 'arrived' || appointment.status === 'completed',
                  }"
                >
                  {{ appointment.status.toLowerCase().replace(/\b\S/g, t => t.toUpperCase()) }}
                </button>
              </div>
              <div
                v-else-if="header.key === 'actions'"
                class="flex flex-col space-y-2"
              >
                <BaseLoadingButton
                  v-if="appointment.has_results"
                  :loading="loadingResult"
                  class="relative border-0 text-gray-400 hover:text-gray-600"
                  type="button"
                  @click="getResultUrl(appointment.id)"
                >
                  <Icon
                    name="ph:eye-bold"
                    class="w-6 h-6"
                  />
                </BaseLoadingButton>
                <BaseLoadingButton
                  v-if="appointment.has_results"
                  :loading="loadingResult"
                  class="relative border-0 text-gray-400 hover:text-gray-600"
                  type="button"
                  @click="getResultUrl(appointment.id, true)"
                >
                  <Icon
                    name="akar-icons:download"
                    class="w-6 h-6"
                  />
                </BaseLoadingButton>
              </div>
              <span v-else>{{ appointment[header.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="appointments?.meta"
        :meta="appointments.meta"
        class="m-4"
        @updated="pageUpdated"
      />
    </div>
    <div
      v-else
      class="w-full text-center p-4 font-semibold"
    >
      No appointment found
    </div>
  </BaseLoadingView>
</template>

<script setup>
useHead({
  title: 'Appointments',
})
definePageMeta({
  middleware: 'auth',
})
const route = useRoute()
const page = ref(route.query.page || 1)
const { data: appointments, pending: loading, refresh } = useAsyncData('appointments', () => useGet('/appointments', {
  params: {
    page: page.value,
  },
}))

const headers = ref([
  {
    name: 'Location',
    key: 'location',
  },
  {
    name: 'Test',
    key: 'test',
  },
  {
    name: 'Date & Time',
    key: 'date_time',
  },
  {
    name: 'Reference Number',
    key: 'reference_number',
  },
  {
    name: 'QR Code',
    key: 'qr_code',
  },
  {
    name: 'Status',
    key: 'status',
  },
  {
    name: '',
    key: 'actions',
  },
])

function pageUpdated(currentPage) {
  page.value = currentPage
  refresh()
}

const loadingResult = ref(false)
async function getResultUrl(appointmentId, download = false) {
  loadingResult.value = true
  const apiUrl = `/appointments/${appointmentId}/result`
  if (download) {
    const { baseURL } = usePayloadUrl()
    window.open(`${baseURL + apiUrl}?download=true`)
  }
  else {
    const { url } = await useGet(apiUrl)
    if (url)
      window.open(url)
  }

  loadingResult.value = false
}
</script>

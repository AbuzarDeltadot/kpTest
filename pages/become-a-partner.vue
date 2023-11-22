<template>
  <BaseLoadingView :loading="loading">
    <AuthBox size="lg">
      <Head>
        <Title>{{ page?.title }}</Title>
      </Head>
      <template #heading>
        {{ page?.title }}
      </template>

      <form
        :id="formId"
        class="space-y-4"
        @submit.prevent="submit"
      >
        <div class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
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
        <div class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
          <BaseInput
            v-model="form.email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            required
            type="email"
          />
          <BaseInput
            v-model="form.locations"
            label="Number of Clinics / Locations"
            name="locations"
            placeholder="Enter number of locations"
            required
            min="1"
            type="number"
          />
        </div>
        <div class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
          <BaseInput
            v-model="form.company_name"
            label="Company Name"
            name="company_name"
            placeholder="Enter your company name"
            required
          />
          <BaseInput
            v-model="form.company_registration_number"
            label="Company Reg Number"
            name="company_registration_number"
            placeholder="Enter your company reg number"
            required
          />
        </div>
        <BaseInput
          v-model="form.trading_name"
          label="Trading Name"
          name="trading_name"
          placeholder="Enter trading name"
          helper-text="required if trading name is different from company name"
        />
        <BaseInput
          v-model="form.address_1"
          label="Address Line 1"
          name="address_1"
          placeholder="Enter your address"
          required
        />
        <BaseInput
          v-model="form.address_2"
          label="Address Line 2"
          name="address_2"
          placeholder="Enter your address"
        />
        <div class="flex flex-col items-center space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
          <BaseInput
            v-model="form.town"
            label="Town"
            name="town"
            placeholder="Enter your town"
            required
            type="town"
          />
          <BaseInput
            v-model="form.region"
            label="Enter your region"
            name="region"
            placeholder="Enter number of region"
            required
          />
        </div>
        <BaseInput
          v-model="form.post_code"
          label="Post Code"
          name="post_code"
          placeholder="Enter your Post Code"
          required
        />
        <BaseInput
          v-model="form.vat_number"
          label="VAT number"
          name="vat_number"
          placeholder="Enter your VAT number"
          helper-text="required if you are VAT registered"
        />

        <div class="flex flex-col space-y-8">
          <div class="flex flex-col space-y-4">
            <h1
              class="font-semibold text-sm"
            >
              Insurance Documents
            </h1>
            <div
              class="relative overflow-hidden rounded-lg border-2 border-dashed p-2"
              @dragenter.prevent="setDragging"
              @dragover.prevent="setDragging"
              @dragleave.prevent="unsetDragging"
              @drop.prevent="dropFiles"
            >
              <input
                id="files"
                ref="filesField"
                type="file"
                name="file"
                class="w-px h-px overflow-hidden absolute opacity-0"
                multiple
                @change="changeFiles"
              >
              <div
                v-show="dragging"
                class="absolute inset-0 bg-gray-600/50"
              />
              <label
                for="files"
                class="z-10"
              >
                <div class="rounded-lg bg-gray-100">
                  <div class="flex flex-col items-center justify-center py-6 px-2 space-y-2">
                    <Icon
                      name="ion:cloud-upload"
                      class="h-8 w-8 text-primary-600"
                    />
                    <p class="font-semibold text-sm text-center">
                      Drag & Drop your files here or
                      <span class="text-primary-600">Browse here</span>
                    </p>
                    <span class="text-xs">OR</span>
                    <BaseButton
                      primary
                      type="button"
                      @click="filesField.click()"
                    >
                      Browse
                    </BaseButton>
                    <p class="text-xs">Max filesize 5MB.</p>
                  </div>
                </div>
              </label>
            </div>

            <div
              class="text-xs text-gray-500 mt-1"
            >
              Please upload your phlebotomist certificate and public liability insurance (You can opt to skip this step for later however this will proceed your application faster if provided now)
            </div>
          </div>
          <div
            v-if="form.files.length"
            class="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            <div
              v-for="(file, fileIndex) in form.files"
              :key="fileIndex"
              class="flex flex-col space-y-4"
            >
              <div class="relative flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg h-24 shadow">
                <Icon
                  name="mdi:file-document"
                  class="w-12 h-12"
                />
                <button
                  type="button"
                  class="absolute top-0 right-0 -mt-3 -mr-2 rounded-full bg-red-500 text-white"
                  @click="form.files.splice(fileIndex, 1)"
                >
                  <Icon
                    name="iconoir:cancel"
                    class="w-6 h-6"
                  />
                </button>
              </div>
              <div class="flex items-center justify-between space-x-1">
                <p class="truncate text-sm">
                  {{ file.name }}
                </p>
                <a
                  v-if="file.url"
                  :href="file.url"
                  target="_blank"
                >
                  <Icon
                    name="ic:outline-remove-red-eye"
                    class="flex-shrink-0 h-5 w-5"
                  />
                </a>
              </div>
              <div
                v-if="errorStore.errors && errorStore.errors[`file_${fileIndex}`]"
                class="text-xs text-red-500"
              >
                {{ errorStore.errors[`file_${fileIndex}`][0] }}
              </div>
            </div>
          </div>
        </div>
        <BaseLoadingButton
          :loading="processing"
          primary
          class="px-6 py-4 w-full text-center py-3"
          size="xl"
        >
          Submit
        </BaseLoadingButton>
      </form>
    </AuthBox>
  </BaseLoadingView>
</template>

<script setup>
const { data: page, pending: loading } = useAsyncData('become-a-partner', async () => await useGet('/pages/become-a-partner'))

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  company_name: '',
  company_registration_number: '',
  locations: 1,
  trading_name: '',
  address_1: '',
  address_2: '',
  town: '',
  post_code: '',
  region: '',
  vat_number: '',
  files: [],
})
const formId = 'partner-form'
const filesField = ref(null)
const dragging = ref(false)
const draggingTimeout = ref(null)
function setDragging() {
  dragging.value = true
  clearTimeout(draggingTimeout.value)
}
function unsetDragging() {
  draggingTimeout.value = setTimeout(() => {
    dragging.value = false
  }, 50)
}
function drop(e) {
  form.image = e.dataTransfer.files[0]
  changeImage()
  dragging.value = false
}
function dropFiles(e) {
  Array.from(e.dataTransfer.files).forEach((file) => {
    form.files.push(file)
  })
  changeFiles()
  dragging.value = false
}
function changeFiles() {
  if (filesField.value.files.length) {
    Array.from(filesField.value.files).forEach((file) => {
      form.files.push(file)
    })
  }
  filesField.value.value = null
}

const errorStore = useErrorStore()
const processing = ref(false)
async function submit() {
  processing.value = true
  errorStore.setFormId(formId)
  const formData = new FormData()
  Object.keys(form).forEach((key) => {
    switch (key) {
      case 'files':
        formData.append('files_count', form[key].length)
        form[key].forEach((file, index) => {
          if (file.id)
            formData.append(`file_${index}`, file.id)

          else
            formData.append(`file_${index}`, file)
        })
        break

      default:
        formData.append(key, form[key])
        break
    }
  })
  const { success } = await usePost('/partner/register', {
    body: formData,
  })
  if (success) {
    form.first_name = ''
    form.last_name = ''
    form.email = ''
    form.locations = 1
    form.company_name = ''
    form.company_registration_number = ''
    form.trading_name = ''
    form.vat_number = ''
    form.address_1 = ''
    form.address_2 = ''
    form.town = ''
    form.region = ''
    form.post_code = ''
    form.files = []
  }
  processing.value = false
}
</script>

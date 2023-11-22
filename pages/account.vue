<template>
  <div class="flex flex-col bg-white w-full p-4 max-w-screen-xl shadow mx-auto space-y-4 md:space-y-0 md:my-4 md:rounded-lg md:flex-row">
    <div class="flex flex-col items-center justify-start rounded md:items-start md:p-4">
      <ul
        class="flex flex-wrap items-center justify-center space-x-3 md:space-y-4 md:space-x-0 md:flex-col md:flex-nowrap md:items-start"
      >
        <li
          v-for="(link, linkIndex) in links"
          :key="linkIndex"
          class="md:w-full"
        >
          <NuxtLink
            v-if="link.link !== 'logout'"
            :to="link.link"
            exact-active-class=""
            :class="[
              route.path === link.link ? 'bg-primary text-white hover:bg-primary-dark' : 'text-gray-600 hover:bg-gray-200',
            ]"
            class="flex items-center justify-start px-4 py-2 rounded space-x-2"
          >
            <Icon
              :name="link.icon"
              class="w-6 h-6 md:w-5 md:h-5"
            />
            <span class="hidden md:block">{{ link.name }}</span>
          </NuxtLink>
          <button
            v-else
            class="w-full flex items-center justify-start px-4 py-2 rounded space-x-2 text-gray-600 hover:bg-gray-200"
            :disabled="loading"
            @click="logout"
          >
            <Icon
              :name="link.icon"
              class="w-6 h-6 md:w-5 md:h-5"
            />
            <span class="hidden md:block">{{ link.name }}</span>
          </button>
        </li>
      </ul>
    </div>
    <div class="w-full relative overflow-hidden overflow-x-auto md:p-4">
      <NuxtPage page-key="account" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})
const route = useRoute()
const links = ref([
  {
    name: 'My Account',
    icon: 'ic:baseline-account-circle',
    link: '/account',
  },
  {
    name: 'Appointments',
    icon: 'material-symbols:library-books-outline',
    link: '/account/appointments',
  },
  {
    name: 'Log Out',
    icon: 'gg:log-out',
    link: 'logout',
  },
])
const loading = ref(false)
async function logout() {
  loading.value = true
  await useAuthStore().logout()
  loading.value = false
}
</script>

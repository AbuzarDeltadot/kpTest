<template>
  <div>
    <div>
      <h1 class="text-4xl font-normal	 pt-1 pl-5 pb-5">Orders History</h1>
    </div>
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase border-b-2 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Order ID</th>
            <th scope="col" class="px-6 py-3">Total</th>
            <th scope="col" class="px-6 py-3">Discount</th>
            <th scope="col" class="px-6 py-3">Shipping</th>
            <th scope="col" class="px-6 py-3">VAT</th>
            <th scope="col" class="px-6 py-3">Grand Total</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            class="bg-white dark:bg-gray-800"
            :key="order.id"
            @click="selectId(order.id)"
          >
            <!-- Assuming 'product' has fields like 'orderId', 'total', 'discount', etc. Update these accordingly -->
            <td style="color: #163992" class="px-6 py-4 whitespace-nowrap">
              {{ order.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-black">
              {{ order.sub_total }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-black">
              {{ order.discount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-black">
              {{ order.shipping }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-black">
              {{ order.vat }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap ">
              {{ order.grand_total }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap ">
              {{ order.created_at }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap"
              :class="getStatusClass(order.status_text)"
            >
              {{ order.status_text }}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        v-show="orders?.length > 0"
        ref="loadMoreButtonWrapper"
        :disabled="!loadMore"
        class="w-fit demo mx-auto block mt-5 text-white hover:bg-secondary transition px-6 py-3 rounded-full bg-primary"
        :class="{ 'pointer-events-none opacity-40 bg-gray-300': !loadMore }"
        @click="(e) => handleLoadMore()"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
// import { defineEmits } from 'vue'

const emits = defineEmits(['slectId'])
const userTokens = ref('')
const chunk = ref(1)
const loadMoreButtonWrapper = ref(null)
const loadMore = computed(() => useProfileStore().loadMoreUrl)
const isLoading = computed(() => useProfileStore().isLoading)
const selectedId = ref() 
const handleLoadMore = () => {
  if (loadMore.value) {
    chunk.value = chunk.value + 1
    useProfileStore().getOrder(userTokens.value, chunk.value)
  }
}
const getStatusClass = (status) => {
  if (status === 'Confirmed') {
    return 'Confirmed'
  } else if (status === 'Pending') {
    return 'pending'
  } else if (status === 'Accept') {
    return 'Accept'
  } else if (status === 'Shipped') {
    return 'Shipped'
  } else if (status === 'Cancel') {
    return 'Cancel'
  } else if (status === 'Delivered') {
    return 'Delivered'
  }
}

const selectId = (id) =>{
  // selectedId.value = id
  emits('slectId', id)
}
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!loadMore.value || isLoading.value) {
            return
          } else {
            handleLoadMore()
          }
        }
      })
      // }
    },
    {
      threshold: 0.5
    }
  )
  if (loadMoreButtonWrapper.value) {
    observer.observe(loadMoreButtonWrapper.value)
  }
})

const orders = computed(() => useProfileStore().getorder)
console.log(orders, 'ccccccccccc')

onMounted(() => {
  const token = localStorage.getItem('customer')
  const customerData = JSON.parse(token)
  userTokens.value = customerData.token
  useProfileStore().getOrder(userTokens.value)
  // console.log('ff')
})
// const token = localStorage.getItem('customer')
//   const customerData = JSON.parse(token)
// useProfileStore().getOrder(customerData.value)
</script>

<style scoped >
.Confirmed {
  color: #d2c900;
}
.pending {
  color: #b2b2b2; /* Update the color here */
}
.Shipped {
  color: #18ad00;
}
.Accept {
  color: #0fbf0c;
}
.Cancel {
  color: #d90909;
}
.Delivered {
  color: #027900;
}
</style>

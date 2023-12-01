<template>
  <p>Data received in B from A: {{ receivedData }}</p>
</template>



<script setup>
const props = defineProps({
  receivedData: String
})

const localReceivedData = ref('')

console.log(props.receivedData, 'prop')
watch(
  () => props.receivedData,
  (newVal) => {
    localReceivedData.value = newVal
  }
)

const fetchorderDetail = async (token) => {
  console.log(token,'token')
  try {
    const response = await useGet(
      `/customers/customer-orders/${props.receivedData}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    console.log(response)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  const token = localStorage.getItem('customer')
  const customerData = JSON.parse(token)
  fetchorderDetail(customerData)
})
</script>

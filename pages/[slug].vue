<template>
  <div>
    <Head>
      <Title>{{ page?.title }}</Title>
    </Head>
    <Typography
      :content="page?.data?.content"
      :loading="loading"
    />
  </div>
</template>

<script setup>
// import { useAsyncData } from '@nuxtjs/composition-api'

const route = useRoute()
const { data: page, pending: loading } = await useAsyncData(`${route.params.slug}`, () => useGet(`/pages/${route.params.slug}`))
// const { data: page, pending: loading } = useAsyncData(async (context) => {
//   // Fetch the data based on the route parameter
//   const { params } = context.root.$route
//   const response = await context.root.$axios.$get(`/pages/${params.slug}`)

//   return response
// })
if (page?.value?.error)
  throw createError({ statusCode: page?.value?.status, statusMessage: page?.value?.data?.message, fatal: true })
</script>

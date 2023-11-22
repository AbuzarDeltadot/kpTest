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
const route = useRoute()
const { data: page, pending: loading } = await useAsyncData(`${route.params.slug}`, () => useGet(`/pages/${route.params.slug}`))

if (page?.value?.error)
  throw createError({ statusCode: page?.value?.status, statusMessage: page?.value?.data?.message, fatal: true })
</script>

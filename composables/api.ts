const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

export const usePayloadUrl = () => {
  const config = useRuntimeConfig()
  let url, prefix, baseURL, appUrl
  if (process.server) {
    appUrl = config.APP_URL
    url = config.API_URL
    prefix = config.API_PREFIX
    baseURL = `${url}${prefix}`
  }
  else {
    appUrl = config.public.APP_URL
    url = config.public.API_URL
    prefix = config.public.API_PREFIX
    baseURL = `${url}${prefix}`
  }
  return { url, prefix, baseURL, appUrl }
}

export const initCsrf = async () => {
  const { url } = usePayloadUrl()
  await $fetch.raw(`${url}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })
}

export const useLaraFetch = async (url = '/', options: any = {}, toastMessage) => {
  const token: any = useCookie(CSRF_COOKIE).value

  const { baseURL, appUrl } = usePayloadUrl()

  let headers: any = {
    accept: 'application/json',
    ...options?.headers,
    ...(token && { [CSRF_HEADER]: token }),
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
      referer: appUrl,
    }
  }

  try {
    const errorStore = useErrorStore()

    const response: any = await $fetch(url, {
      baseURL,
      headers,
      credentials: 'include',
      async onResponse({ response }) {
        if (response._data.success && response._data.message) {
          errorStore.updateErrors(null)
          if (toastMessage === 'no') {

          }
          else {
            useToast()?.success(response._data.message)
          }
        }
        return true
      },
      async onResponseError({ response }) {
        if (!response.ok) {
          switch (response.status) {
            case 422:
              if (response._data.errors)
                errorStore.updateErrors(response._data.errors)

              else if (response._data.message && toastMessage !== 'no')
                useToast()?.error(`${response._data.message}`)

              break
            case 419:
              break
            default:
              if (response._data.message && toastMessage !== 'no')
                useToast()?.error(response._data.message)
              else if (toastMessage !== 'no')
                useToast()?.error('Something went wrong! Please try again')
              break
          }
        }
        return true
      },
      ...options,
    })

    if (response?.data
      && ((Array.isArray(response?.data) && response?.data.length) || !(Array.isArray(response?.data)))
      && options.all === undefined
      && !response?.meta && !response.current_page)
      return response.data

    return response
  }
  catch (error) {
    switch (error?.response?.status) {
      case 419:
        await initCsrf()
        if (options.csrfRetry >= 3) {
          useToast()?.error('Something went wrong! Please refresh the page and try again')
        }
        else {
          if (!options.csrfRetry)
            options.csrfRetry = 1
          else
            options.csrfRetry++

          return useLaraFetch(url, options)
        }
        break

      default:
        return { error, data: error?.response?._data, status: error?.response?.status }
        break
    }
  }
}

// Apis

export const useGet = async (url = '/', options = {}, toastMessage) => {
  return await useLaraFetch(url, {
    method: 'GET',
    ...options,
  }, toastMessage)
}

export const usePost = async (url = '/', options = {}) => {
  return await useLaraFetch(url, {
    method: 'POST',
    ...options,
  })
}

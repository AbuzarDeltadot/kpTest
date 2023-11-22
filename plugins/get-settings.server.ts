export default defineNuxtPlugin(async () => {
  const settingStore = useSettingsStore()
  await settingStore.getSettings()
})

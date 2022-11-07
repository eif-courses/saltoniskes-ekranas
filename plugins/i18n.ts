import { createI18n } from 'vue-i18n'
import lt from '../locales/lt.json'
import en from '../locales/en.json'
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'lt',
    messages: {
      lt,
      en,
    },
  })

  vueApp.use(i18n)
})

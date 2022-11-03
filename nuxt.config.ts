export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: true,
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  colorMode: {
    classSuffix: '',
  },
  plugins: [
    {
      src: '~/plugins/vidle.js',
    },
  ],
})
